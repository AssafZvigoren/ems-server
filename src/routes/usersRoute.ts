import {Router} from 'express'
import { FirebaseHandler } from '../auth/firebaseHandler'
import { UsersController } from '../controllers/usersController'

export class UsersRoute {
  public router: Router
  public usersController: UsersController = new UsersController()

  constructor() {
    this.router = Router()
    this.routes()
  }

  routes(): void {
    this.router.get('/isAuthenticated', this.usersController.isAuthenticated)
    this.router.get('/getAllUsers', FirebaseHandler.checkAuthentication, this.usersController.getAllUsers)
    this.router.post('/login', this.usersController.login)
    this.router.post('/register', this.usersController.register)
    this.router.post('/logout', FirebaseHandler.checkAuthentication, this.usersController.logout)
  }
}