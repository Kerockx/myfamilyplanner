import { Component } from '@angular/core';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, signInWithRedirect } from 'firebase/auth';

@Component({
  selector: 'firebase-login-component',
  standalone: true,
  imports: [],
  templateUrl: './firebase-login.component.html',
  styleUrl: './firebase-login.component.scss'
})
export class FirebaseLoginComponent {

  registerUser():void{
    const email = "torsten@ddfgdfg.net"
    const password = "tsvsoens"
  
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  
  }
  
  signUpWithGoogle():void{
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithRedirect(auth, provider).then((userCredential) => {
        console.log("drin");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });;
  }

}
