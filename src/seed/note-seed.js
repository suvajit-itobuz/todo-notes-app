import { faker } from "@faker-js/faker";
import noteSchema from "../models/noteSchema.js";

export const noteSeed = async (value) => {
  try {
    let notes = [];
    
    for (let i = 0; i < value; i++) {
      const generatedId=Math.random()
      let newNote = {
        title: faker.helpers.uniqueArray(faker.word),
        content: faker.lorem.sentence(),
        userId:generatedId,
        createdAt: faker.defaultRefDate(),
        updatedAt: faker.defaultRefDate(),
      };
      notes.push(newNote);
    }
    notes.forEach(async (note) => {
      await noteSchema.create(note);
    });
  } catch (err) {
    console.log(err);
  }
};
