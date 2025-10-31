import userController from "../controllers/user.controller";
import { Router } from "express";
import userValidation from "../validations/user.validation";
import validateSchemaYup from "../middlewares/validate.middleware";
const router = Router();
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post(
  "/",
  validateSchemaYup(userValidation.createUserSchema),
  userController.createUser
);
export default router;
