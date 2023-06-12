import React, { FC } from "react";

import { HStack } from "@chakra-ui/react";

import { DateTime } from "luxon";

import NameSelector from "./NameSelector";
import DateSelector from "./DateSelector";
import { TimespanMenuProps } from "./TimespanMenu";

export interface Timespan {
	label: string;
	start: DateTime;
	end: DateTime;
}

interface TimespanSelectorProps extends TimespanMenuProps {
	id: number;
}

const TimespanSelector: FC<TimespanSelectorProps> = (
	props: TimespanSelectorProps
) => {
	const getStartDate = () => props.timespans[props.id].start;
	const getEndDate = () => props.timespans[props.id].end;

	const setLabel = (label: string) => {
		const newTimespans: Timespan[] = Object.assign([], props.timespans);
		newTimespans[props.id].label = label;
		props.setTimespans(newTimespans);
	};

	const setStartDate = (date: DateTime) => {
		const newTimespans: Timespan[] = Object.assign([], props.timespans);
		newTimespans[props.id].start = date;
		props.setTimespans(newTimespans);
	};

	const setEndDate = (date: DateTime) => {
		const newTimespans: Timespan[] = Object.assign([], props.timespans);
		newTimespans[props.id].end = date;
		props.setTimespans(newTimespans);
	};

	// TEMP NOTE: need to force startDate to be smaller than endDate

	return (
		<HStack>
			<NameSelector setLabel={setLabel} />
			<DateSelector getDate={getStartDate} setDate={setStartDate} />
			<span>&#10230;</span>
			<DateSelector getDate={getEndDate} setDate={setEndDate} />
		</HStack>
	);
};

export default TimespanSelector;
