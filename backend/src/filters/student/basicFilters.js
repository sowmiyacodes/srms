/**
 * Applies basic equality filters to the student query.
 *
 * Supported Filters:
 * -------------------
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

function applyBasicFilters(query, filters) {

    const {

        gender,

        status,

        branchId,

        degree,

        communityId,

        religionId,

        admissionTypeId,

        entryTypeId,

        bloodGroup,

        nationality,

        isHosteller

    } = filters;

    // -------------------------
    // Gender
    // -------------------------

    if (gender) {
        query.where("s.Gender", gender);
    }

    // -------------------------
    // Status
    // -------------------------

    if (status) {
        query.where("s.Status", status);
    }

    // -------------------------
    // Branch
    // -------------------------

    if (branchId) {

        const branchIds = branchId
            .split(",")
            .map(Number);

        query.whereIn(
            "s.BranchID",
            branchIds
        );
    }

    // -------------------------
    // Degree
    // -------------------------

    if (degree) {
        query.where("b.Degree", degree);
    }

    // -------------------------
    // Community
    // -------------------------

    if (communityId) {

        const communityIds = communityId
            .split(",")
            .map(Number);

        query.whereIn(
            "s.CommunityID",
            communityIds
        );
    }

    // -------------------------
    // Religion
    // -------------------------

    if (religionId) {

        const religionIds = religionId
            .split(",")
            .map(Number);

        query.whereIn(
            "s.ReligionID",
            religionIds
        );
    }

    // -------------------------
    // Admission Type
    // -------------------------

    if (admissionTypeId) {

        const admissionIds = admissionTypeId
            .split(",")
            .map(Number);

        query.whereIn(
            "s.AdmissionTypeID",
            admissionIds
        );
    }

    // -------------------------
    // Entry Type
    // -------------------------

    if (entryTypeId) {

        const entryTypeIds = entryTypeId
            .split(",")
            .map(Number);

        query.whereIn(
            "s.EntryTypeID",
            entryTypeIds
        );
    }

    // -------------------------
    // Blood Group
    // -------------------------

    if (bloodGroup) {
        query.where("s.BloodGroup", bloodGroup);
    }

    // -------------------------
    // Nationality
    // -------------------------

    if (nationality) {
        query.where("s.Nationality", nationality);
    }

    // -------------------------
    // Hosteller
    // -------------------------

    if (isHosteller !== undefined) {

        query.where(
            "s.IsHosteller",
            isHosteller === "true"
        );
    }

    return query;
}

module.exports = {
    applyBasicFilters
};