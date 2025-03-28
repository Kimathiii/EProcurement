const OrderList = ({ orders }) => {
	const statuses = ["pending", "completed"];
	return (
		<div>
			{orders.length &&
				orders.map((order) => (
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

						<li className="w-[400px] flex space-x-8  -ml-8 border-r border-gray-300 pl-8">
							{/* <li className="list-disc">{order.order_items[0].name}</li>
							<li className="list-disc">
								{order.order_items.length > 1 && order.order_items[1].name}
							</li>
							{""} */}
							{/* ... */}
							{order.order_items.map((ord) => (
								<ul key={ord._id}>
									<li>
										<li className="list-disc">{order.order_items[0].name}</li>
									</li>
								</ul>
							))}
						</li>
						<li className="w-[98px] -mr-2 border-r border-gray-300 pl-8">
							{order.total_amount}
						</li>
						<li
							className={`${
								statuses[0] === order.status
									? "bg-red-200 p-1 rounded"
									: "bg-green-200 p-1 rounded"
							} w-[150px] -ml-12  pl-10`}
						>
							{order.status}
						</li>
					</ul>
				))}
		</div>
	);
};

export default OrderList;
