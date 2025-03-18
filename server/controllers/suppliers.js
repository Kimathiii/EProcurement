const Supplier = require("../models/suppliers");

// Create a new supplier
const createSupplier = async (req, res) => {
	try {
		const supplier = new Supplier(req.body);
		await supplier.save();
		res
			.status(201)
			.json({ message: "Supplier created successfully", supplier });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// Get all suppliers
const getAllSuppliers = async (req, res) => {
	try {
		const suppliers = await Supplier.find({});
		res.status(200).json(suppliers);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Get a single supplier by ID
const getSupplierById = async (req, res) => {
	const { id } = req.params;
	try {
		const supplier = await Supplier.findById(id);
		if (!supplier) {
			return res.status(404).json({ message: "Supplier not found" });
		}
		res.status(200).json(supplier);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Update a supplier by ID
const updateSupplier = async (req, res) => {
	const { id } = req.params;
	const { updateDetails } = req.body;
	try {
		const supplier = await Supplier.findByIdAndUpdate(id, updateDetails, {
			new: true,
			runValidators: true,
		});
		if (!supplier) {
			return res.status(404).json({ message: "Supplier not found" });
		}
		res
			.status(200)
			.json({ message: "Supplier updated successfully", supplier });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// Delete a supplier by ID
const deleteSupplier = async (req, res) => {
	const { id } = req.params;
	try {
		const supplier = await Supplier.findByIdAndDelete(id);
		if (!supplier) {
			return res.status(404).json({ message: "Supplier not found" });
		}
		res.status(200).json({ message: "Supplier deleted successfully" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

module.exports = {
	deleteSupplier,
	updateSupplier,
	createSupplier,
	getAllSuppliers,
	getSupplierById,
};
