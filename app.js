const express = require("express");
const fs = require("fs");
const deployApp = require("./src/deploy");
const app = express();

app.use(express.static("public"));
app.use(express.json({ limit: "10mb" }));

const deploys = [];

app.post("/github/hook", (req, res) => {
  console.log("req received");
  console.log(req.body);
  const { ref, repository } = req.body;
  console.log("ref is", ref);
  console.log("repository is ", repository);
  if (
    ref === "refs/heads/master" &&
    repository.full_name === "garageScript/databases"
  ) {
    deploys.push({
      time: new Date(),
    });
    deployApp().then((result) => {
      console.log("result is", result);
    });
  }
  res.send("hello");
});

app.get("/github/stats", (req, res) => {
  res.json(deploys);
});

app.listen(process.env.PORT || 3007); // hooks.learndatabases.dev
