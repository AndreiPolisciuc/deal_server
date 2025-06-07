const Router = require("express");
const router = Router();
const companyController = require("../controllers/company.controller");

router.post("/company", companyController.createCompany);
router.get("/company", companyController.getCompanies);
router.get("/company/:id", companyController.getOneCompany);
router.put("/company/:id", companyController.updateCompany);
router.delete("/company/:id", companyController.deleteCompany);


module.exports = router;