import React, { FC, useEffect, useState } from "react";

import { Button, VStack } from "@chakra-ui/react";

import TimespanSelector, { Timespan } from "./TimespanSelector";
import { DateTime } from "luxon";

export interface TimespanMenuProps {
	timespans: Timespan[];
	setTimespans: React.Dispatch<React.SetStateAction<Timespan[]>>;
}

const TimespanMenu: FC<TimespanMenuProps> = (props: TimespanMenuProps) => {
	const [timespanSelectors, setTimespanSelectors] = useState<
		React.JSX.Element[]
	>([
		<TimespanSelector
			id={0}
			timespans={props.timespans}
			setTimespans={props.setTimespans}
		/>,
		<TimespanSelector
			id={1}
			timespans={props.timespans}
			setTimespans={props.setTimespans}
		/>,
	]);

	const buttonCallback = () => {
		props.setTimespans([
			...props.timespans,
			{
				label: "",
				start: DateTime.now(),
				end: DateTime.now(),
			},
		]);
	};

	useEffect(() => {
		for (
			let selectorCount: number = timespanSelectors.length;
			selectorCount < props.timespans.length;
			selectorCount++
		) {
			setTimespanSelectors([
				...timespanSelectors,
				<TimespanSelector
					id={selectorCount}
					timespans={props.timespans}
					setTimespans={props.setTimespans}
				/>,
			]);
		}
	}, [timespanSelectors, props.timespans, props.setTimespans]);

	return (
		<VStack
			borderWidth={1}
			borderRadius="var(--chakra-radii-md)"
			margin={4}
			padding={4}
			alignItems="flex-start"
			justifyContent="flex-start"
		>
			{timespanSelectors}
			<Button onClick={buttonCallback}>+</Button>
		</VStack>
	);
};

export default TimespanMenu;
