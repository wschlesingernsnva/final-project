import React, { FC } from "react";

import {
	NumberDecrementStepper,
	NumberIncrementStepper,
	NumberInput,
	NumberInputField,
	NumberInputProps,
	NumberInputStepper,
	Select,
	SelectProps,
} from "@chakra-ui/react";

import { Info } from "luxon";

export const MonthSelect: FC<SelectProps> = (props: SelectProps) => {
	const months: string[] = Info.months();
	const monthOptions: React.JSX.Element[] = [];

	for (let monthIndex in months) {
		let monthName: string = months[monthIndex];
		monthOptions.push(
			<option key={monthIndex} value={monthIndex}>
				{monthName}
			</option>
		);
	}

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

export const DaySelect: FC<NumberInputProps> = (props: NumberInputProps) => {
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

export const YearSelect: FC<NumberInputProps> = (props: NumberInputProps) => {
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
