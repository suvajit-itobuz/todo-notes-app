import { date } from "zod";
import noteSchema from "../models/noteSchema.js";
import userSchema from "../models/userSchema.js";

//  creating note
export const createNote = async (req, res) => {
  try {
    const userId = req.userId;
    const { title, content } = req.body;

    const existing = await noteSchema.findOne({
      title: req.body.title,
      userId: req.userId,
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "This title Already Exists",
      });
    }

    const note = await noteSchema.create({
      title,
      content,
      userId: userId,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    if (note) {
      res.json({
        status: 200,
        data: note,
        message: "data created successfully",
      });
    } else {
      console.log("note cannot be created");
    }
  } catch (error) {
    res.json({
      status: 404,
      message: "error in data creation",
      error: error.message,
    });
  }
};

// list /getting all notes
export const getNote = async (req, res) => {
  try {
    const userId = req.userId;
    const note = await noteSchema.find({ userId: userId });
    if (note) {
      res.json({
        status: 200,
        data: note,
        message: "data fetched successfully",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      status: 404,
      message: "data fetching failed",
    });
  }
};

// updateNote
export const updateNote = async (req, res) => {
  try {
    const { _id, title, content } = req.body;
    const updated_result = await noteSchema.findByIdAndUpdate(
      { _id },
      {
        title: title,
        content: content,
        updatedAt: Date.now(),
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
    console.log(error);
    res.json({
      status: 404,
      message: "data updation failed",
    });
  }
};

// deleteNote
export const deleteNote = async (req, res) => {
  try {
    const id = req.body._id;
    const note = await noteSchema.findByIdAndDelete(id);
    if (note) {
      res.json({
        status: 200,
        message: "data deleted successfully",
        data: note,
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
      error: error.message,
    });
  }
};

// filter/search
export const searchNote = async (req, res) => {
  try {
    const note = await noteSchema.find({
      userId: req.userId,
      title: { $regex: req.body.value, $options: "i" },
    });

    if (note.length !== 0) {
      res.json({
        status: 200,
        message: "data fetched successfully",
        data: note,
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
      message: "data searching failed",
      error: error.message,
    });
  }
};

// sorting
export const sortNotes = async (req, res) => {
  try {
    const sortCriteria = {
      [req.query.sortField]: req.query.sortOrder === "asc" ? 1 : -1,
    };
    const sortedDocuments = await noteSchema
      .find({ userId: req.userId })
      .sort(sortCriteria);

    if (sortedDocuments) {
      res.json({
        status: 200,
        message: "data sorted successfully",
        data: sortedDocuments,
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
      message: "data sorting failed",
      error: error.message,
    });
  }
};

//  pagination

export const getUsersOffset = async (req, res) => {
  try {

    const page = req.query.page || 1;
    const limit = req.query.limit || 10;

    const offset = (page - 1) * limit;

    const data = await noteSchema
      .find({ userId: req.userId })
      .skip(offset)
      .limit(limit)
      .exec();

    res.json({
      status: 200,
      data: data,
      total: await noteSchema.find({ userId: req.userId }).countDocuments(), // Total number of documents
    });
  } catch (error) {
    res.json({
      status: 404,
      message: "pagination problem",
      error: error.message,
    });
  }
};
