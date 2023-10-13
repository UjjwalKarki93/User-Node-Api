import { Op } from "sequelize";

import userModel from "../models/user.model.js";

export default class UserController {
  //get all user
  async getAllUsers(req, res) {
    try {
      const users = await userModel.findAll();
      res.status(201).json(users);
    } catch (error) {
      res.status(400).json({
        error: error.message,
      });
    }
  }

  //Add a new user
  async addUser(req, res) {
    const { name, email, phone } = req.body;

    try {
      const data = await userModel.create({
        name: name,
        email: email,
        phone: phone,
      });
      res.status(200).json(data);
    } catch (error) {
      res.status(404).json({
        error: error.message,
      });
    }
  }

  //get a user by ID
  async getUserById(req, res) {
    const { id } = req.params;
    if (id) {
      const data = await userModel.findByPk(id);
      data
        ? res.json(data)
        : res.json({
            success: false,
            msg: "No matching record found",
          });
    }
  }

  //update user
  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const [updated] = await userModel.update(req.body, {
        where: { id },
      });

      if (updated) {
        const updatedUser = await userModel.findByPk(id);
        res.status(200).json({
          status: "success",
          msg: "deleted successfully!",
          UserData: updatedUser,
        });
      } else {
        res.status(404).json({
          error: "User not found!",
        });
      }
    } catch (error) {
      res.status(500).json({
        error: error.msg,
      });
    }
  }

  //delete user by ID
  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const deleted = await userModel.destroy({
        where: {
          id,
        },
      });

      deleted
        ? res.status(204).end()
        : res.status(404).json({
            error: "user not found",
          });
    } catch (error) {
      res.status(500).json({
        error: error.msg,
      });
    }
  }

  //search by name
  async searchByName(req, res) {
    const { name } = req.query;

    try {
      const data = await userModel.findAll({
        where: {
          name: {
            [Op.like]: `${name}`,
          },
        },
      });
      console.log("data", data);

      data
        ? res.status(200).json(data)
        : res.status(404).json({
            error: "No Matching Data found",
          });
    } catch (error) {
      res.status(500).json({
        error: error.msg,
      });
    }
  }
}
