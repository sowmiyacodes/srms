const knex = require("../config/db");

async function getFacultyList(req, res, next) {

    try {

        const faculty = await knex("staff")
            .select(
                "staffid",
                "staffname"
            )
            .orderBy("staffname");

        res.json(faculty);

    }

    catch (err) {

        next(err);

    }

}

module.exports = {
    getFacultyList
};