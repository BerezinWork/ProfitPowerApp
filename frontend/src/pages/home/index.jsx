import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h1>Добро пожаловать в Profit Power!</h1>
            <p>Это приложение для учета ваших финансов.</p>
            <Link to="/login">Войти</Link> или <Link to="/transactions">Перейти к приложению (демо)</Link>
        </div>
    );
};

export default Home;