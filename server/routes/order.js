const { Router } = require("express");
const {
	createOrder,
	getAllOrders,
	getOrderById,
	updateOrder,
	deleteOrder,
} = require("../controllers/orders");
const router = new Router();

router.get("/", getAllOrders);
router.get("/:id", getOrderById);
router.post("/add", createOrder);
router.patch("/update/:orderId", updateOrder);
router.delete("/remove/:orderId", deleteOrder);

module.exports = router;
