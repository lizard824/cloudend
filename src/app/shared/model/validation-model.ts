/**
 * Created by duanxc1 on 1/16/2017.
 */
import { FormGroup, AbstractControl, ValidatorFn, FormBuilder } from '@angular/forms';

export class ValidationUnit {
  fn: ValidatorFn;
  error: string;
}

export class ValidationConfig {
  value: any;
  validators: {
    [key: string]: ValidationUnit;
  };
}

/**
 * 校验组件抽象类，需要校验的组件请继承此类
 * 例：
 * export class ProjectAddComponent extends ValidationComponent implements OnInit {
 *   constructor(private fb: FormBuilder){super(fb);}
 *   ngOnInit() {
 *     //构建验证表单
 *     this.buildValidationForm();
 *   }
 *   buildValidationForm(): void {
 *     let config: { [key: string]: ValidationConfig } = {
 *         'name': {
 *             value: this.project.name,
 *             validators: {
 *                 'required': { fn: Validators.required, error: 'Name is required.' },
 *                 'minlength': { fn: Validators.minLength(4), error: 'Name must be at least 4 characters long.' },
 *                 'maxlength': { fn: Validators.maxLength(50), error: 'Name cannot be more than 50 characters long.' }
 *             }
 *         },
 *         'limitCpu': {
 *             value: this.project.name,
 *             validators: {
 *                 'required': { fn: Validators.required, error: 'Name is required.' },
 *                 'min': { fn: XValidator.minValidator(4), error: 'Limit Cpu must greater then 4' },
 *                 'max': { fn: XValidator.maxValidator(1000), error: 'Limit Cpu must less then 1000' }
 *             }
 *         },
 *         'limitMem': {
 *             value: this.project.name,
 *             validators: {
 *                 'required': { fn: Validators.required, error: 'Name is required.' },
 *                 'min': { fn: XValidator.minValidator(100), error: 'Limit Memory must greater then 100' },
 *                 'max': { fn: XValidator.maxValidator(10240), error: 'Limit Memory must less then 10240' }
 *             }
 *         }
 *     };
 *     this.projectAddForm = this.createFormGroup(config);
 *     //监听表单值变化
 *     this.monitorValueChange(this.projectAddForm);
 *   }
 *   save() {
 *     //FormGroup赋值
 *     this.project = this.projectAddForm.value;
 *   }
 * }
 */
export abstract class ValidationComponent {
  /**
   * 构造函数需要一个FormBuilder注入
   */
  constructor(private _fb: FormBuilder) {
  }
  /**
   * 表单错误域
   */
  public formErrors = {};
  /**
   * 表单错误消息配置
   */
  public validationMessages = {};
  /**
   * 子类要实现的构建校验表单的方法
   */
  abstract buildValidationForm(): void;

  /**
   * 值变化时，进行校验，设置错误信息
   */
  onValueChanged(formGroup: FormGroup, data?: any) {
    if (!formGroup) { return; }
    const form = formGroup;

    for (const field in this.validationMessages) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          if ('' === this.formErrors[field]) {
            this.formErrors[field] = messages[key];
          } else {
            this.formErrors[field] += ' ' + messages[key];
          }
        }
        if ('' === this.formErrors[field]) {
          this.formErrors[field] = "Input error!";
        }
      }
    }
  }

  /**
   * 配置数据监听的变化
   */
  monitorValueChange(_fg: FormGroup) {
    _fg
      .valueChanges
      .subscribe(data => this.onValueChanged(_fg, data));
    this.onValueChanged(_fg);
  }

  /**
   * 根据配置创建FormGroup
   */
  createFormGroup(config: { [key: string]: ValidationConfig; }): FormGroup {

    this.validationMessages = {}
    for (const key in config) {
      if (null === config[key]) {
        continue;
      }
      this.validationMessages[key] = {};
      for (const type in config[key].validators) {
        this.validationMessages[key][type] = config[key].validators[type].error;
      }
    }

    let fgConfig = {};
    for (const key in config) {
      if (null === config[key]) {
        fgConfig[key] = ['', []];
        continue;
      }
      fgConfig[key] = [config[key].value, []];
      for (const type in config[key].validators) {
        fgConfig[key][1].push(config[key].validators[type].fn);
      }
    }
    return this._fb.group(fgConfig);
  }

  /**
   * 更新Form表单中的值，触发验证
   */
  updateFormValue(_fg: FormGroup, control: string, value: any) {
    //更新值
    _fg.controls[control].patchValue(value);
    //触发验证
    _fg.controls[control].markAsTouched();
    _fg.controls[control].markAsDirty();
    //触发校验
    this.onValueChanged(_fg);
  }
}

/**
 * 自定义校验器
 */
export class XValidator {
  /**
   * 最大值校验器
   */
  static maxValidator(max: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      const value = 0 + control.value;
      return value > max ? { 'max': { value } } : null;
    };
  }
  /**
   * 数组最小长度
   */
  static minArrayValidator(min: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!(control.value instanceof Array)) {
        return null;
      }
      const value = control.value;
      return value.length < min ? { 'minArray': { value } } : null;
    };
  }

  /**
   * 数组最大长度
   */
  static maxArrayValidator(max: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!(control.value instanceof Array)) {
        return null;
      }
      const value = control.value;
      return value.length > max ? { 'maxArray': { value } } : null;
    };
  }
  /**
   * 最小值校验器
   */
  static minValidator(min: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      const value = 0 + control.value;
      return value < min ? { 'min': { value } } : null;
    };
  }

  /**
   * mail pattern validator
   * quote: http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
   */
  static mailValidator(mail: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      const value = control.value;
      if (control.value) {
        return !control.value.match("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?") ? { 'mail': { value } } : null;
      }
    }

  }
}
