import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { LoginComponent } from './security/login/login.component';
import { RegisterComponent } from './security/register/register.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ToolbarComponent } from './navigation/toolbar/toolbar.component';
import { ListMenuComponent } from './navigation/list-menu/list-menu.component';
import { SecurityService } from './security/security.service';
import { BooksComponent } from './books/books.component';
import { BookNewComponent } from './books/book-new.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { AuthorsComponent } from './authors/authors.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ToolbarComponent,
    ListMenuComponent,
    BooksComponent,
    BookNewComponent,
    AuthorsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule
  ],
  providers: [SecurityService, {provide: MAT_DATE_LOCALE, useValue: 'es-ES'}],
  bootstrap: [AppComponent],
  entryComponents: [BookNewComponent]
})
export class AppModule { }
