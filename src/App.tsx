import React, { useState } from "react";

import { ChakraProvider } from "@chakra-ui/react";

import { DateTime } from "luxon";

import TimespanMenu from "./components/TimespanMenu";
import Graph from "./components/Graph";

import { timespans } from "./components/TimespanMenu";
import { DateObj } from "./components/DateSelector";

export let updateGraph: () => void;

function App() {
	const dt: DateTime = DateTime.now();
	const [dateMin, setDateMin] = useState<string>(dt.toISO()!);
	const [dateMax, setDateMax] = useState<string>(
		dt.plus({ years: 1 }).toISO()!
	);
	const [data, setData] = useState<string[][]>([]);

	// TEMP
	// setInterval(() => {
	// 	setDateMin(dateMin);
	// 	setDateMax(dateMax);
	// }, 5000);

	// TEMP NOTE: need to force startDate to be smaller than endDate later

	const updateGraphInternal = () => {
		// TEMP NOTE: currently dates are stored as DateObj. they should be converted to luxon DateTime objects later

		const newData: string[][] = [];

		let initStartDateObj: DateObj = Object.assign(
			[],
			timespans[0].startDate.date
		);
		let initEndDateObj: DateObj = Object.assign([], timespans[0].endDate.date);
		initStartDateObj.month += 1;
		initEndDateObj.month += 1;

		let min: DateTime = DateTime.fromObject(initStartDateObj);
		let max: DateTime = DateTime.fromObject(initEndDateObj);

		for (
			let timespanIndex: number = 0;
			timespanIndex < timespans.length;
			timespanIndex++
		) {
			const thisTimespan = timespans[timespanIndex];

			let thisStartDateObj: DateObj = Object.assign(
				[],
				thisTimespan.startDate.date
			);
			let thisEndDateObj: DateObj = Object.assign(
				[],
				thisTimespan.endDate.date
			);
			thisStartDateObj.month += 1;
			thisEndDateObj.month += 1;

			const thisStartDate: DateTime = DateTime.fromObject(thisStartDateObj);
			const thisEndDate: DateTime = DateTime.fromObject(thisEndDateObj);

			newData.push([thisStartDate.toISO()!, thisEndDate.toISO()!]);

			// Don't need to compare first object to anything for maxes/mins
			if (timespanIndex === 0) {
				continue;
			}

			if (thisStartDate < min) {
				min = thisStartDate;
			}
			if (thisEndDate > max) {
				max = thisEndDate;
			}
		}

		setData(newData);

		setDateMin(min.toISO()!);
		if (min.equals(max)) {
			setDateMax(max.plus({ years: 1 }).toISO()!);
		} else {
			setDateMax(max.toISO()!);
		}
	};
	updateGraph = updateGraphInternal;

	return (
		<ChakraProvider>
			<TimespanMenu />
			<Graph min={dateMin} max={dateMax} data={data} />
		</ChakraProvider>
	);
}

export default App;
