import { Injectable } from "@angular/core";
import { DEFAULT_RECENT_CITIES_LIMIT, RECENT_CITIES_STORAGE_KEY, citySamples } from "../consts/consts";
import { ICityIdName, IRecentCity } from "../types/city-types";

@Injectable({
	providedIn: "root",
})
export class RecentCitiesService {
	private readonly maxCities = DEFAULT_RECENT_CITIES_LIMIT;

	getRecentCities(): IRecentCity[] {
		const parsed = this.readStoredCities();
		return parsed.sort((left, right) => right.viewedAt - left.viewedAt).slice(0, this.maxCities);
	}

	getHomeCities(sampleCities: ICityIdName[] = citySamples): ICityIdName[] {
		const recentCities = this.getRecentCities();
		const recentIds = new Set<number>(recentCities.map(city => city.id));
		const recentList = recentCities.map(city => ({ id: city.id, name: city.name }));
		const fallbackCities = sampleCities.filter(city => !recentIds.has(city.id));
		const freeSlots = this.maxCities - recentList.length;
		return [...recentList, ...fallbackCities.slice(0, Math.max(0, freeSlots))].slice(0, this.maxCities);
	}

	recordCity(city: ICityIdName): IRecentCity[] {
		const storedCities = this.getRecentCities();
		const filteredCities = storedCities.filter(item => item.id !== city.id);
		const normalizedName = city.name.trim();
		const nextHistory = [{ id: city.id, name: normalizedName, viewedAt: Date.now() }, ...filteredCities].sort(
			(left, right) => right.viewedAt - left.viewedAt
		);
		const nextCities = nextHistory.slice(0, this.maxCities);
		this.persistCities(nextCities);
		return nextCities;
	}

	removeCity(cityId: number): IRecentCity[] {
		const filteredCities = this.getRecentCities().filter(city => city.id !== cityId);
		this.persistCities(filteredCities);
		return filteredCities;
	}

	clear(): IRecentCity[] {
		this.persistCities([]);
		return [];
	}

	private readStoredCities(): IRecentCity[] {
		const storage = this.getStorage();
		if (!storage) {
			return [];
		}

		try {
			const rawValue = storage.getItem(RECENT_CITIES_STORAGE_KEY);
			if (!rawValue) {
				return [];
			}
			const parsedValue = JSON.parse(rawValue);
			if (!Array.isArray(parsedValue)) {
				return [];
			}
			return parsedValue.filter((value): value is IRecentCity => this.isValidRecentCity(value));
		} catch {
			return [];
		}
	}

	private persistCities(cities: IRecentCity[]): void {
		const storage = this.getStorage();
		if (!storage) {
			return;
		}

		try {
			storage.setItem(RECENT_CITIES_STORAGE_KEY, JSON.stringify(cities));
		} catch {
			// Ignore storage write failures so the app keeps working without crashing.
		}
	}

	private isValidRecentCity(value: unknown): value is IRecentCity {
		if (!value || typeof value !== "object") {
			return false;
		}
		const city = value as Partial<IRecentCity>;
		return (
			typeof city.id === "number" &&
			Number.isFinite(city.id) &&
			city.id > 0 &&
			typeof city.name === "string" &&
			city.name.trim().length > 0 &&
			typeof city.viewedAt === "number" &&
			Number.isFinite(city.viewedAt)
		);
	}

	private getStorage(): Storage | null {
		try {
			return globalThis.localStorage;
		} catch {
			return null;
		}
	}
}
