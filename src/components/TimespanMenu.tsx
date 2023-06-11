import React from "react";

import { VStack } from "@chakra-ui/react";

import Timespan from "./Timespan";

export const timespans: Timespan[] = [new Timespan(0), new Timespan(1)];

const TimespanMenu = () => {
	const timespanElems = [];
	for (let timespan of timespans) {
		timespanElems.push(timespan.elem);
	}

	return (
		<VStack
			borderWidth={1}
			borderRadius="var(--chakra-radii-md)"
			margin={4}
			padding={4}
			alignItems="flex-start"
			justifyContent="flex-start"
		>
			{timespanElems}
		</VStack>
	);
};

export default TimespanMenu;
