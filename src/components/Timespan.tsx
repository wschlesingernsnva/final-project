import React, { FC, ReactNode } from "react";

import { HStack } from "@chakra-ui/react";

import DateSelector from "./DateSelector";

interface TimespanElemProps {
	start: ReactNode;
	end: ReactNode;
}

const TimespanElem: FC<TimespanElemProps> = (props: TimespanElemProps) => {
	return (
		<HStack>
			{props.start}
			<span>&#10230;</span>
			{props.end}
		</HStack>
	);
};

class Timespan {
	public startDate: DateSelector;
	public endDate: DateSelector;

	public elem: ReactNode;

	public constructor(key: number) {
		this.startDate = new DateSelector();
		this.endDate = new DateSelector();

		this.elem = (
			<TimespanElem
				key={key}
				start={this.startDate.elem}
				end={this.endDate.elem}
			/>
		);
	}
}

export default Timespan;
