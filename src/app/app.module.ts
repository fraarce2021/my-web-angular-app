import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user.component';
import { FormsModule } from '@angular/forms';
import { BooksComponent } from './books/books.component';
import { BookComponent } from './book/book.component';
import { BooksService } from './services/books.service';
import { HomeComponent } from './home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { LoginComponent } from './security/login/login.component';
import { RegisterComponent } from './security/register/register.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ToolbarComponent } from './navigation/toolbar/toolbar.component';
import { ListMenuComponent } from './navigation/list-menu/list-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    BooksComponent,
    BookComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ToolbarComponent,
    ListMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  providers: [BooksService],
  bootstrap: [AppComponent]
})
export class AppModule { }
