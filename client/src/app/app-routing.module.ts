import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home/home.component';

const routes: Routes = [
	{
		path: '',
		data: {
			title: 'Marco - Freelance software developer',
			description: 'I\'m Marco, an experienced full stack developer who provides professional and top quality software development services!'
		},
		component: HomeComponent
	},
	{ path: '**', pathMatch: 'full', redirectTo: '' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes, {
		initialNavigation: 'enabledBlocking'
	})],
	exports: [RouterModule]
})
export class AppRoutingModule {}
