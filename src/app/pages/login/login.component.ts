import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import { FormHelpers } from 'src/app/utils/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private sb: MatSnackBar
  ) {}

  ngOnInit(): void {}

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  formHelpers = new FormHelpers(this.loginForm);

  login() {
    this.userService.getUser(this.loginForm.value.email).subscribe({
      next: (res) => {
        if (res.length === 0) {
          this.sb.open('Account does not exist sadly.', 'OK');
        } else if (res[0].password === this.loginForm.value.password) {
          console.log('Matched!');
          this.sb.open('Matched!', 'OK');
        } else {
          console.log('Incorrect Password!');
          this.sb.open('Incorrect Password!', 'OK');
        }
      },
      error: (err) => console.log(err),
    });
  }
}
