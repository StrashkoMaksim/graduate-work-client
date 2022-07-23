import React, {FC} from 'react';
import {OrderComment} from "../../types/order";
import styles from "./Comment.module.scss";

interface CommentProps {
    comment: OrderComment;
}

const Comment: FC<CommentProps> = ({ comment }) => {
    return (
        <div className={styles.comment}>
            <p className={styles.text}>{comment.text}</p>
            <p className={styles.date}>{comment.createdAt}</p>
        </div>
    );
};

export default Comment;