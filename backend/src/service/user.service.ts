// user.service.ts

interface IUser {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  type: "student" | "worker" | "other";
}

const users: IUser[] = [];

const getAllUsers = async () => {
  return users;
};

const getUserById = async (id: string) => {
  return users.find((u) => u.id === id);
};

// Tạo người dùng mới
const createUser = async (
  userData: Omit<
    IUser,
    "id" | "isActive" | "isVerified" | "createdAt" | "updatedAt"
  >
) => {
  const { email } = userData;

  // Kiểm tra email trùng
  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    throw new Error("Email already exists.");
  }

  const newUser: IUser = {
    ...userData,
    id: Math.random().toString(36).substring(2, 9), // Tạo ID ngẫu nhiên
  };

  users.push(newUser);
  return newUser;
};

export default { getAllUsers, getUserById, createUser };
