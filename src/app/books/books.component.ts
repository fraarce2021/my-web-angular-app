import { Component } from "@angular/core";

@Component({
  selector: 'app-books',
  templateUrl: 'books.component.html'
})

export class BooksComponent{
  books = ['One Piece', 'Tokyo Revenge', 'Libro 3'];
}
