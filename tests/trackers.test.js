const request = require("supertest");
const app = require("../app");
const { Tracker, Talent, Pic, Company } = require("../models");
const { addTalents, removeTalents } = require("../seeders/talents");
const { addPics, removePics } = require("../seeders/pics");
const { addCompanies, removeCompanies } = require("../seeders/companies");
const { remove } = require("../seeders");

let trackers, talents, pics, companies;

beforeAll(async () => {
  await remove();
  await Promise.all([addTalents(), addPics(), addCompanies()]);

  talents = await Talent.find();
  pics = await Pic.find();
  companies = await Company.find();
});

describe("POST /trackers", () => {
  it("Create trackers should succeed", async () => {
    const response = await request(app).post("/trackers").send({
      talent: talents[0]._id,
      pic: pics[0]._id,
      company: companies[0]._id,
    });

    expect(response.statusCode).toEqual(201);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Invalid Talent/PIC/Company should fail", async () => {
    const response = await request(app).post("/trackers").send({
      talent: "notanid",
      pic: "notanid",
      company: "notanid",
    });

    expect(response.statusCode).toEqual(400);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Talent/PIC/Company not found", async () => {
    const response = await request(app).post("/trackers").send({
      talent: "615d4972e0f067af4a73244c",
      pic: "615d4972e0f067af4a73244c",
      company: "615d4972e0f067af4a73244c",
    });

    expect(response.statusCode).toEqual(400);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Talent has applied to a company", async () => {
    const response = await request(app).post("/trackers").send({
      talent: talents[0]._id,
      pic: pics[0]._id,
      company: companies[0]._id,
    });

    expect(response.statusCode).toEqual(400);
    expect(response.body).toBeInstanceOf(Object);
  });
});

describe("GET /trackers", () => {
  it("Get trackers should succeed", async () => {
    const response = await request(app).get("/trackers");

    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Get trackers with query", async () => {
    const response = await request(app).get(
      "/trackers?page=1&limit=5&sortBy=updatedAt&orderBy=asc&status=review"
    );

    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Invalid query should fail", async () => {
    const response = await request(app).get("/trackers?page=asd&limit=asd");

    expect(response.statusCode).toEqual(400);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Get trackers should not be found", async () => {
    const response = await request(app).get("/trackers?page=150&limit=150");

    expect(response.statusCode).toEqual(404);
    expect(response.body).toBeInstanceOf(Object);
  });
});

describe("PUT /trackers", () => {
  it("Update trackers status should succeed", async () => {
    trackers = await Tracker.find();
    const response = await request(app)
      .put(`/trackers/${trackers[0]._id}`)
      .send({
        status: "offer",
      });

    expect(response.statusCode).toEqual(201);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Should not able to update talent/pic/company", async () => {
    const response = await request(app)
      .put(`/trackers/${trackers[0]._id}`)
      .send({
        talent: talents[1]._id,
        pic: pics[1]._id,
        company: companies[1]._id,
        status: "offer",
      });

    expect(response.statusCode).toEqual(400);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Update trackers status should fail with invalid input", async () => {
    const response = await request(app)
      .put(`/trackers/${trackers[0]._id}`)
      .send({
        status: "notvalid",
      });

    expect(response.statusCode).toEqual(400);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("invalid id should fail", async () => {
    const response = await request(app).put(`/trackers/notanid}`).send({
      name: "helloo",
      email: "hello@email.com",
    });

    expect(response.statusCode).toEqual(400);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("trackers should not be found", async () => {
    const response = await request(app)
      .put(`/trackers/615d4972e0f067af4a73244c`)
      .send({
        status: "offer",
      });

    expect(response.statusCode).toEqual(404);
    expect(response.body).toBeInstanceOf(Object);
  });
});

describe("DELETE /trackers", () => {
  it("Can't delete talent in a tracker", async () => {
    const response = await request(app).delete(`/talents/${talents[0]._id}`);

    expect(response.statusCode).toEqual(400);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Can't delete pics in a tracker", async () => {
    const response = await request(app).delete(`/pics/${pics[0]._id}`);

    expect(response.statusCode).toEqual(400);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Can't delete companies in a tracker", async () => {
    const response = await request(app).delete(
      `/companies/${companies[0]._id}`
    );

    expect(response.statusCode).toEqual(400);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Delete trackers succeed", async () => {
    const response = await request(app).delete(`/trackers/${trackers[0]._id}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Delete trackers not found", async () => {
    const response = await request(app).delete(
      `/trackers/615d4972e0f067af4a73244c`
    );

    expect(response.statusCode).toEqual(404);
    expect(response.body).toBeInstanceOf(Object);
  });
});

describe("GET /trackers/status", () => {
  it("Should return tracker statuses", async () => {
    const response = await request(app).get(`/trackers/status`);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeInstanceOf(Object);
  });
});
