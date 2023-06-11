import React, { ChangeEventHandler, FC } from "react";

import { Input } from "@chakra-ui/react";

interface NameSelectorProps {
	callback: ChangeEventHandler<HTMLInputElement>;
}

const NameSelector: FC<NameSelectorProps> = (props: NameSelectorProps) => {
	return <Input placeholder="Name..." onChange={props.callback} maxW={36} />;
};

export default NameSelector;
