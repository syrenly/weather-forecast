import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { getSearchMockProvider } from "../unit-test-utils/search.service.mock";
import { provideMockTheme } from "../unit-test-utils/token.mock";
import { HomeComponent } from "./home.component";

describe("HomeComponent", (): void => {
	let component: HomeComponent;
	let fixture: ComponentFixture<HomeComponent>;

	beforeEach(async (): Promise<void> => {
		await TestBed.configureTestingModule({
			imports: [HomeComponent, NoopAnimationsModule],
			providers: [provideMockTheme(), getSearchMockProvider()],
		}).compileComponents();

		fixture = TestBed.createComponent(HomeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", (): void => {
		expect(component).toBeTruthy();
	});

	it("should set OpenWeather logo", (): void => {
		const nativeElement = fixture.debugElement.nativeElement;
		const img: HTMLImageElement = nativeElement.querySelector("a.attribution img");
		expect(img.src).toContain("/assets/OpenWeatherLogo.png");
		const a: DebugElement = fixture.debugElement.query(By.css("a.attribution"));
		expect(a.nativeNode.href).toBe("https://openweathermap.org/");
	});
});
