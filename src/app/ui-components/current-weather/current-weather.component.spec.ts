import { DatePipe, DecimalPipe, NgOptimizedImage, TitleCasePipe } from "@angular/common";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { ToCardinalPointPipe } from "../../pipes/to-cardinal-point.pipe";
import { WeatherPipe } from "../../pipes/weather.pipe";
import { mockCity } from "../../unit-test-utils/utils.mock";
import { CurrentWeatherComponent } from "./current-weather.component";

describe("CurrentWeatherComponent", (): void => {
	let component: CurrentWeatherComponent;
	let fixture: ComponentFixture<CurrentWeatherComponent>;

	beforeEach(async (): Promise<void> => {
		await TestBed.configureTestingModule({
			imports: [
				CurrentWeatherComponent,
				DatePipe,
				DecimalPipe,
				MatIconModule,
				MatCardModule,
				NgOptimizedImage,
				MatTooltipModule,
				TitleCasePipe,
				ToCardinalPointPipe,
				WeatherPipe,
			],
		}).compileComponents();

		fixture = TestBed.createComponent(CurrentWeatherComponent);
		component = fixture.componentInstance;
		fixture.componentRef.setInput("city", mockCity);
		fixture.detectChanges();
	});

	it("should create", (): void => {
		expect(component).toBeTruthy();
	});
	it("should set values of mainWeather and mainInfo when city changes", (): void => {
		expect(component.mainWeather()).toEqual(mockCity.weather[0]);
		expect(component.mainInfo()).toEqual(mockCity.main);
		expect(component.canShowCurrentWeather).toBeTrue();
	});
	it("should not set values of mainWeather and mainInfo when city is null", (): void => {
		fixture.componentRef.setInput("city", null);
		fixture.detectChanges();
		expect(component.mainWeather()).toBeUndefined();
		expect(component.mainInfo()).toBeUndefined();
		expect(component.canShowCurrentWeather).toBeFalse();
	});
});
