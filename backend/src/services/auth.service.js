const supabase = require("../config/supabase");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * ================================
 * Register Faculty
 * ================================
 */
async function register(userData) {

    const {
        full_name,
        email,
        password,
        staff_id
    } = userData;

    //------------------------------------------------
    // Check whether email already exists
    //------------------------------------------------

    const { data: existingUser } = await supabase
        .from("users")
        .select("id")
        .eq("email", email)
        .maybeSingle();

    if (existingUser) {

        throw new Error("Email already exists");

    }

    //------------------------------------------------
    // Hash Password
    //------------------------------------------------

    const hashedPassword = await bcrypt.hash(password, 10);

    //------------------------------------------------
    // Insert User
    //------------------------------------------------

    const { data, error } = await supabase
        .from("users")
        .insert([
            {
                full_name,
                email,
                password: hashedPassword,
                role: "faculty",
                staff_id
            }
        ])
        .select()
        .single();

    if (error) {

        throw new Error(error.message);

    }

    return data;

}

/**
 * ================================
 * Login
 * ================================
 */
async function login(email, password) {

    //------------------------------------------------
    // Find User
    //------------------------------------------------

    const { data: user, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .maybeSingle();

    if (error) {

        throw new Error(error.message);

    }

    if (!user) {

        throw new Error("User not found");

    }

    //------------------------------------------------
    // Verify Password
    //------------------------------------------------

    const isPasswordCorrect = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordCorrect) {

        throw new Error("Invalid Password");

    }

    //------------------------------------------------
    // Generate JWT
    //------------------------------------------------

    const token = jwt.sign(

        {
            id: user.id,
            role: user.role,
            staff_id: user.staff_id
        },

        process.env.JWT_SECRET,

        {
            expiresIn: process.env.JWT_EXPIRES_IN
        }

    );

    //------------------------------------------------
    // Return
    //------------------------------------------------

    return {

        token,

        user: {

            id: user.id,

            full_name: user.full_name,

            email: user.email,

            role: user.role,

            staff_id: user.staff_id

        }

    };

}

module.exports = {

    register,

    login

};