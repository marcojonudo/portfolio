import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {WelcomeComponent} from './components/welcome/welcome.component';
import {AboutComponent} from './components/about/about.component';
import {ProjectsComponent} from './components/projects/projects.component';
import {SectionSelectorComponent} from './components/section-selector/section-selector.component';
import {StyleEditorComponent} from './components/style-editor/style-editor.component';
import {SkillsComponent} from './components/skills/skills.component';
import { BlogPreviewComponent } from './components/blog-preview/blog-preview.component';
import { AppRoutingModule } from './app-routing.module';
import { BlogComponent } from './components/blog/blog.component';
import { HomeComponent } from './components/home/home.component';
import { PostCardComponent } from './components/post-card/post-card.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import {FormsModule} from '@angular/forms';
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
		PostCardComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		InfiniteScrollModule,
		FormsModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
