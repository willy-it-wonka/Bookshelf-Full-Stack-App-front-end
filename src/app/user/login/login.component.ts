import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.email);
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
        this.userService.username.next(response.message);  // Saves the user's nick when logging in.
        this.router.navigate(['/bookshelf']);
      } 
      else if (response.message == 'User not found.')
        alert('Incorrect email.');
      else if (response.message == 'Incorrect password.')
        alert('Incorrect password.');
    });
  }
}
