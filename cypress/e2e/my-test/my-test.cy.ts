import { getRandomElements } from "../../../src/app/home/home.utils";

it("visit Cypress", () => {
	cy.visit("/");
	cy.contains("What's the weather like?");
});

describe("add examples", () => {
	it("test 1", () => {
		expect(1 + 2).to.equal(3);
	});

	it("test 2", () => {
		expect(1 + 2).to.equal(3);
	});
});

describe("subtract examples", () => {
	it("test 3", () => {
		expect(1 - 2).to.equal(-1);
	});

	it("test 4", () => {
		expect(1 - 2).to.equal(-1);
	});
});

describe("src\\app\\home\\home.utils.ts", (): void => {
	const array = [0, 1, 2];
	it("should test #getRandomElements", (): void => {
		const randomCities = getRandomElements(array, 3);
		let areRandom = false;
		let i = 0;
		while (i < array.length && !areRandom) {
			areRandom = randomCities[0] === array[0];
			i++;
		}
		expect(areRandom).to.equal(true);
	});
});
