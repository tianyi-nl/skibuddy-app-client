import service from "./index.services";

const uploadImage = (file) => {
  const formData = new FormData();
  formData.append("image", file);

  return service.post("/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export { uploadImage };