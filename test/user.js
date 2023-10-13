import chaiHttp from "chai-http";
import chai from "chai";
import app from "../app.js";
import { initializeDatabase, cleanUpTestDatabase } from "../utils/testUtils.js";
import { describe } from "mocha";

chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request(app);

describe("User Api Endpoint", async () => {
  before(async () => {
    // initialize and seed the test database
    await initializeDatabase();
  });

  after(async () => {
    // cleanup the database
    await cleanUpTestDatabase();
  });

  describe("POST /users/add", () => {
    it("Should add new user", () => {
      const data = {
        name: "ABC",
        email: "abc@gmail.com",
        phone: 9844444444,
      };
      request
        .post("/users/add")
        .send(data)
        .end((err, resp) => {
          if (err) {
            expect(resp).to.have.status(404);
            expect(resp.body).to.have.property("error");
          } else {
            expect(resp).to.have.status(200);
            expect(resp.body.name).to.equal("ABC");
            expect(resp.body.email).to.equal("abc@gmail.com");
            expect(resp.body.phone).to.equal("+9779844444444");
          }
        });
    });
  });

  describe("GET /users", () => {
    it("Should fetch all user data", async () => {
      request.get("/users/").end((err, resp) => {
        console.log("resp", resp.status, resp.body);
      });
    });

    it("Get user data with query param", async () => {
      request.get("/users/1").end((err, resp) => {
        expect(resp).to.have.status(200);
        expect(resp).to.be.not.empty;
      });
    });

    it("search user data by name", async () => {
      const resp = request.get("/users/search/by?name=john");
      expect(resp).to.have.status(200);
      expect(resp.body).to.be.not.empty;
    });
  });

  describe("PUT /users/update/:id", () => {
    it("Should update user's data", async () => {
      const userData = {
        name: "hery",
        email: "hary1234@gmail.com", // original was hary1
        phone: 9844444444,
      };
      const resp = await request.put("/users/update/1").send(userData);
      expect(resp).to.have.status(200);
      expect(resp.body)
        .to.have.property("msg")
        .to.equal("deleted successfully!");
    });

    it("Must error while updating non-existing user", async () => {
      const userData = {
        name: "hery",
        email: "hary1234@gmail.com",
        phone: 9844444444,
      };
      const resp = await request.put("/users/update/6").send(userData);
      expect(resp).to.have.status(404);
      expect(resp.body).to.have.property("error").to.equal("User not found!");
    });
  });
});
