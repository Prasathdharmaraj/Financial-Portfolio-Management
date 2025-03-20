import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppService } from 'src/app/base-setup/services/app.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {

  masterData: any = [];
  preview: boolean;
  userForm: FormGroup;
  minDate: Date = new Date();
  errorMessage: string;
  validForm: boolean;

  constructor(
    private appService: AppService,
    private dialogRef: MatDialogRef<AddUserComponent>, private http: HttpClient, private datePipe: DatePipe,
    private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any) {

  }
  ngOnInit() {
    if(this.data?.type == 'view'){
      this.preview = true;
    }
    this.createForm();
    this.setMasterData();
    if(this.data?.type != 'add'){
      this.setuserData();
      this.minDate = new Date(this.data?.user['Date']);
    }
  }
  createForm() {
    this.userForm = this.formBuilder.group({
      userName: [{ value: null, disabled: this.preview }, [Validators.pattern('^[a-zA-Z][a-zA-Z ]*'), Validators.required, Validators.maxLength(60), Validators.minLength(1)]],
      userContactNumber: [{ value: null, disabled: this.preview }, [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      userEmailId: [{ value: null, disabled: this.preview }, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      userGender: [{ value: null, disabled: this.preview }, [Validators.required]],
      assetType: [{ value: null, disabled: this.preview }, [Validators.required]],
      quantity: [{ value: null, disabled: this.preview }, [Validators.required, Validators.pattern('^[1-9][0-9]*$')]],
      pricePerItem: [{ value: null, disabled: this.preview }, [Validators.required, Validators.pattern('^[1-9][0-9]*$')]],
      totalPrice: [{ value: null, disabled: true }, [Validators.required, Validators.pattern('^[1-9][0-9]*$')]],
      userDate: [{ value: null, disabled: this.preview }, [Validators.required]],
    })
  }
  get formC() {
    return this.userForm.controls;
  }
  setMasterData(){
    this.masterData.gender = [
      {code: 'M', description: 'Male'},
      {code: 'F', description: 'Female'}
    ]
    this.masterData.assetsTypes = ['Stocks', 'Real Estate', 'Mutual Funds', 'Cash Investment', 'Alternative Investment']
  }
  setuserData() {
   this.userForm.get('userName')?.setValue(this.data?.user['Name']);
   this.userForm.get('userContactNumber')?.setValue(this.data?.user['Phone No']);
   this.userForm.get('userEmailId')?.setValue(this.data?.user['Email']);
   this.userForm.get('userGender')?.setValue(this.data?.user['Gender'] == 'Male' ? 'M' : 'F');
   this.userForm.get('assetType')?.setValue(this.data?.user['Asset Type']);
   this.userForm.get('quantity')?.setValue(this.data?.user['Quantity']);
   this.userForm.get('pricePerItem')?.setValue(this.data?.user['Price per Item']);
   this.userForm.get('totalPrice')?.setValue(this.data?.user['Purchase Price']);
   this.userForm.get('userDate')?.setValue(new Date(this.data?.user['Date']));
  }
  emailOutFnctn(eve: any) {
    if (eve.isTrusted) {
      this.userForm.get('userEmailId')?.setValue(this.userForm.get('userEmailId')?.value.toLowerCase())
    }
  }
  calculateTotal() {
    if (this.userForm.get('quantity')?.getRawValue() && this.userForm.get('pricePerItem')?.getRawValue()) {
      let totalPrice = this.userForm.get('quantity')?.getRawValue() * this.userForm.get('pricePerItem')?.getRawValue()
      this.userForm.get('totalPrice')?.setValue(totalPrice)
    }
  }
  userFormValid(){
    if(this.userForm.valid){
      return true;
    }else{
      return false;
    }
  }
  save() {
    this.errorMessage = '';
    if (!this.userFormValid()) {
      this.userForm.markAllAsTouched();
      this.validForm = true;
      this.appService.openSnackBar('Enter all required Fields', 'ok')
      return
    }
    this.appService.setLoading = true;
    let userData = this.processUserData()
    this.dialogRef.close(userData)
  }
  processUserData(){
    let userObject: Object = {
      'Name': this.userForm.get('userName')?.getRawValue() ? this.userForm.get('userName')?.getRawValue() : null,
      'User ID': this.generateUserId(),
      'Gender': this.processGender(),
      'Phone No': this.userForm.get('userContactNumber')?.getRawValue() ? this.userForm.get('userContactNumber')?.getRawValue() : null,
      'Asset Type': this.userForm.get('assetType')?.getRawValue() ? this.userForm.get('assetType')?.getRawValue() : null,
      'Email': this.userForm.get('userEmailId')?.getRawValue() ? this.userForm.get('userEmailId')?.getRawValue() : null,
      'Quantity': this.userForm.get('quantity')?.getRawValue() ? Number(this.userForm.get('quantity')?.getRawValue()) : null,
      'Price per Item': this.userForm.get('pricePerItem')?.getRawValue() ? Number(this.userForm.get('pricePerItem')?.getRawValue()) : null,
      'Purchase Price': this.userForm.get('totalPrice')?.getRawValue() ? Number(this.userForm.get('totalPrice')?.getRawValue()) : null,
      'Date': this.userForm.get('userDate')?.getRawValue() ? this.datePipe.transform(this.userForm.get('userDate')?.getRawValue(), 'dd-MMM-yyyy') : null,
    }
    return userObject;
  }
  generateUserId(){
    if(this.userForm.get('userName')?.getRawValue() && this.userForm.get('userDate')?.getRawValue()){
      let codeValue: any = this.datePipe.transform(this.userForm.get('userDate')?.getRawValue(), 'dd-MMM-yyyy')
      let splitValue = codeValue.split('-')
      return this.userForm.get('userName')?.getRawValue() + splitValue[0] + splitValue[1]
    }
  }
  processGender(){
    return this.masterData?.gender?.filter((el: any) => el.code == this.userForm.get('userGender')?.getRawValue())[0]?.description
  }
  onCancel() {
    this.dialogRef.close()
  }
}
