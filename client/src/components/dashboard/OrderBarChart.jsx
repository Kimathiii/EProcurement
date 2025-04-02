import { Bar } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

const OrderBarChart = ({ orders }) => {
	const labels = orders?.map((order) => order.supplier_id.name);
	const data = orders?.map((order) => order.total_amount);

	const chartData = {
		labels: labels,
		datasets: [
			{
				label: "Total Amount",
				data: data,
				backgroundColor: "#36A2EB",
				borderColor: "rgba(75, 192, 192, 1)",
				borderWidth: 1,
			},
		],
	};

	const options = {
		plugins: {
			legend: {
				position: "top",
			},
			title: {
				display: true,
				text: "Order Total Amounts by Supplier",
			},
		},
		scales: {
			y: {
				beginAtZero: true,
				ticks: {
					callback: (value) => `${value}`,
				},
			},
		},
	};

	return (
		<div className="w-[600px] mx-auto">
			{" "}
			<Bar data={chartData} options={options} />
		</div>
	);
};

export default OrderBarChart;
