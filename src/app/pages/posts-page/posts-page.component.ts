import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Posts } from 'src/app/stores/posts.store';

@Component({
  selector: 'app-posts-page',
  templateUrl: './posts-page.component.html',
  styleUrls: ['./posts-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsPageComponent {
  constructor(public postsStore: Posts) {}
}
