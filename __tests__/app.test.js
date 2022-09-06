const app = require("../app");
const request = require("supertest");
const db = require("../db/connection");
const testData = require("../db/data/test-data");
const seed = require("../db/seeds/seed");
afterAll(() => db.end());

beforeEach(() => {
  return seed(testData);
});

describe("GET/api/topics", () => {
  test("should return an array of topic objects", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        expect(Array.isArray(body.topics)).toBe(true);
        expect(body.topics.length > 0).toBe(true);
        body.topics.forEach((topic) => {
          expect(topic).toHaveProperty("slug", expect.any(String));
          expect(topic).toHaveProperty("description", expect.any(String));
        });
      });
  });
});

describe("GET/api/article/:article_id", () => {
  test("should return an article object for given ID", () => {
    const id_4 = {
      article_id: 4,
      title: "Student SUES Mitch!",
      topic: "mitch",
      author: "rogersop",
      body: "We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages",
      created_at: "2020-05-06T01:14:00.000Z",
      votes: 0,
    };
    return request(app)
      .get("/api/articles/4")
      .expect(200)
      .then(({ body }) => {
        expect(typeof body.result).toBe("object");
        expect(body.result).toEqual(id_4);
      });
  });
  test("should return 404: article ID not found when given ID which may not exist yet", () => {
    return request(app)
      .get("/api/articles/9999")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("9999 not found");
      });
  });
  test("should return 400: Invalid input when passed invalid ID ", () => {
    return request(app)
      .get("/api/articles/northcoders")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid input");
      });
  });
});

describe("PATCH/api/articles/:article_id", () => {
  test("201 should update and return and given article", () => {
    const updatedArticle = {
      article_id: 4,
      title: "Student SUES Mitch!",
      topic: "mitch",
      author: "rogersop",
      body: "We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages",
      created_at: "2020-05-06T01:14:00.000Z",
      votes: 10,
    };
    const newVotes = { inc_votes: 10 };
    return request(app)
      .patch("/api/articles/4")
      .expect(201)
      .send(newVotes)
      .then(({ body }) => {
        expect(body.updatedArticle).toEqual(updatedArticle);
      });
  });
  test("should return status 400 and error message when given invalid input", () => {
    const newVotes = { inc_votes: "loads" };
    return request(app)
      .patch("/api/articles/4")
      .expect(400)
      .send(newVotes)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid input");
      });
  });
});
