const ProcurementActivity = require("../models/procurementActivities");

// Create a new procurement activity
const createProcurementActivity = async (req, res) => {
	try {
		const activity = new ProcurementActivity(req.body);
		await activity.save();
		res
			.status(201)
			.json({ message: "Procurement activity created successfully", activity });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// Get all procurement activities
const getAllProcurementActivities = async (req, res) => {
	try {
		const activities = await ProcurementActivity.find().populate("user_id");
		res.status(200).json(activities);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Get a single procurement activity by ID
const getProcurementActivityById = async (req, res) => {
	try {
		const activity = await ProcurementActivity.findById(req.params.id).populate(
			"user_id"
		);
		if (!activity) {
			return res
				.status(404)
				.json({ message: "Procurement activity not found" });
		}
		res.status(200).json(activity);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Update a procurement activity by ID
const updateProcurementActivity = async (req, res) => {
	try {
		const activity = await ProcurementActivity.findByIdAndUpdate(
			req.params.id,
			req.body,
			{
				new: true,
				runValidators: true,
			}
		);
		if (!activity) {
			return res
				.status(404)
				.json({ message: "Procurement activity not found" });
		}
		res
			.status(200)
			.json({ message: "Procurement activity updated successfully", activity });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// Delete a procurement activity by ID
const deleteProcurementActivity = async (req, res) => {
	try {
		const activity = await ProcurementActivity.findByIdAndDelete(req.params.id);
		if (!activity) {
			return res
				.status(404)
				.json({ message: "Procurement activity not found" });
		}
		res
			.status(200)
			.json({ message: "Procurement activity deleted successfully" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

module.exports = {
	createProcurementActivity,
	getAllProcurementActivities,
	getProcurementActivityById,
	updateProcurementActivity,
	deleteProcurementActivity,
};
