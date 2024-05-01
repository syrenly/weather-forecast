import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { getSearchMockProvider } from "../../unit-test-utils/search.service.mock";
import { city } from "../../unit-test-utils/utils.mock";
import { SearchbarComponent } from "./searchbar.component";

describe("SearchbarComponent", (): void => {
	let component: SearchbarComponent;
	let fixture: ComponentFixture<SearchbarComponent>;

	beforeEach(async (): Promise<void> => {
		await TestBed.configureTestingModule({
			imports: [NoopAnimationsModule, SearchbarComponent],
			providers: [getSearchMockProvider()],
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

		display = component.displayFn(city);
		expect(display).toBe("Rome, IT");

		const cityWithoutNames = JSON.parse(JSON.stringify(city));
		cityWithoutNames.name = "";
		cityWithoutNames.sys = null;
		display = component.displayFn(cityWithoutNames);
		expect(display).toBe("Unknown, Unknown");
	});

	it("should test #onItemSelected", (): void => {
		const emitSpy = spyOn(component.itemSelected, "emit");
		component.onItemSelected(city);
		expect(emitSpy).toHaveBeenCalledWith(city);
		expect(component.autocompleteControl.value).toBeNull();
	});
});
