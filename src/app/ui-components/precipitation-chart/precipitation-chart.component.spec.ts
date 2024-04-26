import { LOCALE_ID } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CURRENT_THEME, currentThemeFn } from "../../tokens";
import { PrecipitationChartComponent } from "./precipitation-chart.component";

describe("PrecipitationChartComponent", (): void => {
	let component: PrecipitationChartComponent;
	let fixture: ComponentFixture<PrecipitationChartComponent>;

	beforeEach(async (): Promise<void> => {
		await TestBed.configureTestingModule({
			imports: [PrecipitationChartComponent],
			providers: [
				{ provide: LOCALE_ID, useValue: "en" },
				{ provide: CURRENT_THEME, useFactory: currentThemeFn },
			],
		}).compileComponents();

		fixture = TestBed.createComponent(PrecipitationChartComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", (): void => {
		expect(component).toBeTruthy();
	});
});
