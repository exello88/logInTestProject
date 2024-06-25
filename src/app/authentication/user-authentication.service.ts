import { Injectable } from '@angular/core';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, getIdToken, AuthError } from "firebase/auth";
import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './environment';



const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

@Injectable({
  providedIn: 'root'
})
export class UserAuthenticationService {
  public async registerUser(email: string, password: string): Promise<object> {
      return await createUserWithEmailAndPassword(auth, email, password);
  }
  public async loginUser(email: string, password: string): Promise<object> {
    try {
      const users = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem('authToken', await getIdToken(users.user));
      return users;
    } catch (error: unknown) {
      throw error;
    }
  }
}
