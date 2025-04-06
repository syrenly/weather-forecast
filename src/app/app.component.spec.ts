import { ComponentFixture, TestBed } from "@angular/core/testing";
import { provideAnimations } from "@angular/platform-browser/animations";
import { RouterOutlet } from "@angular/router";
import { AppComponent } from "./app.component";
import { provideMockTheme } from "./unit-test-utils/token.mock";

describe("AppComponent", (): void => {
	let fixture: ComponentFixture<AppComponent>;
	let component: AppComponent;

	beforeEach(async (): Promise<void> => {
		await TestBed.configureTestingModule({
			imports: [AppComponent],
			providers: [provideAnimations(), provideMockTheme()],
		}).compileComponents();
		fixture = TestBed.createComponent(AppComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create the app", (): void => {
		expect(component).toBeTruthy();
	});

	it("should set the light-theme class", (): void => {
		component["applyTheme"]("light");
		fixture.detectChanges();
		const doc = fixture.nativeElement.ownerDocument;
		const bodyElement = doc.querySelector("body");
		expect(bodyElement.classList.contains("light-theme")).toBeTrue();
		expect(bodyElement.classList.contains("dark-theme")).toBeFalse();
	});

	it("should set the dark-theme class", (): void => {
		component["applyTheme"]("dark");
		fixture.detectChanges();
		const doc = fixture.nativeElement.ownerDocument;
		const bodyElement = doc.querySelector("body");
		expect(bodyElement.classList.contains("dark-theme")).toBeTrue();
		expect(bodyElement.classList.contains("light-theme")).toBeFalse();
	});

	it("should return the default animation state when no animationState is provided", (): void => {
		const mockOutlet = {
			activatedRouteData: {},
		} as RouterOutlet;
		const animationState = component.getRouteTransition(mockOutlet);
		expect(animationState).toBe("static");
	});

	it("should return the provided animation state", (): void => {
		const mockOutlet = {
			activatedRouteData: { animationState: "fade" },
		} as unknown as RouterOutlet;
		const animationState = component.getRouteTransition(mockOutlet);
		expect(animationState).toBe("fade");
	});
});
