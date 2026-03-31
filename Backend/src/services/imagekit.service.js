import ImageKit from "@imagekit/nodejs";

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

export const uploadImage = async (file) => {
  const response = await client.files.upload({
    file: file.buffer.toString("base64"),
    fileName: file.originalname,
    folder: "/kin/posts",
  });
  return response;
};

export const uploadProfileImage = async (file) => {
  const response = await client.files.upload({
    file: file.buffer.toString("base64"),
    fileName: file.originalname,
    folder: "/kin/profiles",
  });
  return response;
};
