import { AppRouter } from "./app.router"
import { Server } from "./server"
import envs from "./shared/config/envs"


(() => {
    Main()
})()

function Main() {
    const server = new Server(envs.PORT, AppRouter.routes)
    server.start()
}