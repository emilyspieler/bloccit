const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/advertisements/";

const sequelize = require("../../src/db/models/index").sequelize;
const Advertisement = require("../../src/db/models").Advertisement;

beforeEach((done) => {
      this.advertisement;
      sequelize.sync({force: true}).then((res) => {

       Advertisement.create({
         title: "JS Advertisement",
         description: "Sell Stuff"
       })
        .then((advertisement) => {
          this.advertisement = advertisement;
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        });

      });

    });

describe("routes : advertisements", () => {

  describe("GET /advertisements", () => {

    it("should return a status code 200", () => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        done();
      });
    });

  });

  describe("GET /advertisements/new", () => {

    it("should render a new advertisement form", () => {
      request.get(`${base}new`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("New Advertisement");
        done();
      });
    });

  });

  describe("POST /advertisements/create", () => {
      const options = {
        url: `${base}create`,
        form: {
          title: "your ad here",
          description: "would you like to buy this?"
        }
      };

      it("should create a new advertisement and redirect", () => {

//#1
        request.post(options,

//#2
          (err, res, body) => {
            Advertisements.findOne({where: {title: "your ad here"}})
            .then((topic) => {
              expect(res.statusCode).toBe(303);
              expect(advertisements.title).toBe("your ad here");
              expect(advertisements.description).toBe("would you like to buy this?");
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
    describe("GET /advertisements/:id", () => {

         it("should render a view with the selected advertisement", () => {
           request.get(`${base}${this.advertisement.id}`, (err, res, body) => {
             expect(err).toBeNull();
             expect(body).toContain("JS Advertisement");
             done();
           });
         });

       });

       describe("POST /advertisements/:id/destroy", () => {

     it("should delete the advertisement with the associated ID", () => {

    //#1
       Advertisement.all()
       .then((advertisements) => {

    //#2
         const advertisementsCountBeforeDelete = advertisements.length;

         expect(advertisementsCountBeforeDelete).toBe(1);

    //#3
         request.post(`${base}${this.advertisement.id}/destroy`, (err, res, body) => {
           Advertisement.all()
           .then((advertisements) => {
             expect(err).toBeNull();
             expect(advertisements.length).toBe(advertisementsCountBeforeDelete - 1);
             done();
           })

         });
       });

     });

     describe("GET /advertisements/:id/edit", () => {

         it("should render a view with an edit advertisement form", () => {
           request.get(`${base}${this.advertisement.id}/edit`, (err, res, body) => {
             expect(err).toBeNull();
             expect(body).toContain("Edit Advertisement");
             expect(body).toContain("JS Advertisement");
             done();
           });
         });

       });

       describe("POST /advertisements/:id/update", () => {

            it("should update the advertisement with the given values", () => {
               const options = {
                  url: `${base}${this.advertisement.id}/update`,
                  form: {
                    title: "JavaScript advertisement",
                    description: "Selling a lot of stuff"
                  }
                };
       //#1
                request.post(options,
                  (err, res, body) => {

                  expect(err).toBeNull();
       //#2
                  Advertisement.findOne({
                    where: { id: this.advertisement.id }
                  })
                  .then((topic) => {
                    expect(advertisement.title).toBe("JavaScript Advertisement");
                    done();
                  });
                });
            });

          });

    });




});
