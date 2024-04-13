import { Component } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { RouterLink, RouterOutlet } from "@angular/router";
import { routeTransitionAnimations } from "./route-transition-animations";

@Component({
	selector: "app-root",
	standalone: true,
	imports: [RouterOutlet, RouterLink, MatIconModule],
	templateUrl: "./app.component.html",
	styleUrl: "./app.component.scss",
	animations: [routeTransitionAnimations],
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
