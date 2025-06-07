const Router = require("express");
const router = Router();
const constructionController = require("../controllers/construction.controller");

router.post("/construction", constructionController.createConstruction);
router.get("/constructions", constructionController.getConstructions);
router.get("/constructions/:company_id", constructionController.getConstructionsInCompany);
router.get("/construction/:id", constructionController.getOneConstruction);
router.put("/construction/:id", constructionController.updateConstruction);
router.delete("/construction/:id", constructionController.deleteConstruction);


module.exports = router;