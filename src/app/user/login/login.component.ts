import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatSnackBarModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private matSnackBar: MatSnackBar
  ) {}

  onSubmit() {
    this.signIn();
  }

  signIn() {
    let data = {
      email: this.email,
      password: this.password,
    };

    this.userService.login(data).subscribe((response: any) => {
      console.log(response);
      if (response.status === true) {
        localStorage.setItem('jwt', response.message); // Save JWT in local storage.
        this.goToBookshelf();
      } else {
        this.matSnackBar.open(response.message, 'Close', {
          duration: 5000,
        });
      }
    });
  }

  goToBookshelf() {
    this.router.navigate(['/bookshelf']).then(() => {
      window.location.reload(); // Essential to change the guest navbar to the user navbar.
    });
  }
}
