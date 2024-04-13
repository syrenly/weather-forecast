import { AsyncPipe, NgFor, NgIf, NgOptimizedImage } from "@angular/common";
import {
	AfterViewInit,
	Component,
	ElementRef,
	Inject,
	ViewChild,
} from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import {
	MatAutocompleteModule,
	MatAutocompleteSelectedEvent,
	MatAutocompleteTrigger,
} from "@angular/material/autocomplete";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatTooltipModule } from "@angular/material/tooltip";
import { Router } from "@angular/router";
import { Observable, catchError, debounceTime, map, of, switchMap } from "rxjs";
import {
	DEFAULT_DEBOUNCE_DELAY_MILLISECONDS,
	EMPTY_SEARCH_RESULT,
} from "../../consts";
import { FlagPipe } from "../../pipes/flag.pipe";
import { WeatherPipe } from "../../pipes/weather.pipe";
import { CityService } from "../../services/city.service";
import { SearchService } from "../../services/search.service";
import { WEATHER_API_LICENSE } from "../../tokens";
import { ICitySearchResult, IWeatherCity } from "../../types";

@Component({
	selector: "app-searchbar",
	standalone: true,
	imports: [
		AsyncPipe,
		MatAutocompleteModule,
		MatFormFieldModule,
		MatIconModule,
		MatInputModule,
		MatTooltipModule,
		ReactiveFormsModule,
		NgIf,
		NgFor,
		NgOptimizedImage,
		FlagPipe,
		WeatherPipe,
	],
	templateUrl: "./searchbar.component.html",
	styleUrl: "./searchbar.component.scss",
})
export class SearchbarComponent implements AfterViewInit {
	autocompleteControl = new FormControl<string>("");
	options$!: Observable<IWeatherCity[]>;
	@ViewChild("filterInput", { static: false })
	filterInput!: ElementRef<HTMLInputElement>;
	@ViewChild("autoTrigger", { static: false })
	autoTrigger!: MatAutocompleteTrigger;
	hasLicense = false;
	constructor(
		@Inject(WEATHER_API_LICENSE) private readonly licenseApi: string,
		private readonly searchService: SearchService,
		private readonly cityService: CityService,
		private readonly router: Router
	) {}

	ngAfterViewInit(): void {
		this.hasLicense = !!this.licenseApi;
		if (!this.hasLicense) {
			this.autocompleteControl.disable();
			// TODO add message of warning
			return;
		}
		this.options$ = this.autocompleteControl.valueChanges.pipe(
			debounceTime(DEFAULT_DEBOUNCE_DELAY_MILLISECONDS),
			map((value: string | null): string =>
				typeof value !== "string" ? "" : value
			),
			switchMap(
				(value: string): Observable<ICitySearchResult> =>
					value.length >= 3
						? this.searchService.searchCountry(value)
						: of(EMPTY_SEARCH_RESULT)
			),
			// TODO error handling
			catchError(
				(): Observable<ICitySearchResult> => of(EMPTY_SEARCH_RESULT)
			),
			switchMap(
				(value: ICitySearchResult): Observable<IWeatherCity[]> =>
					of(value.list)
			)
		);
	}

	displayFn = (value: IWeatherCity): string => {
		const { name, sys } = value;
		// todo more strict
		return value ? `${name}, ${sys?.country || "N.A"}` : "";
	};

	itemSelected(event: MatAutocompleteSelectedEvent): void {
		const selectedValue = event?.option?.value;
		if (selectedValue) {
			this.cityService.city = selectedValue;
			this.router.navigate(["forecast"]);
		}
	}
}
