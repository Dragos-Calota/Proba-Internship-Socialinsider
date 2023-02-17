const { Router } = require("express");
const controller = require("./controller");
const router = Router();
router.get("/getBrands", controller.getBrands);

module.exports = router;
