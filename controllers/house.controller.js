const db = require("../db");

class HouseController {
    async createHouse(req, res) {
        const { name, construction_id, plan_id, street, unit, city, state, zip_code } = req.body;

        // Создание дома
        const newHouse = await db.query(
            "INSERT INTO houses (name, construction_id, plan_id, street, unit, city, state, zip_code) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
            [name, construction_id, plan_id, street, unit, city, state, zip_code]
        );

        const houseId = newHouse.rows[0].id;
        const houseConstructionId = newHouse.rows[0].construction_id;

        // Получение типов работ
        const typesOfWork = await db.query("SELECT id FROM types_of_work");

        // Вставка статусов для каждого типа работ
        await Promise.all(
            typesOfWork.rows.map((typeOfWork) =>
                db.query(
                    "INSERT INTO houses_statuses (house_id, type_of_work_id, target_date, construction_id) VALUES ($1, $2, CURRENT_DATE, $3)",
                    [houseId, typeOfWork.id, houseConstructionId]
                )
            )
        );

        res.json(newHouse.rows[0]);
    }
    async getHouses(req, res) {
        const houses = await db.query("SELECT * FROM houses ORDER BY active DESC, name ASC");
        res.json(houses.rows);
    }

    async getHousesInConstruction(req, res) {
        const construction_id = req.params.construction_id;
        const houses = await db.query("SELECT * FROM houses WHERE construction_id=$1 ORDER BY active DESC, name ASC", [construction_id]);
        res.json(houses.rows);
    }

    async getStatusesOfHouse(req, res) {
        const construction_id = req.params.construction_id;
        const statuses = await db.query("SELECT house_id, types_of_work.name AS type_of_work_name, statuses.color AS status_color, statuses.name AS status_name, houses_statuses.target_date FROM houses_statuses JOIN types_of_work ON houses_statuses.type_of_work_id = types_of_work.id JOIN statuses ON houses_statuses.status_id = statuses.id WHERE houses_statuses.construction_id = $1 AND types_of_work.active = TRUE ORDER BY types_of_work.name;", [construction_id]);

        res.json(statuses.rows);
    }


    async getFilteredHouse(req, res) {
        const {type_of_work_id, status_id, user_id, construction_id, house_name, target_date} = req.query;
        let condition = " WHERE houses.active ";
        if (type_of_work_id) condition += " AND type_of_work_id =" + type_of_work_id;
        if (status_id) condition += " AND status_id =" + status_id;
        if (user_id) condition += " AND user_id =" + user_id;
        if (construction_id) condition += " AND houses.construction_id =" + construction_id;
        if (house_name) condition += " AND houses.name= " + house_name +"";
        if (target_date) condition += " AND (target_date >= '" + target_date+"' AND status_id != 5)";

        const select = "houses_statuses.id AS id, house_id, note, " +
                            "houses.name AS house_name, street, unit, city, zip_code, state, " +
                            "types_of_work.name AS type_of_work_name, " +
                            "statuses.name AS status_name, statuses.id AS status_id, statuses.color AS status_color, " +
                            "target_date, " +
                            "users.id AS user_id, users.name AS user_name, " +
                            "plans.id AS plan_id, plans.name AS plan_name, " +
                            "company_id, houses_statuses.construction_id AS construction_id, constructions.name AS construction_name, constructions.location AS construction_location ";
        const orderBy = " ORDER BY statuses.sort ASC, target_date ASC"
        const join = "JOIN types_of_work ON houses_statuses.type_of_work_id = types_of_work.id " +
                            "JOIN statuses ON houses_statuses.status_id = statuses.id " +
                            "JOIN houses ON houses_statuses.house_id = houses.id " +
                            "JOIN plans ON houses.plan_id = plans.id " +
                            "JOIN constructions ON houses_statuses.construction_id = constructions.id " +
                            "LEFT JOIN users ON houses_statuses.user_id = users.id ";
        const query= "SELECT "+select+" FROM houses_statuses "+join+condition+orderBy+" LIMIT 100";

        const statuses = await db.query(query);
        res.json(statuses.rows);
    }

    async getOneHouse(req, res) {
        const id = req.params.id;
        const house = await db.query("SELECT * FROM houses WHERE id = $1", [id]);
        res.json(house.rows[0]);

    }
    async updateHouse(req, res) {
        const {id, name, active, construction_id, plan_id, street, unit, city, state, zip_code} = req.body;
        const house = await db.query("UPDATE houses SET name = $1,  active = $2, construction_id = $3, plan_id = $5, street = $6, unit = $7, city = $8, state = $9, zip_code = $10 WHERE id = $4 RETURNING *", [name, active, construction_id, id, plan_id, street, unit, city, state, zip_code]);
        res.json(house.rows[0]);
    }


   async updateStatus(req, res) {
        const {id, status_id} = req.body;
        const house = await db.query("UPDATE houses_statuses SET status_id = $1 WHERE id = $2 RETURNING *", [status_id, id]);
        res.json(house.rows[0]);
    }

    async updateTargetDate(req, res) {
        const {id, target_date} = req.body;
        const house = await db.query("UPDATE houses_statuses SET target_date = $1 WHERE id = $2 RETURNING *", [target_date, id]);
        res.json(house.rows[0]);
    }

    async updateNote(req, res) {
        const {id, note} = req.body;
        const house = await db.query("UPDATE houses_statuses SET note = $1 WHERE id = $2 RETURNING *", [note, id]);
        res.json(house.rows[0]);
    }

    async updateUser(req, res) {
        const {id, user_id} = req.body;
        const house = await db.query("UPDATE houses_statuses SET user_id = $1 WHERE id = $2 RETURNING *", [user_id, id]);
        res.json(house.rows[0]);
    }

    async deleteHouse(req, res) {
        const id = req.params.id;
        const house = await db.query("DELETE FROM houses WHERE id = $1", [id]);
        res.json(house.rows[0]);
    }
}

module.exports = new HouseController();