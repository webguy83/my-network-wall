import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPost } from '../interfaces/post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  savePost(post: IPost) {
    return this.http.post('http://localhost:3000/posts', post);
  }

  getPosts() {
    return this.http.get<IPost[]>('http://localhost:3000/posts');
  }

  likePost(post: IPost) {
    return this.http.put(`http://localhost:3000/posts/${post.id}`, post);
  }
}
