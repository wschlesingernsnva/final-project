import React, { FC } from "react";

import { ChartData } from "chart.js";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import "chartjs-adapter-luxon";

interface GraphProps {
	min: string;
	max: string;
	data: string[][];
	labels: string[];
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
		},
	};
	const data: ChartData<"bar", string[][], string> = {
		labels: props.labels,
		datasets: [
			{
				data: props.data,
			},
		],
	};
	return <Bar className="graph" options={options} data={data} />;
};

export default Graph;
