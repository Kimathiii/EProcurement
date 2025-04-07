import { Doughnut } from "react-chartjs-2";

const SupplierChart = ({ supplierData }) => {
	const chartData = {
		labels: "", // Use supplier names as labels
		datasets: [
			{
				label: "Value of Items Supplied",
				data: supplierData?.map(
					(supplier) =>
						supplier.items.reduce((total, item) => total + item.price, 0) // Sum of item prices
				),
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
	const loadLength = [1, 2];

	return (
		<div className="flex items-center w-full justify-between bg-white p-4 rounded-lg">
			{supplierData.length ? (
				<div>
					<p className="text-3xl font-bold text-blue-500">
						{supplierData?.length
							? supplierData?.length < 10
								? `0${supplierData?.length}`
								: supplierData?.length
							: "0000"}
					</p>
					<p className="text-gray-500">Total Suppliers</p>
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
				{/* <Pie data={chartData} /> */}
				<Doughnut data={chartData} />
			</div>
		</div>
	);
};

export default SupplierChart;
