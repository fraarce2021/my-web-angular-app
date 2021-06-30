import { AfterViewInit, Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { BooksService } from './books.service';
import { Books } from './books.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BookNewComponent } from './book-new.component';
import { Subscription } from 'rxjs';
import { PaginationBooks } from './pagination-books.model';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit, AfterViewInit,OnDestroy {
  timeout: any = null;
  bookData : Books[] = [];
  loadColumns= ["title", "description", "author", "price"];
  dataSource= new MatTableDataSource<Books>();
  @ViewChild(MatSort) orderBooks : MatSort;
  @ViewChild(MatPaginator) pagination : MatPaginator;

  private bookSuscription: Subscription;

  totalBook = 0;
  booksPerPage = 2;
  pageFilterSize = [1,2,5,10];
  actualPage = 1;
  sort = 'title';
  sortDirection = 'asc';
  filterValue:any = null;


  constructor(private booksService: BooksService, private dialog :MatDialog) { }

  eventPaginator(event: PageEvent): void{
    this.booksPerPage = event.pageSize;
    this.actualPage = event.pageIndex + 1;
    this.booksService.getBooks(this.booksPerPage,this.actualPage,this.sort,this.sortDirection, this.filterValue);
  }

  orderColumn(event: Sort): void{
    this.sort = event.active;
    this.sortDirection = event.direction;
    this.booksService.getBooks(this.booksPerPage,this.actualPage,event.active,event.direction, this.filterValue);

  }

  doFilter(event: any): void{
    clearTimeout(this.timeout);
    var $this = this;

    this.timeout = setTimeout(() => {

      if(event.keyCode !== 13){

        const filterValueLocal = {
          propertie: 'title',
          value: event.target.value
        };

        $this.filterValue = filterValueLocal;

        $this.booksService.getBooks(this.booksPerPage,this.actualPage,this.sort,this.sortDirection, filterValueLocal);

      }

    }, 1000);
  }

  openDialog(): void{
    const dialogRef = this.dialog.open(BookNewComponent, {
      width: "550px"
    });

    dialogRef.afterClosed()
    .subscribe(()=>{
      this.booksService.getBooks(this.booksPerPage,this.actualPage,this.sort,this.sortDirection, this.filterValue);
    });
  }

  ngOnInit(): void {
    this.booksService.getBooks(this.booksPerPage,this.actualPage,this.sort,this.sortDirection, this.filterValue);
    this.booksService.getListenerBooks().
    subscribe((pagination: PaginationBooks)=>{
      this.dataSource = new MatTableDataSource<Books>(pagination.data);
      this.totalBook = pagination.totalRows;
    });
  }

  ngAfterViewInit(): void{
    this.dataSource.sort = this.orderBooks;
    this.dataSource.paginator = this.pagination;
  }

  ngOnDestroy(): void{
    this.bookSuscription.unsubscribe();
  }

}
