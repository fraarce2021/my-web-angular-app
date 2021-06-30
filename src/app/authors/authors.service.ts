import { Injectable } from "@angular/core";
import { Author } from './authors.model';
import { environment } from './../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService{
  baseUrl = environment.baseUrl;
  private authorsList : Author[] | undefined;
  // private authorsList: Author[] = [];
  private authorSubject = new Subject<Author[]>();

  constructor(private http: HttpClient){}

  getAuthors(){
    this.http.get<Author[]>(this.baseUrl+'api/Author')
    .subscribe( ( data : any ) =>  {
      this.authorsList = data.data;
      this.authorSubject.next([...this.authorsList]);
    });
  }

  getAuthorsIssue(): Observable<Author[]> {
    // return null
    // this.http.get<Author[]>(this.baseUrl+'api/Author')
    // console.log(data)
    return this.http.get<Author[]>(this.baseUrl+'api/Author');
  }

  getAuthorListener(){
    // this.getAuthorsIssue();
    return this.authorSubject.asObservable();
  }

}
