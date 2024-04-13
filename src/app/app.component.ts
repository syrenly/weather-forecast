import { Component, OnInit } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { RouterLink, RouterOutlet } from "@angular/router";
import { routeTransitionAnimations } from "./route-transition-animations";

@Component({
	selector: "app-root",
	standalone: true,
	imports: [RouterOutlet, RouterLink],
	templateUrl: "./app.component.html",
	styleUrl: "./app.component.scss",
	animations: [routeTransitionAnimations],
})
export class AppComponent implements OnInit {
	title = "weather-forecast";
	constructor(private matIconRegistry: MatIconRegistry) {}

	ngOnInit(): void {
		this.matIconRegistry.setDefaultFontSetClass(
			"material-symbols-outlined"
		);
	}
	prepareRoute(outlet: RouterOutlet) {
		return (
			outlet &&
			outlet.activatedRouteData &&
			outlet.activatedRouteData["animationState"]
		);
	}
}
