import { Avatar } from '../Avatar/Avatar';

import styles from './Sidebar.module.css';

import { PencilLine } from 'phosphor-react';

import { User } from '../../interfaces/type';

interface SidebarProps {
    activeUser: User;
}

export function Sidebar({ activeUser }: SidebarProps) {
    return (
        <aside className={styles.sidebar}>
            <img 
                className={styles.cover}
                src="https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?q=50&w=500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            />
            <div className={styles.profile}>
                <Avatar
                    activeUser={activeUser}
                />
                <strong>{activeUser.name}</strong>
                <span>{activeUser.role}</span>
            </div>

            <footer>
                <a href="#">
                    <PencilLine size={20} />
                    Edit profile
                </a>
            </footer>
        </aside>
    );
}