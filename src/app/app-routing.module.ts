import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BlogComponent} from './components/blog/blog.component';
import {HomeComponent} from './components/home/home.component';


const routes: Routes = [
	{ path: 'home', component: HomeComponent },
	{ path: 'blog', component: BlogComponent },
	{ path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
