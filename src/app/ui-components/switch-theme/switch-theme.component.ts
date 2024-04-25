import { Component, DestroyRef, Inject, OnInit } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { FormsModule } from "@angular/forms";
import { MatButtonToggleChange, MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { BehaviorSubject } from "rxjs";
import { CURRENT_THEME, Theme } from "../../tokens";
/**
 * Switch between dark and light theme. The magic is done with an Injection Token
 */
@Component({
	selector: "app-switch-theme",
	standalone: true,
	imports: [MatButtonToggleModule, FormsModule, MatIconModule, MatTooltipModule],
	templateUrl: "./switch-theme.component.html",
})
export class SwitchThemeComponent implements OnInit {
	currentTheme!: Theme;
	constructor(
		@Inject(CURRENT_THEME)
		private readonly themeSubject: BehaviorSubject<Theme>,
		private readonly destroyRef: DestroyRef
	) {}

	ngOnInit(): void {
		this.themeSubject.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((currentTheme): void => {
			if (this.currentTheme == undefined) {
				this.currentTheme = currentTheme;
			}
		});
	}
	onSwitchChanged(event: MatButtonToggleChange): void {
		this.currentTheme = event.value;
		this.themeSubject.next(this.currentTheme);
	}
}
