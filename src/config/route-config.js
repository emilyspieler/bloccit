module.exports = {
  init(app){
    const marcoRoutes = require("../routes/marco");
    app.use(marcoRoutes);
  }
}
