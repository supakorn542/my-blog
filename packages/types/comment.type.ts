export type CommentStatus = "PENDING" | "APPROVED" | "REJECTED";

export type IComment = {
    id: string;
    blog_id: string;
    sender_name: string;
    content: string;
    status: CommentStatus;
    created_at: string;
}

export type ICreateCommentRequest = Omit<IComment, "id" | "status" | "created_at">;

export type IUpdateStatusCommentRequest = {
    status: CommentStatus;
}

export type ICommentResponse = IComment;