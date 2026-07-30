const knex = require("../config/db");
const staffService = require("../services/staff.service");

async function getFacultyList(req, res, next) {
    try {
        const faculty = await knex("staff")
            .select(
                "staffid",
                "staffname"
            )
            .orderBy("staffname");

        res.json(faculty);
    } catch (err) {
        next(err);
    }
}

async function getStaffList(req, res, next) {
    try {
        const result = await staffService.getStaffList(req.query);

        res.json(result);
    } catch (err) {
        next(err);
    }
}

async function getStaffDetails(req, res, next) {
    try {
        const { id } = req.params;

        const staff = await staffService.getStaffDetails(id);

        res.json({
            success: true,
            data: staff,
        });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getFacultyList,
    getStaffList,
    getStaffDetails,
};