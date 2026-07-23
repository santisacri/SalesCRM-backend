import { AppRouter } from "./app.router"
import { Server } from "./server"
import envs from "./shared/config/envs"
import "./shared/queue/mail/mail.worker"


(() => {
    Main()
})()

function Main() {
    const server = new Server(envs.PORT, AppRouter.routes)
    server.start()
}