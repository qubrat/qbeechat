import React from "react";

type SkeletonProps = {
	children?: React.ReactNode;
};

const Skeleton = ({ children }: SkeletonProps) => {
	return <div className="flex w-full gap-4 p-4 rounded-2xl bg-slate-100 animate-pulse">{children}</div>;
};

const Avatar = () => <div className="min-w-[40px] min-h-[40px] max-w-[40px] max-h-[40px] rounded-full bg-slate-200"></div>;

const Title = () => <div className="w-1/4 h-5 rounded-md bg-slate-200"></div>;

const Text = () => <div className="w-full h-4 rounded-md bg-slate-200"></div>;

const Small = () => <div className="w-3/4 h-3 rounded-md bg-slate-200"></div>;

Skeleton.Avatar = Avatar;
Skeleton.Title = Title;
Skeleton.Text = Text;
Skeleton.Small = Small;

export { Skeleton };
