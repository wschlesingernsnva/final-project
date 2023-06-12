import React, { FC } from "react";

import { Box } from "@chakra-ui/react";

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
		maintainAspectRatio: false,
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
					tooltipFormat: "MM/YY",
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
	return (
		<Box
			borderWidth={1}
			borderRadius="var(--chakra-radii-md)"
			margin={4}
			padding={8}
			alignItems="flex-start"
			justifyContent="flex-start"
		>
			<Bar className="graph" options={options} data={data} />
		</Box>
	);
};

export default Graph;
