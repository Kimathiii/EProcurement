// import { useState } from "react";
import OrderSkeleton from "../orders/OrderSkeleton";
// import AddItem from "./AddItem";
// import { useEffect, useRef } from "react";
// import useFetch from "../../hooks/useFetch";
import edit from "../../assets/images/edit.png";

const SupplierList = ({ setSupplier, suppliers }) => {
	// const modalRef = useRef(null);

	// const handleClose = (e) => {
	// 	const dimensions = modalRef.current?.getBoundingClientRect();
	// 	if (dimensions) {
	// 		if (
	// 			e.clientX < dimensions.left ||
	// 			e.clientX > dimensions.right ||
	// 			e.clientY < dimensions.top ||
	// 			e.clientY > dimensions.bottom
	// 		) {
	// 			setIsOpen(false);
	// 			modalRef.current?.close();
	// 		}
	// 	}
	// };
	// useEffect(() => {
	// 	if (isOpen) modalRef.current?.showModal();
	// }, [isOpen]);
	console.log(suppliers);
	return (
		<div className="text-slate-600">
			{/* <dialog
				ref={modalRef}
				onClick={handleClose}
				className="border p-0 -mb-4 md:mb-auto py-5 px-6 w-full md:w-1/3 rounded-2xl max-w-[50ch] backdrop:opacity-50 backdrop:bg-black"
			>
				<AddItem />
			</dialog> */}
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
									{/* <li className="border-r pr-8 w-[130px] text-left">
										#{item._id.slice(-8)}
									</li> */}

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
