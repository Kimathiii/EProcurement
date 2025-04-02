import React, { useState, useTransition } from "react";
import trash from "../../assets/images/trash.png";
import usePost from "../../hooks/usePost";

const AddSupplier = ({ setIsOpen }) => {
	const [supplier, setSupplier] = useState({
		name: "",
		email: "",
		phone: "",
		address: "",
		items: [{ name: "", price: "" }], // Initialize with one item
	});
	const url = "/suppliers/add";
	const { post } = usePost(url);
	const [isPending, startTransition] = useTransition();

	// Handle input changes for supplier details
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setSupplier((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	// Handle input changes for items
	const handleItemChange = (index, e) => {
		const { name, value } = e.target;
		const updatedItems = [...supplier.items];
		updatedItems[index][name] = value;
		setSupplier((prev) => ({
			...prev,
			items: updatedItems,
		}));
	};

	// Add a new item input
	const addItem = () => {
		setSupplier((prev) => ({
			...prev,
			items: [...prev.items, { name: "", price: "" }],
		}));
	};

	// Remove an item input
	const removeItem = (index) => {
		const updatedItems = supplier.items.filter((_, i) => i !== index);
		setSupplier((prev) => ({
			...prev,
			items: updatedItems,
		}));
	};

	// Handle form submission
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("Supplier Data:", supplier);
		// Add logic to send the supplier data to the backend

		startTransition(async () => {
			try {
				const res = await post(supplier);
				setIsOpen(false);
				console.log(res);
			} catch (error) {
				console.error("Error adding supplier:", error.message);
			}
		});
		// navigate("/suppliers")
	};

	return (
		<div className="mt-[6%] w-[82%]">
			{/* <div> */}
			<h1 className="text-2xl font-bold mb-4">Enter Supplier Details</h1>
			<form
				onSubmit={handleSubmit}
				className="grid grid-cols-2 gap-3 bg-white p-4 rounded"
			>
				{/* Supplier Details */}
				<aside>
					<div className="mb-4">
						<label className="block text-gray-700 font-medium mb-2">Name</label>
						<input
							type="text"
							name="name"
							value={supplier.name}
							onChange={handleInputChange}
							className="w-full p-3 border border-gray-300 rounded focus:outline-none"
							required
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700 font-medium mb-2">
							Email
						</label>
						<input
							type="email"
							name="email"
							value={supplier.email}
							onChange={handleInputChange}
							className="w-full p-3 focus:outline-none border border-gray-300 rounded"
							required
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700 font-medium mb-2">
							Phone
						</label>
						<input
							type="text"
							name="phone"
							value={supplier.phone}
							onChange={handleInputChange}
							className="w-full p-3 focus:outline-none border border-gray-300 rounded"
							required
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700 font-medium mb-2">
							Address
						</label>
						<input
							type="text"
							name="address"
							value={supplier.address}
							onChange={handleInputChange}
							className="w-full p-3 focus:outline-none border border-gray-300 rounded"
							required
						/>
					</div>
				</aside>

				{/* Items */}
				<aside className="ml-3">
					<h2 className="text-xl mb-2">Items</h2>
					{supplier.items.map((item, index) => (
						<div key={index} className="mb-4 flex items-center gap-2">
							<input
								type="text"
								name="name"
								placeholder="Item Name"
								value={item.name}
								onChange={(e) => handleItemChange(index, e)}
								className="w-2/3 p-2.5 focus:outline-none border border-gray-300 rounded"
								required
							/>
							<input
								type="number"
								name="price"
								placeholder="Price"
								value={item.price}
								onChange={(e) => handleItemChange(index, e)}
								className="w-1/3 p-2.5 focus:outline-none border border-gray-300 rounded"
								required
							/>
							{supplier.items.length > 1 && (
								<img
									src={trash}
									alt="trash"
									onClick={() => removeItem(index)}
									className="w-7 h-7 cursor-pointer"
								/>
							)}
						</div>
					))}
					<section className="flex space-x-2 items-center">
						<button
							type="button"
							onClick={addItem}
							className="w-1/4 p-2 bg-gray-500 text-white rounded"
						>
							+ Add Item
						</button>
						<button
							type="submit"
							disabled={isPending}
							className="w-3/4 p-2 bg-blue-400 text-white rounded"
						>
							Submit
						</button>
					</section>
				</aside>
			</form>
			{/* </div> */}
			{/* <div>
				<p>Hello world</p>
			</div> */}
		</div>
	);
};

export default AddSupplier;
