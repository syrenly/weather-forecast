import { ComponentFixture, TestBed } from "@angular/core/testing";
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
});
