import { NgModule, LOCALE_ID  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MobxAngularModule } from 'mobx-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostComponent } from './components/post/post.component';
import { PostsPageComponent } from './pages/posts-page/posts-page.component';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { HeaderComponent } from './components/header/header.component';
import { NgToastModule } from 'ng-angular-popup'
import { ReactiveFormsModule } from '@angular/forms';
import { LucideAngularModule, X } from 'lucide-angular';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { PostPageComponent } from './pages/post-page/post-page.component';

registerLocaleData(localeRu);
@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    PostsPageComponent,
    CreatePostComponent,
    HeaderComponent,
    PostPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MobxAngularModule,
    NgToastModule,
    ReactiveFormsModule,
    LucideAngularModule.pick({X})
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'ru' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
