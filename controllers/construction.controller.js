const db = require("../db");

class ConstructionController {
    async createConstruction(req, res) {
        const { name, text, company_id, location } = req.body;
        const newPerson = await db.query("INSERT INTO constructions (name, text, company_id, location) VALUES ($1, $2, $3, $4) RETURNING *", [name, text, company_id, location]);
        res.json(newPerson.rows[0]);
    }
    async getConstructions(req, res) {
        const users = await db.query("SELECT * FROM constructions ORDER BY active DESC, name ASC");
        res.json(users.rows);
    }

    async getConstructionsInCompany(req, res) {
        const company_id = req.params.company_id;
        const users = await db.query("SELECT * FROM constructions WHERE company_id=$1 ORDER BY active DESC, name ASC", [company_id]);
        res.json(users.rows);
    }

    async getOneConstruction(req, res) {
        const id = req.params.id;
        const user = await db.query("SELECT * FROM constructions WHERE id = $1", [id]);
        res.json(user.rows[0]);

    }
    async updateConstruction(req, res) {
        const {id, name, text, active, company_id, location} = req.body;
        const user = await db.query("UPDATE constructions SET name = $1, text = $2, active = $4, company_id = $5, location = $6 WHERE id = $3 RETURNING *", [name, text, id, active, company_id, location]);
        res.json(user.rows[0]);
    }
    async deleteConstruction(req, res) {
        const id = req.params.id;
        const user = await db.query("DELETE FROM constructions WHERE id = $1", [id]);
        res.json(user.rows[0]);
    }
}

module.exports = new ConstructionController();