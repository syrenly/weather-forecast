import { inject } from "@angular/core";
import {
	ActivatedRouteSnapshot,
	CanActivateFn,
	GuardResult,
	MaybeAsync,
	Router,
	RouterStateSnapshot,
} from "@angular/router";
import { WEATHER_API_LICENSE } from "../tokens";

export const forecastDetailsGuard: CanActivateFn = (
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	route: ActivatedRouteSnapshot,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
