import { defineContract } from "./define-contract";
import {
  CompleteUploadInputSchema,
  CreateUploadRequestInputSchema,
  FileCompletionResponseSchema,
  PrivateUrlRequestInputSchema,
  PrivateUrlResponseSchema,
  UploadRequestResponseSchema
} from "../schemas/files";

export const fileContracts = {
  createUploadRequest: defineContract({
    method: "POST",
    path: "/files/upload-requests",
    request: CreateUploadRequestInputSchema,
    response: UploadRequestResponseSchema
  }),
  completeUpload: defineContract({
    method: "POST",
    path: "/files/complete",
    request: CompleteUploadInputSchema,
    response: FileCompletionResponseSchema
  }),
  privateUrl: defineContract({
    method: "POST",
    path: "/files/private-url",
    request: PrivateUrlRequestInputSchema,
    response: PrivateUrlResponseSchema
  })
};
