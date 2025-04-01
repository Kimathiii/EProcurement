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

// Register Chart.js components
ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

const OrderBarChart = ({ orders }) => {
	// Extract data for the chart
	const labels = orders?.map((order) => order.supplier_id.name); // Supplier names as labels
	const data = orders?.map((order) => order.total_amount); // Total amounts as data

	// Define the chart data
	const chartData = {
		labels: labels, // Supplier names on the x-axis
		datasets: [
			{
				label: "Total Amount",
				data: data, // Total amounts on the y-axis
				backgroundColor: "#36A2EB", // Bar color
				borderColor: "rgba(75, 192, 192, 1)",
				borderWidth: 1,
			},
		],
	};

	// Define chart options
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
					callback: (value) => `${value}`, // Format y-axis values as currency
				},
			},
		},
	};

	return (
		<div className="w-[600px] mx-auto">
			{" "}
			{/* Fixed width of 600px */}
			<Bar data={chartData} options={options} />
		</div>
	);
};

export default OrderBarChart;
