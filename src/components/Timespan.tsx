import React from "react";

import { HStack } from "@chakra-ui/react";

import DateSelector from "./DateSelector";

const Timespan = () => {
	return (
		<HStack>
			<DateSelector />
			<span>&#10230;</span>
			<DateSelector />
		</HStack>
	);
};

export default Timespan;
