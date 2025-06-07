const db = require("../db");

class TypeOfWorkController {
    async createTypeOfWork(req, res) {
        const { name, text, sort } = req.body;
        const newData = await db.query("INSERT INTO types_of_work (name, text, sort) VALUES ($1, $2, $3) RETURNING *", [name, text, sort]);

        const houses = await db.query("SELECT id, construction_id FROM houses");
        await Promise.all(
            houses.rows.map((house) =>
                db.query(
                    "INSERT INTO houses_statuses (house_id, type_of_work_id, target_date, construction_id) VALUES ($1, $2, CURRENT_DATE, $3)",
                    [house.id, newData.rows[0].id, house.construction_id]
                )
            )
        );

        res.json(newData.rows[0]);
    }
    async getTypesOfWork(req, res) {
        const users = await db.query("SELECT * FROM types_of_work ORDER BY active DESC, sort ASC");
        res.json(users.rows);
    }
    async getActiveTypesOfWork(req, res) {
        const users = await db.query("SELECT * FROM types_of_work WHERE active = TRUE ORDER BY active DESC, sort ASC");
        res.json(users.rows);
    }
    async getOneTypeOfWork(req, res) {
        const id = req.params.id;
        const user = await db.query("SELECT * FROM types_of_work WHERE id = $1", [id]);
        res.json(user.rows[0]);

    }
    async updateTypeOfWork(req, res) {
        const {id, name, text, active, sort} = req.body;
        const user = await db.query("UPDATE types_of_work SET name = $1, text = $2, active = $4, sort = $5 WHERE id = $3 RETURNING *", [name, text, id, active, sort]);
        res.json(user.rows[0]);
    }
    async deleteTypeOfWork(req, res) {
        const id = req.params.id;
        const user = await db.query("DELETE FROM types_of_work WHERE id = $1", [id]);
        res.json(user.rows[0]);
    }
}

module.exports = new TypeOfWorkController();