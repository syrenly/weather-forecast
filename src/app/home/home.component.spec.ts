import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { CURRENT_THEME, currentTheme } from "../tokens";
import { getSearchMockProvider } from "../unit-test-utils/search.service.mock";
import { HomeComponent } from "./home.component";

describe("HomeComponent", () => {
	let component: HomeComponent;
	let fixture: ComponentFixture<HomeComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [HomeComponent, NoopAnimationsModule],
			providers: [
				{ provide: CURRENT_THEME, useFactory: currentTheme },
				getSearchMockProvider(),
			],
		}).compileComponents();

		fixture = TestBed.createComponent(HomeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
