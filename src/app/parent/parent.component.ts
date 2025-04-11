import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ChildComponent } from '../child/child.component';

@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [ChildComponent,HttpClientModule],
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.css'
})
export class ParentComponent {
  Posts: any[] = [];

  constructor(private http: HttpClient) {
   
  }
  ngOnInit(): void {
    this.http.get('https://jsonplaceholder.typicode.com/posts')
      .subscribe((data: any) =>this.Posts = data.slice(0, 10));
        //  this.Posts = data);
      console.log(this.Posts,'list')
  }
}
