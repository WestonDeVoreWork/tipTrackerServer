require("dotenv").config();
const Express = require("express");
const app = Express();

const dbConnection = require("./db");
const middleware = require("./middleware");
const controllers = require('./controllers');

app.use(Express.json());

app.use(middleware.CORS)

app.use("/user", controllers.userController);
app.use("/tips", controllers.tipsController)
app.use("/mile", controllers.mileController)
app.use(require("./middleware/validate-jwt"));

dbConnection.authenticate()
  //  .then(() => dbConnection.sync({force: true}))
  .then(() => dbConnection.sync())
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`[Server:] App is listening on Port ${process.env.PORT}`)
    );
  })
  .catch((err) => {
    console.log("[Server:] Server Crashed");
    console.error(err);
  });