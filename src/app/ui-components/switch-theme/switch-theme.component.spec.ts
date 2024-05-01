import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatButtonToggle } from "@angular/material/button-toggle";
import { provideMockTheme } from "../../unit-test-utils/token.mock";
import { SwitchThemeComponent } from "./switch-theme.component";

describe("SwitchThemeComponent", (): void => {
	let component: SwitchThemeComponent;
	let fixture: ComponentFixture<SwitchThemeComponent>;

	beforeEach(async (): Promise<void> => {
		await TestBed.configureTestingModule({
			imports: [SwitchThemeComponent],
			providers: [provideMockTheme()],
		}).compileComponents();

		fixture = TestBed.createComponent(SwitchThemeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", (): void => {
		expect(component).toBeTruthy();
	});
	it("should check the current theme", (): void => {
		expect(component.currentTheme).toBe("dark");
	});
	it("should change the current theme", (): void => {
		const subjectSpy = spyOn(component["themeSubject"], "next");
		component.onSwitchChanged({ source: {} as MatButtonToggle, value: "light" });
		expect(component.currentTheme).toBe("light");
		expect(subjectSpy).toHaveBeenCalledWith("light");
	});
});
