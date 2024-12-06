import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";

import stuffRouter from "./middleware/data/stuffRouter";

dotenv.config();
const app: Application = express();
const port = process.env.PORT;

const corsOptions = {
  origin: process.env.ORIGIN,
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", stuffRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
