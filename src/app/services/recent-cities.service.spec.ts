import { TestBed } from "@angular/core/testing";
import { RECENT_CITIES_STORAGE_KEY } from "../consts/consts";
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

	it("should cap the history length at six entries", (): void => {
		for (let index = 0; index < 8; index++) {
			service.recordCity({ id: index, name: `City ${index}` });
		}

		expect(service.getRecentCities().length).toBe(6);
		expect(service.getRecentCities()[0].id).toBe(7);
		expect(service.getRecentCities()[5].id).toBe(2);
	});

	it("should clear a history and ignore malformed storage values", (): void => {
		service.recordCity({ id: 1, name: "Rome, IT" });
		service.clear();
		expect(service.getRecentCities()).toEqual([]);

		localStorage.setItem(RECENT_CITIES_STORAGE_KEY, "not-valid-json");
		expect(service.getRecentCities()).toEqual([]);
	});
});
