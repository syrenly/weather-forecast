import { HttpErrorResponse } from "@angular/common/http";
import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { throwError } from "rxjs";
import { DEFAULT_DEBOUNCE_DELAY_MILLISECONDS } from "../../consts";
import { ICityWeather } from "../../types/city-types";
import { provideMockSearchService } from "../../unit-test-utils/search.service.mock";
import { mockCity, mockCitySearchResult } from "../../unit-test-utils/utils.mock";
import { SearchbarComponent } from "./searchbar.component";

describe("SearchbarComponent", (): void => {
	let component: SearchbarComponent;
	let fixture: ComponentFixture<SearchbarComponent>;

	beforeEach(async (): Promise<void> => {
		await TestBed.configureTestingModule({
			imports: [NoopAnimationsModule, SearchbarComponent],
			providers: [provideMockSearchService()],
		}).compileComponents();

		fixture = TestBed.createComponent(SearchbarComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", (): void => {
		expect(component).toBeTruthy();
	});
	it("should test #displayFn", (): void => {
		let display = component.displayFn(null);
		expect(display).toBe("");

		display = component.displayFn(mockCity);
		expect(display).toBe("Rome, IT");

		const cityWithoutNames = JSON.parse(JSON.stringify(mockCity));
		cityWithoutNames.name = "";
		cityWithoutNames.sys = null;
		display = component.displayFn(cityWithoutNames);
		expect(display).toBe("Unknown, Unknown");
	});
	it("should test #onItemSelected", (): void => {
		const emitSpy = spyOn(component.itemSelected, "emit");
		component.onItemSelected(mockCity);
		expect(emitSpy).toHaveBeenCalledWith(mockCity);
		expect(component.autocompleteControl.value).toBeNull();
	});
	describe("should test the search", (): void => {
		it("case input text", fakeAsync((): void => {
			let results: ICityWeather[] = [];
			component.options$.subscribe(list => {
				results = list;
			});
			const debugElement = fixture.debugElement.nativeElement;
			const input: HTMLInputElement = debugElement.querySelector("input");
			input.value = "test";
			input.dispatchEvent(new Event("input"));
			fixture.detectChanges();
			tick(DEFAULT_DEBOUNCE_DELAY_MILLISECONDS + 10);
			expect(results).toEqual(mockCitySearchResult.list);
		}));
		it("case input null", fakeAsync((): void => {
			let results: ICityWeather[] = [];
			component.options$.subscribe(list => {
				results = list;
			});
			component.autocompleteControl.setValue(null);
			fixture.detectChanges();
			tick(DEFAULT_DEBOUNCE_DELAY_MILLISECONDS + 10);
			expect(results).toEqual([]);
		}));
		it("should handle short input", fakeAsync((): void => {
			let results: ICityWeather[] = [];
			component.options$.subscribe(list => {
				results = list;
			});
			const debugElement = fixture.debugElement.nativeElement;
			const input: HTMLInputElement = debugElement.querySelector("input");
			input.value = "ab";
			input.dispatchEvent(new Event("input"));
			fixture.detectChanges();
			tick(DEFAULT_DEBOUNCE_DELAY_MILLISECONDS + 10);
			expect(results?.length).toBe(0);
			expect(component.searchStatus).toBe("completed");
		}));
		it("should reset input after item selection", (): void => {
			const debugElement = fixture.debugElement.nativeElement;
			const input: HTMLInputElement = debugElement.querySelector("input");
			input.value = "test";
			input.dispatchEvent(new Event("input"));
			fixture.detectChanges();
			component.onItemSelected(mockCity);
			expect(component.autocompleteControl.value).toBeNull();
		});
		it("should handle known error during search", fakeAsync((): void => {
			let results: ICityWeather[] = [];
			spyOn<any>(component["searchService"], "searchCity").and.returnValue(
				throwError(() => new HttpErrorResponse({ status: 400, statusText: "Server error" }))
			);
			component.options$.subscribe(list => {
				results = list;
			});
			const debugElement = fixture.debugElement.nativeElement;
			const input: HTMLInputElement = debugElement.querySelector("input");
			input.value = "test";
			input.dispatchEvent(new Event("input"));
			fixture.detectChanges();
			tick(DEFAULT_DEBOUNCE_DELAY_MILLISECONDS + 10);
			expect(results?.length).toBe(0);
			expect(component.searchStatus).toBe(400);
		}));
		it("should handle generic error during search", fakeAsync((): void => {
			let results: ICityWeather[] = [];
			spyOn<any>(component["searchService"], "searchCity").and.returnValue(
				throwError(() => new Error("Server error"))
			);
			component.options$.subscribe(list => {
				results = list;
			});
			const debugElement = fixture.debugElement.nativeElement;
			const input: HTMLInputElement = debugElement.querySelector("input");
			input.value = "test";
			input.dispatchEvent(new Event("input"));
			fixture.detectChanges();
			tick(DEFAULT_DEBOUNCE_DELAY_MILLISECONDS + 10);
			expect(results?.length).toBe(0);
			expect(component.searchStatus).toBe(500);
		}));
	});
	describe("should set status of hint and suffix of autocomplete", (): void => {
		it("#case 400", (): void => {
			component.setStatus(400);
			expect(component.searchStatus).toEqual(400);
			expect(component.autocompleteSuffix).toEqual({ icon: "error_outline", tooltip: "Request invalid" });
			expect(component.autocompleteHint).toBe("The request has a wrong signature, retry");
		});
		it("#case 401", (): void => {
			component.setStatus(401);
			expect(component.searchStatus).toEqual(401);
			expect(component.autocompleteSuffix).toEqual({ icon: "policy", tooltip: "Not authorized" });
			expect(component.autocompleteHint).toBe("The license is not valid, expired or missing");
		});
		it("#case 404", (): void => {
			component.setStatus(404);
			expect(component.searchStatus).toEqual(404);
			expect(component.autocompleteSuffix).toBeUndefined();
			expect(component.autocompleteHint).toBe("");
		});
		it("#case 429", (): void => {
			component.setStatus(429);
			expect(component.searchStatus).toEqual(429);
			expect(component.autocompleteSuffix).toEqual({
				icon: "event_repeat",
				tooltip: "Too many requests. Retry later.",
			});
			expect(component.autocompleteHint).toBe("Too many requests. Wait some time or extend your license");
		});
		it("#case server error", (): void => {
			component.setStatus(500);
			expect(component.searchStatus).toBe(500);
			expect(component.autocompleteSuffix).toEqual({
				icon: "error_outline",
				tooltip: "An internal error occurred",
			});
			expect(component.autocompleteHint).toBe("An internal error occurred");
		});
		it("#case loading", (): void => {
			component.setStatus("loading");
			expect(component.searchStatus).toEqual("loading");
			expect(component.autocompleteSuffix).toBeUndefined();
			expect(component.autocompleteHint).toBe("Searching...");
		});
		it("#case completed", (): void => {
			component.setStatus("completed");
			expect(component.searchStatus).toEqual("completed");
			expect(component.autocompleteSuffix).toBeUndefined();
			expect(component.autocompleteHint).toBe("");
		});
		it("#case pristine", (): void => {
			component.setStatus("pristine");
			expect(component.searchStatus).toEqual("pristine");
			expect(component.autocompleteSuffix).toBeUndefined();
			expect(component.autocompleteHint).toBe("");
		});

		it("#case unknown error", (): void => {
			component.setStatus("unknownError" as any);
			expect(component.searchStatus).toEqual("unknownError" as any);
			expect(component.autocompleteSuffix).toBeUndefined();
			expect(component.autocompleteHint).toBe("");
		});
	});
});
