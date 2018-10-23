const Topic = require("./models").Topic;
const Post = require("./models").Post;
const Flair = require("./models").Flair;


module.exports = {

//#1
  getAllTopics(callback){
    return Topic.all()

//#2
    .then((topics) => {
      callback(null, topics);
    })
    .catch((err) => {
      callback(err);
    })
  },

  getTopic(id, callback){
    //  return Topic.findById(id)

      return Topic.findById(id, {

//#3
      include: [{
          model: Post,
          as: "posts"
        },
        {
            model: Flair,
            as: "flairs"
          }]
      })


      .then((topic) => {
        callback(null, topic);
      })
      .catch((err) => {
        callback(err);
      })
    },

  addTopic(newTopic, callback){
        return Topic.create({
          title: newTopic.title,
          description: newTopic.description
        })
        .then((topic) => {
          callback(null, topic);
        })
        .catch((err) => {
          callback(err);
        })
      },


        deleteTopic(id, callback){
         return Topic.destroy({
           where: {id}
         })
         .then((topic) => {
           callback(null, topic);
         })
         .catch((err) => {
           callback(err);
         })
       },

       updateTopic(id, updatedTopic, callback){
     return Topic.findById(id)
     .then((topic) => {
       if(!topic){
         return callback("Topic not found");
       }

//#1
       Topic.update(updatedTopic, {
         fields: Object.keys(updatedTopic)
       })
       .then(() => {
         callback(null, topic);
       })
       .catch((err) => {
         callback(err);
       });
     });
   }

}
