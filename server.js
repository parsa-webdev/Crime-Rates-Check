const express = require("express");
const app = express();
const fetch = require("node-fetch");
const path = require("path");
require("dotenv").config();

app.use(express.json());

app.get("/data/:lat/:lon/:newdateyear/:newdatenow", async (req, res) => {
  const { lat, lon, newdateyear, newdatenow } = req.params;
  const crime_res = await fetch(
    `https://api.crimeometer.com/v1/incidents/raw-data?lat=${lat}&lon=${lon}&distance=10km&datetime_ini=${newdateyear}&datetime_end=${newdatenow}&page=1`,
    {
      method: "GET",
      headers: {
        "x-api-key": process.env.MY_API_KEY,
      },
    }
  );
  const crime_data = await crime_res.json();

  res.json(crime_data);
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server Running on port ${port} `));
