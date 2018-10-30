const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/posts/";

const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;
const Flair = require("../../src/db/models").Flair;

describe("routes : flairs", () => {

  beforeEach((done) => {
    this.topic;
    this.post;
    this.flair;

    sequelize.sync({force: true}).then((res) => {

//#1
      Topic.create({
        title: "Summer Games",
        description: "Post your Summer stories."
      })
      .then((topic) => {
        this.topic = topic;

        Post.create({
          title: "Snowball Fighting",
          body: "So much snow!",
          topicId: this.topic.id
          .then((post) => {
            this.post = post;

      Flair.create({
          name: "Fairly Flair",
          color: "Yellow!",
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

  })
  });

  describe("GET /topics/:topicId/flairs/new", () => {

    it("should render a new flair form", () => {
      request.get(`${base}/${this.topic.id}/posts/new`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("New Flair");
        done();
      });
    });

  });

  describe("POST /topics/:topicId/flairs/create", () => {

   it("should create a new flair and redirect", () => {
      const options = {
        url: `${base}/${this.post.id}/flairs/create`,
        form: {
          name: "Fairly Flair",
          color: "Yellow!"
        }
      };
      request.flair(options,
        (err, res, body) => {

          Flair.findOne({where: {name: "New Flair"}})
          .then((flair) => {
            expect(flair).not.toBeNull();
            expect(flair.name).toBe("New Flair");
            expect(flair.color).toBe("Yellow!");
            expect(flair.topicId).not.toBeNull();
            done();
          })
          .catch((err) => {
            console.log(err);
            done();
          });
           });
       });
   });
 describe("GET /topics/:topicId/specs/:id", () => {

     it("should render a view with the selected flair", () => {
       request.get(`${base}/${this.topic.id}/flairs/${this.flair.id}`, (err, res, body) => {
         expect(err).toBeNull();
         expect(body).toContain("Fairly Flair");
         done();
       });
     });

   });

   describe("POST /topics/:topicId/flairs/:id/destroy", () => {

        it("should delete the flair with the associated ID", () => {

   //#1
          expect(flair.id).toBe(1);

          request.flair(`${base}/${this.topic.id}/posts/${this.flair.id}/destroy`, (err, res, body) => {

   //#2
            Flair.findById(1)
            .then((flair) => {
              expect(err).toBeNull();
              expect(flair).toBeNull();
              done();
            })
          });

        });

      });
      describe("GET /topicd/:topicId/flairs/:id/edit", () => {

     it("should render a view with an edit flair form", () => {
       request.get(`${base}/${this.topic.id}/posts/${this.flair.id}/edit`, (err, res, body) => {
         expect(err).toBeNull();
         expect(body).toContain("Edit flair");
         expect(body).toContain("New Flair");
         done();
       });
     });

   });

   describe("POST /topics/:topicId/flairs/:id/update", () => {

     it("should return a status code 302", () => {
       request.flair({
         url: `${base}/${this.topic.id}/flairs/${this.flair.id}/update`,
         form: {
           name: "Fairly Flair",
           color: "Yellow!"
         }
       }, (err, res, body) => {
         expect(res.statusCode).toBe(302);
         done();
       });
     });


     it("should update the flair with the given values", () => {
            const options = {
                url: `${base}/${this.topic.id}/flairs/${this.flair.id}/update`,
                form: {
                    name: "Updated!",
                    color: "Purple"
                }
            };
            request.flair(options, (err, res, body) => {

                expect(err).toBeNull();

                Flair.findOne({
                    where: {id: this.flair.id}
                })
                .then((flair) => {
                    expect(flair.name).toBe("Updated!");

                    done();

                  });
          });
      });
    });
  });
});
});
});
