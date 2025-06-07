const db = require("../db");

class UserController {
    async createUser(req, res) {
        const { name, surname } = req.body;
        const newPerson = await db.query("INSERT INTO users (name, surname) VALUES ($1, $2) RETURNING *", [name, surname]);
        res.json(newPerson.rows[0]);
    }
    async getUsers(req, res) {
        const users = await db.query("SELECT * FROM users");
        res.json(users.rows);
    }

    async getUsersActive(req, res) {
        const users = await db.query("SELECT * FROM users WHERE active");
        res.json(users.rows);
    }
    async getOneUser(req, res) {
        const id = req.params.id;
        const user = await db.query("SELECT * FROM users WHERE id = $1", [id]);
        res.json(user.rows[0]);

    }
    async updateUser(req, res) {
        const {id, name, surname} = req.body;
        const user = await db.query("UPDATE users SET name = $1, surname = $2 WHERE id = $3 RETURNING *", [name, surname, id]);
        res.json(user.rows[0]);
    }
    async deleteUser(req, res) {
        const id = req.params.id;
        const user = await db.query("DELETE FROM users WHERE id = $1", [id]);
        res.json(user.rows[0]);
    }
}

module.exports = new UserController();