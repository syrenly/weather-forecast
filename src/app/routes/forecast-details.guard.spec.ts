import { TestBed } from "@angular/core/testing";
import { CanActivateFn } from "@angular/router";
import { forecastDetailsGuard } from "./forecast-details.guard";

describe("forecastDetailsGuard", () => {
	const executeGuard: CanActivateFn = (...guardParameters) =>
		TestBed.runInInjectionContext(() =>
			forecastDetailsGuard(...guardParameters)
		);

	beforeEach(() => {
		TestBed.configureTestingModule({});
	});

	it("should be created", () => {
		expect(executeGuard).toBeTruthy();
	});
});
