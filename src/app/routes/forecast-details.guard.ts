import { inject } from "@angular/core";
import {
	ActivatedRouteSnapshot,
	CanActivateFn,
	GuardResult,
	MaybeAsync,
	Router,
	RouterStateSnapshot,
} from "@angular/router";
import { WEATHER_API_LICENSE } from "../consts";

export const forecastDetailsGuard: CanActivateFn = (
	route: ActivatedRouteSnapshot,
	state: RouterStateSnapshot
): MaybeAsync<GuardResult> => {
	const licenseToken = inject(WEATHER_API_LICENSE);
	const canProceed = !!licenseToken;
	if (!canProceed) {
		const router = inject(Router);
		router.navigate(["home"]);
	}
	return canProceed;
};
