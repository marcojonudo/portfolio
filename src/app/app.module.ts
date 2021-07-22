import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {WelcomeComponent} from './components/home/welcome/welcome.component';
import {AboutComponent} from './components/home/about/about.component';
import {ProjectsComponent} from './components/home/projects/projects.component';
import {SectionSelectorComponent} from './components/section-selector/section-selector.component';
import {StyleEditorComponent} from './components/style-editor/style-editor.component';
import {SkillsComponent} from './components/home/skills/skills.component';
import { BlogPreviewComponent } from './components/home/blog-preview/blog-preview.component';
import { AppRoutingModule } from './app-routing.module';
import { BlogComponent } from './components/blog/blog/blog.component';
import { HomeComponent } from './components/home/home/home.component';
import { PostCardComponent } from './components/blog/post-card/post-card.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FormsModule } from '@angular/forms';
import { PostComponent } from './components/blog/post/post.component';
import {MarkdownModule} from 'ngx-markdown';
import {HttpClient, HttpClientModule} from '@angular/common/http';

@NgModule({
	declarations: [
		AppComponent,
		WelcomeComponent,
		AboutComponent,
		ProjectsComponent,
		SectionSelectorComponent,
		StyleEditorComponent,
		SkillsComponent,
		BlogPreviewComponent,
		BlogComponent,
		HomeComponent,
		PostCardComponent,
		PostComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		InfiniteScrollModule,
		FormsModule,
		HttpClientModule,
		MarkdownModule.forRoot({ loader: HttpClient }),
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
