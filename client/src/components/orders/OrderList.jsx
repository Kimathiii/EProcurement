import { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import options from "../../assets/images/options.png";

const OrderList = ({ orders }) => {
	const [ordersArr, setOrdersArr] = useState();
	const [dropdownVisible, setDropdownVisible] = useState(null);

	useEffect(() => {
		setOrdersArr(orders);
	}, [orders]);

	const handleToggleDropdown = (orderId) => {
		setDropdownVisible((prev) => (prev === orderId ? null : orderId));
	};

	const handleStatusChange = async (orderId, newStatus) => {
		try {
			const res = await axiosInstance.patch(`/orders/update/${orderId}`, {
				status: newStatus,
			});
			console.log(res);
			setOrdersArr((prevOrders) =>
				prevOrders.map(
					(order) =>
						order._id === orderId
							? { ...order, status: newStatus } // Create a new object with updated reg_status
							: order // Return the original order object
				)
			);
		} catch (error) {
			console.error("Failed to update status:", error);
		}
	};

	const handleDelete = async (orderId) => {
		try {
			await axiosInstance.delete(`/orders/remove/${orderId}`);
			setOrdersArr((prevOrder) =>
				prevOrder.filter((order) => order._id !== orderId)
			);
		} catch (error) {
			console.error("Failed to delete member:", error);
		}
	};
	console.log(ordersArr);
	return (
		<div>
			{ordersArr?.length ? (
				ordersArr.map((order) => (
					<ul
						key={order._id}
						className="flex justify-between items-center border-b border-gray-300 py-2 px-4 hover:bg-gray-100 text-slate-700 relative"
					>
						<li className="border-r border-gray-300 pr-8 w-[150px] text-left">
							#{order._id.slice(-8)}
						</li>
						<li className="w-[160px] -mr-8 border-r border-gray-300 pl-8">
							{order.supplier_id.name}
						</li>

						<li className="w-[350px] flex space-x-8 -mr-10 border-r border-gray-300 pl-8">
							{order.order_items.map((ord) => (
								<ul key={ord._id}>
									<li>
										<li className="list-disc">{order.order_items[0].name}</li>
									</li>
								</ul>
							))}
						</li>
						<li className="w-[155px] -ml-2 border-r border-gray-300 pl-8">
							{order.total_amount}
						</li>
						<li className="w-[130px] -mr-20 pl-10 border-r border-gray-300">
							{order.status}
						</li>
						<li className="pl-10 w-[90px] flex space-x-4 relative">
							<img
								src={options}
								alt="options"
								className="w-4 h-1 opacity-55 cursor-pointer ml-6"
								onClick={() => handleToggleDropdown(order._id)}
							/>

							{/* Dropdown Menu */}
							{dropdownVisible === order._id && (
								<div className="absolute top-6 left-0 bg-white border rounded shadow-md p-2 z-10">
									<ul className="text-sm text-gray-700">
										<li
											className="cursor-pointer hover:bg-gray-100 px-2 py-1"
											onClick={() => handleDelete(order._id)}
										>
											Delete
										</li>
										{order.status === "pending" && (
											<li
												className="cursor-pointer hover:bg-gray-100 px-2 py-1"
												onClick={() =>
													handleStatusChange(order._id, "completed")
												}
											>
												Completed
											</li>
										)}
										{order.status === "completed" && (
											<li
												className="cursor-pointer hover:bg-gray-100 px-2 py-1"
												onClick={() => handleStatusChange(order._id, "pending")}
											>
												Pending
											</li>
										)}
									</ul>
								</div>
							)}
						</li>
					</ul>
				))
			) : (
				<p className="mt-5 text-center text-gray-500">No Items yet available</p>
			)}
		</div>
	);
};

export default OrderList;
