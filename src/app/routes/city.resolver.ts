import { HttpErrorResponse } from "@angular/common/http";
import { inject } from "@angular/core";
import { ResolveFn, Router } from "@angular/router";
import { Observable, catchError, of } from "rxjs";
import { SearchService } from "../services/search.service";
import { ICity } from "../types";

export const cityResolver: ResolveFn<
	Observable<{ errorStatus: number } | ICity>
> = (route, state): Observable<ICity | { errorStatus: number }> => {
	const id = route.paramMap.get("id") || "";
	const searchService = inject(SearchService);
	const router = inject(Router);
	return searchService.getCountry(+id).pipe(
		catchError(
			(error: HttpErrorResponse): Observable<{ errorStatus: number }> => {
				return of({ errorStatus: error.status });
			}
		)
	);
};
