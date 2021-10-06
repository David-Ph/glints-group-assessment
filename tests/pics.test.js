const request = require("supertest");
const app = require("../app");
const { Pic } = require("../models");
const { addPics, removePics } = require("../seeders/pics");
let pics;

beforeAll(async () => {
  await removePics();
  await addPics();
  pics = await Pic.find();
});

describe("POST /pics", () => {
  it("Create pic should succeed", async () => {
    const response = await request(app).post("/pics").send({
      name: "Bambang",
      email: "bambang@email.com",
    });

    expect(response.statusCode).toEqual(201);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Invalid input should fail", async () => {
    const response = await request(app).post("/pics").send({
      name: "w@",
      email: "notanemail",
    });

    expect(response.statusCode).toEqual(400);
    expect(response.body).toBeInstanceOf(Object);
  });
});

describe("GET /pics", () => {
  it("Get Pics should succeed", async () => {
    const response = await request(app).get("/pics");

    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Get pics with query", async () => {
    const response = await request(app).get(
      "/pics?page=1&limit=3&sortBy=name&orderBy=desc"
    );

    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Invalid query should fail", async () => {
    const response = await request(app).get("/pics?page=asd&limit=asd");

    expect(response.statusCode).toEqual(400);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Get pics should not be found", async () => {
    const response = await request(app).get("/pics?page=150&limit=150");

    expect(response.statusCode).toEqual(404);
    expect(response.body).toBeInstanceOf(Object);
  });
});

describe("PUT /pics", () => {
  it("Update pics info should succeed", async () => {
    const response = await request(app).put(`/pics/${pics[0]._id}`).send({
      name: "Neo bambang",
      email: "newbambang@gmail.com",
    });

    expect(response.statusCode).toEqual(201);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Update pics info should fail with invalid input", async () => {
    const response = await request(app).put(`/pics/${pics[0]._id}`).send({
      name: "u#",
      email: "not an email",
    });

    expect(response.statusCode).toEqual(400);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("invalid id should fail", async () => {
    const response = await request(app).put(`/pics/notanid}`).send({
      name: "helloo",
      email: "hello@email.com",
    });

    expect(response.statusCode).toEqual(400);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("pic should not be found", async () => {
    const response = await request(app)
      .put(`/pics/615d4972e0f067af4a73244c`)
      .send({
        name: "helloo",
        email: "hello@email.com",
      });

    expect(response.statusCode).toEqual(404);
    expect(response.body).toBeInstanceOf(Object);
  });
});

describe("DELETE /pics", () => {
  it("Delete pics succeed", async () => {
    const response = await request(app).delete(`/pics/${pics[1]._id}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Delete pics not found", async () => {
    const response = await request(app).delete(
      `/pics/615d4972e0f067af4a73244c`
    );

    expect(response.statusCode).toEqual(404);
    expect(response.body).toBeInstanceOf(Object);
  });
});
