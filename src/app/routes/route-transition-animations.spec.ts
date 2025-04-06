import { NgIf } from "@angular/common";
import { Component } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { routeTransitionAnimations } from "./route-transition-animations";

@Component({
	selector: "app-mock-route",
	imports: [NgIf],
	template: `
		<div *ngIf="state === 'homeState'" [@animateRoute]="state" class="home">Home</div>
		<div *ngIf="state === 'forecastState'" [@animateRoute]="state" class="forecast">Forecast</div>
	`,
	animations: [routeTransitionAnimations],
})
class MockRouteComponent {
	state: "homeState" | "forecastState" = "homeState";
}

describe("routeTransitionAnimations", () => {
	let fixture: ComponentFixture<MockRouteComponent>;
	let component: MockRouteComponent;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [BrowserAnimationsModule, MockRouteComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(MockRouteComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should render the home state initially", async () => {
		await fixture.whenStable();
		const homeElement = fixture.debugElement.query(By.css(".home"));
		expect(homeElement).toBeTruthy();
		const forecastElement = fixture.debugElement.query(By.css(".forecast"));
		expect(forecastElement).toBeNull();
	});

	it("should transition from homeState to forecastState", async () => {
		component.state = "forecastState";
		fixture.detectChanges();

		await fixture.whenStable();

		const forecastElement = fixture.debugElement.query(By.css(".forecast"));
		expect(forecastElement).toBeTruthy();
		const homeElement = fixture.debugElement.query(By.css(".home"));
		expect(homeElement).toBeNull();
	});

	it("should transition from forecastState to homeState", async () => {
		component.state = "forecastState";
		fixture.detectChanges();
		await fixture.whenStable();

		component.state = "homeState";
		fixture.detectChanges();

		await fixture.whenStable();

		const homeElement = fixture.debugElement.query(By.css(".home"));
		expect(homeElement).toBeTruthy();
		const forecastElement = fixture.debugElement.query(By.css(".forecast"));
		expect(forecastElement).toBeNull();
	});
});
