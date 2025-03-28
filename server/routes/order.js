const { Router } = require("express");
const {
	createOrder,
	getAllOrders,
	getOrderById,
} = require("../controllers/orders");
const router = new Router();

router.get("/", getAllOrders);
router.get("/:id", getOrderById);
router.post("/add", createOrder);

module.exports = router;
