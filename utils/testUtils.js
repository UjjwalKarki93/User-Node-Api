/**
 *
 * intantiate sequelize with local testing database by setting envs manually
 */

import connection from "../models/index.js";
import userModel from "../models/user.model.js";

// function to initialize the test database
export const initializeDatabase = async () => {
  try {
    //Seed data to the database based on the schema model
    await userModel.bulkCreate([
      { name: "hery", email: "hary1@gmail.com", phone: 4444444444 },
      { name: "john", email: "john1@gmail.com", phone: 5555555555 },
      { name: "mary", email: "mary1@gmail.com", phone: 6666666666 },
      { name: "maxwell", email: "mazwell1@gmail.com", phone: 7777777777 },
    ]);
    console.log("Test data seeded to the test database...............");
  } catch (err) {
    console.error("Error initializing test database....:", err);
  }
};

//function to cleanup the test database
export const cleanUpTestDatabase = async () => {
  try {
    //Drop all tables in the test database
    await connection.drop();
    console.log("Test database cleaned up.............");
  } catch (error) {
    console.error("Error cleaning up test database..:", error);
  }
};
