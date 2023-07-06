import { Injectable } from "@angular/core";
import { autorun, makeObservable, toJS } from "mobx";
import { action, observable } from "mobx-angular";
import { NgToastService } from "ng-angular-popup";
import { IAuthor } from "src/models/posts.model";

@Injectable({
  providedIn: 'root'
})
export class Authors {
  authors: Array<IAuthor> = [];

  constructor(private toast: NgToastService) {
    makeObservable(this, {
      authors: observable,
      addAuthor: action,
    })
    this.localStorageSync();
  }

  addAuthor(author: IAuthor) {
    const foundAuthor = this.authors
      .find(auth => auth.lastName === author.lastName && author.name === auth.name);

    if (foundAuthor) {
      this.toast.error({
        detail: 'Ошибка',
        summary: 'Такой автор уже существует!',
        sticky: true,
        duration: 5000,
      })
      return;
    }

    this.authors.push(author);
  }

  private localStorageSync() {
    this.authors = JSON.parse(localStorage['authors'] || '[]');

    autorun(() => {
      localStorage['authors'] = JSON.stringify(toJS(this.authors));
    });
  }
}