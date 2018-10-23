const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Flair = require("../../src/db/models").Flair;

describe("Flair", () => {

  beforeEach((done) => {
//#1
    this.topic;
    this.flair;
    sequelize.sync({force: true}).then((res) => {

//#2
      Topic.create({
        title: "Title Here",
        description: "words are words."
      })
      .then((topic) => {
        this.topic = topic;
//#3
        Flair.create({
          name: "My second flair",
          color: "it looks real good",
//#4
          topicId: this.topic.id
        })
        .then((flair) => {
          this.flair = flair;
          done();
        });
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

  });

  describe("#create()", () => {

     it("should create a flair object with a name, color, and assigned topic", () => {
//#1
       Flair.create({
         name: "My third flair",
         color: "it looks super good",
         topicId: this.topic.id
       })
       .then((flair) => {

//#2
         expect(flair.name).toBe("My third flair");
         expect(flair.color).toBe("it looks super good");
         done();

       })
       .catch((err) => {
         console.log(err);
         done();
       });
     });

   });

   it("should not create a post with missing name, color, or assigned topic", () => {
     Flair.create({
       name: "My third flair"
     })
     .then((flair) => {

      // the code in this block will not be evaluated since the validation error
      // will skip it. Instead, we'll catch the error in the catch block below
      // and set the expectations there

       done();

     })
     .catch((err) => {

       expect(err.message).toContain("Flair.body cannot be null");
       expect(err.message).toContain("Flair.topicId cannot be null");
       done();

     })
   });

   describe("#setTopic()", () => {

     it("should associate a topic and a flair together", (done) => {

// #1
       Topic.create({
         title: "another flair two",
         description: "green"
       })
       .then((newTopic) => {

// #2
         expect(this.flair.topicId).toBe(this.topic.id);
// #3
         this.flair.setTopic(newTopic)
         .then((flair) => {
// #4
           expect(flair.topicId).toBe(newTopic.id);
           done();

         });
       })
     });

   });

   describe("#getTopic()", () => {

     it("should return the associated topic", () => {

       this.flair.getTopic()
       .then((associatedTopic) => {
         expect(associatedTopic.title).toBe("Title Here");
         done();
       });

     });

   });

});
