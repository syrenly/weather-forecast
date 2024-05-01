import { HttpErrorResponse } from "@angular/common/http";
import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, Router } from "@angular/router";
import { Observable, catchError, forkJoin, of } from "rxjs";
import { SearchService } from "../services/search.service";
import { ICityWeather } from "../types/city-types";
import { IFiveDaysForecast } from "../types/forecast-types";

export type CityResolverType =
	| { errorStatus: number }
	| { countryInfo: ICityWeather; forecastResult: IFiveDaysForecast };

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const cityResolver: ResolveFn<Observable<CityResolverType>> = (
	route: ActivatedRouteSnapshot
): Observable<CityResolverType> => {
	let id: number;
	try {
		id = +(route.paramMap.get("id") || "");
		if (!id) {
			throw Error("Id not found or not valid");
		}
	} catch (error) {
		return of({ errorStatus: 404 });
	}
	const searchService = inject(SearchService);
	const router = inject(Router);
	// get city from current navigation data
	const city: ICityWeather = router.getCurrentNavigation()?.extras?.state as ICityWeather;
	// if current navigation data contains the city, keep it, otherwise, retrieve it from server
	const cityObs = city?.id === id ? of(city) : searchService.getCityWeather(id);
	searchService.navigationStarted = true;
	return forkJoin({
		countryInfo: cityObs,
		// retrieve also the 5 days forecast
		forecastResult: searchService.getFiveDaysForecast(id),
	}).pipe(
		// manage show of errors in ForecastComponent
		catchError((error: HttpErrorResponse): Observable<{ errorStatus: number }> => of({ errorStatus: error.status }))
	);
};
