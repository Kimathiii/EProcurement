import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import ItemsHeader from "./ItemsHeader";
import ItemsList from "./ItemsList";
import ItemsSort from "./ItemsSort";
import { Outlet } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

const Items = () => {
	const { user } = useAuthContext();
	const { data: items } = useFetch(`/inventory/`, "inventories");
	const statuses = ["In Stock", "Out of Stock"];
	const [status, setStatus] = useState("");
	const [itemData, setItemData] = useState(items);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		if (statuses.includes(status)) {
			const index = statuses.indexOf(status);
			const filteredItems = items?.filter(
				(item) => item.status === statuses[index]
			);
			console.log(filteredItems);
			setItemData(filteredItems);
		} else {
			setItemData(items);
		}
	}, [items, status]);

	return (
		<div className="ml-[17%] mt-[6%] w-[82%]">
			<div className="flex justify-between">
				<button
					className="border text-slate-500 px-5 py-2 rounded-md my-2 hover:bg-gray-200 transform transition duration-200"
					onClick={() => setIsOpen((prevValue) => !prevValue)}
				>
					Add new
				</button>
				<ItemsSort status={status} setStatus={setStatus} statuses={statuses} />
			</div>
			<ItemsHeader />
			<ItemsList items={itemData || []} isOpen={isOpen} setIsOpen={setIsOpen} />
			<Outlet />
		</div>
	);
};

export default Items;
