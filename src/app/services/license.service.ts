import { inject, Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, map, Observable, Subscription, tap } from "rxjs";
import { DUMMY_API_KEY, LICENSE_STATUS_MESSAGES } from "../consts/consts";
import { WEATHER_API_KEY } from "../consts/tokens";
import { ILicenseStatusMessage } from "../types/types";

@Injectable({
	providedIn: "root",
})
export class LicenseService implements OnDestroy {
	private _licenseKey = "";
	get licenseKey(): string {
		return this._licenseKey;
	}
	get useMockData(): boolean {
		return this.licenseKey === DUMMY_API_KEY;
	}
	private subscription = new Subscription();

	// #region Dependencies
	private readonly licenseKeySubj: BehaviorSubject<string> = inject(WEATHER_API_KEY);
	// #endregion

	constructor() {
		this.subscription.add(this.licenseKeySubj.subscribe(key => (this._licenseKey = key)));
	}

	getLicenseStatus(): Observable<ILicenseStatusMessage["INVALID" | "VALID"]> {
		return this.licenseKeySubj.pipe(
			map(key => (key === DUMMY_API_KEY ? LICENSE_STATUS_MESSAGES.INVALID : LICENSE_STATUS_MESSAGES.VALID)),
			tap(status => console.debug(status.message))
		);
	}

	ngOnDestroy(): void {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}
}
