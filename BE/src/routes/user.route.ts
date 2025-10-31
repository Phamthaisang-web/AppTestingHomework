import userController from "../controllers/user.controller";
import { Router } from "express";
import userValidation from "../validations/user.validation";
import validateSchemaYup from "../middlewares/validate.middleware";
const router = Router();
router.get("/", userController.getAllUsers);
router.post(
  "/",
  validateSchemaYup(userValidation.createNhanSuSchema),
  userController.createUser
);
export default router;
