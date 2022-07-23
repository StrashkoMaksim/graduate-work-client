import React, {FC} from 'react';
import {OrderComment} from "../../types/order";
import Comment from "../Comment/Comment";
import CommentForm from "../CommentForm/CommentForm";

interface CommentsProps {
    comments: OrderComment[];
    onAdd: () => void;
}

const Comments: FC<CommentsProps> = ({ comments, onAdd }) => {

    return (
        <>
            <CommentForm onAdd={onAdd} />
            <div>
                {comments.map(comment =>
                    <Comment comment={comment} key={comment.id} />
                )}
            </div>
        </>
    );
};

export default Comments;