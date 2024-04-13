import { Component, DestroyRef, OnInit } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { MatDialog } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { SearchbarComponent } from "../ui-components/searchbar/searchbar.component";

@Component({
	selector: "app-forecast",
	standalone: true,
	imports: [SearchbarComponent, RouterLink, MatIconModule],
	templateUrl: "./forecast.component.html",
	styleUrl: "./forecast.component.scss",
})
export class ForecastComponent implements OnInit {
	constructor(
		private readonly route: ActivatedRoute,
		private readonly router: Router,
		private readonly destroyRef: DestroyRef,
		public dialog: MatDialog
	) {}
	ngOnInit(): void {
		this.route.data
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe((value) => {
				console.log(value);
			});
	}

	openSearchDialog(): void {}
}
