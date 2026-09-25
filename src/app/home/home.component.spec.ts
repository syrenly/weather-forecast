import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { Router } from "@angular/router";
import { provideMockLicenseService } from "../unit-test-utils/license.service.mock";
import { provideMockSearchService } from "../unit-test-utils/search.service.mock";
import { provideMockLiveAnnouncer } from "../unit-test-utils/third-party.service.mock";
import { provideMockTheme } from "../unit-test-utils/token.mock";
import { mockCity } from "../unit-test-utils/utils.mock";
import { RecentCitiesService } from "./../services/recent-cities.service";
import HomeComponent from "./home.component";

describe("HomeComponent", (): void => {
	let component: HomeComponent;
	let router: Router;
	let fixture: ComponentFixture<HomeComponent>;
	let recentCitiesService: RecentCitiesService;

	beforeEach(async (): Promise<void> => {
		await TestBed.configureTestingModule({
			imports: [HomeComponent, NoopAnimationsModule],
			providers: [
				provideMockTheme(),
				provideMockSearchService(),
				provideMockLicenseService(),
				provideMockLiveAnnouncer(),
				Router,
			],
		}).compileComponents();

		fixture = TestBed.createComponent(HomeComponent);
		component = fixture.componentInstance;
		router = TestBed.inject(Router);
		recentCitiesService = TestBed.inject(RecentCitiesService);
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
		const recordSpy = spyOn(recentCitiesService, "recordCity").and.callThrough();
		component.navigateToCity(mockCity);
		expect(recordSpy).toHaveBeenCalledWith({ id: mockCity.id, name: mockCity.name });
		expect(routerSpy).toHaveBeenCalledWith(`/forecast/${mockCity.id}`, {
			state: mockCity,
		});
	});
	it("should navigate to selected city and record it as recent when a button is clicked", (): void => {
		const routerSpy = spyOn(router, "navigate");
		const recordSpy = spyOn(recentCitiesService, "recordCity").and.callThrough();
		component.navigateByCityId({ id: mockCity.id, name: mockCity.name });
		expect(recordSpy).toHaveBeenCalledWith({ id: mockCity.id, name: mockCity.name });
		expect(routerSpy).toHaveBeenCalledWith(["forecast", mockCity.id]);
	});
	it("should populate cities array", (): void => {
		expect(component.cities.length).not.toBe(0);
	});
});
