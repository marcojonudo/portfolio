import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {WelcomeComponent} from './components/welcome/welcome.component';
import {AboutComponent} from './components/about/about.component';
import {ProjectsComponent} from './components/projects/projects.component';
import {SectionSelectorComponent} from './components/section-selector/section-selector.component';
import {StyleEditorComponent} from './components/style-editor/style-editor.component';
import {SkillsComponent} from './components/skills/skills.component';
import {NgxPageScrollModule} from 'ngx-page-scroll';
import {NgxPageScrollCoreModule} from 'ngx-page-scroll-core';
import {RouterModule} from '@angular/router';

@NgModule({
    declarations: [
        AppComponent,
        WelcomeComponent,
        AboutComponent,
        ProjectsComponent,
        SectionSelectorComponent,
        StyleEditorComponent,
        SkillsComponent
    ],
    imports: [
        BrowserModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
