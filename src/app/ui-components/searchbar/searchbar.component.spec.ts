import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { getSearchMockProvider } from "../../unit-test-utils/search.service.mock";
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
});
