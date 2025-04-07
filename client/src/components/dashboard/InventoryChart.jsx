import { Doughnut } from "react-chartjs-2";
import LoadSkeleton from "./LoadSkeleton";

const InventoryChart = ({ inventoryData }) => {
	const statusCounts = inventoryData?.reduce((acc, item) => {
		acc[item.status] = (acc[item.status] || 0) + 1;
		return acc;
	}, {});
	const loadLength = [1, 2];

	const inventoryChartData = {
		labels: "",
		datasets: [
			{
				label: "Status",
				data: statusCounts && Object.values(statusCounts), // Use counts as data
				backgroundColor: [
					"#FF6384",
					"#36A2EB",
					"#FFCE56",
					"#4BC0C0",
					"#9966FF",
					"#FF9F40",
				],
			},
		],
	};
	return (
		<div className="w-full flex items-center justify-between bg-white p-4 rounded-lg">
			{inventoryData?.length ? (
				<div>
					<aside className="flex space-x-2 items-center">
						<p className="text-3xl font-bold text-blue-500">
							{inventoryData?.length
								? inventoryData?.length < 10
									? `0${inventoryData?.length}`
									: inventoryData?.length
								: "0000"}
						</p>
						<p className="text-gray-500">Total Inventory</p>
					</aside>
					<aside className="flex space-x-2 items-center">
						<p className="text-xl font-bold text-blue-500">
							{statusCounts && Object.values(statusCounts)[0]}
						</p>
						<p>Out of Stock</p>
					</aside>
					<aside className="flex space-x-2 items-center">
						<p className="text-xl font-bold text-blue-500">
							{statusCounts && Object.values(statusCounts)[1]}
						</p>
						<p>In Stock</p>
					</aside>
				</div>
			) : (
				<>
					{loadLength.map((load) => (
						<div className="flex flex-col" key={load}>
							<p className="w-24 animate-pulse bg-gray-200 p-3"></p>
							<p className="w-32 animate-pulse mt-2 bg-gray-200 p-3"></p>
						</div>
					))}
				</>
			)}

			<div className="text-gray-400 text-5xl h-[100px]">
				<Doughnut data={inventoryChartData} />
			</div>
		</div>
	);
};

export default InventoryChart;
