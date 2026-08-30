import { Component } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { FocusDirective } from "./focus.directive";

@Component({
	imports: [FocusDirective],
	template: `
		<h1 appFocus class="header">Title</h1>
	`,
})
class TestComponent {}

describe("FocusDirective", () => {
	let component: TestComponent;
	let fixture: ComponentFixture<TestComponent>;

	beforeEach(async (): Promise<void> => {
		await TestBed.configureTestingModule({
			imports: [TestComponent, FocusDirective],
		}).compileComponents();

		fixture = TestBed.createComponent(TestComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should focus the h1", (): void => {
		const h1 = fixture.debugElement.query(By.css("h1.header"));
		expect(h1.nativeElement.tabIndex).toBe(-1);
	});
});
