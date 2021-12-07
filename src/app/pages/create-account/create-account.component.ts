import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { FormHelpers } from 'src/app/utils/forms';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css'],
})
export class CreateAccountComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  createAccountForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    username: ['', [Validators.required, Validators.maxLength(10)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  formHelpers = new FormHelpers(this.createAccountForm);

  buildUser() {
    this.userService.buildUser(this.createAccountForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.userService.user = res;
        this.router.navigate(['/posts']);
      },
      error: (err) => console.log(err),
    });
  }
}
