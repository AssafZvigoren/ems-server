import { NextFunction, Request, Response } from 'express'
import firebase from 'firebase'
import { LoginProps } from '../models/users/loginProps'
import { UserProfile } from '../models/users/userProfile'
import { firebaseConfig } from './firebaseConfig'

export class FirebaseHandler {
  private static _app: firebase.app.App
  private static _auth: firebase.auth.Auth

  public static _initialize(): void {
    if (!FirebaseHandler._app)
      FirebaseHandler._app = firebase.initializeApp(firebaseConfig)
    
    if (!FirebaseHandler._auth) 
      FirebaseHandler._auth = firebase.auth(FirebaseHandler._app)
  }

  public static checkAuthentication(req: Request, res: Response, next: NextFunction): void {
    if (FirebaseHandler._auth.currentUser) {
      next()
    } else {
      res.redirect('/')
    }
  }

  public static login(loginProps: LoginProps): Promise<firebase.auth.UserCredential> {
    return this._auth.signInWithEmailAndPassword(loginProps.email, loginProps.password)
  }

  public static register(loginProps: LoginProps): Promise<firebase.auth.UserCredential> {
    return this._auth.createUserWithEmailAndPassword(loginProps.email, loginProps.password)
  }

  public static logout(): Promise<void> {
    return this._auth.signOut()
  }

  public static getCurrentUser(): {email: string | null, uid: string | null} | null {
    if (!this._auth.currentUser) {
      return null
    }
    return {email: this._auth.currentUser?.email, uid: this._auth.currentUser?.uid}
  }

  public static getUserPofile(): UserProfile {
    return {
      displayName: this._auth.currentUser?.displayName ? this._auth.currentUser?.displayName : "",
      photoURL: this._auth.currentUser?.photoURL ? this._auth.currentUser?.photoURL : "",
    }
  }

  public static updateUserProfile(userProfile: UserProfile): Promise<void> | undefined {
    return this._auth.currentUser?.updateProfile({...userProfile})
  }
}

FirebaseHandler._initialize()