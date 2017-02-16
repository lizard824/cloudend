/**
 * Created by duanxc1 on 2/15/2017.
 */
import {Component, OnInit} from '@angular/core';
import {User} from "../shared/user.service";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {HttpService} from "../shared/http.service";
import {ValidationComponent, ValidationConfig} from "../shared/model/validation-model";
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
  }
}
