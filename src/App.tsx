import React, { useState, useEffect } from "react";

import { ChakraProvider } from "@chakra-ui/react";

import { DateTime } from "luxon";

import TimespanMenu from "./components/TimespanMenu";
import Graph from "./components/Graph";

import { Timespan } from "./components/TimespanSelector";

function App() {
	const dtNow: DateTime = DateTime.now();

	// TEMP NOTE: need to not attempt to update graph when input is invalid

	const [timespans, setTimespans] = useState<Timespan[]>([
		{ label: "", start: dtNow, end: dtNow },
		{ label: "", start: dtNow, end: dtNow },
	]);

	const initMin: string = dtNow.toISO()!;
	const initMax: string = dtNow.plus({ years: 1 }).toISO()!;

	const [dateMin, setDateMin] = useState<string>(initMin);
	const [dateMax, setDateMax] = useState<string>(initMax);

	const [labels, setLabels] = useState<string[]>(["", ""]);

	const [data, setData] = useState<string[][]>([
		[initMin, initMin],
		[initMin, initMin],
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
