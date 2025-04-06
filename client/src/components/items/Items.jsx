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
	// const [isOpen, setIsOpen] = useState(false);

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
		} // This is where you would send the new item data to the backend if you have a backend set up. Just a placeholder for now. However, the actual logic would depend on your backend setup. For example, you might use a POST request with the new item data. The response from your backend would then be handled in the useEffect hook above. However, you would need to replace the console.log() with your actual POST request.  // You can also
	}, [items, status]);

	return (
		<div className="ml-[17%] mt-[6%] w-[82%]">
			<div className="flex justify-between">
				<ItemsSort status={status} setStatus={setStatus} statuses={statuses} />
			</div>
			<ItemsHeader />
			<ItemsList items={itemData || []} />
			<Outlet />
		</div>
	);
};

export default Items;
