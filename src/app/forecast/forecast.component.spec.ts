import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";
import { CURRENT_THEME, currentTheme } from "../tokens";
import { getSearchMockProvider } from "../unit-test-utils/search.service.mock";
import { city, forecastResult } from "../unit-test-utils/utils.mock";
import { ForecastComponent } from "./forecast.component";

const route = {
	data: of({
		countryInfo: city,
		forecastResult: forecastResult,
		animationState: "forecastState",
	}),
};

describe("ForecastComponent", (): void => {
	let component: ForecastComponent;
	let fixture: ComponentFixture<ForecastComponent>;

	beforeEach(async (): Promise<void> => {
		await TestBed.configureTestingModule({
			imports: [ForecastComponent, NoopAnimationsModule],
			providers: [
				getSearchMockProvider(),
				{ provide: ActivatedRoute, useValue: route },
				{ provide: CURRENT_THEME, useFactory: currentTheme },
			],
		}).compileComponents();

		fixture = TestBed.createComponent(ForecastComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", (): void => {
		expect(component).toBeTruthy();
	});
});
