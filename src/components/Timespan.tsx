import React, { ChangeEvent, FC, ReactNode } from "react";

import { HStack } from "@chakra-ui/react";

import DateSelector from "./DateSelector";

class TimespanDate {
	month?: string;
	day?: string;
	year?: string;
}

type monthCB = (month: ChangeEvent<HTMLSelectElement>) => void;
type dayCB = (day: string) => void;
type yearCB = (year: string) => void;

interface timespanElemProps {
	key: number;

	monthCBStart: monthCB;
	dayCBStart: dayCB;
	yearCBStart: yearCB;

	monthCBEnd: monthCB;
	dayCBEnd: dayCB;
	yearCBEnd: yearCB;
}

const TimespanElem: FC<timespanElemProps> = (props: timespanElemProps) => {
	return (
		<HStack>
			<DateSelector
				monthCallback={props.monthCBStart}
				dayCallback={props.dayCBStart}
				yearCallback={props.yearCBStart}
			/>
			<span>&#10230;</span>
			<DateSelector
				monthCallback={props.monthCBEnd}
				dayCallback={props.dayCBEnd}
				yearCallback={props.yearCBEnd}
			/>
		</HStack>
	);
};

class Timespan {
	public startDate: TimespanDate = {};
	public endDate: TimespanDate = {};

	public elem: ReactNode;

	public constructor(key: number) {
		this.elem = (
			<TimespanElem
				key={key}
				monthCBStart={(month: ChangeEvent<HTMLSelectElement>) => {
					this.startDate.month = month.target.value;
				}}
				dayCBStart={(day: string) => {
					this.startDate.day = day;
				}}
				yearCBStart={(year: string) => {
					this.startDate.year = year;
				}}
				monthCBEnd={(month: ChangeEvent<HTMLSelectElement>) => {
					this.endDate.month = month.target.value;
				}}
				dayCBEnd={(day: string) => {
					this.endDate.day = day;
				}}
				yearCBEnd={(year: string) => {
					this.endDate.year = year;
				}}
			/>
		);
	}
}

export default Timespan;
