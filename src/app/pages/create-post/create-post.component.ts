import { Component } from '@angular/core';
import { FormBuilder, FormControl, ValidationErrors, Validators } from '@angular/forms';
import { Authors } from 'src/app/stores/authors.store';
import { Posts } from 'src/app/stores/posts.store';
import { IAuthor } from 'src/models/posts.model';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent {
  constructor(
    private fb: FormBuilder,
    public authorStore: Authors,
    private postsStore: Posts
  ) {
    this.postForm.patchValue({
      author: this.authorStore.authors[0] || {} as IAuthor
    })
  }

  postForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    image: [''],
    author: [{} as IAuthor, Validators.required]
  })

  authorForm = this.fb.group({
    name: ['', Validators.required],
    lastName: ['', Validators.required]
  })

  onImageDelete() {
    this.postForm.patchValue({
      image: ''
    })
  }
    
  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) {
      return;
    }

    const file = input.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.addEventListener('load', () => {
      this.postForm.patchValue({
        image: reader.result as string
      })
    }) 
  }

  onAddAuthor() {
    const newAuthor = {
      key: Math.random(),
      name: this.authorForm.get('name')?.value!,
      lastName: this.authorForm.get('lastName')?.value!,
    }
    const hasError = this.authorStore.addAuthor(newAuthor)
    this.authorForm.reset();

    if (hasError) {
      return;
    }

    this.postForm.patchValue({
      author: newAuthor
    })
    
  }

  onPostCreate() {
    this.postsStore.addPost({
      key: Math.random(),
      title: this.postForm.get('title')?.value!,
      description: this.postForm.get('description')?.value!,
      image: this.postForm.get('image')?.value!,  
      author: this.postForm.get('author')?.value!,
      date: Date.now().toString(),
      comments: []
    })
    this.postForm.reset();
  }
}
