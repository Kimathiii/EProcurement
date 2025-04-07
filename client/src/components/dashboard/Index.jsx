import {
	Chart,
	ArcElement,
	Tooltip,
	Legend,
	RadialLinearScale,
} from "chart.js";
import OrderBarChart from "./OrderBarChart";

import useFetch from "../../hooks/useFetch";
// import { useContext } from "react";
// import { AuthContext } from "../../App";
import Recent from "./Recent";
import OrderChart from "./OrderChart";
import InventoryChart from "./InventoryChart";
import SupplierChart from "./SupplierChart";

Chart.register(ArcElement, Tooltip, Legend, RadialLinearScale);

const Index = () => {
	const propURI = `/orders/`;
	const suppliersURI = `/suppliers/`;
	const inventoryURI = `/inventory/`;

	const { data: orderData } = useFetch(propURI, "orders");
	const { data: supplierData } = useFetch(suppliersURI, "suppliers");
	const { data: inventoryData } = useFetch(inventoryURI, "inventories");

	const status = orderData?.reduce((acc, item) => {
		acc[item.status] = (acc[item.status] || 0) + 1;
		return acc;
	}, {});

	return (
		<div className="ml-[17%] mt-[6%] w-[82%]">
			<div className="flex w-full items-center gap-2 justify-between">
				<InventoryChart inventoryData={inventoryData} />
				<SupplierChart supplierData={supplierData} />
				<OrderChart status={status} orderData={orderData} />
			</div>
			<div className="w-full flex items-center justify-between gap-3">
				<Recent
					orders={
						(orderData?.length >= 1 &&
							orderData.slice(orderData?.length === 1 ? -1 : -2)) ||
						[]
					}
				/>
				<OrderBarChart orders={orderData} />
			</div>

			{/* Recent Section */}
		</div>
	);
};

export default Index;
