/**
 * Created by duanxc1 on 2/13/2017.
 */
import {Component, OnInit} from '@angular/core';
import {ValidationComponent, ValidationConfig, XValidator} from "../../shared/model/validation-model";
import {User} from "../../shared/user.service";
import {Validators, FormGroup, AbstractControl, ValidatorFn, FormBuilder} from "@angular/forms";
import {Router, Params, ActivatedRoute} from "@angular/router";
import {HttpService} from "../../shared/http.service";

@Component({
  selector: 'user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['user-edit.component.css']
})

export class UserEditFormComponent extends ValidationComponent implements OnInit{
  user:User = new User();
  userEditFormGroup: FormGroup;
  uid: number;
  error:String;

  ngOnInit() {
    this.buildValidationForm();
    this.route.params.forEach((params: Params) => {
      this.http.get("/api/user/edit/" + params["id"]).subscribe((res: any) => {
        if (res.success) {
          this.user = res.result;
          this.uid = res.result.id;
          delete this.user.password;
          //在界面加载完数据后就打开开关进行验证
          this.buildValidationForm();
          for (const key in this.userEditFormGroup.controls) {
            this.userEditFormGroup.controls[key].markAsDirty();
          }
          this.onValueChanged(this.userEditFormGroup);
        }
      });
    });　
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
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
          'user': { fn: XValidator.usernameValidator(this.user.username), error: 'Username must be characters.' },
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
          'checkPasswordMatch': { fn: this.checkPasswordMatch(), error: 'These passwords don\'t match. Try again' }
        },
      },
      'isvalid': {
        value: this.user.isvalid,
        validators: {
          'required': { fn: Validators.required, error: 'Is Valid can not be empty.' }
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

  reset() {
    this.buildValidationForm();
  }

  update(){
    delete this.userEditFormGroup.value.confirmPassword;
    this.user = this.userEditFormGroup.value;
    this.user.id = this.uid;
    this.http.post("/api/user/update", this.user).subscribe((res: any) => {
      if (res.success) {
        this.router.navigate(["/home/user"]);
      }else{
        this.error = res.msg;
      }
    });
  }
}
