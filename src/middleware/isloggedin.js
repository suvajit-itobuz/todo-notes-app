import sessionSchema from "../models/sessionSchema.js";

const isLoggedIn = async (req, res, next) => {
    try {
        const { userId } = req.body;
        const session = await sessionSchema.findOne({userId});
        if (session) next();
        else {
            return res.status(404).send({
                success: false,
                message: "Session not found:User is logged out"
            });
        }
    } catch (err) {
        res.status(500).send({
            success: false,
            message: "Internal Error"
        });
    }
}

export default isLoggedIn;