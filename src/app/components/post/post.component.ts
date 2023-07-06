import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Posts } from 'src/app/stores/posts.store';
import { IPost } from 'src/models/posts.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {
  @Input() post: IPost = {} as IPost;

  constructor(
    private postsStore: Posts,
    private router: Router
  ) {}

  onPostDelete(event: Event) {
    console.log('ondelete')
    event.stopPropagation();
    console.log(this.post)
    this.postsStore.removePost(this.post.key);
  }

  onGoToPost() {
    this.router.navigate([`/posts/${this.post.key}`])
  }
}
