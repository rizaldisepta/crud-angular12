import { Component, OnInit } from '@angular/core';
import { ModelService } from '../model.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Model } from '../model';
  
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
   
  id: number;
  post: Model;
   
  constructor(
    public postService: ModelService,
    private route: ActivatedRoute,
    private router: Router
   ) { }
  
  ngOnInit(): void {
    this.id = this.route.snapshot.params['postId'];
      
    this.postService.find(this.id).subscribe((data: Model)=>{
      this.post = data;
    });
  }
  
}