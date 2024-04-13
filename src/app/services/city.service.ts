import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { ICityResult } from "../types";

@Injectable({
	providedIn: "root",
})
export class CityService {
	private _city!: ICityResult;
	private readonly citySubscription = new Subject<ICityResult>();
	city$: Observable<ICityResult> = this.citySubscription.asObservable();

	set city(value: ICityResult) {
		// TODO add check to avoid unwanted behaviors
		this._city = value;
		this.citySubscription.next(value);
	}

	get city(): ICityResult {
		return this._city;
	}

	constructor() {}
}
