import LoadSkeleton from "./LoadSkeleton";

const Recent = ({ orders }) => {
	const loadLength = [1, 2];
	const orderItems = [];
	orders?.forEach((order) =>
		order.order_items.forEach((item) => orderItems.push(item))
	);
	console.log("Orders", orders);

	return (
		<div className="flex flex-col w-[50%]">
			{/* Recent orders */}
			<div className="w-full bg-white p-4 rounded-lg">
				<h2 className="text-lg font-semibold">Recent orders</h2>

				<div className="flex justify-between mt-4">
					<p className="text-blue-500 font-medium">Order Item</p>
					<p className="text-blue-500 font-medium">Price</p>
				</div>
				{orderItems.length ? (
					orderItems.map((order) => (
						<div
							className="flex justify-between py-2 border-b border-gray-200"
							key={orderItems.indexOf(order)}
						>
							<p className="text-sm">{order.name}</p>
							<p className="text-sm">
								KES <span className="font-semibold">{order.price}</span>
							</p>
						</div>
					))
				) : (
					<>
						{loadLength.map((load) => (
							<LoadSkeleton key={load} />
						))}
					</>
				)}
			</div>
		</div>
	);
};

export default Recent;
