const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const fetch = require("node-fetch");

app.use(express.static("public"));

app.post("/", async (req, res) => {
  const roll = req.query.roll;
  const reg = req.query.reg;
  if (roll == undefined) {
    return res.status(400).send("Please provide roll number at least");
  }
  let response;
  try {
    let form = new URLSearchParams();
    form.append("roll", roll);
    form.append("regno", reg);
    response = await fetch(
      "https://www.jessoreboard.gov.bd/resultjb/result.php",
      {
        method: "POST",
        body: form,
      }
    );
    res.send(await response.text());
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
