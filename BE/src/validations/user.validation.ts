import * as yup from "yup";

// Regex kiểm tra số điện thoại (chỉ chứa số và dấu '+')
const phoneRegex = /^[0-9+]+$/;

// Schema tạo mới nhân sự
const createNhanSuSchema = yup
  .object({
    body: yup.object({
      ten: yup
        .string()
        .strict(true)
        .trim()
        .min(2, "Tên phải có ít nhất 2 ký tự")
        .max(255, "Tên không được vượt quá 255 ký tự")
        .required("Tên nhân sự là bắt buộc"),

      tuoi: yup
        .number()
        .integer("Tuổi phải là số nguyên")
        .min(1, "Tuổi phải lớn hơn 0")
        .max(99, "Tuổi không được vượt quá 99")
        .required("Tuổi là bắt buộc"),

      que_quan: yup
        .string()
        .strict(true)
        .trim()
        .max(255, "Quê quán không được vượt quá 255 ký tự")
        .nullable()
        .optional(),

      so_dien_thoai: yup
        .string()
        .strict(true)
        .trim()
        .matches(phoneRegex, "Số điện thoại chỉ được chứa số hoặc dấu '+'")
        .required("Số điện thoại là bắt buộc"),

      chuc_vu: yup.string().strict(true).trim().default("Nhân viên").optional(),
    }),
  })
  .required();

// Schema cập nhật nhân sự
const updateNhanSuSchema = yup
  .object({
    params: yup.object({
      id: yup
        .string()
        .strict(true)
        .min(3, "ID không hợp lệ")
        .required("ID là bắt buộc"),
    }),
    body: yup.object({
      ten: yup
        .string()
        .strict(true)
        .trim()
        .min(2, "Tên phải có ít nhất 2 ký tự")
        .max(255, "Tên không được vượt quá 255 ký tự")
        .optional(),

      tuoi: yup
        .number()
        .integer("Tuổi phải là số nguyên")
        .min(1, "Tuổi phải lớn hơn 0")
        .max(99, "Tuổi không được vượt quá 99")
        .optional(),

      que_quan: yup
        .string()
        .strict(true)
        .trim()
        .max(255, "Quê quán không được vượt quá 255 ký tự")
        .nullable()
        .optional(),

      so_dien_thoai: yup
        .string()
        .strict(true)
        .trim()
        .matches(phoneRegex, "Số điện thoại chỉ được chứa số hoặc dấu '+'")
        .optional(),

      chuc_vu: yup.string().strict(true).trim().optional(),
    }),
  })
  .required();

// Schema lấy theo ID
const getNhanSuByIdSchema = yup
  .object({
    params: yup.object({
      id: yup
        .string()
        .strict(true)
        .min(3, "ID không hợp lệ")
        .required("ID là bắt buộc"),
    }),
  })
  .required();

// Schema xóa theo ID
const deleteNhanSuByIdSchema = yup
  .object({
    params: yup.object({
      id: yup
        .string()
        .strict(true)
        .min(3, "ID không hợp lệ")
        .required("ID là bắt buộc"),
    }),
  })
  .required();

// Schema lấy danh sách
const getAllNhanSuSchema = yup
  .object({
    query: yup.object({
      page: yup.number().integer().positive().optional(),
      limit: yup.number().integer().positive().optional(),
      sort_by: yup
        .string()
        .strict(true)
        .matches(/^(ten|tuoi|chuc_vu)$/, "Trường sắp xếp không hợp lệ")
        .optional(),
      sort_type: yup
        .string()
        .strict(true)
        .matches(/^(asc|desc)$/, "Kiểu sắp xếp không hợp lệ (asc hoặc desc)")
        .optional(),
      keyword: yup
        .string()
        .strict(true)
        .min(2, "Từ khóa phải có ít nhất 2 ký tự")
        .max(50, "Từ khóa không vượt quá 50 ký tự")
        .optional(),
    }),
  })
  .required();

export default {
  createNhanSuSchema,
  updateNhanSuSchema,
  getNhanSuByIdSchema,
  deleteNhanSuByIdSchema,
  getAllNhanSuSchema,
};
