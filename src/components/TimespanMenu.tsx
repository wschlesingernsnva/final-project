import React, { FC } from "react";

import { VStack } from "@chakra-ui/react";

import TimespanSelector, { Timespan } from "./TimespanSelector";

export interface TimespanMenuProps {
	timespans: Timespan[];
	setTimespans: React.Dispatch<React.SetStateAction<Timespan[]>>;
}

const TimespanMenu: FC<TimespanMenuProps> = (props: TimespanMenuProps) => {
	const timespanSelectors: React.JSX.Element[] = [
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
	];

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
		</VStack>
	);
};

export default TimespanMenu;
