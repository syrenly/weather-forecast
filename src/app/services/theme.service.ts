import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class ThemeService {
	private _enableDarkTheme = false;
	private readonly enableDarkThemeSubscription = new Subject<boolean>();
	enableDarkTheme$: Observable<boolean> =
		this.enableDarkThemeSubscription.asObservable();

	set enableDarkTheme(value: boolean) {
		this._enableDarkTheme = value;
		this.enableDarkThemeSubscription.next(value);
	}

	get enableDarkTheme(): boolean {
		return this._enableDarkTheme;
	}
}
