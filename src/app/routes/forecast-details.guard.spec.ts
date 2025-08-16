import { TestBed, fakeAsync, tick } from "@angular/core/testing";
import {
	ActivatedRouteSnapshot,
	CanActivateFn,
	GuardResult,
	MaybeAsync,
	Router,
	RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { provideMockEMPTYWeatherApiKey, provideMockWeatherApiKey } from "../unit-test-utils/token.mock";
import { forecastDetailsGuard } from "./forecast-details.guard";

describe("forecastDetailsGuard - case positive", (): void => {
	const executeGuard: CanActivateFn = (...guardParameters): MaybeAsync<GuardResult> =>
		TestBed.runInInjectionContext((): MaybeAsync<GuardResult> => forecastDetailsGuard(...guardParameters));

	beforeEach((): void => {
		TestBed.configureTestingModule({
			providers: [provideMockWeatherApiKey(), Router],
		});
	});

	it("should be created", (): void => {
		expect(executeGuard).toBeTruthy();
	});
	it("should let proceed", fakeAsync((): void => {
		(executeGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot) as Observable<GuardResult>).subscribe(
			value => {
				expect(value).toBeTrue();
			}
		);
		tick();
	}));
});

describe("forecastDetailsGuard - case negative", (): void => {
	let router: Router;
	const executeGuard: CanActivateFn = (...guardParameters): MaybeAsync<GuardResult> =>
		TestBed.runInInjectionContext((): MaybeAsync<GuardResult> => forecastDetailsGuard(...guardParameters));

	beforeEach((): void => {
		TestBed.configureTestingModule({
			providers: [provideMockEMPTYWeatherApiKey(), Router],
		});
		router = TestBed.inject(Router);
	});

	it("should be created", (): void => {
		expect(executeGuard).toBeTruthy();
	});
	it("should not let proceed", fakeAsync((): void => {
		const routerSpy = spyOn(router, "navigate");
		TestBed.runInInjectionContext(() => {
			(
				executeGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot) as Observable<GuardResult>
			).subscribe(value => {
				expect(value).toBeFalse();
				expect(routerSpy).toHaveBeenCalledWith(["home"]);
			});
			tick();
		});
	}));
});
