import React from "react";

import { ChakraProvider } from "@chakra-ui/react";

import TimespanMenu from "./components/TimespanMenu";

function App() {
	return (
		<ChakraProvider>
			<TimespanMenu />
		</ChakraProvider>
	);
}

export default App;
