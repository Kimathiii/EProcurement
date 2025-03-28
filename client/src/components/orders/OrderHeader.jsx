const OrderHeader = () => {
	return (
		<ul className="flex justify-between list-none bg-gray-200 py-2 px-4 rounded-t mb-2 opacity-60 font-semibold">
			<li className="w-[150px] border-r">Order number</li>
			<li className="w-[115px] pr-2 -ml-10  border-r">Supplier name</li>
			<li className="w-[250px] -mr-24  border-r">Items ordered</li>
			<li className="w-[110px] -mr-20  border-r">Order amount </li>
			<li>Order Status</li>
		</ul>
	);
};

export default OrderHeader;
