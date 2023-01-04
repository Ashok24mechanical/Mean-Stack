import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, NgModel } from '@angular/forms';
import { APIService } from '../NodeAPI/api.service';
import * as crypto from 'crypto-js';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CRUDComponent implements OnInit {

  BackendData: any = [];
  reactiveform: any = FormGroup
  country: any = ['India', 'US', 'UK', 'Russia', 'Europe']
  genders: any = ['Male', 'Female', 'Others']
  edits: boolean = false;
  editID: any;
  encryptedapidata: any;
  potencryption: any;
  putencryption: any;
  constructor(private service: APIService) { }

  ngOnInit(): void {
    this.get();
    this.reactiveform = new FormGroup({
      firstname: new FormControl(null, Validators.required),
      lastname: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      nationality: new FormControl('India', Validators.required),
      gender: new FormControl('Male', Validators.required)
    });
  }

  get() {
    this.service.getdata().subscribe(data => {
      // console.log(data);
      this.encryptedapidata = data
      let decrypt = crypto.AES.decrypt(this.encryptedapidata, 'keyword')
      let Decrypted = decrypt.toString(crypto.enc.Utf8);
      // console.log(Decrypted);
      this.BackendData = [JSON.parse(Decrypted)];
      // this.BackendData = Array.of(Decrypted);
      console.log(this.BackendData);

    });
  }
  submit(data: any) {
    let Encrypt = crypto.AES.encrypt(JSON.stringify(data), 'keyword').toString();
    this.potencryption = { user: Encrypt }
    // console.log(this.potencryption);
    this.service.postdata(this.potencryption).subscribe(data => {
      console.log(data);
      this.get();
      this.reactiveform.reset({
        nationality: 'India',
        gender: 'Male'
      });
    });
  }
  deleted(data: any) {
    if (confirm('Are you sure you want to delete') === true) {
      this.service.deletedata(data._id).subscribe(data => {
        this.get();
        console.log(data);
      });
    }
  }
  edit(data: any) {
    console.log(data);
    this.edits = true;
    this.editID = data._id;
    this.reactiveform.setValue({
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      nationality: data.nationality,
      gender: data.gender
    });
  }
  save(data: any) {
    let encrypt = crypto.AES.encrypt(JSON.stringify(data), 'keyword').toString();
    this.putencryption = { user: encrypt }
    this.service.updatedata(this.editID, this.putencryption).subscribe((data) => {
      console.log(data);
      this.get();
      this.reactiveform.reset({
        nationality: 'India',
        gender: 'Male'
      });
      this.edits = false;
    })
  }

}
