import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPost } from 'src/app/interfaces/post';
import { FileUpload } from 'src/app/models/file-upload';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  selectedFiles: FileList | null = null;
  currentFileUpload: FileUpload | null = null;
  percentage = 0;
  text = '';
  posts: IPost[] = [];

  constructor(
    private userService: UserService,
    private router: Router,
    private fileUploadService: FileUploadService,
    private postService: PostService
  ) {
    this.fileUploadService.getImgURL$.subscribe({
      next: (imageURL) => {
        if (this.userService.user) {
          const post: IPost = {
            imageURL,
            text: this.text,
            username: this.userService.user.username,
            likes: [],
            comments: [],
          };
          this.posts.push(post);
          this.postService.savePost(post).subscribe({
            next: (res) => {
              console.log(res);
            },
          });
        }
      },
    });
  }

  ngOnInit(): void {
    if (!this.userService.user) {
      const user = localStorage.getItem('user');
      if (user) {
        this.userService.user = JSON.parse(user);
      } else {
        this.router.navigate(['/login']);
      }
    }
    this.postService.getPosts().subscribe((posts) => {
      this.posts = posts;
    });
  }
  onFileSelected(event: Event) {
    const files = (event.target as HTMLInputElement).files;

    if (files && files.length > 0) {
      this.selectedFiles = (event.target as HTMLInputElement).files;
    } else {
      this.selectedFiles = null;
    }
  }

  uploadImage() {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = null;

      if (file) {
        this.uploadToStorage(file);
      }
    }
  }

  onLikeClick(post: IPost) {
    if (this.userService.user) {
      if (this.hasPostBeenLiked(post)) {
        post.likes = post.likes.filter((user) => {
          return user.id !== this.userService.user!.id;
        });
      } else {
        post.likes.push(this.userService.user);
      }

      this.postService.likePost(post).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => console.log(err),
      });
    }
  }

  hasPostBeenLiked(post: IPost): boolean {
    const userId = this.userService.user!.id;
    const foundUser = post.likes.find((user) => user.id === userId);
    if (foundUser) {
      return true;
    }
    return false;
  }

  private uploadToStorage(file: File) {
    this.currentFileUpload = new FileUpload(file);
    this.fileUploadService
      .uploadFileToStorage(this.currentFileUpload)
      .subscribe({
        next: (pct) => {
          this.percentage = Math.round(pct ? pct : 0);
        },
        error: (error) => console.log(error),
      });
  }
}
