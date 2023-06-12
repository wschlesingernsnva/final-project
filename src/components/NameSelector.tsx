import React, { ChangeEvent, FC } from "react";

import { Input } from "@chakra-ui/react";

interface NameSelectorProps {
	setLabel: (label: string) => void;
}

const NameSelector: FC<NameSelectorProps> = (props: NameSelectorProps) => {
	const callback = (event: ChangeEvent<HTMLInputElement>) => {
		props.setLabel(event.target.value);
	};
	return <Input placeholder="Name..." onChange={callback} maxW={36} />;
};

export default NameSelector;
