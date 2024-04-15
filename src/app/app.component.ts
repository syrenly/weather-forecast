import { NgOptimizedImage } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from "@angular/material/form-field";
import { MatTooltipModule } from "@angular/material/tooltip";
import { RouterOutlet } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { routeTransitionAnimations } from "./routes/route-transition-animations";
import { CURRENT_THEME, Theme } from "./tokens";

@Component({
	selector: "app-root",
	standalone: true,
	imports: [RouterOutlet, NgOptimizedImage, MatTooltipModule],
	templateUrl: "./app.component.html",
	styleUrl: "./app.component.scss",
	animations: [routeTransitionAnimations],
	// set outline style for material
	providers: [
		{
			provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
			useValue: { appearance: "outline" },
		},
	],
})
export class AppComponent implements OnInit {
	constructor(
		@Inject(CURRENT_THEME)
		private readonly themeSubject: BehaviorSubject<Theme>
	) {}

	ngOnInit(): void {
		this.themeSubject.subscribe((currentTheme): void => {
			// to extend the theme to cdk panels, apply the theme class to the body
			const bodyElement = document.querySelector("body");
			bodyElement.classList.remove(...["light-theme", "dark-theme"]);
			// add "light-theme" class to body to apply light theme; "dark-theme" for the dark one
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
