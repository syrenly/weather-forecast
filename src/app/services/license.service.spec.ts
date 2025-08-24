import { TestBed } from "@angular/core/testing";
import { MatSnackBar } from "@angular/material/snack-bar";
import { DUMMY_API_KEY } from "../consts";
import { provideMockDUMMYWeatherApiKey, provideMockWeatherApiKey } from "./../unit-test-utils/token.mock";
import { LicenseService } from "./license.service";

describe("LicenseService", () => {
	let service: LicenseService;
	let snackBar: MatSnackBar;
	let snackBarSpy: jasmine.Spy;

	describe("case use dummy api", () => {
		beforeEach(() => {
			TestBed.configureTestingModule({
				providers: [LicenseService, provideMockDUMMYWeatherApiKey()],
			});
			service = TestBed.inject(LicenseService);
			snackBar = TestBed.inject(MatSnackBar);
			snackBarSpy = spyOn(snackBar, "open");
			service["licenseKeySubj"].next(DUMMY_API_KEY);
		});

		it("should be created", () => {
			expect(service).toBeTruthy();
		});
		it("should test #useMockData", () => {
			expect(service.useMockData).toBeTrue();
		});
		it("should display a snackbar message when DUMMY_API_KEY is used", () => {
			expect(snackBarSpy).toHaveBeenCalledWith(
				"Using dummy API key; please visit https://openweathermap.org to get a real one",
				"Dismiss",
				{
					horizontalPosition: "center",
					verticalPosition: "top",
				}
			);
		});

		// it("should log a message when a new API key is set", () => {
		// 	const consoleSpy = spyOn(console, "info");
		// 	mockWeatherApiKey$.next("real-api-key");
		// 	expect(consoleSpy).toHaveBeenCalledWith("API key found for https://openweathermap.org");
		// });

		it("should unsubscribe from WEATHER_API_KEY on destroy", () => {
			const subscriptionSpy = spyOn(service["subscription"], "unsubscribe");
			service.ngOnDestroy();
			expect(subscriptionSpy).toHaveBeenCalled();
		});
	});
	describe("case use real api", () => {
		beforeEach(() => {
			TestBed.configureTestingModule({
				providers: [LicenseService, provideMockWeatherApiKey()],
			});
			service = TestBed.inject(LicenseService);
			snackBar = TestBed.inject(MatSnackBar);
			snackBarSpy = spyOn(snackBar, "open");
			service["licenseKeySubj"].next("KEY");
		});

		it("should be created", () => {
			expect(service).toBeTruthy();
		});
		it("should test #useMockData", () => {
			expect(service.useMockData).toBeFalse();
		});
		it("should not display a snackbar message", () => {
			expect(snackBarSpy).not.toHaveBeenCalled();
		});
	});
});
