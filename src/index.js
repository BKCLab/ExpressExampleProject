require("dotenv").config();

const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

const cors = require("cors");
app.use(cors());

const {morganBodyConfig} = require("./logging/morgan-config");
const morganBody = require("morgan-body");
morganBody(app, morganBodyConfig);

app.use("/api", require("./routes"));

const {handleError} = require("./errors/handle-errors-middleware");
app.use(handleError);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));