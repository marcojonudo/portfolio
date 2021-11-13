import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './components/home/welcome/welcome.component';
import { AboutComponent } from './components/home/about/about.component';
import { ProjectsComponent } from './components/home/projects/projects.component';
import { StyleEditorComponent } from './components/style-editor/style-editor.component';
import { SkillsComponent } from './components/home/skills/skills.component';
import { BlogPreviewComponent } from './components/home/blog-preview/blog-preview.component';
import { AppRoutingModule } from './app-routing.module';
import { BlogComponent } from './components/blog/blog/blog.component';
import { HomeComponent } from './components/home/home/home.component';
import { PostCardComponent } from './components/blog/post-card/post-card.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FormsModule } from '@angular/forms';
import { PostComponent } from './components/blog/post/post.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TitlePipe } from './pipes/title.pipe';
import { NormalNavComponent } from './components/nav/normal-nav/normal-nav.component';
import { DraggableDirective } from './directives/draggable.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { MarkdownModule } from 'ngx-markdown';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@NgModule({
	declarations: [
		AppComponent,
		WelcomeComponent,
		AboutComponent,
		ProjectsComponent,
		StyleEditorComponent,
		SkillsComponent,
		BlogPreviewComponent,
		BlogComponent,
		HomeComponent,
		PostCardComponent,
		PostComponent,
		TitlePipe,
		NormalNavComponent,
		DraggableDirective
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		InfiniteScrollModule,
		FormsModule,
		HttpClientModule,
		MarkdownModule.forRoot({ loader: HttpClient }),
		BrowserAnimationsModule,
		AngularFireModule.initializeApp(environment.firebaseConfig),
		RouterModule,
		CommonModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
