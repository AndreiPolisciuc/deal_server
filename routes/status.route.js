const Router = require("express");
const router = Router();
const StatusController = require("../controllers/status.controller");

router.post("/status", StatusController.createStatus);
router.get("/status", StatusController.getStatuses);
router.get("/status/active", StatusController.getActiveStatuses);
router.get("/status/:id", StatusController.getOneStatus);
router.put("/status/:id", StatusController.updateStatus);
router.delete("/status/:id", StatusController.deleteStatus);


module.exports = router;