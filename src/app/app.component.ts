import { Component, Inject, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { routeTransitionAnimations } from "./routes/route-transition-animations";
import { CURRENT_THEME, Theme } from "./tokens";

@Component({
	selector: "app-root",
	standalone: true,
	imports: [RouterOutlet],
	templateUrl: "./app.component.html",
	styleUrl: "./app.component.scss",
	animations: [routeTransitionAnimations],
})
export class AppComponent implements OnInit {
	constructor(
		@Inject(CURRENT_THEME)
		private readonly themeSubject: BehaviorSubject<Theme>
	) {}

	ngOnInit(): void {
		this.themeSubject.subscribe((currentTheme: Theme): void => this.applyTheme(currentTheme));
	}
	/**
	 * Add "light-theme" class to body to apply light theme; "dark-theme" for the dark one
	 */
	private applyTheme(currentTheme: Theme): void {
		// to extend the theme to cdk panels, apply the theme class to the body
		const bodyElement = document.querySelector("body");
		if (bodyElement?.classList) {
			bodyElement.classList.remove(...["light-theme", "dark-theme"]);
			bodyElement.classList.add(`${currentTheme}-theme`);
		}
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
