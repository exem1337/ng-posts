import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Authors } from 'src/app/stores/authors.store';
import { Posts } from 'src/app/stores/posts.store';
import { IAuthor, IPost } from 'src/models/posts.model';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {
  post: IPost = {} as IPost;
  private id: number = 0;
  comment = new FormControl('', Validators.required);
  author = new FormControl({} as IAuthor, Validators.required);

  constructor(
    private postStore: Posts,
    private route: ActivatedRoute,
    public authorStore: Authors,
  ) {
    this.route.params.subscribe(res => this.id = +res['id'])
    this.author.patchValue(this.authorStore.authors?.[0]);
  }

  ngOnInit(): void {
    this.post = this.postStore.getPost(this.id) || {} as IPost;
  }

  onAddComment() {
    this.postStore.addComment(this.post.key, {
      text: this.comment.value!,
      author: this.author.value!,
      key: Math.random(),
      date: Date.now().toString()
    })
    this.comment.reset();
  }

  onCommentDelete(key: number) {
    console.log('remove')
    this.postStore.removeComment(this.post.key, key)
  }
}
