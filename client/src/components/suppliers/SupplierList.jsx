import OrderSkeleton from "../orders/OrderSkeleton";
import edit from "../../assets/images/edit.png";

const SupplierList = ({ setSupplier, suppliers }) => {
	return (
		<div className="text-slate-600">
			{!suppliers ? (
				<OrderSkeleton />
			) : (
				<>
					{suppliers?.length ? (
						<div>
							{suppliers?.map((supplier) => (
								<ul
									key={supplier._id}
									onClick={() => setSupplier(supplier)}
									className="flex justify-between items-center border-b border-gray-300 py-2 px-4 hover:bg-gray-100 text-slate-700 relative"
								>
									<li className="border-r border-gray-300 pr-8 w-[200px] ">
										{supplier.name}
									</li>

									<li className="w-[130px] border-r border-gray-300 pr-10 -ml-[4%]">
										{" "}
										{supplier.phone}
									</li>

									<li className="px-3 py-1 text-sm -ml-8 w-[200px] text-center">
										{supplier.address}
									</li>

									<li className="w-[170px] -mr-8 border-l border-gray-300 pl-8">
										{supplier?.items.length}
									</li>

									<li className=" border-l border-gray-300 pl-10 w-[100px] flex space-x-4">
										<img
											src={edit}
											alt="options"
											className="w-4 h-4 opacity-55 cursor-pointer ml-6"
										/>
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

export default SupplierList;
