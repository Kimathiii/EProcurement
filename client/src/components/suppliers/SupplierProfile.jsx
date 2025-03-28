import address from "../../assets/images/address.png";
import phone from "../../assets/images/phone.png";
import email from "../../assets/images/email.png";
import { useEffect, useState, useTransition } from "react";
import usePost from "../../hooks/usePost";
import { useNavigate } from "react-router-dom";

const SupplierProfile = ({ supplier }) => {
	const [selectedItems, setSelectedItems] = useState([]); // Initialize as an empty array
	const [total, setTotal] = useState(0);
	const url = "/orders/add";
	const { post } = usePost(url);
	const [isPending, startTransition] = useTransition();
	const navigate = useNavigate();

	const handleSelection = (item) => {
		setSelectedItems(
			(prev) =>
				prev.includes(item)
					? prev.filter((selectedItem) => selectedItem !== item) // Deselect if already selected
					: [...prev, item] // Add to selected items if not already selected
		);
		// setOrderItems
	};
	selectedItems.reduce((a, b) => a + b.price, 0);
	// console.log(total);

	useEffect(() => {
		if (selectedItems.length) {
			setTotal(selectedItems.reduce((a, b) => a + b.price, 0));
		}
	}, [selectedItems]);
	// console.log(supplier);

	const handleSubmit = () => {
		const orderData = {
			order_items: selectedItems.map((item) => ({
				name: item.name,
				price: item.price,
			})),
			supplier_id: supplier._id, // Assuming `supplier.id` contains the supplier's ID
			total_amount: total,
		};
		startTransition(async () => {
			try {
				const res = await post(orderData); // Send the order data to the backend
				navigate("/orders");
				console.log("Order submitted successfully:", res.data);
			} catch (error) {
				console.error("Error submitting order:", error.message);
			}
		});
	};

	return (
		<div className="mt-5 space-x-8">
			<div>
				<h1 className="font-bold text-2xl">{supplier?.name}</h1>

				<ul className="list-none my-2">
					<li className="flex space-x-2 items-center">
						<img src={email} alt="email" className="w-4 h-4 opacity-45" />
						<p>{supplier?.email}</p>
					</li>
					<li className="flex space-x-2 my-2 items-center">
						<img src={phone} alt="phone" className="w-4 h-4" />
						<p>{supplier?.phone}</p>
					</li>
					<li className="flex space-x-2 items-center">
						<img src={address} alt="address" className="w-4 h-4 opacity-45" />
						<p>{supplier?.address}</p>
					</li>
				</ul>
			</div>

			{/* List items supplied */}
			<div className="mt-10 w-[45%]">
				<h2 className="font-bold text-xl">Items Supplying</h2>
				{supplier?.items.map((item) => (
					<div
						key={item.id}
						className={`${
							selectedItems.includes(item) ? "bg-blue-100" : ""
						} flex justify-between items-center bg-gray-100 rounded my-2 p-2`}
					>
						<p className="ml-2 border-r border-gray-400 w-[150px]">
							{item.name}
						</p>
						<p className="border-r border-gray-400 w-[100px]">
							sh {item.price}
						</p>
						<input
							type="checkbox"
							checked={selectedItems.includes(item)}
							onChange={() => handleSelection(item)} // Handle selection on checkbox change
						/>
					</div>
				))}

				{selectedItems.length > 0 && (
					<aside>
						<p>Total: sh {total}</p>
						<button
							className="p-2 w-full cursor-pointer rounded bg-gray-300 "
							onClick={handleSubmit}
							disabled={isPending}
						>
							Make order
						</button>
					</aside>
				)}
			</div>
		</div>
	);
};

export default SupplierProfile;
