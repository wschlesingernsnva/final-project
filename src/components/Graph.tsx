import React, { FC } from "react";

import { ChartData } from "chart.js";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import "chartjs-adapter-luxon";

interface GraphProps {
	min: string;
	max: string;
	data: string[][];
}

const Graph: FC<GraphProps> = (props: GraphProps) => {
	const options = {
		indexAxis: "y" as const,
		plugins: {
			legend: {
				display: false,
			},
		},
		scales: {
			x: {
				type: "time" as const,
				time: {
					displayFormat: { day: "MM/YY" },
					tooltipFormat: "DD/MM/YY",
					unit: "day" as const,
				},
				min: props.min,
				max: props.max,
			},
			// x: [
			// 	// {
			// 	// 	// type: "time",
			// 	// },
			// ],
		},
		// xAxes: {
		// 	time: {
		// 		displayFormat: { day: "MM/YY" },
		// 		tooltipFormat: "DD/MM/YY",
		// 		unit: "month",
		// 	},
		// },
	};
	const data: ChartData<"bar", string[][], string> = {
		labels: ["label1", "label2", "label3"],
		datasets: [
			{
				data: props.data,
			},
		],
	};
	return <Bar className="graph" options={options} data={data} />;
};

export default Graph;
