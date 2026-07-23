const supabase = require("../config/supabase");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ================= Register =================

exports.register = async (req, res) => {

    try {

        const {
            full_name,
            email,
            password
        } = req.body;

        const { data: existingUser } = await supabase
            .from("users")
            .select("*")
            .eq("email", email)
            .maybeSingle();

        if (existingUser) {

            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });

        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const { data, error } = await supabase
            .from("users")
            .insert([
                {
                    full_name,
                    email,
                    password: hashedPassword,
                    role: "faculty"
                }
            ])
            .select();

        if (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }

        res.status(201).json({

            success: true,

            message: "Faculty Registered Successfully",

            user: data

        });

    }

    catch (err) {

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};

// ================= Login =================

exports.login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const { data, error } = await supabase
            .from("users")
            .select("*")
            .eq("email", email)
            .maybeSingle();

        if (error) {

            return res.status(500).json({

                success: false,

                message: error.message

            });

        }

        if (!data) {

            return res.status(404).json({

                success: false,

                message: "User not found"

            });

        }

        const isMatch = await bcrypt.compare(
            password,
            data.password
        );

        if (!isMatch) {

            return res.status(401).json({

                success: false,

                message: "Invalid Password"

            });

        }

        const token = jwt.sign(

            {
                userId: data.id,
                staffId: data.staff_id,
                role: data.role
            },

            process.env.JWT_SECRET,

            {
                expiresIn: process.env.JWT_EXPIRES_IN
            }

        );

        res.status(200).json({

            success: true,

            message: "Login Successful",

            token,

            user: {

                id: data.id,

                staffId: data.staff_id,

                full_name: data.full_name,

                email: data.email,

                role: data.role

            }

        });

    }

    catch (err) {

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};