const Router = require("express");
const router = Router();
const TypeOfWorkController = require("../controllers/type_of_work.controller");

router.post("/type_of_work", TypeOfWorkController.createTypeOfWork);
router.get("/type_of_work", TypeOfWorkController.getTypesOfWork);
router.get("/type_of_work/active", TypeOfWorkController.getActiveTypesOfWork);
router.get("/type_of_work/:id", TypeOfWorkController.getOneTypeOfWork);
router.put("/type_of_work/:id", TypeOfWorkController.updateTypeOfWork);
router.delete("/type_of_work/:id", TypeOfWorkController.deleteTypeOfWork);


module.exports = router;