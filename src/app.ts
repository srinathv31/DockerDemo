import express from "express";
const app = express();
const port = process.env.PORT || 3000;
require("dotenv").config();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/version", (req, res) => {
  res.send("v1.0.2");
});

app.get("/poke/:name", async (req, res) => {
  try {
    const pokeReqName = req.params.name;

    const pokeIdRes = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokeReqName}`
    );
    const pokeIdData = await pokeIdRes.json();
    const pokeId = pokeIdData.id;
    const pokeType = pokeIdData.types;
    console.log("🚀 ~ app.get ~ pokeId:", pokeId);
    console.log("🚀 ~ app.get ~ pokeName:", pokeIdData.name);
    console.log("🚀 ~ app.get ~ pokeType:", pokeType);

    res.send({
      pokeId: pokeId,
      name: pokeIdData.name,
      type: pokeType,
    });
  } catch (err) {
    res.send("errror");
  }
});

app.get("/ping", (req, res) => {
  res.send("PING");
});

app.get("/hello/:id", (req, res) => {
  const id = req.params.id;
  console.log("🚀 ~ app.get ~ id:", id);
  res.send(`Hello, ${id}!`);
});

app.get("/keytest", (req, res) => {
  const SECRET_KEY = process.env.SECRET_KEY;
  console.log("🚀 ~ app.get ~ SECRET_KEY:", SECRET_KEY);
  res.send(`The key is: ${SECRET_KEY ?? "NOKEY"}`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
