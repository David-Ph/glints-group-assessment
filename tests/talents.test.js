const request = require("supertest");
const app = require("../app");
const { Talent } = require("../models");
const { addTalents, removeTalents } = require("../seeders/talents");
let talents;

beforeAll(async () => {
  await removeTalents();
  await addTalents();
  talents = await Talent.find();
});

describe("POST /talents", () => {
  it("Create talent should succeed", async () => {
    const response = await request(app).post("/talents").send({
      name: "Bambang",
      email: "bambang@email.com",
    });

    expect(response.statusCode).toEqual(201);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Invalid input should fail", async () => {
    const response = await request(app).post("/talents").send({
      name: "w@",
      email: "notanemail",
    });

    expect(response.statusCode).toEqual(400);
    expect(response.body).toBeInstanceOf(Object);
  });
});

describe("GET /talents", () => {
  it("Get Talents should succeed", async () => {
    const response = await request(app).get("/talents");

    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Get Talents with query", async () => {
    const response = await request(app).get(
      "/talents?page=1&limit=3&sortBy=name&orderBy=desc"
    );

    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Invalid query should fail", async () => {
    const response = await request(app).get("/talents?page=asd&limit=asd");

    expect(response.statusCode).toEqual(400);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Get talents should not be found", async () => {
    const response = await request(app).get("/talents?page=150&limit=150");

    expect(response.statusCode).toEqual(404);
    expect(response.body).toBeInstanceOf(Object);
  });
});

describe("PUT /items", () => {
  it("Update item info should succeed", async () => {
    const response = await request(app).put(`/talents/${talents[0]._id}`).send({
      name: "Neo bambang",
      email: "newbambang@gmail.com",
    });

    expect(response.statusCode).toEqual(201);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Update item info should fail with invalid input", async () => {
    const response = await request(app).put(`/talents/${talents[0]._id}`).send({
      name: "u#",
      email: "not an email",
    });

    expect(response.statusCode).toEqual(400);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("invalid id should fail", async () => {
    const response = await request(app).put(`/talents/notanid}`).send({
      name: "helloo",
      email: "hello@email.com",
    });

    expect(response.statusCode).toEqual(400);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("talent should not be found", async () => {
    const response = await request(app)
      .put(`/talents/615d4972e0f067af4a73244c`)
      .send({
        name: "helloo",
        email: "hello@email.com",
      });

    expect(response.statusCode).toEqual(404);
    expect(response.body).toBeInstanceOf(Object);
  });
});

describe("DELETE /talents", () => {
  it("Delete talent succeed", async () => {
    const response = await request(app).delete(`/talents/${talents[1]._id}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeInstanceOf(Object);
  });
});

describe("GET invalid endpoint", () => {
  it("endpoint should not be found", async () => {
    const response = await request(app).get(`/history`);

    expect(response.statusCode).toEqual(404);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Delete talents not found", async () => {
    const response = await request(app).delete(
      `/talents/615d4972e0f067af4a73244c`
    );

    expect(response.statusCode).toEqual(404);
    expect(response.body).toBeInstanceOf(Object);
  });
});
