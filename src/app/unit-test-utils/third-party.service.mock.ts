/**
 * File containing mocked providers for third party services
 */

import { LiveAnnouncer } from "@angular/cdk/a11y";
import { Provider } from "@angular/core";

export class LiveAnnouncerMock {
	announce(message: string): void {}
}

export function provideMockLiveAnnouncer(): Provider {
	return { provide: LiveAnnouncer, useClass: LiveAnnouncerMock };
}
