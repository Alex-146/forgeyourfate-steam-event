const { badges, badgeAction } = require("./providers/badge");
const express = require("express");
const handlebars = require("express-handlebars");

const app = express();

const hbs = handlebars.create({
  defaultLayout: "main",
  extname: "hbs"
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");

app.use(express.static("static"));

app.get("/", (req, res) => {
  return res.render("index", {
    title: "Website",
    badges,
    author: {
      name: "https://github.com/Alex-146",
      url: "https://github.com/Alex-146"
    }
  });
});

app.get("/:badgeName", (req, res) => {
  const badgeName = req.params.badgeName;
  const { status, data } = badgeAction(badgeName);
  return res.status(status).json(data);
});

const PORT = process.env.PORT ?? 5050;

app.listen(PORT, () => {
  console.log(`Server has been started at ${PORT}...`);
});
