import { WeatherPipe } from "./weather.pipe";

describe("WeatherPipe", (): void => {
	it("create an instance", (): void => {
		const pipe = new WeatherPipe();
		expect(pipe).toBeTruthy();
	});
});
