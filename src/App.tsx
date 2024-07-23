import './global.css';
import styles from './App.module.css';

import { posts } from "./posts.json";
import { users } from "./users.json";

import { Header } from './components/Header/Header';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Post } from './components/Post/Post';

import { User } from './interfaces/type';

export function App() {
  const activeUser: User | undefined = users.find(user => user.active === true);

  if (!activeUser) {
    throw new Error('User not found');
  }

  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar activeUser={activeUser} />
        <main>
          {posts.map(post => {
            const user = users.find(user => user.id === post.author.user_id);
            
            if (!user) {
              return null;
            }

            return (
              <Post 
                key={post.id}
                author={user}
                post={post}
                users={users}
                activeUser={activeUser}
              />
            );
          })}
          
        </main>
      </div>
    </div>
  )
}

