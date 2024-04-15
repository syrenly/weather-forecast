import { LOCALE_ID } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CURRENT_THEME, currentTheme } from "../../tokens";
import { PrecipitationChartComponent } from "./precipitation-chart.component";

describe("PrecipitationChartComponent", () => {
	let component: PrecipitationChartComponent;
	let fixture: ComponentFixture<PrecipitationChartComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [PrecipitationChartComponent],
			providers: [
				{ provide: LOCALE_ID, useValue: "en" },
				{ provide: CURRENT_THEME, useFactory: currentTheme },
			],
		}).compileComponents();

		fixture = TestBed.createComponent(PrecipitationChartComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
