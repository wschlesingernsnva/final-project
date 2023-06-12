import React, { FC } from "react";

import { HStack } from "@chakra-ui/react";

import { DateTime } from "luxon";

import NameSelector from "./NameSelector";
import DateSelector from "./DateSelector";
import { TimespanMenuProps } from "./TimespanMenu";

// TEMP: RENAME LATER
export interface TimespanInt {
	label: string;
	start: DateTime;
	end: DateTime;
}

// TEMP: DELETE LATER
// interface TimespanElemProps {
// 	nameCallback: ChangeEventHandler<HTMLInputElement>;
// 	start: ReactNode;
// 	end: ReactNode;
// }

interface TimespanSelectorProps extends TimespanMenuProps {
	id: number;
}

const TimespanSelector: FC<TimespanSelectorProps> = (
	props: TimespanSelectorProps
) => {
	// const [label, setLabel] = useState<string>("");
	// const [startDate, setStartDate] = useState<DateTime>(DateTime.now());
	// const [endDate, setEndDate] = useState<DateTime>(DateTime.now());

	// TEMP NOTE: could potentially replace getStartDate, etc. with just startDate, etc. --
	// might not work for label though since it's not an object

	//const getLabel = () => props.timespans[props.key].label;
	const getStartDate = () => props.timespans[props.id].start;
	const getEndDate = () => props.timespans[props.id].end;

	const setLabel = (label: string) => {
		const newTimespans: TimespanInt[] = Object.assign([], props.timespans);
		newTimespans[props.id].label = label;
		props.setTimespans(newTimespans);
	};

	const setStartDate = (date: DateTime) => {
		const newTimespans: TimespanInt[] = Object.assign([], props.timespans);
		newTimespans[props.id].start = date;
		props.setTimespans(newTimespans);
	};

	const setEndDate = (date: DateTime) => {
		const newTimespans: TimespanInt[] = Object.assign([], props.timespans);
		newTimespans[props.id].end = date;
		props.setTimespans(newTimespans);
	};

	return (
		<HStack>
			<NameSelector setLabel={setLabel} />
			<DateSelector getDate={getStartDate} setDate={setStartDate} />
			<span>&#10230;</span>
			<DateSelector getDate={getEndDate} setDate={setEndDate} />
		</HStack>
	);
};

// class Timespan {
// 	public startDate: DateSelector;
// 	public endDate: DateSelector;

// 	public label: string;

// 	public elem: ReactNode;

// 	public constructor(key: number) {
// 		this.startDate = new DateSelector();
// 		this.endDate = new DateSelector();

// 		const nameCallback = (event: ChangeEvent<HTMLInputElement>) => {
// 			this.label = event.target.value;
// 			updateGraph();
// 		};

// 		this.elem = (
// 			<TimespanElem
// 				key={key}
// 				nameCallback={nameCallback}
// 				start={this.startDate.elem}
// 				end={this.endDate.elem}
// 			/>
// 		);
// 	}
// }

export default TimespanSelector;
