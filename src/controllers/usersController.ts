import {FirebaseHandler} from '../auth/firebaseHandler'
import {Request, Response, NextFunction} from 'express'
import { LoginProps } from '../models/users/loginProps'
import firebase from 'firebase'

export class UsersController {
  public async login(req: Request, res: Response): Promise<void> {
    const loginProps: LoginProps = req.body
    FirebaseHandler.login(loginProps)
      .then((user: firebase.auth.UserCredential) => {
        res.status(200).json({displayName: user.user?.displayName})
      })
      .catch(err => {
        switch (err.code) {
          case 'invalid-email':
          case 'wrong-password':
          case 'user-not-found':
            res.status(400).send('Wrong email address or password')
            break;
          
          case 'user-disabled':
            res.status(400).send('This account is disabled')
            break;
          
          default:
            console.log(err)
            res.status(500).send('Unknown error. Please try again')
            break;
        }
      })
  }

  public async logout (req: Request, res: Response): Promise<void> {
    await FirebaseHandler.logout()
    res.status(200).json()
  }

  public async getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
    console.log();
  }
}