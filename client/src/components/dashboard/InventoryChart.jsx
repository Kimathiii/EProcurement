import { Doughnut } from "react-chartjs-2";

const InventoryChart = ({ inventoryData }) => {
	const statusCounts = inventoryData?.reduce((acc, item) => {
		acc[item.status] = (acc[item.status] || 0) + 1;
		return acc;
	}, {});

	const inventoryChartData = {
		labels: "", // Use statuses as labels
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
				], // Add more colors if needed
			},
		],
	};
	return (
		<div className="w-full flex items-center justify-between bg-white p-4 rounded-lg">
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

			<div className="text-gray-400 text-5xl h-[100px]">
				<Doughnut data={inventoryChartData} />
			</div>
		</div>
	);
};

export default InventoryChart;
