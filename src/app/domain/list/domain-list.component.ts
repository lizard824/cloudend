/**
 * Created by duanxc1 on 1/13/2017.
 */
import {Component, OnInit, ViewChild} from '@angular/core';
import {Domain} from "../../shared/domain.service";
import {Pagination} from "../../shared/model/search-model";
import {HttpService} from "../../shared/http.service";
import {Router} from "@angular/router";
import {Validators, FormGroup, AbstractControl, ValidatorFn, FormBuilder} from "@angular/forms";
import {ValidationComponent, ValidationConfig, XValidator} from "../../shared/model/validation-model";
import {ModalDirective} from "ng2-bootstrap";


@Component({
  selector: 'domain',
  templateUrl: './domain-list.component.html',
  styleUrls:['domain-list.component.css'],

})
export class DomainComponent extends ValidationComponent implements OnInit{
  page:Pagination;
  domain:Domain;
  domainList:Array<Domain>=[];
  info:String;
  error:String;
  domainAddFormGroup:FormGroup;
  domainEditFormGroup:FormGroup;
  did:number;
  @ViewChild('staticModal') public staticModal: ModalDirective;
  @ViewChild('staticModalE') public  staticModalE:ModalDirective;

  constructor(private http:HttpService,private router: Router,private fb: FormBuilder
  ) {
    super(fb)
  }


  ngOnInit(){
    this.page = new Pagination();
    this.domain = new Domain();
    this.search(this.page);
    this.buildValidationForm();

  }

  buildValidationForm(): void {
    let config: { [key: string]: ValidationConfig } = {
      'id':{
        value: this.did,
        validators:{

        }
      },
      'sysName': {
        value: this.domain.sysName,
        validators: {
          'required': { fn: Validators.required, error: 'sysname is required.' },
        }
      },
      'domain':{
        value:this.domain.domain,
        validators:{
          'required':{fn:Validators.required,error:'domainname is required.'},
        }
      },
      'service':{
        value: this.domain.service,
        validators:{
          'required':{ fn:Validators.required,error:'servicename is required.'},
        }
      },
      'signUrl':{
        value: this.domain.signUrl,
        validators:{
          'required':{ fn:Validators.required, error:'signurl is required.'},
        }
      },
      'logoutUrl':{
        value: this.domain.logoutUrl,
        validators:{
          'required':{ fn:Validators.required,error:'logouturl is required.'},
        }
      }

    };
    this.domainAddFormGroup = this.createFormGroup(config);
    this.monitorValueChange(this.domainAddFormGroup);
    this.domainEditFormGroup = this.createFormGroup(config);
    this.monitorValueChange(this.domainEditFormGroup);
  }

  search(page){
    if (page === '') {
      page = new Pagination();
    }

    this.http.post("/api/domain/page", {"search":{"sysName": this.domain.searchName}, "page": page}).subscribe((res: any) => {
      this.page.totalCount = res.page.totalCount;
      this.page.currentPage = res.page.currentPage;
      this.page.pageCount = res.page.pageCount;
      this.domainList = res.page.result;
    });
  }


  del(id){
    this.http.get("/api/domain/del/"+id).subscribe((res:any)=>{
      if (res.success) {
        this.search('');
        this.info="";
      }else{
        this.info=res.msg;
      }
    });
  }

  submit(){
    this.domain = this.domainAddFormGroup.value;
    this.http.post("/api/domain/add",this.domain).subscribe((res:any)=>{
      if (res.success==true) {
        this.staticModal.hide();
        this.search('');
      } else {
        this.error = res.msg;
      }
    });
  }

  submit2(){
    this.domain = this.domainEditFormGroup.value;
    this.http.post("/api/domain/update",this.domain).subscribe((res:any)=>{
      if (res.success==true) {
        this.staticModalE.hide();
        this.search('');
      } else {
        this.error = res.msg;
      }
    });

  }

  edit(id){
    this.buildValidationForm();
    this.staticModalE.show();
    this.http.get("/api/domain/edit/" + id).subscribe((res: any) => {
      if (res.success) {
          this.domain = res.result;
          this.did = res.result.id;
      }
    });
  }

  showModal(){
    this.staticModal.show();
  }



}
