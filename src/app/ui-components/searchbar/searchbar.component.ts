import { AsyncPipe, NgClass, NgOptimizedImage } from "@angular/common";
import {
	AfterViewInit,
	Component,
	DestroyRef,
	ElementRef,
	Inject,
	ViewChild,
} from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
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
import {
	BehaviorSubject,
	Observable,
	catchError,
	debounceTime,
	map,
	of,
	switchMap,
} from "rxjs";
import {
	DEFAULT_DEBOUNCE_DELAY_MILLISECONDS,
	EMPTY_SEARCH_RESULT,
} from "../../consts";
import { FlagPipe } from "../../pipes/flag.pipe";
import { WeatherPipe } from "../../pipes/weather.pipe";
import { SearchService } from "../../services/search.service";
import { CURRENT_THEME, Theme, WEATHER_API_LICENSE } from "../../tokens";
import { ICitySearchResult, ICityWeather } from "../../types/city-types";

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
	@ViewChild("filterInput", { static: false })
	filterInput!: ElementRef<HTMLInputElement>;
	@ViewChild("autoTrigger", { static: false })
	autoTrigger!: MatAutocompleteTrigger;
	hasLicense = false;
	currentTheme: Theme;
	constructor(
		@Inject(WEATHER_API_LICENSE) private readonly licenseApi: string,
		@Inject(CURRENT_THEME)
		private readonly themeSubject: BehaviorSubject<Theme>,
		private readonly searchService: SearchService,
		private readonly router: Router,
		private readonly destroyRef: DestroyRef
	) {}

	ngAfterViewInit(): void {
		this.hasLicense = !!this.licenseApi;
		if (!this.hasLicense) {
			this.autocompleteControl.disable();
			// TODO add message of warning
			return;
		}
		this.themeSubject
			.asObservable()
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe((currentTheme) => {
				this.currentTheme = currentTheme;
			});
		this.options$ = this.autocompleteControl.valueChanges.pipe(
			takeUntilDestroyed(this.destroyRef),
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
				(value: ICitySearchResult): Observable<ICityWeather[]> =>
					of(value.list)
			)
		);
	}

	displayFn = (value: ICityWeather): string => {
		const { name, sys } = value;
		// todo more strict
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
