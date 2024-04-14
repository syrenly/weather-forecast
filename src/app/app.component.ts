import { NgOptimizedImage } from "@angular/common";
import { Component } from "@angular/core";
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from "@angular/material/form-field";
import { MatTooltipModule } from "@angular/material/tooltip";
import { RouterOutlet } from "@angular/router";
import { routeTransitionAnimations } from "./routes/route-transition-animations";

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
	],
})
export class AppComponent {
	title = "weather-forecast";
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
