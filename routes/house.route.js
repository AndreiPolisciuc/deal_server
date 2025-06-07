const Router = require("express");
const router = Router();
const houseController = require("../controllers/house.controller");

router.post("/house", houseController.createHouse);
router.get("/houses", houseController.getHouses);
router.get("/houses/:construction_id", houseController.getHousesInConstruction);
router.get("/house/:id", houseController.getOneHouse);
router.put("/house/:id", houseController.updateHouse);
router.delete("/house/:id", houseController.deleteHouse);
router.get("/house-statuses/:construction_id", houseController.getStatusesOfHouse);
router.get("/houses-filter", houseController.getFilteredHouse);
router.put("/house-status-change/", houseController.updateStatus);
router.put("/house-date-change/", houseController.updateTargetDate);
router.put("/house-user-change/", houseController.updateUser);
router.put("/house-note-change/", houseController.updateNote);

module.exports = router;