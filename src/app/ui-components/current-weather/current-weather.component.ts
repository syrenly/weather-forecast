import { DatePipe, DecimalPipe, NgOptimizedImage, TitleCasePipe } from "@angular/common";
import { Component, InputSignal, Signal, computed, effect, input } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { ToCardinalPointPipe } from "../../pipes/to-cardinal-point.pipe";
import { WeatherPipe } from "../../pipes/weather.pipe";
import { ICityWeather, IMainInfo } from "../../types/city-types";
import { IWeather } from "../../types/types";

/**
 * CurrentWeatherComponent shows the current weather conditions (pressure, temperature, max/min temperature, clouds, etc)
 */
@Component({
    selector: "app-current-weather",
    imports: [
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
    templateUrl: "./current-weather.component.html",
    styleUrl: "./current-weather.component.scss"
})
export class CurrentWeatherComponent {
	// REQUIRED: current city, sent in input from the parent component
	city: InputSignal<ICityWeather> = input.required<ICityWeather>();
	// main weather description
	mainWeather: Signal<IWeather> = computed((): IWeather => this.city()?.weather?.[0]);
	// main info about temperature and humidity
	mainInfo: Signal<IMainInfo> = computed((): IMainInfo => this.city()?.main);
	// true if there are enough data to be shown
	canShowCurrentWeather = false;
	constructor() {
		// calculate if the content of the component can be shown
		effect((): void => {
			this.canShowCurrentWeather = !!this.city() && !!this.mainInfo() && !!this.mainWeather();
		});
	}
}
