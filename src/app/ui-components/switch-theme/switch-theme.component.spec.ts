import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CURRENT_THEME, currentTheme } from "../../tokens";
import { SwitchThemeComponent } from "./switch-theme.component";

fdescribe("SwitchThemeComponent", () => {
	let component: SwitchThemeComponent;
	let fixture: ComponentFixture<SwitchThemeComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [SwitchThemeComponent],
			providers: [{ provide: CURRENT_THEME, useFactory: currentTheme }],
		}).compileComponents();

		fixture = TestBed.createComponent(SwitchThemeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
