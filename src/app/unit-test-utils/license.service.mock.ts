/**
 * File containing mocked provider for LicenseService
 */

import { Injectable, Provider } from "@angular/core";
import { Observable, of } from "rxjs";
import { DUMMY_API_KEY, LICENSE_STATUS_MESSAGES } from "../consts/consts";
import { LicenseService } from "../services/license.service";
import { ILicenseStatusMessage } from "../types/types";

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
	getLicenseStatus(): Observable<ILicenseStatusMessage["INVALID" | "VALID"]> {
		return of(LICENSE_STATUS_MESSAGES.INVALID);
	}
}

export function provideMockLicenseService(): Provider {
	return { provide: LicenseService, useClass: LicenseMockService };
}
