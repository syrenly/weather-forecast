import { Pipe, PipeTransform } from "@angular/core";
import { SearchService } from "../services/search.service";

@Pipe({
	name: "flag",
	standalone: true,
})
export class FlagPipe implements PipeTransform {
	constructor(private readonly searchService: SearchService) {}

	transform(value: string | undefined): string {
		return this.searchService.getCountryFlagUrl(value || "");
	}
}
