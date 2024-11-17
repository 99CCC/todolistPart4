import React, {useState} from 'react';
import TodoList from './todolist/todolist';
import LoginPage from './login/login';

function MainComponent() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState(null);

    const handleLogin = (userId) => {
        setUserId(userId);
        setIsLoggedIn(true);
    };

    return (
        <div>
            {isLoggedIn ? <TodoList userId={userId}/> : <LoginPage onLogin={handleLogin}/>}
        </div>
    );
}

export default MainComponent;