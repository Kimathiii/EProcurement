// import { useState } from "react";
import OrderSkeleton from "../orders/OrderSkeleton";
import AddItem from "./AddItem";
import { useEffect, useRef } from "react";
import useFetch from "../../hooks/useFetch";
import edit from "../../assets/images/edit.png";

const ItemsList = ({ items, isOpen, setIsOpen }) => {
	const modalRef = useRef(null);

	const handleClose = (e) => {
		const dimensions = modalRef.current?.getBoundingClientRect();
		if (dimensions) {
			if (
				e.clientX < dimensions.left ||
				e.clientX > dimensions.right ||
				e.clientY < dimensions.top ||
				e.clientY > dimensions.bottom
			) {
				setIsOpen(false);
				modalRef.current?.close();
			}
		}
	};
	useEffect(() => {
		if (isOpen) modalRef.current?.showModal();
	}, [isOpen]);
	return (
		<div className="text-slate-600">
			<dialog
				ref={modalRef}
				onClick={handleClose}
				className="border p-0 -mb-4 md:mb-auto py-5 px-6 w-full md:w-1/3 rounded-2xl max-w-[50ch] backdrop:opacity-50 backdrop:bg-black"
			>
				<AddItem />
			</dialog>
			{!items ? (
				<OrderSkeleton />
			) : (
				<>
					{items?.length ? (
						<div>
							{items?.map((item) => (
								<ul
									key={item._id}
									className="flex justify-between items-center border-b py-2 px-4 hover:bg-gray-100 text-slate-700 relative"
								>
									<li className="border-r pr-8 w-[130px] text-left">
										#{item._id.slice(-8)}
									</li>

									<li className="border-r pl-8 pr-8 w-[180px] text-center -ml-16">
										{item.name}
									</li>

									<li className="w-[130px] border-r ">
										ksh {item?.unit_price}
									</li>

									<li className="px-3 py-1 rounded text-sm -ml-8 w-[50px] text-center">
										{item.quantity}
									</li>

									<li className="w-[170px] -mr-8 border-l pl-8">
										{item.supplier_id.name}
									</li>
									<li className="w-[180px] text-center -mr-8 border-l pl-8">
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

									<li className=" border-l pl-10 w-[100px] flex space-x-4">
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

export default ItemsList;
