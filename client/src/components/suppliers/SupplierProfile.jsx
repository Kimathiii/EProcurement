import address from "../../assets/images/address.png";
import phone from "../../assets/images/phone.png";
import email from "../../assets/images/email.png";
import { useEffect, useState } from "react";

const SupplierProfile = ({ supplier }) => {
	const [selectedItems, setSelectedItems] = useState([]); // Initialize as an empty array

	const handleSelection = (item) => {
		setSelectedItems(
			(prev) =>
				prev.includes(item)
					? prev.filter((selectedItem) => selectedItem !== item) // Deselect if already selected
					: [...prev, item] // Add to selected items if not already selected
		);
	};

	useEffect(() => {}, [selectedItems]);

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
			<div className="mt-10 w-[30%]">
				<h2 className="font-bold text-xl">Items Supplying</h2>
				{supplier?.items.map((item) => (
					<div
						key={item}
						className={`${
							selectedItems.includes(item) ? "bg-blue-100" : ""
						} flex justify-between items-center bg-gray-100 rounded my-2 p-2`}
					>
						<p className="ml-2">{item}</p>
						<input
							type="checkbox"
							checked={selectedItems.includes(item)}
							onChange={() => handleSelection(item)} // Handle selection on checkbox change
						/>
					</div>
				))}

				{selectedItems.length && (
					<button className="p-2 w-full cursor-pointer rounded bg-gray-300 ">
						Make order
					</button>
				)}
			</div>
		</div>
	);
};

export default SupplierProfile;
