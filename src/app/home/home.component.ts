import { Component } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { CitySuggestionsComponent } from "../ui-components/city-suggestions/city-suggestions.component";
import { SearchbarComponent } from "../ui-components/searchbar/searchbar.component";
import { SwitchThemeComponent } from "../ui-components/switch-theme/switch-theme.component";

@Component({
	selector: "app-home",
	standalone: true,
	imports: [
		SearchbarComponent,
		CitySuggestionsComponent,
		MatCardModule,
		SwitchThemeComponent,
	],
	templateUrl: "./home.component.html",
	styleUrl: "./home.component.scss",
})
export class HomeComponent {}
