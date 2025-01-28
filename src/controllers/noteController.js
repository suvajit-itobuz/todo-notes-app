import noteSchema from "../models/noteSchema.js";

export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.userId;
    const existing = await noteSchema.findOne({title:title,userId:req.userId})
    if(existing)
    {
      return res.status(400).json({
        success: false,
        message: "This title Already Exists",
      });
    }


    const note = await noteSchema.create({
      title,
      content,
      userId,
    });

    note.save();

    if (note) {
      res.json({
        status: 200,
        data: note,
        message: "data created successfully",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      status: 404,
      message: "error in data creation",
    });
  }
};

export const getNote = async (req, res) => {
  try {
    const userId = req.userId;
    const note = await noteSchema.find({userId:userId});
    if (note) {
      res.json({
        status: 200,
        data: note,
        message: "data fetched successfully",
      });
    }
  } catch (error) {
    console.log(error)
    res.json({
      status: 404,
      message: "data fetching failed",
    });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { _id, title,  content} = req.body;
    const updated_result = await noteSchema.findByIdAndUpdate(
      { _id },
      {
        title: title,
        content:content
      }
    );
    if (updated_result) {
      res.json({
        status: 200,
        success: true,
        data: updated_result,
        message: "data updated successfully",
      });
    } else {
      res.json({
        status: 404,
        message: "data not found",
      });
    }
  } catch (error) {
    console.log(error)
    res.json({
      status: 404,
      message: "data updation failed",
    });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const note = await noteSchema.findByIdAndDelete(req.body._id);
    console.log(note)
    if (note) {
      res.json({
        status: 200,
        message: "data deleted successfully",
      });
    } else {
      res.json({
        status: 404,
        message: "data not found",
      });
    }
  } catch (error) {
    res.json({
      status: 404,
      message: "data deletion failed",
      error,
    });
  }
};
