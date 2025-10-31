import { httpStatus, sendJsonSuccess } from "../helpers/response.helper";
import userService from "../service/user.service";
import { NextFunction, Request, Response } from "express";
const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userService.getAllNhanSu();
    sendJsonSuccess(res, users);
  } catch (error) {
    next(error);
  }
};

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userService.createNhanSu(req.body);
    sendJsonSuccess(
      res,
      user,
      httpStatus.CREATED.statusCode,
      httpStatus.CREATED.message
    );
  } catch (error) {
    next(error);
  }
};
export default { getAllUsers, createUser };
