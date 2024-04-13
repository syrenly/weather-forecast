import { TestBed } from "@angular/core/testing";
import { CanActivateFn } from "@angular/router";
import { weatherDetailsGuard } from "./weather-details.guard";

describe("weatherDetailsGuard", () => {
	const executeGuard: CanActivateFn = (...guardParameters) =>
		TestBed.runInInjectionContext(() =>
			weatherDetailsGuard(...guardParameters)
		);

	beforeEach(() => {
		TestBed.configureTestingModule({});
	});

	it("should be created", () => {
		expect(executeGuard).toBeTruthy();
	});
});
