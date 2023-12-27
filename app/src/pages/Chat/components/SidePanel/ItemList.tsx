import React from "react";

type ItemListProps = {
	children?: React.ReactNode;
};

export const ItemList = ({ children }: ItemListProps) => {
	return <div className="flex flex-col gap-4 overflow-y-scroll scroll">{children}</div>;
};
