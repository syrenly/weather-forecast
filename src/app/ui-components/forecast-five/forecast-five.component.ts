import { DatePipe, DecimalPipe, NgOptimizedImage, NgTemplateOutlet, TitleCasePipe } from "@angular/common";
import { Component, computed, input, InputSignal, signal, Signal, WritableSignal } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { MatTabsModule } from "@angular/material/tabs";
import { MatTooltipModule } from "@angular/material/tooltip";
import { ToCardinalPointPipe } from "../../pipes/to-cardinal-point.pipe";
import { WeatherPipe } from "../../pipes/weather.pipe";
import { KeydownKeys } from "../../types/a11y.enums";
import { IDaysDictionary, IFiveDaysForecast } from "../../types/forecast-types";
/**
 * ForecastFiveComponent shows weather forecast for 5 days. Each day is shown inside a tab; every row is the summary of forecast for 3 hours in that specific day
 */
@Component({
	selector: "app-forecast-five",
	imports: [
		DatePipe,
		DecimalPipe,
		MatIconModule,
		MatCardModule,
		MatDividerModule,
		MatTooltipModule,
		MatTabsModule,
		NgOptimizedImage,
		NgTemplateOutlet,
		TitleCasePipe,
		ToCardinalPointPipe,
		WeatherPipe,
	],
	templateUrl: "./forecast-five.component.html",
	styleUrl: "./forecast-five.component.scss",
})
export class ForecastFiveComponent {
	forecastResult: InputSignal<IFiveDaysForecast | undefined> = input();

	// group all forecasts by day
	daysDictionary: Signal<IDaysDictionary> = computed((): IDaysDictionary => this.createDaysDictionary());
	days: Signal<string[]> = computed((): string[] => Object.keys(this.daysDictionary()));

	// tabindex for the tab panels
	tabIndex: WritableSignal<number> = signal(0);

	private createDaysDictionary(): IDaysDictionary {
		const list = this.forecastResult()?.list || [];
		return list.length === 0
			? {}
			: Object.groupBy(list, (v): string => {
					const [date] = v.dt_txt.split(" ");
					return date;
				});
	}
	/** Accessibility navigation
	 * @param event KeyboardEvent
	 * @param tabIndex current tab index
	 */
	onKeydown(event: KeyboardEvent, tabIndex: number): void {
		if (![KeydownKeys.ARROW_RIGHT, KeydownKeys.ARROW_LEFT].includes(event.key as KeydownKeys)) {
			return;
		}
		event.preventDefault();
		if (event.key === KeydownKeys.ARROW_RIGHT) {
			this.tabIndex.set((tabIndex + 1) % this.days().length);
		} else if (event.key === KeydownKeys.ARROW_LEFT) {
			this.tabIndex.set((tabIndex - 1 + this.days().length) % this.days().length);
		}
	}
}
