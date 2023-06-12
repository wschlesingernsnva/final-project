import React, { useState, useEffect } from "react";

import { ChakraProvider } from "@chakra-ui/react";

import { DateTime } from "luxon";

import TimespanMenu from "./components/TimespanMenu";
import Graph from "./components/Graph";

import { TimespanInt } from "./components/Timespan";

function App() {
	const dtNow: DateTime = DateTime.now();

	const initStart: string = dtNow.toISO()!;
	const initEnd: string = dtNow.plus({ years: 1 }).toISO()!;

	const [dateMin, setDateMin] = useState<string>(initStart);
	const [dateMax, setDateMax] = useState<string>(initEnd);

	const [data, setData] = useState<string[][]>([
		[initStart, initStart],
		[initStart, initStart],
	]);

	const [labels, setLabels] = useState<string[]>(["", ""]);

	// TEMP NOTE: need to force startDate to be smaller than endDate

	// TEMP NOTE: need to not attempt to update graph when input is invalid

	const [timespans, setTimespans] = useState<TimespanInt[]>([
		{ label: "", start: dtNow, end: dtNow },
		{ label: "", start: dtNow, end: dtNow },
	]);

	useEffect(() => {
		const newLabels: string[] = [];
		const newData: string[][] = [];

		let min: DateTime = timespans[0].start;
		let max: DateTime = timespans[0].end;

		for (
			let timespanIndex: number = 0;
			timespanIndex < timespans.length;
			timespanIndex++
		) {
			const thisTimespan = timespans[timespanIndex];

			let thisStartDate: DateTime = thisTimespan.start;
			let thisEndDate: DateTime = thisTimespan.end;

			newLabels.push(thisTimespan.label);
			newData.push([thisStartDate.toISO()!, thisEndDate.toISO()!]);

			// Don't need to compare first object to itself
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

		setLabels(newLabels);
		setData(newData);

		setDateMin(min.toISO()!);
		if (min.equals(max)) {
			setDateMax(max.plus({ years: 1 }).toISO()!);
		} else {
			setDateMax(max.toISO()!);
		}
	}, [timespans]);

	return (
		<ChakraProvider>
			<TimespanMenu timespans={timespans} setTimespans={setTimespans} />
			<Graph min={dateMin} max={dateMax} data={data} labels={labels} />
		</ChakraProvider>
	);
}

export default App;
