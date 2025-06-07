const Router = require("express");
const router = Router();
const planController = require("../controllers/plan.controller");

router.post("/plan", planController.createPlan);
router.get("/plans", planController.getPlans);
router.get("/plans/:construction_id", planController.getPlansInConstruction);
router.get("/plan/:id", planController.getOnePlan);
router.put("/plan/:id", planController.updatePlan);
router.delete("/plan/:id", planController.deletePlan);


module.exports = router;