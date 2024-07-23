import { useState } from 'react';
import { Avatar } from '../Avatar/Avatar';

import styles from './Comment.module.css';

import { ThumbsUp, Trash } from 'phosphor-react';

import { User, Comment as CommentType } from '../../interfaces/type';

interface CommentProps {
    user: User;
    comment: CommentType;
    onDeleteComment: (id: number) => void
}

export function Comment({ user, comment, onDeleteComment }: CommentProps) {
    const [likeCount, setLikeCount] = useState(comment.likes);

    function handleLikeComment() {
        setLikeCount((state) => state + 1); 
    }

    function handleDeleteComment() {
        onDeleteComment(comment.id);
    }

    return (
        <div className={styles.comment}>
            <Avatar 
                activeUser={user} 
                hasBorder={false}
            />
            <div className={styles.commentBox}>
                <div className={styles.commentContent}>
                    <header>
                        <div className={styles.authorAndTime}>
                            <strong>{user.name}</strong>
                            {/* <time 
                                className={styles.publishTime}
                                title="18 July at 03:30 PM" 
                                dateTime="2024-07-18 03:30:00">
                                Published 1 hour ago
                            </time> */}
                        </div>
                        <button 
                            onClick={handleDeleteComment}
                            title="Delete comment"
                        >
                            <Trash size={24} />
                        </button>
                    </header>
                    <span 
                        dangerouslySetInnerHTML={{ __html: comment.content }} 
                    />
                </div>
                <footer>
                    <button 
                        title="Like comment"
                        onClick={handleLikeComment}
                    >
                        <ThumbsUp />
                        Like <span>{likeCount}</span>
                    </button>
                </footer>
            </div>
        </div>
    );
}
