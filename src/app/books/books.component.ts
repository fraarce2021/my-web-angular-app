import { AfterViewInit, Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { BooksService } from './books.service';
import { Books } from './books.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BookNewComponent } from './book-new.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit, AfterViewInit,OnDestroy {
  bookData : Books[] = [];
  loadColumns= ["title", "description", "author", "price"];
  dataSource= new MatTableDataSource<Books>();
  @ViewChild(MatSort) orderBooks : MatSort;
  stringFilter : string;
  @ViewChild(MatPaginator) pagination : MatPaginator;

  private bookSuscription: Subscription;

  constructor(private booksService: BooksService, private dialog :MatDialog) { }

  doFilter(filter: any){
    this.stringFilter = (<HTMLTextAreaElement>filter).value;
    this.dataSource.filter = this.stringFilter;
  }

  openDialog(){
    this.dialog.open(BookNewComponent, {
      width: "350px"
    });
  }

  ngOnInit(): void {
    this.dataSource.data = this.booksService.getBooks();
    this.bookSuscription = this.booksService.bookSubject.subscribe(()=>{
      this.dataSource.data = this.booksService.getBooks();
    });
  }
  ngAfterViewInit(){
    this.dataSource.sort = this.orderBooks;
    this.dataSource.paginator = this.pagination;
  }

  ngOnDestroy(){
    this.bookSuscription.unsubscribe();
  }
}
