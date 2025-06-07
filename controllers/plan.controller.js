const db = require("../db");

class PlanController {
    async createPlan(req, res) {
        const { name, construction_id } = req.body;
        const newPerson = await db.query("INSERT INTO plans (name, construction_id) VALUES ($1, $2) RETURNING *", [name, construction_id]);
        res.json(newPerson.rows[0]);
    }
    async getPlans(req, res) {
        const users = await db.query("SELECT * FROM plans ORDER BY active DESC, name ASC");
        res.json(users.rows);
    }

    async getPlansInConstruction(req, res) {
        const construction_id = req.params.construction_id;
        const users = await db.query("SELECT * FROM plans WHERE construction_id=$1 ORDER BY active DESC, name ASC", [construction_id]);
        res.json(users.rows);
    }

    async getOnePlan(req, res) {
        const id = req.params.id;
        const user = await db.query("SELECT * FROM plans WHERE id = $1", [id]);
        res.json(user.rows[0]);

    }
    async updatePlan(req, res) {
        const {id, name, active, construction_id} = req.body;
        const user = await db.query("UPDATE plans SET name = $1,  active = $2, construction_id = $3 WHERE id = $4 RETURNING *", [name, active, construction_id, id]);
        res.json(user.rows[0]);
    }
    async deletePlan(req, res) {
        const id = req.params.id;
        const user = await db.query("DELETE FROM plans WHERE id = $1", [id]);
        res.json(user.rows[0]);
    }
}

module.exports = new PlanController();