import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import Sharp from "sharp";
import { v4 as uuidv4 } from "uuid";
import { ImageExtensions, config } from "../config/constants";

type UploadResult = {
  Location: string;
};

type FileType = Buffer | string;

// Amazon S3 Configuration
const configure = {
  region: config.AWS_S3_REGION!,
  credentials: {
    accessKeyId: config.AWS_S3_ACCESS_KEY_ID!,
    secretAccessKey: config.AWS_S3_SECRET_ACCESS_KEY!,
  },
};

const s3Client = new S3Client(configure);

async function upload(file: FileType, fileName: string, foldername: string): Promise<UploadResult> {
  try {
    const epochtimeseconds = uuidv4();
    fileName = fileName.replace(".", `${epochtimeseconds}.`);
    const splitFileName = fileName.split(".");
    const extensionOfFile: any = splitFileName[1];

    let params = {
      Bucket: config.AWS_S3_BUCKET_NAME!,
      Key: `${foldername}/${fileName}`,
      Body: "" as Buffer | string,
    };

    if (ImageExtensions.includes(extensionOfFile)) {
      try {
        const buffer = await Sharp(file as Buffer)
          .webp({ quality: 20 })
          .resize({ fit: "inside", withoutEnlargement: true })
          .toBuffer();
        params.Body = buffer;
      } catch (error) {
        throw new Error(`Image processing error: ${error}`);
      }
    } else {
      params.Body = file;
    }

    try {
      await s3Client.send(new PutObjectCommand(params));
      const fileUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${params.Key}`;
      return { Location: fileUrl };
    } catch (error) {
      throw new Error(`S3 upload error: ${error}`);
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
}

async function uploadImages(
  file: FileType,
  fileName: string,
  Username: string,
  fieldname: string
): Promise<UploadResult> {
  const splitFileName1 = fileName.split(".");
  const extensionOfFile1: any = splitFileName1[1];
  const epochtimeseconds = uuidv4();
  fileName = `${Username}_${fieldname}_${epochtimeseconds}.${extensionOfFile1}`;

  let params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME!,
    Key: fileName,
    Body: "" as Buffer | string,
  };

  if (ImageExtensions.includes(extensionOfFile1)) {
    try {
      const buffer = await Sharp(file as Buffer)
        .webp({ quality: 20 })
        .resize({ fit: "inside", withoutEnlargement: true })
        .toBuffer();
      params.Body = buffer;
    } catch (error) {
      throw new Error(`Image processing error: ${error}`);
    }
  } else {
    params.Body = file;
  }

  try {
    await s3Client.send(new PutObjectCommand(params));
    const fileUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${params.Key}`;
    return { Location: fileUrl };
  } catch (error) {
    throw new Error(`S3 upload error: ${error}`);
  }
}

async function uploadArray(files: Buffer[], foldername: string): Promise<boolean> {
  const uploadPromises = files.map(async (file, index) => {
    const fileName = `${foldername}/image_${uuidv4()}.webp`;
    let params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: fileName,
      Body: "" as unknown as Buffer,
    };

    try {
      const buffer = await Sharp(file)
        .webp({ quality: 20 })
        .resize({ fit: "inside", withoutEnlargement: true })
        .toBuffer();
      params.Body = buffer;
    } catch (error) {
      throw new Error(`Image processing error: ${error}`);
    }

    try {
      await s3Client.send(new PutObjectCommand(params));
    } catch (error) {
      throw new Error(`S3 upload error: ${error}`);
    }
  });

  try {
    await Promise.all(uploadPromises);
    return true;
  } catch (error: any) {
    throw new Error(`Failed to upload one or more files: ${error}`);
  }
}

export { upload, uploadImages, uploadArray };
