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
router.patch("/update/:inventoryId", updateInventoryItem);
router.delete("/remove/:id", deleteInventoryItem);

module.exports = router;
