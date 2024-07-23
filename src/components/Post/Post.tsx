import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';

import { Avatar } from '../Avatar/Avatar';
import { Comment } from '../Comment/Comment';

import styles from './Post.module.css';

import { format, formatDistanceToNow } from 'date-fns';
import { User, Post as PostType, Comment as CommentType } from '../../interfaces/type';

interface PostProps {
    author: User;
    post: PostType;
    users: User[];
    activeUser: User;
}

export function Post({ author, post, users, activeUser }: PostProps) {
    const [comments, setComments] = useState<CommentType[]>(post.comments);
    const [newCommentText, setNewCommentText] = useState('');

    const publishedAt = new Date(post.publishedAt);
    const publishedDateTitle = format(publishedAt, "d LLLL yyyy 'at' HH:mm")
    const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
        addSuffix: true
    })

    function handleCreateNewComment(event: FormEvent) {
        event.preventDefault();
        const newComment = {
            id: comments.length + 1,
            post_id: post.id,
            user_id: activeUser.id,
            content: newCommentText,
            likes: 0
        }
        setComments([...comments, newComment]);
        setNewCommentText('');
    }

    function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('');
        setNewCommentText(event.target.value);
    }

    function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('Required field');
    }

    function deleteComment(commentId: number) {
        const updatedComments = comments.filter(comment => comment.id !== commentId);
        setComments(updatedComments);
    }

    const isNewCommentEmpty = newCommentText.length === 0;

    return (
        <article className={styles.post}>
            <header className={styles.header}>
                <div className={styles.author}>
                    <Avatar
                        activeUser={activeUser}
                    />
                    <div className={styles.authorInfo}>
                        <strong>{author.name}</strong>
                        <span>{author.role}</span>
                    </div>
                </div>
                <time 
                    className={styles.publishTime}
                    title={publishedDateTitle} 
                    dateTime={post.publishedAt}
                >
                    {publishedDateRelativeToNow}
                </time>
            </header>
            
            <div 
                className={styles.content}
                dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <form 
                className={styles.commentForm}
                onSubmit={handleCreateNewComment}
            >
                <strong>Write a comment</strong>
                <textarea
                    name='comment'
                    placeholder='Write a comment here'
                    value={newCommentText}
                    onChange={handleNewCommentChange}
                    onInvalid={handleNewCommentInvalid}
                    required
                />
                <footer>
                    <button 
                        type='submit'
                        disabled={isNewCommentEmpty}
                    >
                        Publish
                    </button>
                </footer>
            </form>

            <div className={styles.comentList}>
                {comments.map(comment => {
                    const user = users.find(user => user.id === comment.user_id);

                    if (!user) {
                        return null;
                    }
                    
                    return (
                        <Comment 
                            key={comment.id}
                            user={user}
                            comment={comment}
                            onDeleteComment={deleteComment}
                        />
                    );
                })}

            </div>
        </article>
    );
}