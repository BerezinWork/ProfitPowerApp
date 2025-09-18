import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h1>Добро пожаловать в Profit Power!</h1>
            <Link to="/add-transaction">Add Transaction</Link>
        </div>
    );
};

export default Home;