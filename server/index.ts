import express, { Application } from "express";
import dotenv from 'dotenv'
import cors from 'cors'

import stuffRouter from "./middleware/data/stuff";

dotenv.config()
const app: Application = express();
const port = process.env.PORT;

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", stuffRouter);

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});