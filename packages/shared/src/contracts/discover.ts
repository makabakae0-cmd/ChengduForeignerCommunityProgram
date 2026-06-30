import { defineContract } from "./define-contract";
import {
  CreateCommentInputSchema,
  CreatePostInputSchema,
  ModeratePostInputSchema,
  PostListQuerySchema,
  ReportPostInputSchema
} from "../schemas/discover";
import { CommentSchema, PostSchema } from "../schemas/entities";

export const discoverContracts = {
  listPosts: defineContract({
    method: "GET",
    path: "/discover/posts",
    request: PostListQuerySchema,
    response: PostSchema
  }),
  detailPost: defineContract({
    method: "GET",
    path: "/discover/posts/:id",
    response: PostSchema
  }),
  createPost: defineContract({
    method: "POST",
    path: "/discover/posts",
    request: CreatePostInputSchema,
    response: PostSchema
  }),
  createComment: defineContract({
    method: "POST",
    path: "/discover/posts/:id/comments",
    request: CreateCommentInputSchema,
    response: CommentSchema
  }),
  reportPost: defineContract({
    method: "POST",
    path: "/discover/posts/:id/report",
    request: ReportPostInputSchema,
    response: PostSchema
  }),
  moderatePost: defineContract({
    method: "POST",
    path: "/admin/discover/posts/:id/moderation",
    request: ModeratePostInputSchema,
    response: PostSchema
  })
};
