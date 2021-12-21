import { Component, OnInit } from '@angular/core';
import { Login } from 'src/app/model/login';
import { LoginsService } from 'src/app/services/logins.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login : Login = new Login();
  formValue!: FormGroup;

  constructor(private loginsService: LoginsService, private formbuilder: FormBuilder, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      email : [''],
      password : ['']
   });
  }

  post() {
    this.login.email = this.formValue.value.email;
    this.login.password = this.formValue.value.password;

    this.loginsService.post(this.login).subscribe((data: any) =>{
      localStorage.setItem('JWT', data.token);

      this.router.navigate(['/dashboard']);
    },
    error=>{
      this.warningToast("Combination of email and password is incorrect");
    });
  }

  warningToast(message: string){
    this.toastr["warning"](message, "", {
      timeOut: 2000,
      closeButton: true,
      progressBar: true,
      positionClass: 'toast-bottom-right'
    });
  }
}
