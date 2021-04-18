import { NextFunction, Request, Response } from 'express'
import firebase from 'firebase/app'
import { LoginProps } from '../models/users/loginProps'
import { firebaseConfig } from './firebaseConfig'

export class FirebaseHandler {
  private static _app: firebase.app.App
  private static _auth: firebase.auth.Auth

  public static _initialize(): void {
    if (!FirebaseHandler._app)
      FirebaseHandler._app = firebase.initializeApp(firebaseConfig)
    
    if (!FirebaseHandler._auth) 
      FirebaseHandler._auth = FirebaseHandler._app.auth()
  }

  public static checkAuthentication(req: Request, res: Response, next: NextFunction): void {
    if (FirebaseHandler._auth.currentUser) {
      next()
    }

    res.status(401).json({status: "error", code: "unauthorized"})
  }

  public static login(loginProps: LoginProps): Promise<firebase.auth.UserCredential> {
    return this._auth.signInWithEmailAndPassword(loginProps.email, loginProps.password)
  }

  public static logout(): Promise<void> {
    return this._auth.signOut()
  }
}

FirebaseHandler._initialize()