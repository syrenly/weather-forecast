import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
	name: "flag",
	standalone: true,
})
export class FlagPipe implements PipeTransform {
	transform(country: string | undefined): string {
		const lowerCaseCountry = country.toLowerCase();
		return `http://openweathermap.org/images/flags/${lowerCaseCountry}.png`;
	}
}
