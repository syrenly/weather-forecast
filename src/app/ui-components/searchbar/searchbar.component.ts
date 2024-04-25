import { AsyncPipe, NgClass, NgOptimizedImage } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { AfterViewInit, Component } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { MatTooltipModule } from "@angular/material/tooltip";
import { Router } from "@angular/router";
import { Observable, catchError, debounceTime, map, of, switchMap, tap } from "rxjs";
import { DEFAULT_DEBOUNCE_DELAY_MILLISECONDS, EMPTY_SEARCH_RESULT } from "../../consts";
import { FlagPipe } from "../../pipes/flag.pipe";
import { WeatherPipe } from "../../pipes/weather.pipe";
import { SearchService } from "../../services/search.service";
import { Theme } from "../../tokens";
import { ICitySearchResult, ICityWeather } from "../../types/city-types";

type SearchStatus = "loading" | 400 | 401 | 429 | 404 | "serverError" | "completed" | "pristine";
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

	constructor(
		private readonly searchService: SearchService,
		private readonly router: Router
	) {}

	ngAfterViewInit(): void {
		this.options$ = this.autocompleteControl.valueChanges.pipe(
			debounceTime(DEFAULT_DEBOUNCE_DELAY_MILLISECONDS),
			map((value: string | null): string => (typeof value !== "string" ? "" : value)),
			tap((): void => {
				this.searchStatus = "loading";
			}),
			switchMap(
				(value: string): Observable<ICitySearchResult> =>
					value.length >= 3 ? this.searchService.searchCountry(value) : of(EMPTY_SEARCH_RESULT)
			),
			// manage errors
			catchError((error: HttpErrorResponse): Observable<ICitySearchResult> => {
				if (error.status === 400 || error.status === 401 || error.status === 429) {
					this.searchStatus = error.status;
				} else {
					this.searchStatus = "serverError";
				}
				return of(EMPTY_SEARCH_RESULT);
			}),
			// take only the inner list
			switchMap((value: ICitySearchResult): Observable<ICityWeather[]> => of(value.list)),
			tap((): void => {
				if (this.searchStatus === "loading") {
					this.searchStatus = "completed";
				}
			})
		);
	}

	displayFn = (value: ICityWeather): string => {
		const { name, sys } = value;
		return value ? `${name}, ${sys?.country || "N.A"}` : "";
	};

	itemSelected(event: MatAutocompleteSelectedEvent): void {
		const selectedValue: ICityWeather = event?.option?.value;
		if (selectedValue) {
			this.router.navigateByUrl(`/forecast/${selectedValue.id}`, {
				state: selectedValue,
			});
		}
	}
}
