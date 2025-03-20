const { Router } = require("express");
const {
	createInventoryItem,
	getAllInventoryItems,
	getInventoryItemById,
	updateInventoryItem,
	deleteInventoryItem,
} = require("../controllers/inventory");
const router = new Router();

router.post("/add", createInventoryItem);
router.get("/", getAllInventoryItems);
router.get("/:id", getInventoryItemById);
router.put("/:id", updateInventoryItem);
router.delete("/:id", deleteInventoryItem);

module.exports = router;
