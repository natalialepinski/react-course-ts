export interface User {
    id: number;
    name: string;
    role: string;
    avatar_url: string;
}

export interface Post {
    id: number;
    publishedAt: string;
    content: string;
    comments: Comment[];
}

export interface Comment {
    id: number;
    post_id: number;
    user_id: number;
    content: string;
    likes: number;
}