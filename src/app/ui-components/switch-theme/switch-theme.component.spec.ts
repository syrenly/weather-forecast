import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CURRENT_THEME, currentThemeFn } from "../../tokens";
import { SwitchThemeComponent } from "./switch-theme.component";

describe("SwitchThemeComponent", (): void => {
	let component: SwitchThemeComponent;
	let fixture: ComponentFixture<SwitchThemeComponent>;

	beforeEach(async (): Promise<void> => {
		await TestBed.configureTestingModule({
			imports: [SwitchThemeComponent],
			providers: [{ provide: CURRENT_THEME, useFactory: currentThemeFn }],
		}).compileComponents();

		fixture = TestBed.createComponent(SwitchThemeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", (): void => {
		expect(component).toBeTruthy();
	});
});
