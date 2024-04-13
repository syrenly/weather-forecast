import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { IWeatherCity } from "../types";

@Injectable({
	providedIn: "root",
})
export class CityService {
	private _city!: IWeatherCity;
	private readonly citySubscription = new Subject<IWeatherCity>();
	city$: Observable<IWeatherCity> = this.citySubscription.asObservable();

	set city(value: IWeatherCity) {
		// TODO add check to avoid unwanted behaviors
		this._city = value;
		this.citySubscription.next(value);
	}

	get city(): IWeatherCity {
		return this._city;
	}

	constructor() {}
}
