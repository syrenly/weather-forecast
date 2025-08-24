/* eslint-disable @typescript-eslint/no-unused-vars */
import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, GuardResult, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, of, switchMap } from "rxjs";
import { WEATHER_API_KEY } from "../tokens";

export const forecastDetailsGuard: CanActivateFn = (
	_: ActivatedRouteSnapshot,
	__: RouterStateSnapshot
): Observable<GuardResult> => {
	const licenseTokenSubj = inject(WEATHER_API_KEY);
	return licenseTokenSubj.pipe(
		switchMap(key => {
			const canProceed = !!key;
			if (!canProceed) {
				const router = inject(Router);
				router.navigate(["home"]);
			}
			return of(canProceed);
		})
	);
};
