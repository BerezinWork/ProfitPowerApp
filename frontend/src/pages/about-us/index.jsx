import { Link } from 'react-router-dom';

const AboutUs = () => {
    return (
        <div>
            <h1>Добро пожаловать в Profit Power!</h1>
            <p>Это приложение для учета ваших финансов.</p>
            <Link to="/login">Войти</Link>
        </div>
    );
};

export default AboutUs;