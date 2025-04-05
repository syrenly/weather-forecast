import { Component } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { FlagPipe } from "./flag.pipe";

@Component({
	imports: [FlagPipe],
	template: `
		<div class="flag-class">{{ country | flag }}</div>
	`,
})
class TestComponent {
	country: string | undefined;
}

describe("FlagPipe", (): void => {
	describe("create the object", (): void => {
		it("should create an instance", (): void => {
			const pipe = new FlagPipe();
			expect(pipe).toBeTruthy();
		});
		it("should return  image url from undefined icon", (): void => {
			const pipe = new FlagPipe();
			expect(pipe.transform(undefined)).toBe("");
		});
		it("should return image url from a string", (): void => {
			const pipe = new FlagPipe();
			expect(pipe.transform("IT")).toBe("http://openweathermap.org/images/flags/it.png");
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
		it("should return empty url from a undefined country string", (): void => {
			const div = fixture.debugElement.query(By.css(".flag-class"));
			expect(div.nativeElement.innerHTML).toBe("");
		});
		it("should return an empty string from an empty string", (): void => {
			component.country = "";
			fixture.detectChanges();
			const div = fixture.debugElement.query(By.css(".flag-class"));
			expect(div.nativeElement.innerHTML).toBe("");
		});
		it("should return image url from a string", (): void => {
			component.country = "IT";
			fixture.detectChanges();
			const div = fixture.debugElement.query(By.css(".flag-class"));
			expect(div.nativeElement.innerHTML).toBe("http://openweathermap.org/images/flags/it.png");
		});
	});
});
