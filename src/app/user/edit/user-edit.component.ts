/**
 * Created by duanxc1 on 2/13/2017.
 */
/**
 * Created by duanxc1 on 1/16/2017.
 */
import {Component, OnInit} from '@angular/core';
import {ValidationComponent, ValidationConfig, XValidator} from "../../shared/model/validation-model";
import {User} from "../../shared/user.service";
import {Validators, FormGroup, AbstractControl, ValidatorFn, FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {HttpService} from "../../shared/http.service";

@Component({
  selector: 'user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['user-edit.component.css']
})

export class UserEditFormComponent extends ValidationComponent implements OnInit{
  user:User = new User();
  userEditFormGroup: FormGroup;
  error:String;

  ngOnInit() {
    this.buildValidationForm();
  }

  constructor(
    private router: Router,
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
      'realname': {
        value: this.user.realname,
        validators: {
          'required': { fn: Validators.required, error: 'Real name is required.' },
        }
      },
      'sex': {
        value: this.user.sex,
        validators: {
          'required': { fn: Validators.required, error: 'Gender is required.' }
        }
      },
      'email': {
        value: this.user.email,
        validators: {
          'required': { fn: Validators.required, error: 'Email is required.' },
          'mail': { fn: XValidator.mailValidator(this.user.email), error: 'Email address must be valid.' },
        }
      },
      'mobilephone': {
        value: this.user.mobilephone,
        validators: {
          'maxlength': { fn: Validators.maxLength(50), error: 'Mobilephone number cannot be more than 50 characters long.' }
        }
      },
      'password': {
        value: "",
        validators: {
          'minlength': { fn: Validators.minLength(4), error: 'Password must be at least 4 characters long.' },
          'maxlength': { fn: Validators.maxLength(50), error: 'Password cannot be more than 50 characters long.' }
        }
      },
      'confirmPassword': {
        value: "",
        validators: {
          'maxlength': { fn: Validators.maxLength(50), error: 'Password cannot be more than 50 characters long.' },
          'checkPasswordMatch': { fn: this.checkPasswordMatch(), error: 'These passwords don\'t match. Try again?' }
        }
      }
    };
    this.userEditFormGroup = this.createFormGroup(config);
    //监听表单值变化
    this.monitorValueChange(this.userEditFormGroup);
  }

  checkPasswordMatch(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      const value = control.value;
      if (this.userEditFormGroup) {
        return value != this.userEditFormGroup.value.password ? { 'checkPasswordMatch': { value } } : null;
      } else {
        return null;
      }
    };
  }

  save() {
    this.user = this.userEditFormGroup.value;
    this.user.authtype = 1;
    this.user.isvalid = 1;
    this.http.post("/api/user/add", this.user).subscribe((res: any) => {
      if (res.result==true) {
        this.router.navigate(["/user"]);
      } else {
        this.error = res.msg;
      }
    });
  }

  reset() {
    this.buildValidationForm();
  }
}
