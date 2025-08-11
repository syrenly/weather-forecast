/**
 * File containing consts used to style the charts
 */

export const MILLISECONDS_IN_SECOND = 1000;

// light color for dark mode
const color = "#FFFFFF";
// #region options for chartJS
export const mainOptions = {
	elements: { line: { tension: 0 } },
	maintainAspectRatio: false,
	responsive: true,
};
// light options use default color
export const lightOptions = {
	scales: {
		x: {
			display: true,
			ticks: {
				display: true,
			},
			grid: {
				display: true,
			},
		},
		y: {
			display: true,
			ticks: {
				display: true,
				stepSize: 1,
			},
			grid: {
				display: true,
			},
		},
	},
};
// dark options use light color for lines and text
export const darkOptions = {
	plugins: {
		legend: {
			labels: {
				color,
			},
		},
	},
	scales: {
		x: {
			display: true,
			ticks: {
				display: true,
				color,
			},
			grid: {
				display: true,
				color,
			},
		},
		y: {
			display: true,
			ticks: {
				display: true,
				color,
				stepSize: 1,
			},
			grid: {
				display: true,
				color,
			},
		},
	},
};
// #endregion
