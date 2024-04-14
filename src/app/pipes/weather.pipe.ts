import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
	name: "weather",
	standalone: true,
})
export class WeatherPipe implements PipeTransform {
	transform(icon: string | undefined): string {
		return `http://openweathermap.org/img/w/${icon}.png`;
	}
}
