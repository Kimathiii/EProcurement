import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
// import ItemsList from "./ItemsList";
// import ItemsSort from "./ItemsSort";
import { Outlet } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import SuppliersHeader from "./SuppliersHeader";
import SupplierList from "./SupplierList";
import SupplierProfile from "./SupplierProfile";
import AddSupplier from "./AddSupplier";

const Suppliers = () => {
	const { user } = useAuthContext();
	const { data: suppliers } = useFetch(`/suppliers/`, "suppliers");
	const [supplier, setSupplier] = useState(null);
	const [isOpen, setIsOpen] = useState(false);
	const [supplierArr, setSupplierArr] = useState([]);

	useEffect(() => {
		setSupplierArr(suppliers);
	}, [suppliers]);

	return (
		<div className="ml-[17%] mt-[6%] w-[82%]">
			{!supplier ? (
				<>
					{isOpen ? (
						<AddSupplier
							setIsOpen={setIsOpen}
							setSupplierArr={setSupplierArr}
						/>
					) : (
						<>
							<button
								className="border text-slate-500 px-5 py-2 rounded-md my-2 hover:bg-gray-200 transform transition duration-200"
								onClick={() => setIsOpen((prevValue) => !prevValue)}
							>
								Add new
							</button>
							<SuppliersHeader />
							<SupplierList
								suppliers={supplierArr || []}
								setSupplier={setSupplier}
							/>
						</>
					)}
				</>
			) : (
				<SupplierProfile supplier={supplier} />
			)}
			<Outlet />
		</div>
	);
};

export default Suppliers;
