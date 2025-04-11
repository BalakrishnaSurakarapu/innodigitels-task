import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchDirective } from '../search.directive';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [CommonModule, FormsModule,SearchDirective,ReactiveFormsModule],
  templateUrl: './child.component.html',
  styleUrl: './child.component.css'
})
export class ChildComponent {
  @Input() posts: any[] = [];
  selectedPost: any = null;
  editForm: FormGroup;
  searchTerm: string = '';
  constructor(private http: HttpClient,private fb:FormBuilder){
    this.editForm = this.fb.group({
      title: [''],
      body: [''],
    });
  }
  onEdit(post: any): void {
    this.selectedPost = post;

    this.editForm.patchValue({
      id:post.id,
      title: post.title,
      body: post.body,
    });
  }
  onSubmit(): void {
    if (this.selectedPost) {
      const updatedPost = { ...this.selectedPost, ...this.editForm.value };

      this.http
        .put(`https://jsonplaceholder.typicode.com/posts/${this.selectedPost.id}`, updatedPost)
        .subscribe((response) => {
          console.log('Updated Post:', response);

          const index = this.posts.findIndex((post) => post.id === this.selectedPost.id);
          if (index !== -1) {
            this.posts[index] = updatedPost;
          }

          this.selectedPost = null;
          this.editForm.reset();
        });
    }
  }

  onDelete(id: number): void {
    this.http.delete(`https://jsonplaceholder.typicode.com/posts/${id}`).subscribe(() => {
      this.posts = this.posts.filter((post) => post.id !== id);
    });
  }

}
