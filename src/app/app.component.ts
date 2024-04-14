import { NgOptimizedImage } from "@angular/common";
import { Component, Inject } from "@angular/core";
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from "@angular/material/form-field";
import { MatTooltipModule } from "@angular/material/tooltip";
import { RouterOutlet } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { routeTransitionAnimations } from "./routes/route-transition-animations";
import { ThemeService } from "./services/theme.service";
import { CURRENT_THEME, Theme } from "./tokens";

@Component({
	selector: "app-root",
	standalone: true,
	imports: [RouterOutlet, NgOptimizedImage, MatTooltipModule],
	templateUrl: "./app.component.html",
	styleUrl: "./app.component.scss",
	animations: [routeTransitionAnimations],
	providers: [
		{
			provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
			useValue: { appearance: "outline" },
		},
		ThemeService,
	],
})
export class AppComponent {
	title = "weather-forecast";

	constructor(
		@Inject(CURRENT_THEME)
		private readonly themeSubject: BehaviorSubject<Theme>
	) {}
	ngOnInit(): void {
		this.themeSubject.asObservable().subscribe((currentTheme) => {
			// to extend the theme to cdk panels, apply the theme class to the body
			const bodyElement = document.querySelector("body");
			bodyElement.classList.remove(...["light-theme", "dark-theme"]);
			bodyElement.classList.add(`${currentTheme}-theme`);
		});
	}
	/**
	 * Retrieve the animation between routes if any
	 * @param outlet the placeholder for the router state
	 * @return the name of the animation; if none, a default will be returned
	 */
	getRouteTransition(outlet: RouterOutlet): string {
		const {
			activatedRouteData: { animationState = "static" },
		} = outlet;
		return animationState;
	}
}
