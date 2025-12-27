import { LiveAnnouncer } from "@angular/cdk/a11y";
import { AsyncPipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { tap } from "rxjs";
import { LicenseService } from "../../services/license.service";

/**
 * ApiAlertComponent is an Angular component responsible for displaying API-related alerts.
 * It provides the license status of the application.
 */
@Component({
	selector: "app-api-alert",
	imports: [MatIconModule, MatTooltipModule, AsyncPipe],
	templateUrl: "./api-alert.component.html",
	styleUrl: "./api-alert.component.scss",
})
export class ApiAlertComponent {
	// #region Dependencies
	private readonly licenseService = inject(LicenseService);
	private readonly liveAnnouncer = inject(LiveAnnouncer);
	// #endregion

	/**
	 * An observable that emits the current license status.
	 * The status message is announced using the `LiveAnnouncer` for accessibility.
	 */
	licenseStatus$ = this.licenseService
		.getLicenseStatus()
		.pipe(tap(status => this.liveAnnouncer.announce(status.message)));
}
