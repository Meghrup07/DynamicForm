import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserData, UserForm } from 'src/app/shared/model/model';
import { FormService } from 'src/app/shared/services/form.service';

@Component({
  selector: 'app-form-controls',
  templateUrl: './form-controls.component.html',
  styleUrls: ['./form-controls.component.scss']
})
export class FormControlsComponent implements OnInit {

  userForm!: FormGroup;

  formData: UserForm[] = []

  userData: UserData[] = []

  userId: any;

  updateBtn: Boolean = false;

  constructor(private formService: FormService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getUserDetails();
    this.getFormData();
    this.getUserForm();
  }

  getUserForm() {
    this.userForm = this.fb.group({})
  }

  getFormData() {
    this.formService.getForm().subscribe(res => {
      this.formData = res;
      this.createFormControls();
    })
  }

  createFormControls() {
    this.formData.forEach((el: any) => {
      if (el.required === true) {
        this.userForm.addControl(el.name, new FormControl('', Validators.required))
      }
      else {
        this.userForm.addControl(el.name, new FormControl(''))
      }
    })
  }

  getFormValue() {
    const resObj = this.userForm.value;
    this.formService.addUserData(resObj).subscribe((res) => {
      alert("User Added Successfully!")
      this.userForm.reset();
      this.getUserDetails();
    })
  }

  getUserDetails() {
    this.formService.getUserData().subscribe((res) => {
      this.userData = res
    })
  }

  deleteUser(id: string) {
    this.formService.deleteUser(id).subscribe((res) => {
      alert("User Deleted Successfully!")
      this.getUserDetails();
    })
  }

  editUser(userData: UserData, id: String) {
    this.userForm.controls['firstName'].setValue(userData.firstName);
    this.userForm.controls['lastName'].setValue(userData.lastName);
    this.userForm.controls['email'].setValue(userData.email);
    this.userForm.controls['mobileNumber'].setValue(userData.mobileNumber);
    this.userForm.controls['dob'].setValue(userData.dob);
    this.userForm.controls['userRole'].setValue(userData.userRole);
    this.userForm.controls['gender'].setValue(userData.gender);
    this.userId = id;
    this.updateBtn = true;
  }

  updateUser() {
    this.formService.updateUser(this.userForm.value, this.userId).subscribe((res) => {
      alert("User Updated Successfully!")
      this.getUserDetails();
      this.userForm.reset();
    })
  }

}
