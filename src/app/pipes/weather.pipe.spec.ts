import { Component } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { WeatherPipe } from "./weather.pipe";

@Component({
	standalone: true,
	imports: [WeatherPipe],
	template: `
		<div class="weather-class">{{ weatherIconCode | weather }}</div>
	`,
})
class TestComponent {
	weatherIconCode: string | undefined;
}

describe("WeatherPipe", (): void => {
	describe("create the object", (): void => {
		it("should create an instance", (): void => {
			const pipe = new WeatherPipe();
			expect(pipe).toBeTruthy();
		});
		it("should return empty string from undefined icon", (): void => {
			const pipe = new WeatherPipe();
			expect(pipe.transform(undefined)).toBe("");
		});
		it("should return image url from a string", (): void => {
			const pipe = new WeatherPipe();
			expect(pipe.transform("clouds")).toBe("http://openweathermap.org/img/w/clouds.png");
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
		it("should return empty url from a undefined icon", (): void => {
			const div = fixture.debugElement.query(By.css(".weather-class"));
			expect(div.nativeElement.innerHTML).toBe("");
		});
		it("should return an empty string from an empty string", (): void => {
			component.weatherIconCode = "";
			fixture.detectChanges();
			const div = fixture.debugElement.query(By.css(".weather-class"));
			expect(div.nativeElement.innerHTML).toBe("");
		});
		it("should return image url from a defined icon", (): void => {
			component.weatherIconCode = "clouds";
			fixture.detectChanges();
			const div = fixture.debugElement.query(By.css(".weather-class"));
			expect(div.nativeElement.innerHTML).toBe("http://openweathermap.org/img/w/clouds.png");
		});
	});
});
