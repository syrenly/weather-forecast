import * as homeUtils from "./home.utils";

describe("src\\app\\home\\home.utils.ts", (): void => {
	const array = [0, 1, 2];
	it("should test #getRandomElements", (): void => {
		const randomCities = homeUtils.getRandomElements(array, 3);
		let areRandom = false;
		let i = 0;
		while (i < array.length && !areRandom) {
			areRandom = randomCities[0] === array[0];
			i++;
		}
		expect(areRandom).toBeTrue();
	});
});
