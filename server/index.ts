import express, { Application, Request, Response } from "express";
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()
const app: Application = express();

app.use(cors())
const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
	res.json({stuff: "bt info hereeeeeeeee"});
});

app.get("/hello", (req: Request, res: Response) => {
	res.send("get info here!");
});

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});