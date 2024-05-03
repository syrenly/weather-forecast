import { Pipe, PipeTransform } from "@angular/core";

enum CardinalPoints {
	N,
	NNE,
	NE,
	ENE,
	E,
	ESE,
	SE,
	SSE,
	S,
	SSW,
	SW,
	WSW,
	W,
	WNW,
	NW,
	NNW,
}
/**
 * There are 16 sections: N, NNE, NE, etc...
 * In a circle there are 360 degrees, so every section (direction) is 360 / 16 = 22.5 degree wide.
 */
const DEGREES_PER_DIRECTION = 22.5;
const NUMBER_OF_DIRECTION = 16;

@Pipe({
	name: "toCardinalPoint",
	standalone: true,
})
export class ToCardinalPointPipe implements PipeTransform {
	transform(angle: number | undefined): string {
		if (!angle) {
			return "";
		}
		const section: number = Math.floor(angle / DEGREES_PER_DIRECTION);
		return CardinalPoints[section % NUMBER_OF_DIRECTION];
	}
}
