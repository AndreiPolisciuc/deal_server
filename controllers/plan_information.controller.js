const db = require("../db");

class PlanInformationController {
    async createPlanInformation(req, res) {
        const { plan_id, type_of_work_id, text, file, type_of_file, name} = req.body;
        const newPerson = await db.query("INSERT INTO plans_information (plan_id, type_of_work_id, text, file, type_of_file, name) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [plan_id, type_of_work_id, text, file, type_of_file, name]);
        res.json(newPerson.rows[0]);
    }
    async getPlanInformations(req, res) {
        const users = await db.query("SELECT * FROM plans_information ORDER BY active DESC, name ASC");
        res.json(users.rows);
    }

    async getPlanInformationsInPlan(req, res) {
        const plan_id = req.params.plan_id;
        const users = await db.query("SELECT * FROM plans_information WHERE plan_id=$1 ORDER BY id ASC", [plan_id]);
        res.json(users.rows);
    }

    async getOnePlanInformation(req, res) {
        const id = req.params.id;
        const user = await db.query("SELECT * FROM plans_information WHERE id = $1", [id]);
        res.json(user.rows[0]);

    }
    async updatePlanInformation(req, res) {
        const {id, name, active, construction_id} = req.body;
        const user = await db.query("UPDATE plans_information SET name = $1,  active = $2, construction_id = $3 WHERE id = $4 RETURNING *", [name, active, construction_id, id]);
        res.json(user.rows[0]);
    }
    async deletePlanInformation(req, res) {
        const id = req.params.id;
        const user = await db.query("DELETE FROM plans_information WHERE id = $1", [id]);
        res.json(user.rows[0]);
    }
}

module.exports = new PlanInformationController();