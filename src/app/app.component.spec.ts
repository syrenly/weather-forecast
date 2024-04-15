import { ComponentFixture, TestBed } from "@angular/core/testing";
import { provideAnimations } from "@angular/platform-browser/animations";
import { AppComponent } from "./app.component";
import { CURRENT_THEME, currentTheme } from "./tokens";

describe("AppComponent", () => {
	let fixture: ComponentFixture<AppComponent>;
	let component: AppComponent;
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AppComponent],
			providers: [
				provideAnimations(),
				{ provide: CURRENT_THEME, useFactory: currentTheme, deps: [] },
			],
		}).compileComponents();
		fixture = TestBed.createComponent(AppComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create the app", () => {
		expect(component).toBeTruthy();
	});
});
