/**
 * File containing mocked provider for LicenseService
 */

import { Injectable, Provider } from "@angular/core";
import { DUMMY_API_KEY } from "../consts";
import { LicenseService } from "../services/license.service";

@Injectable({
	providedIn: "root",
})
export class LicenseMockService {
	get licenseKey(): string {
		return DUMMY_API_KEY;
	}
	get useMockData(): boolean {
		return true;
	}
}

export function provideMockLicenseService(): Provider {
	return { provide: LicenseService, useClass: LicenseMockService };
}
