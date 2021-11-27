import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home/home.component';

const routes: Routes = [
	{ path: 'home', component: HomeComponent },
	{ path: 'blog', loadChildren: () => import('./components/blog/blog.module').then(m => m.BlogModule) },
	{ path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
