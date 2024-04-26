import { ComponentFixture, TestBed } from "@angular/core/testing";
import { provideMockLocaleId, provideMockTheme } from "../../unit-test-utils/token.mock";
import { PrecipitationChartComponent } from "./precipitation-chart.component";

describe("PrecipitationChartComponent", (): void => {
	let component: PrecipitationChartComponent;
	let fixture: ComponentFixture<PrecipitationChartComponent>;

	beforeEach(async (): Promise<void> => {
		await TestBed.configureTestingModule({
			imports: [PrecipitationChartComponent],
			providers: [provideMockLocaleId(), provideMockTheme()],
		}).compileComponents();

		fixture = TestBed.createComponent(PrecipitationChartComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", (): void => {
		expect(component).toBeTruthy();
	});
});
