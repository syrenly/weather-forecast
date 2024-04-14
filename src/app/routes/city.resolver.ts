import { HttpErrorResponse } from "@angular/common/http";
import { inject } from "@angular/core";
import { ResolveFn, Router } from "@angular/router";
import { Observable, catchError, forkJoin, of } from "rxjs";
import { ICity } from "../city-types";
import { IFiveDaysForecast } from "../forecast-types";
import { SearchService } from "../services/search.service";

export type CityResolverType =
	| { errorStatus: number }
	| { countryInfo: ICity; forecastResult: IFiveDaysForecast };

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
	const city: ICity = router.getCurrentNavigation()?.extras?.state as ICity;
	const cityObs =
		city && city.id === id ? of(city) : searchService.getCountry(id);
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
