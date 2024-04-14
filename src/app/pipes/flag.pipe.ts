import { Pipe, PipeTransform } from "@angular/core";
/**
 * Retrieve the right url for the image of the flag using the code of the country (lowercase)
 */
@Pipe({
	name: "flag",
	standalone: true,
})
export class FlagPipe implements PipeTransform {
	transform(country: string | undefined): string {
		if (!country) {
			return "";
		}
		const lowerCaseCountry = country.toLowerCase();
		return `http://openweathermap.org/images/flags/${lowerCaseCountry}.png`;
	}
}
