import { Component, OnInit } from '@angular/core';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, signInWithRedirect } from 'firebase/auth';
import { FirebaseAuthService } from '../../services/Auth/firebase-auth-service.service';

@Component({
  selector: 'login-component',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  constructor(private authService:FirebaseAuthService){
    /*
    this.authService.onAuthStateChanged().subscribe({
    next:(data) => {
      console.log(data);
    }
    })
    */
  }
    
  ngOnInit(): void {
   
  }

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
