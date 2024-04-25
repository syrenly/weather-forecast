import { FlagPipe } from "./flag.pipe";

describe("FlagPipe", (): void => {
	it("create an instance", (): void => {
		const pipe = new FlagPipe();
		expect(pipe).toBeTruthy();
	});
});
