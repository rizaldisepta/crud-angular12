import { Component, OnInit, ViewChild } from '@angular/core';
import { ModelService } from '../model.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { IndexComponent } from '../index/index.component';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
   
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})

export class CreateComponent implements OnInit {
  


  form: any;
  posts:any;
   
  constructor(
    public postService: ModelService,
    private router: Router,
    private modalService: NgbModal
  ) { }
  
  ngOnInit(): void {
   

    this.form = new FormGroup({
      nama: new FormControl('', [Validators.required]),
      email: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required)
    });
  }
   
  get f(){
    return this.form.controls;
  }
    
  submit(){
    console.log(this.form.value);
    this.postService.create(this.form.value).subscribe(res => {
      
    })
  
  }
  
}