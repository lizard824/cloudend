/**
 * Created by duanxc1 on 2/15/2017.
 */
import {Component, OnInit} from '@angular/core';
import {User} from "../shared/user.service";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {HttpService} from "../shared/http.service";
import {ValidationComponent, ValidationConfig} from "../shared/model/validation-model";
import {Router} from "@angular/router";
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent extends ValidationComponent implements OnInit{
  user:User = new User();
  userLoginFormGroup: FormGroup;
  error:String;

  ngOnInit() {
    this.buildValidationForm();
  }
  constructor(
    private router:Router,
    private http: HttpService,
    private fb: FormBuilder
  ) {
    super(fb)
  }

  buildValidationForm(): void {
    let config: { [key: string]: ValidationConfig } = {
      'username': {
        value: this.user.username,
        validators: {
          'required': { fn: Validators.required, error: 'Username is required.' },
        }
      },
      'password': {
        value: "",
        validators: {
          'required': { fn: Validators.required, error: 'Password is required.' },
        }
      }
    };
    this.userLoginFormGroup = this.createFormGroup(config);
    //监听表单值变化
    this.monitorValueChange(this.userLoginFormGroup);
  }

  login() {
    this.http.post("/api/user/admin", this.user).subscribe((res: any) => {
      if (res.success==true) {
        this.router.navigate(["/user"]);
      } else {
        this.error = res.msg;
      }
    });
  }
}
