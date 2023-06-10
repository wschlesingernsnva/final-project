import React, { ChangeEventHandler, FC } from "react";
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

const months: string[] = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

const monthOptions: React.JSX.Element[] = [];
for (let monthIndex in months) {
	let month: string = months[monthIndex];
	monthOptions.push(
		<option key={monthIndex} value={monthIndex}>
			{month}
		</option>
	);
}

const DateNumField: FC = () => (
	<>
		<NumberInputField />
		<NumberInputStepper>
			<NumberIncrementStepper />
			<NumberDecrementStepper />
		</NumberInputStepper>
	</>
);

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

const DaySelect: FC<NumberInputProps> = (props: NumberInputProps) => {
	return (
		<NumberInput
			defaultValue={props.defaultValue}
			min={1}
			max={31}
			step={1}
			precision={0}
			maxW={20}
			onChange={props.onChange}
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

export type monthCB = ChangeEventHandler<HTMLSelectElement>;
export type dayCB = (day: string) => void;
export type yearCB = (year: string) => void;

interface DateSelectorProps {
	defaultDate: DateObj;
	monthCallback: monthCB;
	dayCallback: dayCB;
	yearCallback: yearCB;
}

const DateSelector: FC<DateSelectorProps> = (props: DateSelectorProps) => {
	return (
		<HStack>
			<MonthSelect
				onChange={props.monthCallback}
				defaultValue={props.defaultDate.month}
			/>
			<DaySelect
				onChange={props.dayCallback}
				defaultValue={props.defaultDate.day}
			/>
			<YearSelect
				onChange={props.yearCallback}
				defaultValue={props.defaultDate.year}
			/>
		</HStack>
	);
};

export default DateSelector;
