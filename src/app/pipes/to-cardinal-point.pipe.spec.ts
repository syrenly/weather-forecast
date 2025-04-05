import { Component } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { ToCardinalPointPipe } from "./to-cardinal-point.pipe";

@Component({
    imports: [ToCardinalPointPipe],
    template: `
		<div class="wind-class">{{ windDirectionDegree | toCardinalPoint }}</div>
	`
})
class TestComponent {
	windDirectionDegree: number | undefined;
}

describe("ToCardinalPointPipe", (): void => {
	describe("create the object", (): void => {
		it("should create an instance", (): void => {
			const pipe = new ToCardinalPointPipe();
			expect(pipe).toBeTruthy();
		});
		it("should return empty string from an undefined number of degrees", (): void => {
			const pipe = new ToCardinalPointPipe();
			expect(pipe.transform(undefined)).toBe("");
		});
		it("should return wind direction from a defined number of degrees", (): void => {
			const pipe = new ToCardinalPointPipe();
			expect(pipe.transform(180)).toBe("S");
		});
	});
	describe("html pipe", (): void => {
		let component: TestComponent;
		let fixture: ComponentFixture<TestComponent>;

		beforeEach(async (): Promise<void> => {
			await TestBed.configureTestingModule({
				imports: [TestComponent],
			}).compileComponents();

			fixture = TestBed.createComponent(TestComponent);
			component = fixture.componentInstance;
			fixture.detectChanges();
		});
		it("should return empty string from undefined degrees", (): void => {
			const div = fixture.debugElement.query(By.css(".wind-class"));
			expect(div.nativeElement.innerHTML).toBe("");
		});
		it("should return wind direction from defined degrees", (): void => {
			component.windDirectionDegree = 180;
			fixture.detectChanges();
			const div = fixture.debugElement.query(By.css(".wind-class"));
			expect(div.nativeElement.innerHTML).toBe("S");
		});
	});
});
