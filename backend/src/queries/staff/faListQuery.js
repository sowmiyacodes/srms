const db = require("../../config/db");

const buildFAListQuery = async () => {
  console.log("FA Query Hit");

  /*
   * First prepare student data.
   *
   * yearNumber:
   *
   * If month > June:
   * currentYear - joiningYear + 1
   *
   * Otherwise:
   * currentYear - joiningYear
   *
   * Lateral students are excluded.
   */

  const studentData = db("student as st")
    .select(
      "st.studentid",
      "st.regno",
      "st.fa_id",
      "st.branchid"
    )
    .select(
      db.raw(`
        CASE
          WHEN EXTRACT(MONTH FROM CURRENT_DATE) > 6
          THEN
            EXTRACT(YEAR FROM CURRENT_DATE)::integer
            - SUBSTRING(st.regno, 1, 4)::integer
            + 1
          ELSE
            EXTRACT(YEAR FROM CURRENT_DATE)::integer
            - SUBSTRING(st.regno, 1, 4)::integer
        END AS year_number
      `)
    )
    .whereRaw("SUBSTRING(st.regno, 8, 1) <> '3'");

  /*
   * Now use the calculated year_number
   * to find the MCC.
   */

  const rows = await db
    .from(studentData.as("st"))
    .join("staff as fa", "st.fa_id", "fa.staffid")
    .join("branch as b", "st.branchid", "b.branchid")

    /*
     * MCC is determined by:
     *
     * branch_id + year_number
     */
    .leftJoin("mcc_assignment as ma", function () {
      this.on("ma.branch_id", "=", "st.branchid")
        .andOn("ma.year_number", "=", "st.year_number");
    })

    .leftJoin("staff as mcc", "ma.staff_id", "mcc.staffid")

    .select(
      "st.year_number",

      db.raw(`
        CASE
          WHEN st.year_number = 1 THEN 'I Year'
          WHEN st.year_number = 2 THEN 'II Year'
          WHEN st.year_number = 3 THEN 'III Year'
          WHEN st.year_number = 4 THEN 'IV Year'
          ELSE st.year_number::text || ' Year'
        END AS year
      `),

      "b.branchid",
      "b.branchname as department",

      // FA details
      "fa.staffid as faId",
      "fa.staffname as faName",
      "fa.emailid as faEmail",
      "fa.mobileno as faNumber",

      // MCC details
      "mcc.staffid as mccId",
      "mcc.staffname as mccName",
      "mcc.emailid as mccEmail",
      "mcc.mobileno as mccNumber"
    )

    /*
     * One row for each:
     *
     * Year + Branch + FA + MCC
     */
    .countDistinct("st.studentid as studentCount")

    .groupBy(
      "st.year_number",

      "b.branchid",
      "b.branchname",

      "fa.staffid",
      "fa.staffname",
      "fa.emailid",
      "fa.mobileno",

      "mcc.staffid",
      "mcc.staffname",
      "mcc.emailid",
      "mcc.mobileno"
    )

    .orderBy([
      {
        column: "st.year_number",
        order: "asc",
      },
      {
        column: "b.branchname",
        order: "asc",
      },
      {
        column: "fa.staffname",
        order: "asc",
      },
    ]);

  console.log("FA Query Result:", rows);

  return rows;
};

module.exports = {
  buildFAListQuery,
};