import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
// import ItemsList from "./ItemsList";
// import ItemsSort from "./ItemsSort";
import { Outlet } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import SuppliersHeader from "./SuppliersHeader";
import SupplierList from "./SupplierList";
import SupplierProfile from "./SupplierProfile";

const Suppliers = () => {
	const { user } = useAuthContext();
	const { data: suppliers } = useFetch(`/suppliers/`, "suppliers");
	const [supplier, setSupplier] = useState(null);

	// useEffect(() => {
	// 	if (statuses.includes(status)) {
	// 		const index = statuses.indexOf(status);
	// 		const filteredItems = items?.filter(
	// 			(item) => item.status === statuses[index]
	// 		);
	// 		console.log(filteredItems);
	// 		setItemData(filteredItems);
	// 	} else {
	// 		setItemData(items);
	// 	}
	// }, []);

	return (
		<div className="ml-[17%] mt-[6%] w-[82%]">
			<div className="flex justify-between">
				{/* <ItemsSort status={status} setStatus={setStatus} statuses={statuses} /> */}
			</div>
			{!supplier ? (
				<>
					<button
						className="border text-slate-500 px-5 py-2 rounded-md my-2 hover:bg-gray-200 transform transition duration-200"
						onClick={() => setIsOpen((prevValue) => !prevValue)}
					>
						Add new
					</button>
					<SuppliersHeader />
					<SupplierList suppliers={suppliers} setSupplier={setSupplier} />
				</>
			) : (
				<SupplierProfile supplier={supplier} />
			)}
			{/* <ItemsList items={itemData || []} isOpen={isOpen} setIsOpen={setIsOpen} /> */}
			<Outlet />
		</div>
	);
};

export default Suppliers;
