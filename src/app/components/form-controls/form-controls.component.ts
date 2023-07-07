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

}
