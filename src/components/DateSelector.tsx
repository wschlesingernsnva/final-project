import React, { ChangeEvent, FC, ReactNode, useState } from "react";
import {
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
	HStack,
	Select,
	SelectProps,
	NumberInputProps,
} from "@chakra-ui/react";

import { updateGraph } from "src/App";

interface Month {
	name: string;
	days?: number;
}

const months: Month[] = [
	{ name: "January", days: 31 },
	{ name: "February" },
	{ name: "March", days: 31 },
	{ name: "April", days: 30 },
	{ name: "May", days: 31 },
	{ name: "June", days: 30 },
	{ name: "July", days: 31 },
	{ name: "August", days: 31 },
	{ name: "September", days: 30 },
	{ name: "October", days: 31 },
	{ name: "November", days: 30 },
	{ name: "December", days: 31 },
];

const monthOptions: React.JSX.Element[] = [];

for (let monthIndex in months) {
	let monthName: string = months[monthIndex].name;
	monthOptions.push(
		<option key={monthIndex} value={monthIndex}>
			{monthName}
		</option>
	);
}

const MonthSelect: FC<SelectProps> = (props: SelectProps) => {
	return (
		<Select
			maxW={36}
			defaultValue={props.defaultValue}
			onChange={props.onChange}
		>
			{monthOptions}
		</Select>
	);
};

const DateNumField: FC = () => (
	<>
		<NumberInputField />
		<NumberInputStepper>
			<NumberIncrementStepper />
			<NumberDecrementStepper />
		</NumberInputStepper>
	</>
);

const DaySelect: FC<NumberInputProps> = (props: NumberInputProps) => {
	return (
		<NumberInput
			defaultValue={props.defaultValue}
			min={1}
			max={props.max}
			step={1}
			precision={0}
			maxW={20}
			onChange={props.onChange}
			value={props.value}
		>
			<DateNumField />
		</NumberInput>
	);
};

const YearSelect: FC<NumberInputProps> = (props: NumberInputProps) => {
	return (
		<NumberInput
			defaultValue={props.defaultValue}
			min={1}
			step={1}
			precision={0}
			maxW={24}
			onChange={props.onChange}
		>
			<DateNumField />
		</NumberInput>
	);
};

export interface DateObj {
	month: number;
	day: number;
	year: number;
}

type DateCB = (value: number) => void;

interface DateCallbacks {
	month: DateCB;
	day: DateCB;
	year: DateCB;
}

interface DateSelectorElemProps {
	callbacks: DateCallbacks;
	defaultDate: DateObj;
}

function isLeapYear(year: number) {
	return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

function getMaxDay(month: number, year: number) {
	const FEB_INDEX: number = 1;

	if (month === FEB_INDEX) {
		if (isLeapYear(year)) {
			// Leap year
			return 29;
		} else {
			// Common year
			return 28;
		}
	} else {
		return months[month].days!;
	}
}

const DateSelectorElem: FC<DateSelectorElemProps> = (
	props: DateSelectorElemProps
) => {
	let date: DateObj = props.defaultDate;

	const [dayValue, setDayValue] = useState<number>(date.day);

	const updateDay = (newDay: number) => {
		setDayValue(newDay);
		date.day = newDay;
		props.callbacks.day(date.day);
	};

	const [maxDayValue, setMaxDayValue] = useState<number>(
		getMaxDay(date.month, date.year)
	);

	const updateMaxDay = (newMaxDay: number) => {
		setMaxDayValue(newMaxDay);
		if (date.day > newMaxDay) {
			updateDay(newMaxDay);
		}
	};

	const monthCallback = (event: ChangeEvent<HTMLSelectElement>) => {
		date.month = +event.target.value;
		updateMaxDay(getMaxDay(date.month, date.year));
		props.callbacks.month(date.month);
	};

	const yearCallback = (yearStr: string) => {
		date.year = +yearStr;
		updateMaxDay(getMaxDay(date.month, date.year));
		props.callbacks.year(date.year);
	};

	const dayCallback = (dayStr: string) => {
		const newDay: number = +dayStr;
		updateDay(newDay);
	};

	return (
		<HStack>
			<MonthSelect onChange={monthCallback} defaultValue={date.month} />
			<DaySelect
				onChange={dayCallback}
				defaultValue={date.day}
				max={maxDayValue}
				value={dayValue}
			/>
			<YearSelect onChange={yearCallback} defaultValue={date.year} />
		</HStack>
	);
};

class DateSelector {
	date: DateObj;
	elem: ReactNode;
	constructor() {
		const currentDate: Date = new Date();

		this.date = {
			month: currentDate.getMonth(),
			day: currentDate.getDate(),
			year: currentDate.getFullYear(),
		};

		this.elem = (
			<DateSelectorElem
				callbacks={{
					month: (month: number) => {
						this.date.month = month;
						updateGraph();
					},
					day: (day: number) => {
						this.date.day = day;
						updateGraph();
					},
					year: (year: number) => {
						this.date.year = year;
						updateGraph();
					},
				}}
				defaultDate={this.date}
			/>
		);
	}
}

export default DateSelector;
