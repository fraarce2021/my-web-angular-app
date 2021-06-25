import { Subject } from "rxjs";

export class BooksService{
  booksSubject = new Subject();
  private books = ['One Piece','Tokey Revenge','Paisen'];

  getBooks(){
    return [...this.books];
  }
  addBooks(bookName:string){
    this.books.push(bookName);
    this.booksSubject.next();
  }
  deleteBooks(bookName:string){
    this.books = this.books.filter(book=>book!==bookName);
    this.booksSubject.next();
  }
}
