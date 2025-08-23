import { Component, DestroyRef, inject, OnInit, Renderer2 } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { RouterOutlet } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { themeCssClass } from "./consts";
import { routeTransitionAnimations } from "./routes/route-transition-animations";
import { CURRENT_THEME, Theme } from "./tokens";
@Component({
	selector: "app-root",
	imports: [RouterOutlet],
	templateUrl: "./app.component.html",
	styleUrl: "./app.component.scss",
	animations: [routeTransitionAnimations],
})
export class AppComponent implements OnInit {
	// #region Dependencies
	private readonly themeSubject: BehaviorSubject<Theme> = inject(CURRENT_THEME);
	private readonly renderer = inject(Renderer2);
	private readonly destroyRef = inject(DestroyRef);
	// #endregion

	ngOnInit(): void {
		this.themeSubject
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe((currentTheme: Theme): void => this.applyTheme(currentTheme));
	}
	/**
	 * Add "light-theme" class to body to apply light theme; "dark-theme" for the dark one
	 */
	private applyTheme(currentTheme: Theme): void {
		// to extend the theme to cdk panels, apply the theme class to the body
		const bodyElement = document.querySelector("body");
		if (bodyElement?.classList) {
			// remove previous theme classes
			this.renderer.removeClass(bodyElement, themeCssClass("light"));
			this.renderer.removeClass(bodyElement, themeCssClass("dark"));
			// add the class to apply the current theme
			this.renderer.addClass(bodyElement, themeCssClass(currentTheme));
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
