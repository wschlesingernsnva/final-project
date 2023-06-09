import React from "react";

import { ChakraProvider, VStack } from "@chakra-ui/react";

import Timespan from "./components/Timespan";

function App() {
	return (
		<ChakraProvider>
			<VStack
				borderWidth={1}
				borderRadius="var(--chakra-radii-md)"
				margin={4}
				padding={4}
				alignItems="flex-start"
				justifyContent="flex-start"
			>
				<Timespan />
				<Timespan />
				<Timespan />
			</VStack>
		</ChakraProvider>
	);
}

export default App;
