import React, { ChangeEvent, ChangeEventHandler, FC, ReactNode } from "react";

import { HStack } from "@chakra-ui/react";

import NameSelector from "./NameSelector";
import DateSelector from "./DateSelector";

import { updateGraph } from "src/App";

interface TimespanElemProps {
	nameCallback: ChangeEventHandler<HTMLInputElement>;
	start: ReactNode;
	end: ReactNode;
}

const TimespanElem: FC<TimespanElemProps> = (props: TimespanElemProps) => {
	return (
		<HStack>
			<NameSelector callback={props.nameCallback} />
			{props.start}
			<span>&#10230;</span>
			{props.end}
		</HStack>
	);
};

class Timespan {
	public startDate: DateSelector;
	public endDate: DateSelector;

	public label: string;

	public elem: ReactNode;

	public constructor(key: number) {
		this.startDate = new DateSelector();
		this.endDate = new DateSelector();

		const nameCallback = (event: ChangeEvent<HTMLInputElement>) => {
			this.label = event.target.value;
			updateGraph();
		};

		this.elem = (
			<TimespanElem
				key={key}
				nameCallback={nameCallback}
				start={this.startDate.elem}
				end={this.endDate.elem}
			/>
		);
	}
}

export default Timespan;
