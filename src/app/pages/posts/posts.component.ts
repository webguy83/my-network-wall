import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    if (!this.userService.user) {
      const user = localStorage.getItem('user');
      if (user) {
        this.userService.user = JSON.parse(user);
      } else {
        this.router.navigate(['/login']);
      }
    }
  }
}
