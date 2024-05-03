import { AsyncPipe, NgClass, NgOptimizedImage } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { AfterViewInit, Component, output } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { MatTooltipModule } from "@angular/material/tooltip";
import { Observable, catchError, debounceTime, map, of, switchMap, tap } from "rxjs";
import { DEFAULT_DEBOUNCE_DELAY_MILLISECONDS, EMPTY_SEARCH_RESULT } from "../../consts";
import { FlagPipe } from "../../pipes/flag.pipe";
import { WeatherPipe } from "../../pipes/weather.pipe";
import { SearchService } from "../../services/search.service";
import { Theme } from "../../tokens";
import { ICitySearchResult, ICityWeather } from "../../types/city-types";

type SearchStatus = "loading" | 400 | 401 | 429 | 404 | "serverError" | "completed" | "pristine";
const DEFAULT_HINT = "The city name, better if followed by comma and 2-letter country code";
/**
 * Search for the city to know which weather conditions there are. It will navigate to the ForecastComponent to show details.
 */
@Component({
	selector: "app-searchbar",
	standalone: true,
	imports: [
		AsyncPipe,
		MatAutocompleteModule,
		MatFormFieldModule,
		MatIconModule,
		MatInputModule,
		MatProgressSpinner,
		MatTooltipModule,
		ReactiveFormsModule,
		NgOptimizedImage,
		FlagPipe,
		WeatherPipe,
		NgClass,
	],
	templateUrl: "./searchbar.component.html",
	styleUrl: "./searchbar.component.scss",
})
export class SearchbarComponent implements AfterViewInit {
	autocompleteControl = new FormControl<string>("");
	options$!: Observable<ICityWeather[]>;

	currentTheme!: Theme;
	searchStatus: SearchStatus = "pristine";

	itemSelected = output<ICityWeather>();

	autocompleteSuffix: { icon: string; tooltip: string } | undefined;
	autocompleteHint: string = DEFAULT_HINT;

	constructor(private readonly searchService: SearchService) {}

	ngAfterViewInit(): void {
		this.options$ = this.autocompleteControl.valueChanges.pipe(
			debounceTime(DEFAULT_DEBOUNCE_DELAY_MILLISECONDS),
			map((value: string | null): string => (value === null ? "" : value)),
			tap((): void => this.setStatus("loading")),
			// make search server side
			switchMap(
				(value: string): Observable<ICitySearchResult> =>
					value.length >= 3 ? this.searchService.searchCity(value) : of(EMPTY_SEARCH_RESULT)
			),
			// manage errors
			catchError((error: HttpErrorResponse): Observable<ICitySearchResult> => {
				const hasKnownErrorStatus = error.status === 400 || error.status === 401 || error.status === 429;
				this.setStatus(hasKnownErrorStatus ? error.status : "serverError");
				return of(EMPTY_SEARCH_RESULT);
			}),
			// take only the inner list
			switchMap((value: ICitySearchResult): Observable<ICityWeather[]> => of(value.list)),
			tap((): void => {
				if (this.searchStatus === "loading") {
					this.setStatus("completed");
				}
			})
		);
	}

	displayFn = (value: ICityWeather | null): string => {
		if (!value) {
			return "";
		}
		const { name, sys } = value;
		return `${name || "Unknown"}, ${sys?.country || "Unknown"}`;
	};

	onItemSelected(selectedValue: ICityWeather): void {
		this.itemSelected.emit(selectedValue);
		// reset value in input
		this.autocompleteControl.setValue(null);
	}

	setStatus(status: SearchStatus): void {
		this.searchStatus = status;
		this.autocompleteSuffix = this.setAutocompleteSuffix();
		this.autocompleteHint = this.setAutocompleteHint();
	}

	setAutocompleteSuffix(): { icon: string; tooltip: string } | undefined {
		switch (this.searchStatus) {
			case 400:
				return {
					icon: "error_outline",
					tooltip: "Request invalid",
				};
			case 401:
				return {
					icon: "policy",
					tooltip: "Not authorized",
				};
			case 429:
				return {
					icon: "event_repeat",
					tooltip: "Too many requests. Retry later.",
				};
			case "serverError":
				return {
					icon: "error_outline",
					tooltip: "An internal error occurred",
				};
			default:
				return undefined;
		}
	}

	setAutocompleteHint(): string {
		switch (this.searchStatus) {
			case 400:
				return "The request has a wrong signature, retry";
			case 401:
				return "The license is not valid, expired or missing";
			case 429:
				return "Too many requests. Wait some time or extend your license";
			case "serverError":
				return "An internal error occurred";
			case "loading":
				return "Searching...";
			default:
				return DEFAULT_HINT;
		}
	}
}
