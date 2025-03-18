const Inventory = require("../models/inventory");

// Create a new inventory item
const createInventoryItem = async (req, res) => {
	try {
		const inventoryItem = new Inventory(req.body);
		await inventoryItem.save();
		res
			.status(201)
			.json({ message: "Inventory item created successfully", inventoryItem });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// Get all inventory items
const getAllInventoryItems = async (req, res) => {
	try {
		const inventoryItems = await Inventory.find().populate("supplier_id");
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
	try {
		const inventoryItem = await Inventory.findByIdAndUpdate(
			req.params.id,
			req.body,
			{
				new: true,
				runValidators: true,
			}
		);
		if (!inventoryItem) {
			return res.status(404).json({ message: "Inventory item not found" });
		}
		res
			.status(200)
			.json({ message: "Inventory item updated successfully", inventoryItem });
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
