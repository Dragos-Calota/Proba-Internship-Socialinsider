const express = require("express");
const cors = require("cors");
const routes = require("./api/routes");
const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());

app.use("/api", routes);

app.listen(port, () => console.log(`Server is listening on port ${port}`));
