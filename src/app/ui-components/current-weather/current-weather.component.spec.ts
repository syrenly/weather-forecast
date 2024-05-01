import { AsyncPipe, DatePipe, DecimalPipe, NgOptimizedImage, TitleCasePipe } from "@angular/common";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { FlagPipe } from "../../pipes/flag.pipe";
import { WeatherPipe } from "../../pipes/weather.pipe";
import { city } from "../../unit-test-utils/utils.mock";
import { CurrentWeatherComponent } from "./current-weather.component";

describe("CurrentWeatherComponent", (): void => {
	let component: CurrentWeatherComponent;
	let fixture: ComponentFixture<CurrentWeatherComponent>;

	beforeEach(async (): Promise<void> => {
		await TestBed.configureTestingModule({
			imports: [
				CurrentWeatherComponent,
				AsyncPipe,
				DatePipe,
				DecimalPipe,
				FlagPipe,
				MatIconModule,
				MatCardModule,
				NgOptimizedImage,
				MatTooltipModule,
				TitleCasePipe,
				WeatherPipe,
			],
		}).compileComponents();

		fixture = TestBed.createComponent(CurrentWeatherComponent);
		component = fixture.componentInstance;
		component.city = city;
		fixture.detectChanges();
	});

	it("should create", (): void => {
		expect(component).toBeTruthy();
	});
	it("should test #groupBy", (): void => {
		component.ngOnChanges({
			city: {
				currentValue: city,
				previousValue: null,
				isFirstChange: (): boolean => false,
				firstChange: false,
			},
		});
		expect(component.mainWeather).toEqual(city.weather[0]);
		expect(component.mainInfo).toEqual(city.main);
	});
});
