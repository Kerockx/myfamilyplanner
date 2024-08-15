import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/Auth/auth.service';
import { FirebaseLoginComponent } from '../../components/login/firebase-login/firebase-login.component';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FirebaseLoginComponent ],
  templateUrl: './login.page.html',
  styleUrl: './login.page.scss'
})
export class LoginPage {

  
  public form: FormGroup;
  public loginError = false;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService:AuthService) {

    this.form = this.fb.group({
      username : new FormControl('',Validators.required),
      password : new FormControl('',Validators.required)
     });
   }

  ngOnInit(): void {
   // this.authService.logoutUser();
  }

  authUser(username:string,password:string){
    this.authService.authUser(username,password).subscribe({
      next: (data) => {   
        if(data){
          this.loginError = false;
          this.authService.loginUser(data);   
        }else{
          this.loginError = true;
        }
      },
      error: (e) => console.error(e)
    });
  }

  login(){
    //this.router.navigate(['/dashboard']);
    const username = this.form.controls['username'].value;
    const password = this.form.controls['password'].value;
    this.authUser(username,password);
  }

}
