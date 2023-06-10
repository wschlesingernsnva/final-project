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
		<option key={monthIndex} value={month}>
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
	let date: Date = new Date();
	return (
		<Select
			maxW={36}
			defaultValue={months.at(date.getMonth())}
			onChange={props.onChange}
		>
			{monthOptions}
		</Select>
	);
};

const DaySelect: FC<NumberInputProps> = (props: NumberInputProps) => {
	let date: Date = new Date();
	return (
		<NumberInput
			defaultValue={date.getDate()}
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
	let date: Date = new Date();
	return (
		<NumberInput
			defaultValue={date.getFullYear()}
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

interface DateSelectorProps {
	monthCallback: ChangeEventHandler<HTMLSelectElement>;
	dayCallback: (day: string) => void;
	yearCallback: (year: string) => void;
}

const DateSelector: FC<DateSelectorProps> = (props: DateSelectorProps) => {
	return (
		<HStack>
			<MonthSelect onChange={props.monthCallback} />
			<DaySelect onChange={props.dayCallback} />
			<YearSelect onChange={props.yearCallback} />
		</HStack>
	);
};

export default DateSelector;
