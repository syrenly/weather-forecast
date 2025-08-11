const DEFAULT_RANDOM_ELEMENTS: number = 4;

export function getRandomElements<T>(array: T[], numberOfItems = DEFAULT_RANDOM_ELEMENTS): T[] {
	// eslint-disable-next-line no-magic-numbers
	const shuffled = array.sort((): number => 0.5 - Math.random());
	return shuffled.slice(0, numberOfItems);
}
