const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

console.log("SUPABASE_URL:", process.env.SUPABASE_URL);
console.log("KEY LOADED:", !!process.env.SUPABASE_KEY);

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

module.exports = supabase;