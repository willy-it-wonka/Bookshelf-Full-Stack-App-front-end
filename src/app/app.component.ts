import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BookListComponent } from './book/book-list/book-list.component';
import { CreateBookComponent } from './book/create-book/create-book.component';
import { UpdateBookComponent } from './book/update-book/update-book.component';
import { BookNotesComponent } from './book/book-notes/book-notes.component';
//insted: import { HttpClientModule } from '@angular/common/http'; this: import provideHttpClient in config to avoid NullInjectorError
import { RouterModule } from '@angular/router'; //Essential for properly functioning of nav menu.
import { CommonModule } from '@angular/common';
import { UserService } from './user/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    BookListComponent,
    CreateBookComponent,
    RouterModule,
    UpdateBookComponent,
    BookNotesComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'bookshelf-angular';

  loggedInUsername!: string;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loggedInUsername = localStorage.getItem('loggedInUsername') || '';
  }

  logout() {
    this.userService.logout().subscribe((response: any) => {
      console.log(response);
      localStorage.removeItem('loggedInUsername');
    });
  }
}
