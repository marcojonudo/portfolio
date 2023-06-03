import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { WindowService } from './services/window/window.service';
import { ServerWindowService } from './services/window/server-window.service';
import { ElementService } from './services/element/element.service';
import { ServerElementService } from './services/element/server-element.service';

@NgModule({
	imports: [
		AppModule,
		ServerModule,
	],
	bootstrap: [AppComponent],
	providers: [
		{
			provide: WindowService,
			useClass: ServerWindowService,
		},
		{
			provide: ElementService,
			useClass: ServerElementService,
		}
	]
})
export class AppServerModule {}
