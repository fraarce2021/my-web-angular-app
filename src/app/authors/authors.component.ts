import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Author } from './authors.model';
import { AuthorsService } from './authors.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit, OnDestroy {

  loadColumns = ['firstName','lastName','academicDegree'];
  dataSource = new MatTableDataSource<Author>();

  private authorSuscription : Subscription

  constructor(private authorsService: AuthorsService) { }

  ngOnInit(): void {
    this.authorsService.getAuthors();
    this.authorSuscription = this.authorsService.getAuthorListener()
    .subscribe((authors: Author[])=>{
      this.dataSource.data = authors;
    });
  }

  ngOnDestroy(){
    this.authorSuscription.unsubscribe();
  }
}
