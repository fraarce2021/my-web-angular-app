import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatSelectChange } from '@angular/material/select';
import { BooksService } from './books.service';
import { MatDialog } from '@angular/material/dialog';
import { Author } from '../authors/authors.model';
import { AuthorsService } from '../authors/authors.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-book-new',
    templateUrl: 'book-new.component.html'
})

export class BookNewComponent implements OnInit, OnDestroy{
  selectAuthor: string;
  selectAuthorText: string;
  releaseDate: string;
  @ViewChild(MatDatepicker) picker : MatDatepicker<Date>;
  authors: Author[] = [];

  authorSuscription : Subscription;

  constructor(private booksService : BooksService, private dialogRef : MatDialog, private authorsService: AuthorsService){

  }

  ngOnInit(){
    this.authorsService.getAuthors();
    this.authorSuscription = this.authorsService.getAuthorListener()
    .subscribe((authors: Author[])=>{
      this.authors = authors;
    });
  }

  authorSelected(event: MatSelectChange){
    this.selectAuthorText = (event.source.selected as MatOption).viewValue;
  }

  saveBook(form:NgForm){

    if(form.valid){

      const authorRequest = {
        id: this.selectAuthor,
        fullName: this.selectAuthorText
      }

      const bookRequest = {
        id: "",
        description: form.value.description,
        title: form.value.title,
        author: authorRequest,
        price: parseInt(form.value.price),
        releaseDate: new Date(this.releaseDate)
      }

      this.booksService.saveBook(bookRequest);
      this.authorSuscription = this.booksService.saveBookListener()
      .subscribe(()=>{
        this.dialogRef.closeAll();
      });
    }
  }

ngOnDestroy(){
  this.authorSuscription.unsubscribe();
}

}
