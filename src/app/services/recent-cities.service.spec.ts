import { TestBed } from "@angular/core/testing";
import { DEFAULT_RECENT_CITIES_LIMIT, RECENT_CITIES_STORAGE_KEY, citySamples } from "../consts/consts";
import { RecentCitiesService } from "./recent-cities.service";

describe("RecentCitiesService", (): void => {
	let service: RecentCitiesService;
	let currentTimestamp = 1000;

	beforeEach((): void => {
		currentTimestamp = 1000;
		localStorage.clear();
		spyOn(Date, "now").and.callFake((): number => {
			const timestamp = currentTimestamp;
			currentTimestamp += 1000;
			return timestamp;
		});
		TestBed.configureTestingModule({
			providers: [RecentCitiesService],
		});
		service = TestBed.inject(RecentCitiesService);
	});

	it("should add and reorder recent cities without duplicates", (): void => {
		service.recordCity({ id: 1, name: "Rome, IT" });
		service.recordCity({ id: 2, name: "Paris, FR" });
		service.recordCity({ id: 1, name: "Rome, IT" });

		expect(service.getRecentCities()).toEqual([
			{ id: 1, name: "Rome, IT", viewedAt: 3000 },
			{ id: 2, name: "Paris, FR", viewedAt: 2000 },
		]);
	});

	it("should cap the history length at the configured maximum", (): void => {
		for (let index = 0; index < DEFAULT_RECENT_CITIES_LIMIT + 4; index++) {
			service.recordCity({ id: index, name: `City ${index}` });
		}

		expect(service.getRecentCities().length).toBe(DEFAULT_RECENT_CITIES_LIMIT);
		expect(service.getRecentCities()[0].id).toBe(7);
		expect(service.getRecentCities()[DEFAULT_RECENT_CITIES_LIMIT - 1].id).toBe(4);
	});

	it("should return the default sample fallback when no history is stored", (): void => {
		expect(service.getHomeCities()).toEqual(service.getHomeCities(citySamples));
	});

	it("should remove a city from the recent list and keep only valid entries", (): void => {
		service.recordCity({ id: 1, name: "Rome, IT" });
		service.recordCity({ id: 2, name: "Paris, FR" });

		expect(service.removeCity(1)).toEqual([{ id: 2, name: "Paris, FR", viewedAt: 2000 }]);

		localStorage.setItem(
			RECENT_CITIES_STORAGE_KEY,
			JSON.stringify([
				{ id: 1, name: "Rome, IT", viewedAt: 1000 },
				{ id: "not-a-number", name: "Broken", viewedAt: 2000 },
				{ id: 3, name: "London, GB", viewedAt: 3000 },
			])
		);
		expect(service.getRecentCities()).toEqual([
			{ id: 3, name: "London, GB", viewedAt: 3000 },
			{ id: 1, name: "Rome, IT", viewedAt: 1000 },
		]);
	});

	it("should ignore malformed storage values and blocked storage safely", (): void => {
		service.recordCity({ id: 1, name: "Rome, IT" });
		service.clear();
		expect(service.getRecentCities()).toEqual([]);

		localStorage.setItem(RECENT_CITIES_STORAGE_KEY, "not-valid-json");
		expect(service.getRecentCities()).toEqual([]);

		localStorage.setItem(
			RECENT_CITIES_STORAGE_KEY,
			JSON.stringify([null, "bad-value", { id: 1, name: "Rome, IT", viewedAt: 1000 }])
		);
		expect(service.getRecentCities()).toEqual([{ id: 1, name: "Rome, IT", viewedAt: 1000 }]);

		const localStorageDescriptor = Object.getOwnPropertyDescriptor(globalThis, "localStorage");
		Object.defineProperty(globalThis, "localStorage", {
			configurable: true,
			get: (): Storage | null => null,
		});
		expect(service.getRecentCities()).toEqual([]);
		service.clear();
		expect(service.getRecentCities()).toEqual([]);

		Object.defineProperty(globalThis, "localStorage", {
			configurable: true,
			get: (): Storage => {
				throw new Error("storage blocked");
			},
		});
		expect(service.getRecentCities()).toEqual([]);
		expect(() => service.recordCity({ id: 2, name: "Paris, FR" })).not.toThrow();

		const setItemSpy = jasmine.createSpy("setItem").and.throwError("write blocked");
		Object.defineProperty(globalThis, "localStorage", {
			configurable: true,
			get: (): Storage => {
				return {
					getItem: (): string | null => null,
					setItem: setItemSpy,
					removeItem: (): void => undefined,
					clear: (): void => undefined,
					key: (): string | null => null,
					length: 0,
				} as Storage;
			},
		});
		expect(() => service.recordCity({ id: 3, name: "Berlin, DE" })).not.toThrow();
		expect(setItemSpy).toHaveBeenCalled();

		if (localStorageDescriptor) {
			Object.defineProperty(globalThis, "localStorage", localStorageDescriptor);
		} else {
			Reflect.deleteProperty(globalThis, "localStorage");
		}
	});
});
