/**
 * Applies basic equality and multi-select filters.
 *
 * Supported Filters
 * -----------------
 * gender
 * status
 * branchId
 * degree
 * communityId
 * religionId
 * admissionTypeId
 * entryTypeId
 * bloodGroup
 * nationality
 * isHosteller
 */

function applyBasicFilters(query, params) {

    /**
     * Converts comma separated values into array.
     * Example:
     * "1,2,3"
     * =>
     * ["1","2","3"]
     */

    const toArray = (value) =>
        value
            .split(",")
            .map(v => v.trim())
            .filter(Boolean);

    //-------------------------
    // Student Filters
    //-------------------------

    if (params.gender) {
        query.where("s.gender", params.gender);
    }

    if (params.status) {
        query.where("s.status", params.status);
    }

    if (params.isHosteller !== undefined) {

        query.where(
            "s.ishosteller",
            params.isHosteller === "true"
        );

    }

    if (params.bloodGroup) {

        query.whereIn(
            "s.bloodgroup",
            toArray(params.bloodGroup)
        );

    }

    if (params.nationality) {

        query.whereIn(
            "s.nationality",
            toArray(params.nationality)
        );

    }

    //-------------------------
    // Branch Filters
    //-------------------------

    if (params.branchId) {

        query.whereIn(
            "s.branchid",
            toArray(params.branchId)
        );

    }

    if (params.degree) {

        query.whereIn(
            "b.degree",
            toArray(params.degree)
        );

    }

    //-------------------------
    // Community
    //-------------------------

    if (params.communityId) {

        query.whereIn(
            "s.communityid",
            toArray(params.communityId)
        );

    }

    //-------------------------
    // Religion
    //-------------------------

    if (params.religionId) {

        query.whereIn(
            "s.religionid",
            toArray(params.religionId)
        );

    }

    //-------------------------
    // Admission Type
    //-------------------------

    if (params.admissionTypeId) {

        query.whereIn(
            "s.admissiontypeid",
            toArray(params.admissionTypeId)
        );

    }

    //-------------------------
    // Entry Type
    //-------------------------

    if (params.entryTypeId) {

        query.whereIn(
            "s.entrytypeid",
            toArray(params.entryTypeId)
        );

    }

    
    //-------------------------
    // Faculty Advisor
    //-------------------------

    if (params.faId) {

        query.whereIn(
            "s.fa_id",
            toArray(params.faId)
        );

    }

}

module.exports = {
    applyBasicFilters,
};