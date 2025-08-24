import { inject, Injectable, OnDestroy } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { BehaviorSubject, Subscription } from "rxjs";
import { DUMMY_API_KEY } from "../consts";
import { WEATHER_API_KEY } from "../tokens";

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
	private subscription: Subscription;

	// #region Dependencies
	private readonly licenseKeySubj: BehaviorSubject<string> = inject(WEATHER_API_KEY);
	private readonly snackBar = inject(MatSnackBar);
	// #endregion

	constructor() {
		this.subscription = this.licenseKeySubj.subscribe(key => {
			this._licenseKey = key;
			const message =
				key === DUMMY_API_KEY
					? "Using dummy API key; please visit https://openweathermap.org to get a real one"
					: "API key found for https://openweathermap.org";
			if (key === DUMMY_API_KEY) {
				this.snackBar.open(message, "Dismiss", {
					horizontalPosition: "center",
					verticalPosition: "top",
				});
			}
			console.info(message);
		});
	}

	ngOnDestroy(): void {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}
}
