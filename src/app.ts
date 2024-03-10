import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
