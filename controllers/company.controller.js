const db = require("../db");

class CompanyController {
    async createCompany(req, res) {
        const { name, text } = req.body;
        const newPerson = await db.query("INSERT INTO companies (name, text) VALUES ($1, $2) RETURNING *", [name, text]);
        res.json(newPerson.rows[0]);
    }
    async getCompanies(req, res) {
        const users = await db.query("SELECT * FROM companies ORDER BY active DESC, name ASC");
        res.json(users.rows);
    }
    async getOneCompany(req, res) {
        const id = req.params.id;
        const user = await db.query("SELECT * FROM companies WHERE id = $1", [id]);
        res.json(user.rows[0]);

    }
    async updateCompany(req, res) {
        const {id, name, text, active} = req.body;
        const user = await db.query("UPDATE companies SET name = $1, text = $2, active = $4 WHERE id = $3 RETURNING *", [name, text, id, active]);
        res.json(user.rows[0]);
    }
    async deleteCompany(req, res) {
        const id = req.params.id;
        const user = await db.query("DELETE FROM companies WHERE id = $1", [id]);
        res.json(user.rows[0]);
    }
}

module.exports = new CompanyController();