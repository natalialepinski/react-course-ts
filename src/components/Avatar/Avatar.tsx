import styles from './Avatar.module.css';

import { User } from '../../interfaces/type';

interface AvatarProps {
    activeUser: User;
    hasBorder?: boolean;
}
export function Avatar({ hasBorder = true, activeUser}: AvatarProps) {
    return (
        <img 
            className={hasBorder ? styles.avatarWithBorder : styles.avatar}
            src={activeUser.avatar_url}
            alt={activeUser.name ? activeUser.name : 'User Avatar'}
        />
    );
}