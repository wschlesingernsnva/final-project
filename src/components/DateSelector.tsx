import React from "react";
import {
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
	HStack,
	Select,
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
for (let month of months) {
	monthOptions.push(<option value={month}>{month}</option>);
}

const DateNumField = () => (
	<>
		<NumberInputField />
		<NumberInputStepper>
			<NumberIncrementStepper />
			<NumberDecrementStepper />
		</NumberInputStepper>
	</>
);

const DateSelector = () => {
	let date: Date = new Date();

	return (
		<HStack>
			<Select maxW={36} defaultValue={months.at(date.getMonth())}>
				{monthOptions}
			</Select>
			<NumberInput
				defaultValue={date.getDate()}
				min={1}
				max={31}
				step={1}
				precision={0}
				maxW={20}
			>
				<DateNumField />
			</NumberInput>
			<NumberInput
				defaultValue={date.getFullYear()}
				min={1}
				step={1}
				precision={0}
				maxW={24}
			>
				<DateNumField />
			</NumberInput>
		</HStack>
	);
};

export default DateSelector;
