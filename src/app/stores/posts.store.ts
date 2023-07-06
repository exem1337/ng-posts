import { Injectable } from "@angular/core";
import { autorun, makeObservable, toJS } from "mobx";
import { action, observable } from "mobx-angular";
import { NgToastService } from "ng-angular-popup";
import { IComment, IPost } from "src/models/posts.model";

@Injectable({
  providedIn: 'root'
})
export class Posts {
  posts: Array<IPost> = [];

  constructor(private toast: NgToastService) {
    makeObservable(this, {
      posts: observable,
      addPost: action,
      removePost: action,
      addComment: action,
      removeComment: action,
      getPost: action
    })
    this.localStorageSync();
  }

  addPost(post: IPost) {
    this.posts.push(post);
  }

  getPost(key: number) {
    return this.posts.find(post => post.key === key);
  }

  removePost(key: number) {
    console.log(key)
    this.posts = this.posts.filter(post => post.key !== key);
    this.toast.success({
      detail: 'Успешно',
      summary: 'Пост удален!',
      sticky: true,
      duration: 5000,
    })
  }

  addComment(postKey: number, comment: IComment) {
    const foundPost = this.posts.find(post => post.key === postKey);
    if (!foundPost) {
      return;
    }

    foundPost.comments?.push(comment);
  }

  removeComment(postKey: number, commentKey: number) {
    const foundPost = this.posts.find(post => post.key === postKey);
    if (!foundPost) {
      return;
    }

    foundPost.comments = foundPost.comments?.filter(comment => comment.key !== commentKey);
    this.toast.success({
      detail: 'Успешно',
      summary: 'Комментарий удален!',
      sticky: true,
      duration: 5000,
    })
  }

  private localStorageSync() {
    this.posts = JSON.parse(localStorage['posts'] || '[]');

    autorun(() => {
      localStorage['posts'] = JSON.stringify(toJS(this.posts));
    });
  }
}