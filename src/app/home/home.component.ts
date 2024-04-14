import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { Router } from "@angular/router";
import { SearchbarComponent } from "../ui-components/searchbar/searchbar.component";
import { SwitchThemeComponent } from "../ui-components/switch-theme/switch-theme.component";

@Component({
	selector: "app-home",
	standalone: true,
	imports: [
		SearchbarComponent,
		MatCardModule,
		SwitchThemeComponent,
		MatButtonModule,
	],
	templateUrl: "./home.component.html",
	styleUrl: "./home.component.scss",
})
export class HomeComponent {
	constructor(private readonly router: Router) {}
	navigateTo(id: number): void {
		this.router.navigate(["forecast", id]);
	}
}
