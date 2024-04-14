import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { ICity } from "../city-types";

@Injectable({
	providedIn: "root",
})
export class CityService {
	private _city!: ICity;
	private readonly citySubscription = new Subject<ICity>();
	city$: Observable<ICity> = this.citySubscription.asObservable();

	set city(value: ICity) {
		// TODO add check to avoid unwanted behaviors
		this._city = value;
		this.citySubscription.next(value);
	}

	get city(): ICity {
		return this._city;
	}

	constructor() {}
}
