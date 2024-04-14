import { Pipe, PipeTransform } from "@angular/core";
/**
 * Retrieve the right url for the image of the weather conditions using a specific code
 */
@Pipe({
	name: "weather",
	standalone: true,
})
export class WeatherPipe implements PipeTransform {
	transform(weatherIconCode: string | undefined): string {
		if (!weatherIconCode) {
			return "";
		}
		return `http://openweathermap.org/img/w/${weatherIconCode}.png`;
	}
}
