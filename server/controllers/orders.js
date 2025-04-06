const Order = require("../models/orders");

// Create a new order
const createOrder = async (req, res) => {
	const { order_items, supplier_id, total_amount } = req.body;
	try {
		// const order = new Order({order});
		const order = await Order.create({
			order_items,
			supplier_id,
			total_amount,
		});
		res.status(201).json({ message: "Order created successfully", order });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// Get all orders
const getAllOrders = async (req, res) => {
	try {
		const orders = await Order.find().populate("supplier_id");
		res.status(200).json(orders);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Get a single order by ID
const getOrderById = async (req, res) => {
	try {
		const order = await Order.findById(req.params.id).populate("supplier_id");
		if (!order) {
			return res.status(404).json({ message: "Order not found" });
		}
		res.status(200).json(order);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Update an order by ID
const updateOrder = async (req, res) => {
	const { status } = req.body;
	const { orderId } = req.params;

	try {
		const order = await Order.findByIdAndUpdate(
			orderId,
			{ status },
			{
				new: true,
				runValidators: true,
			}
		);
		if (!order) {
			return res.status(404).json({ message: "Order not found" });
		}
		res.status(200).json({ message: "Order updated successfully", order });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// Delete an order by ID
const deleteOrder = async (req, res) => {
	const { orderId } = req.params;
	try {
		const order = await Order.findByIdAndDelete(orderId);
		if (!order) {
			return res.status(404).json({ message: "Order not found" });
		}
		res.status(200).json({ message: "Order deleted successfully" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

module.exports = {
	createOrder,
	getAllOrders,
	getOrderById,
	updateOrder,
	deleteOrder,
};
