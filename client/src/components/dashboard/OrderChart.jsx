import { Doughnut } from "react-chartjs-2";

const OrderChart = ({ status, orderData }) => {
	const loadLength = [1, 2];
	const orderChartData = {
		labels: "", // Use statuses as labels
		datasets: [
			{
				label: "Inventory Status",
				data: status && Object.values(status), // Use counts as data
				backgroundColor: ["#FF9F40", "#4BC2C1"], // Add more colors if needed
			},
		],
	};
	return (
		<div className="flex items-center w-full justify-between bg-white p-4 rounded-lg my-4">
			{orderData?.length ? (
				<div>
					<aside className="flex space-x-2 items-center">
						<p className="text-3xl font-bold text-blue-500">
							{orderData?.length
								? orderData?.length < 10
									? `0${orderData?.length}`
									: orderData?.length
								: "0000"}
						</p>
						<p className="text-gray-500">Total Orders</p>
					</aside>
					<aside className="flex space-x-2 items-center">
						<p className="text-xl font-bold text-blue-500">
							{status && Object.values(status)[0]}
						</p>
						<p>Pending</p>
					</aside>
					<aside className="flex space-x-2 items-center">
						<p className="text-xl font-bold text-blue-500">
							{status && Object.values(status)[1]}
						</p>
						<p>Completed</p>
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
			<div className="text-gray-400 h-[100px]">
				<Doughnut data={orderChartData} />
			</div>
		</div>
	);
};

export default OrderChart;
