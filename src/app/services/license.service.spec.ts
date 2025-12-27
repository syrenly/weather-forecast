import { TestBed } from "@angular/core/testing";
import { DUMMY_API_KEY, LICENSE_STATUS_MESSAGES } from "../consts/consts";
import { provideMockDUMMYWeatherApiKey, provideMockWeatherApiKey } from "./../unit-test-utils/token.mock";
import { LicenseService } from "./license.service";

describe("LicenseService", () => {
	let service: LicenseService;

	describe("case use dummy api", (): void => {
		beforeEach((): void => {
			TestBed.configureTestingModule({
				providers: [LicenseService, provideMockDUMMYWeatherApiKey()],
			});
			service = TestBed.inject(LicenseService);
			service["licenseKeySubj"].next(DUMMY_API_KEY);
		});

		it("should be created", (): void => {
			expect(service).toBeTruthy();
		});
		it("should test #useMockData", (): void => {
			expect(service.useMockData).toBeTrue();
		});
		it("should unsubscribe from WEATHER_API_KEY on destroy", () => {
			const subscriptionSpy = spyOn(service["subscription"], "unsubscribe");
			service.ngOnDestroy();
			expect(subscriptionSpy).toHaveBeenCalled();
		});
		it("should return INVALID license status", (done): void => {
			service.getLicenseStatus().subscribe(status => {
				expect(status).toEqual(LICENSE_STATUS_MESSAGES.INVALID);
				done();
			});
		});
	});

	describe("case use real api", (): void => {
		beforeEach((): void => {
			TestBed.configureTestingModule({
				providers: [LicenseService, provideMockWeatherApiKey()],
			});
			service = TestBed.inject(LicenseService);
			service["licenseKeySubj"].next("KEY");
		});

		it("should be created", (): void => {
			expect(service).toBeTruthy();
		});
		it("should test #useMockData", (): void => {
			expect(service.useMockData).toBeFalse();
		});
		it("should return VALID license status", (done): void => {
			service.getLicenseStatus().subscribe(status => {
				expect(status).toEqual(LICENSE_STATUS_MESSAGES.VALID);
				done();
			});
		});
	});
});
