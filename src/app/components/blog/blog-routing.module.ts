import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BlogComponent} from './blog/blog.component';
import {PostComponent} from './post/post.component';


const routes: Routes = [
	{ path: '', component: BlogComponent },
	{ path: ':id', component: PostComponent }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class BlogRoutingModule {}
