import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { Router } from "@angular/router";
import { provideMockSearchService } from "../unit-test-utils/search.service.mock";
import { provideMockTheme } from "../unit-test-utils/token.mock";
import { mockCity } from "../unit-test-utils/utils.mock";
import HomeComponent from "./home.component";

describe("HomeComponent", (): void => {
	let component: HomeComponent;
	let router: Router;
	let fixture: ComponentFixture<HomeComponent>;

	beforeEach(async (): Promise<void> => {
		await TestBed.configureTestingModule({
			imports: [HomeComponent, NoopAnimationsModule],
			providers: [provideMockTheme(), provideMockSearchService(), Router],
		}).compileComponents();

		fixture = TestBed.createComponent(HomeComponent);
		component = fixture.componentInstance;
		router = TestBed.inject(Router);
		fixture.detectChanges();
	});

	it("should create", (): void => {
		expect(component).toBeTruthy();
	});
	it("should set OpenWeather logo", (): void => {
		const nativeElement = fixture.debugElement.nativeElement;
		const img: HTMLImageElement = nativeElement.querySelector("a.attribution img");
		expect(img.src).toContain("/assets/images/OpenWeatherLogo.png");
		const a: DebugElement = fixture.debugElement.query(By.css("a.attribution"));
		expect(a.nativeNode.href).toBe("https://openweathermap.org/");
	});
	it("should navigate to selected city adding data to navigation", (): void => {
		const routerSpy = spyOn(router, "navigateByUrl");
		component.navigateToCity(mockCity);
		expect(routerSpy).toHaveBeenCalledWith(`/forecast/${mockCity.id}`, {
			state: mockCity,
		});
	});
	it("should navigate to selected city", (): void => {
		const routerSpy = spyOn(router, "navigate");
		component.navigateByCityId(mockCity.id);
		expect(routerSpy).toHaveBeenCalledWith(["forecast", mockCity.id]);
	});
	it("should populate cities array", (): void => {
		expect(component.cities.length).not.toBe(0);
	});
});
