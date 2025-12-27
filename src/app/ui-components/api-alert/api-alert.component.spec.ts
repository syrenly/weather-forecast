import { ComponentFixture, TestBed } from "@angular/core/testing";

import { provideMockLicenseService } from "../../unit-test-utils/license.service.mock";
import { provideMockLiveAnnouncer } from "../../unit-test-utils/third-party.service.mock";
import { ApiAlertComponent } from "./api-alert.component";

describe("ApiAlertComponent", () => {
	let component: ApiAlertComponent;
	let fixture: ComponentFixture<ApiAlertComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ApiAlertComponent],
			providers: [provideMockLicenseService(), provideMockLiveAnnouncer()],
		}).compileComponents();

		fixture = TestBed.createComponent(ApiAlertComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
