import { TestBed } from "@angular/core/testing";
import { CanActivateFn, GuardResult, MaybeAsync } from "@angular/router";
import { forecastDetailsGuard } from "./forecast-details.guard";

describe("forecastDetailsGuard", (): void => {
	const executeGuard: CanActivateFn = (...guardParameters): MaybeAsync<GuardResult> =>
		TestBed.runInInjectionContext((): MaybeAsync<GuardResult> => forecastDetailsGuard(...guardParameters));

	beforeEach((): void => {
		TestBed.configureTestingModule({});
	});

	it("should be created", (): void => {
		expect(executeGuard).toBeTruthy();
	});
});
