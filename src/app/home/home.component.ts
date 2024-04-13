import { Component } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { CitySuggestionsComponent } from "../city-suggestions/city-suggestions.component";
import { SearchbarComponent } from "../searchbar/searchbar.component";

@Component({
	selector: "app-home",
	standalone: true,
	imports: [SearchbarComponent, CitySuggestionsComponent, MatCardModule],
	templateUrl: "./home.component.html",
	styleUrl: "./home.component.scss",
})
export class HomeComponent {}
