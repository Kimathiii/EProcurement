const { Router } = require("express");
const {
	createSupplier,
	getAllSuppliers,
	getSupplierById,
	updateSupplier,
	deleteSupplier,
} = require("../controllers/suppliers");
const router = new Router();

router.post("/add", createSupplier);
router.get("/", getAllSuppliers);
router.get("/:id", getSupplierById);
router.put("/:id", updateSupplier);
router.delete("/:id", deleteSupplier);

module.exports = router;
