import { Component, OnInit } from '@angular/core';
import { ModelService } from '../model.service';
import { Model } from '../model';
import * as modelData from '../model.json';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
    
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
     
  posts: any;
  datas:any;
  closeResult: string = '';
  search:any;
  
   
  constructor(public postService: ModelService,
    private modalService: NgbModal) { }
    
  ngOnInit(): void {
    this.postService.getAll().subscribe(res=>{
      
     this.posts=res

    })  
  }
    
  deletePost(id:number){
    this.postService.delete(id).subscribe(res => {
         this.posts = this.posts.filter((item:any) => item.id !== id);
         console.log('CRUD deleted successfully!');
    })
  }
  
  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
   getDismissReason(reason: any): string {
    this.ngOnInit();
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
    
  }
  searchData(){
    this.postService.filterByAll(this.search)
    .subscribe(
      res => {
        this.posts = res
      },
      error => {
        console.log(error);
      });
  } 
  
}