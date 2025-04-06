const OrderHeader = () => {
	return (
		<ul className="flex justify-between list-none bg-gray-200 py-2 px-4 rounded-t mb-2 opacity-60 font-semibold">
			<li className="w-[150px] border-r">Order number</li>
			<li className="w-[115px] pr-2 -ml-12  border-r">Supplier name</li>
			<li className="w-[220px] -mr-24  border-r">Items ordered</li>
			<li className="w-[110px] -mr-16  border-r">Order amount </li>
			<li className="w-[100px] -mr-20  border-r">Order Status</li>
			<li>{""}</li>
		</ul>
	);
};

export default OrderHeader;
