/**
 * applies basic equality filters to the student query.
 *
 * supported filters:
 * -------------------
 * gender
 * status
 * branchid
 * degree
 * communityid
 * religionid
 * admissiontypeid
 * entrytypeid
 * bloodgroup
 * nationality
 * ishosteller
 */

function applybasicfilters(query, filters) {

    const {

        gender,

        status,

        branchid,

        degree,

        communityid,

        religionid,

        admissiontypeid,

        entrytypeid,

        bloodgroup,

        nationality,

        ishosteller

    } = filters;


    // -------------------------
    // gender
    // -------------------------

    if (gender) {
        query.where("s.gender", gender);
    }


    // -------------------------
    // status
    // -------------------------

    if (status) {
        query.where("s.status", status);
    }


    // -------------------------
    // branch
    // -------------------------

    if (branchid) {

        const branchids = branchid
            .split(",")
            .map(Number);

        query.whereIn(
            "s.branchid",
            branchids
        );
    }


    // -------------------------
    // degree
    // -------------------------

    if (degree) {
        query.where("b.degree", degree);
    }


    // -------------------------
    // community
    // -------------------------

    if (communityid) {

        const communityids = communityid
            .split(",")
            .map(Number);

        query.whereIn(
            "s.communityid",
            communityids
        );
    }


    // -------------------------
    // religion
    // -------------------------

    if (religionid) {

        const religionids = religionid
            .split(",")
            .map(Number);

        query.whereIn(
            "s.religionid",
            religionids
        );
    }


    // -------------------------
    // admission type
    // -------------------------

    if (admissiontypeid) {

        const admissiontypeids = admissiontypeid
            .split(",")
            .map(Number);

        query.whereIn(
            "s.admissiontypeid",
            admissiontypeids
        );
    }


    // -------------------------
    // entry type
    // -------------------------

    if (entrytypeid) {

        const entrytypeids = entrytypeid
            .split(",")
            .map(Number);

        query.whereIn(
            "s.entrytypeid",
            entrytypeids
        );
    }


    // -------------------------
    // blood group
    // -------------------------

    if (bloodgroup) {
        query.where(
            "s.bloodgroup",
            bloodgroup
        );
    }


    // -------------------------
    // nationality
    // -------------------------

    if (nationality) {
        query.where(
            "s.nationality",
            nationality
        );
    }


    // -------------------------
    // hosteller
    // -------------------------

    if (ishosteller !== undefined) {

        query.where(
            "s.ishosteller",
            ishosteller === "true"
        );
    }


    return query;
}


module.exports = {
    applybasicfilters
};