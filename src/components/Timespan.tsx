import React, { ChangeEvent, FC, ReactNode } from "react";

import { HStack } from "@chakra-ui/react";

import DateSelector, { DateObj, dayCB, monthCB, yearCB } from "./DateSelector";

interface timespanElemProps {
	defaultDate: DateObj;

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
				defaultDate={props.defaultDate}
				monthCallback={props.monthCBStart}
				dayCallback={props.dayCBStart}
				yearCallback={props.yearCBStart}
			/>
			<span>&#10230;</span>
			<DateSelector
				defaultDate={props.defaultDate}
				monthCallback={props.monthCBEnd}
				dayCallback={props.dayCBEnd}
				yearCallback={props.yearCBEnd}
			/>
		</HStack>
	);
};

class Timespan {
	public startDate: DateObj;
	public endDate: DateObj;

	public elem: ReactNode;

	public constructor(key: number) {
		const date: Date = new Date();

		const defaultDate = {
			month: date.getMonth(),
			day: date.getDate(),
			year: date.getFullYear(),
		};

		this.startDate = defaultDate;
		this.endDate = defaultDate;

		this.elem = (
			<TimespanElem
				key={key}
				defaultDate={defaultDate}
				monthCBStart={(event: ChangeEvent<HTMLSelectElement>) => {
					this.startDate.month = +event.target.value;
				}}
				dayCBStart={(day: string) => {
					this.startDate.day = +day;
				}}
				yearCBStart={(year: string) => {
					this.startDate.year = +year;
				}}
				monthCBEnd={(event: ChangeEvent<HTMLSelectElement>) => {
					this.endDate.month = +event.target.value;
				}}
				dayCBEnd={(day: string) => {
					this.endDate.day = +day;
				}}
				yearCBEnd={(year: string) => {
					this.endDate.year = +year;
				}}
			/>
		);
	}
}

export default Timespan;
