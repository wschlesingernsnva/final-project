import React, { ChangeEvent, FC, useState } from "react";

import { HStack } from "@chakra-ui/react";

import { DateTime } from "luxon";

import { MonthSelect, DaySelect, YearSelect } from "./DateInfoSelectors";

interface DateSelectorProps {
	getDate: () => DateTime;
	setDate: (date: DateTime) => void;
}

const DateSelector: FC<DateSelectorProps> = (props: DateSelectorProps) => {
	const [dayValue, setDayValue] = useState<number>(props.getDate().day);

	const updateDay = (newDay: number) => {
		setDayValue(newDay);
		props.setDate(props.getDate().set({ day: newDay }));
	};

	const [maxDayValue, setMaxDayValue] = useState<number>(
		props.getDate().daysInMonth!
	);

	const updateMaxDay = (newMaxDay: number) => {
		setMaxDayValue(newMaxDay);
		if (props.getDate().day > newMaxDay) {
			updateDay(newMaxDay);
		}
	};

	const monthCallback = (event: ChangeEvent<HTMLSelectElement>) => {
		const newDate: DateTime = props.getDate().set({
			month: +event.target.value + 1,
		});
		props.setDate(newDate);
		updateMaxDay(newDate.daysInMonth!);
	};

	const yearCallback = (yearStr: string) => {
		const newYear: number = +yearStr;

		// TEMP NOTE: need to check here later to ensure that year is valid

		const newDate: DateTime = props.getDate().set({ year: newYear });
		props.setDate(newDate);
		updateMaxDay(newDate.daysInMonth!);
	};

	const dayCallback = (dayStr: string) => {
		const newDay: number = +dayStr;

		// TEMP NOTE: need to check here later to ensure that day is valid

		updateDay(newDay);
	};

	return (
		<HStack>
			<MonthSelect
				onChange={monthCallback}
				defaultValue={props.getDate().month - 1}
			/>
			<DaySelect
				onChange={dayCallback}
				defaultValue={props.getDate().day}
				max={maxDayValue}
				value={dayValue}
			/>
			<YearSelect onChange={yearCallback} defaultValue={props.getDate().year} />
		</HStack>
	);
};

export default DateSelector;
