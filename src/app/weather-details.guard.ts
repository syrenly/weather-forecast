import { inject } from "@angular/core";
import {
	ActivatedRouteSnapshot,
	CanActivateFn,
	GuardResult,
	MaybeAsync,
	Router,
	RouterStateSnapshot,
} from "@angular/router";
import { CityService } from "./city.service";

export const weatherDetailsGuard: CanActivateFn = (
	route: ActivatedRouteSnapshot,
	state: RouterStateSnapshot
): MaybeAsync<GuardResult> => {
	const cityService = inject(CityService);
	const hasCity = !!cityService.city;
	if (!hasCity) {
		const router = inject(Router);
		router.navigate(["home"]);
	}
	return hasCity;
};
