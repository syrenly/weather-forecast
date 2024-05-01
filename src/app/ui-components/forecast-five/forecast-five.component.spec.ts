import { ComponentFixture, TestBed } from "@angular/core/testing";
import { forecastResult } from "../../unit-test-utils/utils.mock";
import { ForecastFiveComponent } from "./forecast-five.component";

describe("ForecastFiveComponent", (): void => {
	let component: ForecastFiveComponent;
	let fixture: ComponentFixture<ForecastFiveComponent>;

	beforeEach(async (): Promise<void> => {
		await TestBed.configureTestingModule({
			imports: [ForecastFiveComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(ForecastFiveComponent);
		component = fixture.componentInstance;
		component.forecastResult = forecastResult;
		fixture.detectChanges();
	});

	it("should create", (): void => {
		expect(component).toBeTruthy();
	});

	it("should test #groupBy", (): void => {
		component.ngOnChanges({
			forecastResult: {
				currentValue: forecastResult,
				previousValue: null,
				isFirstChange: (): boolean => false,
				firstChange: false,
			},
		});
		expect(component.days?.length).toBe(5);
	});

	it("should test #groupBy", (): void => {
		component.ngOnChanges({
			forecastResult: {
				currentValue: forecastResult,
				previousValue: null,
				isFirstChange: (): boolean => false,
				firstChange: false,
			},
		});
		expect(component.days?.length).toBe(5);
	});
});
