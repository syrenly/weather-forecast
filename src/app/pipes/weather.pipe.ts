import { Pipe, PipeTransform } from "@angular/core";
import { SearchService } from "../services/search.service";

@Pipe({
	name: "weather",
	standalone: true,
})
export class WeatherPipe implements PipeTransform {
	constructor(private readonly searchService: SearchService) {}

	transform(value: string | undefined): string {
		return this.searchService.getIconUrl(value || "");
	}
}
