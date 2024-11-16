export function getRandomElements<T>(array: T[], numberOfItems: number): T[] {
	const shuffled = array.sort((): number => 0.5 - Math.random());
	return shuffled.slice(0, numberOfItems);
}
