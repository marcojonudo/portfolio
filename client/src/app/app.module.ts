import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './components/home/welcome/welcome.component';
import { AboutComponent } from './components/home/about/about.component';
import { ProjectsComponent } from './components/home/projects/projects.component';
import { StyleEditorComponent } from './components/style-editor/style-editor.component';
import { SkillsComponent } from './components/home/skills/skills.component';
import { BlogPreviewComponent } from './components/home/blog-preview/blog-preview.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TitlePipe } from './pipes/title.pipe';
import { NavComponent } from './components/nav/nav.component';
import { DraggableDirective } from './directives/draggable.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';
import { MatIconModule } from '@angular/material/icon';
import { DateSortPipe } from './pipes/date-sort.pipe';
import { SplashScreenComponent } from './components/splash-screen/splash-screen.component';
import { RouterModule } from '@angular/router';
import { PostCardComponent } from './components/post-card/post-card.component';

@NgModule({
	declarations: [
		AppComponent,
		WelcomeComponent,
		AboutComponent,
		ProjectsComponent,
		StyleEditorComponent,
		SkillsComponent,
		BlogPreviewComponent,
		HomeComponent,
		TitlePipe,
		NavComponent,
		DraggableDirective,
		DateSortPipe,
		SplashScreenComponent,
		PostCardComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		HttpClientModule,
		BrowserAnimationsModule,
		RouterModule,
		CommonModule,
		ReactiveFormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		MatIconModule
	],
	providers: [
		provideClientHydration()
	],
	bootstrap: [AppComponent]
})
export class AppModule {

	constructor() {
		dayjs.extend(utc);
		dayjs.extend(timezone);
	}

}
