import {
	AsyncPipe,
	DatePipe,
	DecimalPipe,
	NgOptimizedImage,
	TitleCasePipe,
} from "@angular/common";
import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { FlagPipe } from "../../pipes/flag.pipe";
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
		WeatherPipe,
	],
	templateUrl: "./current-weather.component.html",
	styleUrl: "./current-weather.component.scss",
})
export class CurrentWeatherComponent implements OnChanges {
	@Input() city: ICityWeather | undefined;
	mainWeather: IWeather | undefined;
	mainInfo: IMainInfo | undefined;

	ngOnChanges(changes: SimpleChanges): void {
		if (changes["city"]) {
			this.mainWeather =
				this.city?.weather && this.city.weather[0]
					? this.city.weather[0]
					: {
							description: "",
							icon: "",
							id: null,
							main: "",
					  };
			this.mainInfo = this.city?.main;
		}
	}
}
