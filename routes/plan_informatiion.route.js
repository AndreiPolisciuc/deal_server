const Router = require("express");
const router = Router();
const PlanInformationController = require("../controllers/plan_information.controller");

router.post("/plan-information", PlanInformationController.createPlanInformation);
router.get("/plan-informations/:plan_id", PlanInformationController.getPlanInformationsInPlan);
router.delete("/plan-information/:id", PlanInformationController.deletePlanInformation);


module.exports = router;