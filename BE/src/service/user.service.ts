interface INhanSu {
  id: string;
  ten: string;
  tuoi: number;
  que_quan?: string | null;
  so_dien_thoai: string;
  chuc_vu?: string;
}

const nhanSuList: INhanSu[] = [];

const getAllNhanSu = async () => {
  return nhanSuList;
};

const createNhanSu = async (data: Omit<INhanSu, "id">) => {
  const { ten, tuoi, so_dien_thoai } = data;

  if (!ten?.trim()) throw new Error("Tên nhân sự không được để trống!");
  if (tuoi <= 0 || tuoi >= 100)
    throw new Error("Tuổi phải nằm trong khoảng hợp lý!");
  if (!/^[0-9+]+$/.test(so_dien_thoai))
    throw new Error("Số điện thoại chỉ được chứa số hoặc dấu '+'!");
  if (nhanSuList.some((ns) => ns.so_dien_thoai === so_dien_thoai))
    throw new Error("Số điện thoại đã tồn tại!");

  const newNhanSu: INhanSu = {
    id: Math.random().toString(36).substring(2, 9),
    ten,
    tuoi,
    que_quan: data.que_quan || null,
    so_dien_thoai,
    chuc_vu: data.chuc_vu || "Nhân viên",
  };

  nhanSuList.push(newNhanSu);
  return newNhanSu;
};

// Xuất toàn bộ hàm
export default {
  getAllNhanSu,

  createNhanSu,
};
