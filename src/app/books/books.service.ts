import { Books } from './books.model';
import { Subject } from 'rxjs';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { PaginationBooks } from './pagination-books.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  baseUrl = environment.baseUrl;
  private listBooks: Books[] = [];
  // private listBooks: Books[] = [

  //   {bookId: 1, title: 'Math 1', description: 'Curse 1', price: 1000, author: 'Gold D Roger'},
  //   {bookId: 2, title: 'Math 2', description: 'Curse 2', price: 2000, author: 'Gold D Roger'},
  //   {bookId: 3, title: 'Math 3', description: 'Curse 3', price: 3000, author: 'Gold D Roger'},
  //   {bookId: 4, title: 'Math 4', description: 'Curse 4', price: 4000, author: 'Gold D Roger'}

  // ];

  bookSubject= new Subject();

  bookPagination: PaginationBooks;
  bookPaginationSubject = new Subject<PaginationBooks>();

  constructor(private http : HttpClient){

  }

  getBooks(bookPages:number, actualPage: number, sort: string, sortDirection: string, filterValue: any){
    const request = {
      pageSize: bookPages,
      page: actualPage,
      sort,
      sortDirection,
      filterValue
    };
    this.http.post<PaginationBooks>(this.baseUrl+ 'api/Book/pagination', request).
    subscribe((response)=>{
      this.bookPagination = response;
      this.bookPaginationSubject.next(this.bookPagination);
    });
  }

  getListenerBooks(){
    return this.bookPaginationSubject.asObservable();
  }

  saveBook(book: Books){

    this.http.post(this.baseUrl+ 'api/Book', book).
    subscribe((response)=>{
      this.bookSubject.next(book);
    });
  }

  saveBookListener(){
    return this.bookSubject.asObservable();
  }
}
