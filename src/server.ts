import express, { Router } from "express";
import errorMiddleware from "./shared/middlewares/global-error.middleware";

export class Server {

    private app = express();

    constructor(
        private readonly port: number,
        private readonly routes: Router
    ) { }

    start() {

        this.app.use(express.json())
        this.app.use(this.routes)

        this.app.use(errorMiddleware)

        this.app.listen(this.port, () => {
            console.log(`server up on port ${this.port}`);
        });
    }
}