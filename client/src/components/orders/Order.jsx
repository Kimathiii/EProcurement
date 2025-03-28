import useFetch from "../../hooks/useFetch";
import OrderHeader from "./OrderHeader";
import OrderList from "./OrderList";

const Order = () => {
	const url = "/orders/";
	const { data } = useFetch(url, "orders");
	console.log(data);
	return (
		<div className="ml-[17%] mt-[6%] w-[82%]">
			<OrderHeader />
			<OrderList orders={data || []} />
		</div>
	);
};

export default Order;
