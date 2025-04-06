const Inventory = require("../models/inventory");
const Order = require("../models/orders");
const cron = require("node-cron");
// const createInventoryItem = require("./controllers/inventory");

// Schedule the createInventoryItem function to run every two seconds
// cron
// 	.schedule("*/2 * * * *", async () => {
// 		try {
// 			await createInventoryItem();
// 			console.log("Inventory items created successfully");
// 		} catch (error) {
// 			console.error("Error creating inventory items:", error.message);
// 		}
// 	})
// 	.start();

// Create a new inventory item

const createInventoryItem = async () => {
	const orders = await Order.find({ status: "completed" });

	// Create inventory items from completed orders
	const inventoryItemsFromOrders = orders.flatMap((order) => {
		return order.order_items.map((item) => {
			return {
				name: item.name,
				quantity: order?.quantity || 1,
				unit_price: item.price,
				supplier_id: order.supplier_id,
			};
		});
	});

	// Combine inventory items from request body and orders
	const allInventoryItems = [...inventoryItemsFromOrders];

	// Check if inventory items already exist in the database
	const existingInventoryItems = await Inventory.find({
		$or: allInventoryItems.map((item) => ({ name: item.name })),
	});

	// Filter out existing inventory items from the list to be created
	const newInventoryItems = allInventoryItems.filter(
		(item) =>
			!existingInventoryItems.some(
				(existingItem) => existingItem.name === item.name
			)
	);

	try {
		await Inventory.insertMany(newInventoryItems);
		console.log("Inventory items created successfully");
	} catch (error) {
		console.log(error.message);
	}
};

// Call createInventoryItem to ensure items are created

// Get all inventory items
const getAllInventoryItems = async (req, res) => {
	try {
		const inventoryItems = await Inventory.find().populate("supplier_id");
		await createInventoryItem(); // Call createInventoryItem to ensure items are created
		res.status(200).json(inventoryItems);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Get a single inventory item by ID
const getInventoryItemById = async (req, res) => {
	try {
		const inventoryItem = await Inventory.findById(req.params.id).populate(
			"supplier_id"
		);
		if (!inventoryItem) {
			return res.status(404).json({ message: "Inventory item not found" });
		}
		res.status(200).json(inventoryItem);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Update an inventory item by ID
const updateInventoryItem = async (req, res) => {
	const { status } = req.body; // Use req.body to get the status
	const { inventoryId } = req.params; // Get inventoryId from params
	console.log(req.params);
	try {
		const inventoryItem = await Inventory.findByIdAndUpdate(
			inventoryId,
			{ status }, // Pass an object with the field to update
			{
				new: true,
				runValidators: true,
			}
		);

		if (!inventoryItem) {
			return res.status(404).json({ message: "Inventory item not found" });
		}
		res.status(200).json({
			message: "Inventory item updated successfully",
			inventoryItem,
		});
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// Delete an inventory item by ID
const deleteInventoryItem = async (req, res) => {
	try {
		const inventoryItem = await Inventory.findByIdAndDelete(req.params.id);
		if (!inventoryItem) {
			return res.status(404).json({ message: "Inventory item not found" });
		}
		res.status(200).json({ message: "Inventory item deleted successfully" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

module.exports = {
	createInventoryItem,
	getAllInventoryItems,
	getInventoryItemById,
	updateInventoryItem,
	deleteInventoryItem,
};
