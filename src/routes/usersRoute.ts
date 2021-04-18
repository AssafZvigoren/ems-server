import {Router} from 'express'
import { FirebaseHandler } from '../auth/firebaseHandler'
import { UsersController } from '../controllers/usersController'

export class UsersRoute {
  public router: Router
  public usersController: UsersController = new UsersController()

  constructor() {
    this.router = Router()
  }

  routes(): void {
    this.router.post('/login', this.usersController.login)
    this.router.post('/logout', FirebaseHandler.checkAuthentication, this.usersController.logout)
    this.router.get('/getAllUsers', FirebaseHandler.checkAuthentication, this.usersController.getAllUsers)
  }
}