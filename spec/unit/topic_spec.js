const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;

describe("Topic", () => {

  beforeEach((done) => {
  //#1
    this.topic;
    this.post;
    sequelize.sync({force: true}).then((res) => {


  describe("#create()", () => {

     it("should create a topic object with a title and body", () => {
//#1
       Topic.create({
         title: "Creating Topic",
         body: "This is a topic creation"
       })
       .then((post) => {

//#2
         expect(topic.title).toBe("Creating Topic");
         expect(topic.body).toBe("This is a topic creation");
         done();

       })
       .catch((err) => {
         console.log(err);
         done();
       });
     });

    });

    topic.getPosts()     //returns an array of Sequelize Model instances
      .then((posts) => {
        console.log(posts[1].title);
    })

   });
   });
  });
