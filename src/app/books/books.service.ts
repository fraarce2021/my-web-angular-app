import { Books } from './books.model';
import { Subject } from 'rxjs';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';

export class BooksService {
  baseUrl = environment.baseUrl;
  private listBooks: Books[] = [];
  // private listBooks: Books[] = [

  //   {bookId: 1, title: 'Math 1', description: 'Curse 1', price: 1000, author: 'Gold D Roger'},
  //   {bookId: 2, title: 'Math 2', description: 'Curse 2', price: 2000, author: 'Gold D Roger'},
  //   {bookId: 3, title: 'Math 3', description: 'Curse 3', price: 3000, author: 'Gold D Roger'},
  //   {bookId: 4, title: 'Math 4', description: 'Curse 4', price: 4000, author: 'Gold D Roger'}

  // ];

  bookSubject= new Subject<Books>();

  constructor(private http : HttpClient){

  }

  getBooks(){
    return this.listBooks.slice();
  }
  saveBook(book: Books){
    this.listBooks.push(book);
    this.bookSubject.next(book);
  }
}
