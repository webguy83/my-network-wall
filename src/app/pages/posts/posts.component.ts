import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileUpload } from 'src/app/models/file-upload';
import { FileUploadService } from 'src/app/services/file-upload.service';
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

  constructor(
    private userService: UserService,
    private router: Router,
    private fileUploadService: FileUploadService
  ) {}

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
  }
}
