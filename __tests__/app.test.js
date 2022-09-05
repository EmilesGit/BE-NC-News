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
  test("should return an article object", () => {
    return request(app)
      .get("/api/articles/4")
      .expect(200)
      .then(({ body }) => {
        console.log(body.result);
        expect(typeof body.result).toBe("object");
        expect(body.result).toHaveProperty("author", expect.any(String));
        expect(body.result).toHaveProperty("title", expect.any(String));
        expect(body.result).toHaveProperty("article_id", expect.any(Number));
        expect(body.result).toHaveProperty("body", expect.any(String));
        expect(body.result).toHaveProperty("topic", expect.any(String));
        expect(body.result).toHaveProperty("created_at", expect.any(String));
        expect(body.result).toHaveProperty("votes", expect.any(Number));
      });
  });
});
