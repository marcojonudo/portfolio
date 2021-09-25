export class Constants {

	public static readonly WELCOME_ITEM_MARGIN: number = 1.5;
	public static readonly SECTIONS: number = 4;
	public static readonly NAV_HEIGHT_REM: number = 3.5;
	public static readonly TOC_PATH: string = 'assets/posts/toc.json';
	public static readonly MOBILE_STICK_NAV_THRESHOLD: number = 200;

	public static readonly USER: any = {
		NORMAL: 'NORMAL',
		DEV: 'DEV'
	};

	public static readonly SECTION: any = {
		WELCOME: 'welcome',
		ABOUT: 'about',
		SKILLS: 'skills',
		BLOG: 'blog'
	};

	public static readonly PROJECT: any = {
		FALLAPP: 'FALLAPP',
		ZOWIAPP: 'ZOWIAPP',
		PANEL: 'PANEL',
		SCHEDULES: 'SCHEDULES'
	};

	public static readonly EVENT: any = {
		SCROLL: 'scroll',
		POINTER_DOWN: 'pointerdown',
		POINTER_MOVE: 'pointermove',
		POINTER_UP: 'pointerup'
	};

	public static readonly NAVBAR_INFO: any = {
		USER: 'USER',
		SECTION: 'SECTION',
		STICK: 'STICK',
		TRANSLATE: 'TRANSLATE',
		INFO: 'INFO'
	};

	public static readonly URL: any = {
		HOME: '/home',
		BLOG: '/blog'
	};

	public static ELEMENT: any = {
		DOCUMENT: 'document'
	};

}
