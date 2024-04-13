import { Component, DestroyRef, OnInit } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
	selector: "app-forecast",
	standalone: true,
	imports: [],
	templateUrl: "./forecast.component.html",
	styleUrl: "./forecast.component.scss",
})
export class ForecastComponent implements OnInit {
	constructor(
		private readonly route: ActivatedRoute,
		private readonly router: Router,
		private readonly destroyRef: DestroyRef
	) {}
	ngOnInit(): void {
		this.route.data
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe((value) => {
				console.log(value);
			});
	}
}
