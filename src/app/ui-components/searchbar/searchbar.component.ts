import { AsyncPipe, NgOptimizedImage } from "@angular/common";
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
import { ICitySearchResult, ICityWeather } from "../../types/city-types";

type SearchStatus = "loading" | 400 | 401 | 429 | 404 | "serverError" | "completed" | "pristine";
const DEFAULT_HINT = "";
/**
 * Search for the city to know which weather conditions there are. It will navigate to the ForecastComponent to show details.
 */
@Component({
	selector: "app-searchbar",
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
	],
	templateUrl: "./searchbar.component.html",
	styleUrl: "./searchbar.component.scss",
})
export class SearchbarComponent implements AfterViewInit {
	// reference to the autocomplete form control
	autocompleteControl = new FormControl<string>("");
	// async list of cities with their current weather
	options$!: Observable<ICityWeather[]>;
	// status of the search; it is used to show info about what's happening during/after the search.
	searchStatus: SearchStatus = "pristine";
	// the icon at the end of the autocomplete; it is used to show info about what's happening during/after the search.
	autocompleteSuffix: { icon: string; tooltip: string } | undefined;
	// the message under the autocomplete; it is used to show info about what's happening during/after the search.
	autocompleteHint: string = DEFAULT_HINT;
	// emits the selected city
	itemSelected = output<ICityWeather>();

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
	/**
	 * Helper function used by the autocomplete to define how to show the selected item inside the input
	 * @param value the selected value
	 * @returns a string with a significative description
	 */
	displayFn = (value: ICityWeather | null): string => {
		if (!value) {
			return "";
		}
		const { name, sys } = value;
		return `${name || "Unknown"}, ${sys?.country || "Unknown"}`;
	};
	/**
	 * Select an item from the autocomplete
	 * @param selectedValue an object containing oth info about the selected city and its weather
	 */
	onItemSelected(selectedValue: ICityWeather): void {
		this.itemSelected.emit(selectedValue);
		// reset value in input
		this.autocompleteControl.setValue(null);
	}
	/** Set the current status of the autocomplete to show messages if needed: errors, loading, etc */
	setStatus(status: SearchStatus): void {
		this.searchStatus = status;
		this.autocompleteSuffix = this.setAutocompleteSuffix();
		this.autocompleteHint = this.setAutocompleteHint();
	}
	/** Set the autocomplete suffix (an icon with tooltip) to give information about what's happening with the search:
	 * If there's an error it will show a specific icon with a message; if the request was successful no action is done.
	 */
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
	/**
	 * Set the autocomplete hint to show a message based on what is happening with the search: error, loading or the default message that suggests how to make a search.
	 */
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
