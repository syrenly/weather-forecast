import { AsyncPipe, DatePipe, DecimalPipe, NgOptimizedImage, TitleCasePipe } from "@angular/common";
import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { FlagPipe } from "../../pipes/flag.pipe";
import { ToCardinalPointPipe } from "../../pipes/to-cardinal-point.pipe";
import { WeatherPipe } from "../../pipes/weather.pipe";
import { ICityWeather, IMainInfo } from "../../types/city-types";
import { IWeather } from "../../types/types";
/**
 * CurrentWeatherComponent shows the current weather conditions (pressure, temperature, max/min temperature, clouds, etc)
 */
@Component({
	selector: "app-current-weather",
	standalone: true,
	imports: [
		AsyncPipe,
		DatePipe,
		DecimalPipe,
		FlagPipe,
		MatIconModule,
		MatCardModule,
		NgOptimizedImage,
		MatTooltipModule,
		TitleCasePipe,
		ToCardinalPointPipe,
		WeatherPipe,
	],
	templateUrl: "./current-weather.component.html",
	styleUrl: "./current-weather.component.scss",
})
export class CurrentWeatherComponent implements OnChanges {
	@Input() city: ICityWeather | undefined;
	// main weather description
	mainWeather: IWeather | undefined;
	// main info about temperature and humidity
	mainInfo: IMainInfo | undefined;

	ngOnChanges(changes: SimpleChanges): void {
		if (changes["city"]) {
			this.setInfo(changes["city"]?.currentValue);
		}
	}
	/** Set the properties mainWeather and mainInfo */
	private setInfo(city: ICityWeather | undefined): void {
		this.mainWeather = city?.weather?.[0]
			? city.weather[0]
			: {
					description: "",
					icon: "",
					id: 0,
					main: "",
				};
		this.mainInfo = city?.main;
	}
}
