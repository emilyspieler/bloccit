const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/topics";

const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Flair = require("../../src/db/models").Flair;

describe("routes : flairs", () => {

  beforeEach((done) => {
    this.topic;
    this.flairs;

    sequelize.sync({force: true}).then((res) => {

//#1
      Topic.create({
        title: "Summer Games",
        description: "Post your Summer stories."
      })
      .then((topic) => {
        this.topic = topic;

      Flair.create({
          name: "this is a flair",
          color: "very art!",
          topicId: this.topic.id
        })
        .then((flair) => {
          this.flair = flair;
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        });
      });
    });

  });

  describe("GET /topics/:topicId/flairs/new", () => {

    it("should render a new flair form", () => {
      request.get(`${base}/${this.topic.id}/flairs/new`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("New Flair");
        done();
      });
    });

  });

  describe("POST /topics/:topicId/flairs/create", () => {

   it("should create a new flair and redirect", () => {
      const options = {
        url: `${base}/${this.topic.id}/flairs/create`,
        form: {
          name: "What I name this",
          color: "the color is green!"
        }
      };
      request.flair(options,
        (err, res, body) => {

          Flair.findOne({where: {name: "What I name this"}})
          .then((flair) => {
            expect(flair).not.toBeNull();
            expect(flair.name).toBe("What I name this");
            expect(flair.color).toBe("the color is green!");
            expect(flair.topicId).not.toBeNull();
            done();
          })
          .catch((err) => {
            console.log(err);
            done();
          });
        }
      );
    });

 });


});
