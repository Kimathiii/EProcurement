const OrderItem = require("../models/orderItems");

// Create a new order item
const createOrderItem = async (req, res) => {
	try {
		const orderItem = new OrderItem(req.body);
		await orderItem.save();
		res
			.status(201)
			.json({ message: "Order item created successfully", orderItem });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// Get all order items
const getAllOrderItems = async (req, res) => {
	try {
		const orderItems = await OrderItem.find().populate("order_id inventory_id");
		res.status(200).json(orderItems);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Get a single order item by ID
const getOrderItemById = async (req, res) => {
	try {
		const orderItem = await OrderItem.findById(req.params.id).populate(
			"order_id inventory_id"
		);
		if (!orderItem) {
			return res.status(404).json({ message: "Order item not found" });
		}
		res.status(200).json(orderItem);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Update an order item by ID
const updateOrderItem = async (req, res) => {
	try {
		const orderItem = await OrderItem.findByIdAndUpdate(
			req.params.id,
			req.body,
			{
				new: true,
				runValidators: true,
			}
		);
		if (!orderItem) {
			return res.status(404).json({ message: "Order item not found" });
		}
		res
			.status(200)
			.json({ message: "Order item updated successfully", orderItem });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// Delete an order item by ID
const deleteOrderItem = async (req, res) => {
	try {
		const orderItem = await OrderItem.findByIdAndDelete(req.params.id);
		if (!orderItem) {
			return res.status(404).json({ message: "Order item not found" });
		}
		res.status(200).json({ message: "Order item deleted successfully" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

module.exports = {
	createOrderItem,
	getAllOrderItems,
	getOrderItemById,
	updateOrderItem,
	deleteOrderItem,
};
