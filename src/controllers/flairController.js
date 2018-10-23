const flairQueries = require("../db/queries.flairs.js");

module.exports = {

  new(req, res, next){
     res.render("flairs/new", {topicId: req.params.topicId});
   },

   create(req, res, next){
     let newFlair= {
       name: req.body.title,
       color: req.body.body,
       topicId: req.params.topicId
     };
     flairQueries.addFlair(newPost, (err, flair) => {
       if(err){
         res.redirect(500, "/flairs/new");
       } else {
         res.redirect(303, `/flairs/${newFlair.topicId}/flairs/${flair.id}`);
       }
     });
   }

}
