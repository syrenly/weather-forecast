import { inject } from "@angular/core";
import {
	ActivatedRouteSnapshot,
	CanActivateFn,
	GuardResult,
	MaybeAsync,
	Router,
	RouterStateSnapshot,
} from "@angular/router";
import { CityService } from "../services/city.service";
import { WEATHER_API_LICENSE } from "../tokens";

export const forecastDetailsGuard: CanActivateFn = (
	route: ActivatedRouteSnapshot,
	state: RouterStateSnapshot
): MaybeAsync<GuardResult> => {
	const cityService = inject(CityService);
	const licenseToken = inject(WEATHER_API_LICENSE);
	const canProceed = !!cityService.city && !!licenseToken;
	if (!canProceed) {
		const router = inject(Router);
		router.navigate(["home"]);
	}
	return canProceed;
};
