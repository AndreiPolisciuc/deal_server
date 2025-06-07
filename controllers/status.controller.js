const db = require("../db");

class StatusController {
    async createStatus(req, res) {
        const { name, sort, color } = req.body;
        const newPerson = await db.query("INSERT INTO statuses (name, sort, color) VALUES ($1, $2, $3) RETURNING *", [name, sort, color]);
        res.json(newPerson.rows[0]);
    }
    async getStatuses(req, res) {
        const users = await db.query("SELECT * FROM statuses ORDER BY active DESC, sort ASC");
        res.json(users.rows);
    }
    async getActiveStatuses(req, res) {
        const users = await db.query("SELECT * FROM statuses WHERE active = TRUE ORDER BY active DESC, sort ASC");
        res.json(users.rows);
    }
    async getOneStatus(req, res) {
        const id = req.params.id;
        const user = await db.query("SELECT * FROM statuses WHERE id = $1", [id]);
        res.json(user.rows[0]);

    }
    async updateStatus(req, res) {
        const {id, name, active, sort, color} = req.body;
        const user = await db.query("UPDATE statuses SET name = $1, active = $3, sort = $4, color=$5 WHERE id = $2 RETURNING *", [name, id, active, sort, color]);
        res.json(user.rows[0]);
    }
    async deleteStatus(req, res) {
        const id = req.params.id;
        const user = await db.query("DELETE FROM statuses WHERE id = $1", [id]);
        res.json(user.rows[0]);
    }
}

module.exports = new StatusController();