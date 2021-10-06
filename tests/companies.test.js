const request = require("supertest");
const app = require("../app");
const { Company } = require("../models");
const { addCompanies, removeCompanies } = require("../seeders/companies");
let companies;

beforeAll(async () => {
  await removeCompanies();
  await addCompanies();
  companies = await Company.find();
});

describe("POST /companies", () => {
  it("Create companies should succeed", async () => {
    const response = await request(app).post("/companies").send({
      name: "Bambang",
      email: "bambang@email.com",
    });

    expect(response.statusCode).toEqual(201);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Invalid input should fail", async () => {
    const response = await request(app).post("/companies").send({
      name: "w@",
      email: "notanemail",
    });

    expect(response.statusCode).toEqual(400);
    expect(response.body).toBeInstanceOf(Object);
  });
});

describe("GET /companies", () => {
  it("Get companies should succeed", async () => {
    const response = await request(app).get("/companies");

    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Get companies with query", async () => {
    const response = await request(app).get(
      "/companies?page=1&limit=3&sortBy=name&orderBy=desc"
    );

    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Invalid query should fail", async () => {
    const response = await request(app).get("/companies?page=asd&limit=asd");

    expect(response.statusCode).toEqual(400);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Get companies should not be found", async () => {
    const response = await request(app).get("/companies?page=150&limit=150");

    expect(response.statusCode).toEqual(404);
    expect(response.body).toBeInstanceOf(Object);
  });
});

describe("PUT /companies", () => {
  it("Update companies info should succeed", async () => {
    const response = await request(app)
      .put(`/companies/${companies[0]._id}`)
      .send({
        name: "Neo bambang",
        email: "newbambang@gmail.com",
      });

    expect(response.statusCode).toEqual(201);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Update companies info should fail with invalid input", async () => {
    const response = await request(app)
      .put(`/companies/${companies[0]._id}`)
      .send({
        name: "u#",
        email: "not an email",
      });

    expect(response.statusCode).toEqual(400);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("invalid id should fail", async () => {
    const response = await request(app).put(`/companies/notanid}`).send({
      name: "helloo",
      email: "hello@email.com",
    });

    expect(response.statusCode).toEqual(400);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("companies should not be found", async () => {
    const response = await request(app)
      .put(`/companies/615d4972e0f067af4a73244c`)
      .send({
        name: "helloo",
        email: "hello@email.com",
      });

    expect(response.statusCode).toEqual(404);
    expect(response.body).toBeInstanceOf(Object);
  });
});

describe("DELETE /companies", () => {
  it("Delete companies succeed", async () => {
    const response = await request(app).delete(
      `/companies/${companies[1]._id}`
    );

    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Delete companies not found", async () => {
    const response = await request(app).delete(
      `/companies/615d4972e0f067af4a73244c`
    );

    expect(response.statusCode).toEqual(404);
    expect(response.body).toBeInstanceOf(Object);
  });
});
