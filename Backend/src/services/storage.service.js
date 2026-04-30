import ImageKit from "@imagekit/nodejs";
import { config } from "../config/config.js";

const client = new ImageKit({
  privateKey: config.IMAGEKIT_PRIVATE_KEY,
});

export async function uploadFile({ buffer, fileName, folder = "snitch" }) {
  const result = await client.files.upload({
    file: buffer.toString("base64"),
    fileName,
    folder,
    extensions: [
      {
        name: "aws-auto-tagging",
        minConfidence: 70, // Thoda kam rakhte hain taaki risk wale tags ko asani se pakad le
        maxTags: 15,
      },
    ],
  });

  return result;
}
