"use server";

import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export async function createUploadedFileUrl(fileUrl: string) {
  const uploadedFile = await utapi.uploadFilesFromUrl(fileUrl);

  console.log({ uploadedFile });
  return uploadedFile;
}
