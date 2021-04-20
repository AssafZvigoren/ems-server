import express from 'express'
import compression from 'compression'
import cors from 'cors'
import { UsersRoute } from './routes/usersRoute'

class Server {
  public app: express.Application
  public port: number

  constructor() {
    this.app = express()
    this.config()
    this.routes()
    this.port = 9000
  }

  public config(): void {
    this.app.use(express.urlencoded({extended: false}))
    this.app.use(express.json())
    this.app.use(compression())
    this.app.use(cors())
  }

  public routes(): void {
    this.app.use('/api/users', new UsersRoute().router)
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}`);
    })
  }
}

const server = new Server()

server.start()