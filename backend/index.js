const express = require("express");
const cors = require("cors");
const rootRouter = require("./routes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v2", rootRouter);

app.listen(3001);

/**
 * 1 -> eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjdiZmY1NWQwNT
 *  c2NTcyNzk2M2JlNDYiLCJpYXQiOjE3MTk0MDI0MDl9.2ILwADZM-8LkP-D6ImU46RHcWkxp
 *  P1__qJPiKKE3VQ4
 */