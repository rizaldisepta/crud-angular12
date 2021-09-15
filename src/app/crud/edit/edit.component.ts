import { Component, OnInit } from '@angular/core';
import { ModelService } from '../model.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Model } from '../model';
import { FormGroup, FormControl, Validators} from '@angular/forms';
   
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
    
  id: number;
  post: Model;
  form: FormGroup;
  
  constructor(
    public postService: ModelService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  
  ngOnInit(): void {
    this.id = this.route.snapshot.params['postId'];
    this.postService.find(this.id).subscribe((data: Model)=>{
      this.post = data;
      console.log(this.post)
    });
    
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
    this.postService.update(this.id, this.form.value).subscribe(res => {
         console.log('Post updated successfully!');
         this.router.navigateByUrl('crud/index');
    })
  }
   
}