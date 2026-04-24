export type CommentStatus = "PENDING" | "APPROVED" | "REJECTED";

export type IComment = {
    id: string;
    blogId: string;
    senderName: string;
    content: string;
    status: CommentStatus;
    createdAt: string;
}

export type ICreateCommentRequest = Omit<IComment, "id" | "status" | "createdAt">;

export type IUpdateStatusCommentRequest = {
    status: CommentStatus;
}

export type ICommentResponse = IComment;