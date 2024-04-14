import { HttpErrorResponse } from "@angular/common/http";
import { inject } from "@angular/core";
import { ResolveFn, Router } from "@angular/router";
import { Observable, catchError, of } from "rxjs";
import { SearchService } from "../services/search.service";
import { ICity } from "../types";

export const cityResolver: ResolveFn<
	Observable<{ errorStatus: number } | ICity>
> = (route, state): Observable<ICity | { errorStatus: number }> => {
	let id: number;
	try {
		id = +(route.paramMap.get("id") || "");
	} catch (error) {
		return of({ errorStatus: 404 });
	}
	const searchService = inject(SearchService);
	const router = inject(Router);
	const city: ICity = router.getCurrentNavigation()?.extras?.state as ICity;
	if (city && city.id === id) {
		return of(city);
	}
	return searchService.getCountry(id).pipe(
		catchError(
			(error: HttpErrorResponse): Observable<{ errorStatus: number }> => {
				return of({ errorStatus: error.status });
			}
		)
	);
};
