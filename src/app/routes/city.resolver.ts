import { HttpErrorResponse } from "@angular/common/http";
import { inject } from "@angular/core";
import { ResolveFn, Router } from "@angular/router";
import { Observable, catchError, forkJoin, of } from "rxjs";
import { SearchService } from "../services/search.service";
import { ICityWeather } from "../types/city-types";
import { IFiveDaysForecast } from "../types/forecast-types";

export type CityResolverType =
	| { errorStatus: number }
	| { countryInfo: ICityWeather; forecastResult: IFiveDaysForecast };

export const cityResolver: ResolveFn<Observable<CityResolverType>> = (
	route,
	state
): Observable<CityResolverType> => {
	let id: number;
	try {
		id = +(route.paramMap.get("id") || "");
	} catch (error) {
		return of({ errorStatus: 404 });
	}
	const searchService = inject(SearchService);
	const router = inject(Router);
	const city: ICityWeather = router.getCurrentNavigation()?.extras
		?.state as ICityWeather;
	const cityObs =
		city && city.id === id ? of(city) : searchService.getCityWeather(id);
	return forkJoin({
		countryInfo: cityObs,
		forecastResult: searchService.getFiveDaysForecast(id),
	}).pipe(
		catchError(
			(error: HttpErrorResponse): Observable<{ errorStatus: number }> => {
				return of({ errorStatus: error.status });
			}
		)
	);
};
