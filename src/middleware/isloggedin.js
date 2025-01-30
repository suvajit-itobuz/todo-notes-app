import sessionSchema from "../models/sessionSchema.js";

const isLoggedIn = async (req, res, next) => {
  try {
    let session;
    const { _id } = req.body;
    if (!_id) {
      const userId = req.userId;
       session = await sessionSchema.findOne({ userId });
    }
    else {

        session = await sessionSchema.findOne({ userId: _id });
    }
    if (session) next();
    else {
      return res.status(404).send({
        success: false,
        message: "Session not found",
      });
    }
  } catch (err) {
    res.status(500).send({
      success: false,
      error: err.message,
      message: "error in session validation",
    });
  }
};

export default isLoggedIn;
