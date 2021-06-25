import { Component,OnInit, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { BooksService } from '../services/books.service';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-books',
  templateUrl: 'books.component.html'
})

export class BooksComponent implements OnInit, OnDestroy{

  books : string[] = [];

  constructor(private booksService:BooksService){}

  private bookSuscription:Subscription = new Subscription();

  deleteBook(book:string){
    // this.booksService.deleteBooks(book);
  }

  saveBook(f:NgForm){
    if(f.valid){
      this.booksService.addBooks(f.value.bookName);
    }
  }
  ngOnInit(){
    this.books = this.booksService.getBooks();
    this.bookSuscription = this.booksService.booksSubject.subscribe(()=>{
      this.books = this.booksService.getBooks();
    });
  }
  ngOnDestroy(){
    this.bookSuscription.unsubscribe();
  }
}
