// import { useState } from "react";
import OrderSkeleton from "../orders/OrderSkeleton";
import axiosInstance from "../../utils/axiosInstance";
import { useEffect, useState } from "react";
import options from "../../assets/images/options.png";

const ItemsList = ({ items }) => {
	const [itemsArr, setItemsArr] = useState();
	const [dropdownVisible, setDropdownVisible] = useState(null);

	useEffect(() => {
		setItemsArr(items);
	}, [items]);

	const handleToggleDropdown = (itemId) => {
		setDropdownVisible((prev) => (prev === itemId ? null : itemId));
	};
	const handleStatusChange = async (itemId, newStatus) => {
		console.log(itemId, newStatus);
		try {
			const res = await axiosInstance.patch(`/inventory/update/${itemId}`, {
				status: newStatus,
			});
			setItemsArr((prevItems) =>
				prevItems.map(
					(item) =>
						item._id === itemId
							? { ...item, status: newStatus } // Create a new object with updated reg_status
							: item // Return the original order object
				)
			);
		} catch (error) {
			console.error("Failed to update status:", error.message);
		}
	};

	return (
		<div className="text-slate-600">
			{!items ? (
				<OrderSkeleton />
			) : (
				<>
					{itemsArr?.length ? (
						<div>
							{itemsArr?.map((item) => (
								<ul
									key={item._id}
									className="flex justify-between items-center border-b border-gray-300 py-2 px-4 hover:bg-gray-100 text-slate-700 relative"
								>
									<li className="border-r border-gray-300 pr-8 w-[130px] text-left">
										#{item._id.slice(-8)}
									</li>

									<li className="border-r border-gray-300 pl-8 pr-8 w-[180px] text-center -ml-16">
										{item.name}
									</li>

									<li className="w-[130px] border-r  border-gray-300 ">
										ksh {item?.unit_price}
									</li>

									<li className="px-3 py-1 rounded text-sm -ml-8 w-[50px] text-center">
										{item.quantity}
									</li>

									<li className="w-[170px] -mr-8 border-l border-gray-300 pl-8">
										{item?.supplier_id.name}
									</li>
									<li className="w-[180px] text-center -mr-8 border-l border-gray-300 pl-8">
										<p
											className={`${
												item.status === "In Stock"
													? "bg-green-100 text-green-500 border-green-300 "
													: " rounded bg-orange-100 text-orange-500 border-orange-300"
											} text-sm px-4 py-1`}
										>
											{item.status}
										</p>
									</li>

									<li className="pl-10 w-[90px] flex space-x-4 relative">
										<img
											src={options}
											alt="options"
											className="w-4 h-1 opacity-55 cursor-pointer ml-6"
											onClick={() => handleToggleDropdown(item._id)}
										/>

										{/* Dropdown Menu */}
										{dropdownVisible === item._id && (
											<div className="absolute top-6 -left-4 bg-white w-28 rounded shadow-md p-2 z-10">
												<ul className="text-sm text-gray-700">
													{item.status === "Out of Stock" && (
														<li
															className="cursor-pointer hover:bg-gray-100 px-2 py-1"
															onClick={() =>
																handleStatusChange(item._id, "In Stock")
															}
														>
															In Stock
														</li>
													)}
													{item.status === "In Stock" && (
														<li
															className="cursor-pointer hover:bg-gray-100 px-2 py-1"
															onClick={() =>
																handleStatusChange(item._id, "Out of Stock")
															}
														>
															Out of Stock
														</li>
													)}
												</ul>
											</div>
										)}
									</li>
								</ul>
							))}
						</div>
					) : (
						<p className="mt-5 text-center text-gray-500">
							No Items yet available
						</p>
					)}
				</>
			)}
		</div>
	);
};

export default ItemsList;
