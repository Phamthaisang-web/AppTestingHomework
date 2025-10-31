import * as yup from "yup";

// Regex to validate MongoDB ObjectId (24 hex characters)
const objectIdRegex = /^[a-fA-F0-9]{24}$/;

// Regex to validate Vietnamese phone numbers
// ✅ Valid: 09xxxxxxxx, 03xxxxxxxx, 07xxxxxxxx, 08xxxxxxxx, 05xxxxxxxx
const vietnamPhoneRegex =
  /^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-9]|9[0-9])[0-9]{7}$/;

// -------------------------
// 🔹 Schema for creating a user / sending OTP
// -------------------------
const createUserSchema = yup
  .object({
    body: yup.object({
      fullName: yup
        .string()
        .strict(true)
        .min(3, "Full name must have at least 3 characters")
        .max(255, "Full name must not exceed 255 characters")
        .required("Full name is required"),
      email: yup
        .string()
        .strict(true)
        .email("Invalid email")
        .required("Email is required"),
      phone: yup
        .string()
        .nullable()
        .transform((value) => (value === "" ? undefined : value))
        .optional()
        .min(9, "Phone number is too short (minimum 9 digits)")
        
        .matches(/^[0-9]+$/, "Phone number can only contain digits"),

      type: yup
        .string()
        .strict(true)
        .oneOf(["student", "worker", "other"], "Invalid user type")
        .optional(),
    }),
  })
  .required();

// -------------------------
// 🔹 Schema for updating a user (PUT /users/:id)
// -------------------------
const updateUserSchema = yup
  .object({
    params: yup.object({
      id: yup
        .string()
        .strict(true)
        .matches(objectIdRegex, "Invalid ID")
        .required("ID is required"),
    }),
    body: yup.object({
      fullName: yup
        .string()
        .strict(true)
        .min(3, "Full name must have at least 3 characters")
        .max(255, "Full name must not exceed 255 characters")
        .optional(),
      email: yup.string().strict(true).email("Invalid email").optional(),
      phone: yup
        .string()
        .strict(true)
        .matches(
          vietnamPhoneRegex,
          "Invalid phone number (must be a Vietnamese number)"
        )
        .optional(),
      type: yup
        .string()
        .strict(true)
        .oneOf(["student", "worker"], "Invalid user type")
        .optional(),
      isActive: yup.boolean().strict(true).optional(),
      isVerified: yup.boolean().strict(true).optional(),
    }),
  })
  .required();

// -------------------------
// 🔹 Schema for getting a user by ID
// -------------------------
const getUserByIdSchema = yup
  .object({
    params: yup.object({
      id: yup
        .string()
        .strict(true)
        .matches(objectIdRegex, "Invalid ID")
        .required("ID is required"),
    }),
  })
  .required();

// -------------------------
// 🔹 Schema for deleting a user by ID
// -------------------------
const deleteUserByIdSchema = yup
  .object({
    params: yup.object({
      id: yup
        .string()
        .strict(true)
        .matches(objectIdRegex, "Invalid ID")
        .required("ID is required"),
    }),
  })
  .required();

// -------------------------
// 🔹 Schema for querying all users (GET /users)
// -------------------------
const getAllUsersSchema = yup
  .object({
    query: yup.object({
      page: yup.number().strict(true).integer().positive().optional(),
      limit: yup.number().strict(true).integer().positive().optional(),
      sort_by: yup
        .string()
        .strict(true)
        .matches(/^(createdAt|fullName|email|type)$/, "Invalid sort field")
        .optional(),
      sort_type: yup
        .string()
        .strict(true)
        .matches(/^(asc|desc)$/, "Invalid sort type (asc or desc)")
        .optional(),
      keyword: yup.string().strict(true).min(2).max(50).optional(),
    }),
  })
  .required();

export default {
  createUserSchema,
  updateUserSchema,
  getUserByIdSchema,
  deleteUserByIdSchema,
  getAllUsersSchema,
};
