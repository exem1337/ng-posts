import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsPageComponent } from './pages/posts-page/posts-page.component';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { PostPageComponent } from './pages/post-page/post-page.component';

const routes: Routes = [
  {
    path: '',
    component: PostsPageComponent,
  },
  {
    path: 'create',
    component: CreatePostComponent
  },
  {
    path: 'posts/:id',
    component: PostPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
