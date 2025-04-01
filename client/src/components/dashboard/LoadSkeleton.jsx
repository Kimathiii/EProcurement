const LoadSkeleton = () => {
	return (
		<div className="flex justify-between items-center py-2">
			<div className="h-10 w-3/5 bg-gray-200 rounded animate-pulse"></div>
			<div className="h-10 w-2/5 bg-gray-200 rounded animate-pulse"></div>
		</div>
	);
};

export default LoadSkeleton;
