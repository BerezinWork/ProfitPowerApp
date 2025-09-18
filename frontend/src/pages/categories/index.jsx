import { useNavigate } from 'react-router-dom';

const Categories = ({ mode = 'manage' }) => {
    const navigate = useNavigate();

    // Эта функция будет вести себя по-разному в зависимости от режима
    const handleCategoryClick = (category) => {
        if (mode === 'select') {
            // Если мы в режиме выбора, переходим на следующий шаг
            navigate(`/add-transaction/create/${category.id}`);
        } else {
            // Если мы в режиме управления, то ничего не делаем при клике,
            // логика будет внутри компонента категории (раскрытие)
            console.log("Управление категорией:", category.name);
        }
    };

    return (
        <div>
            <h2>Категории</h2>
            {/* Здесь будет переключатель Доход/Расход */}

            <div>
                {/*categories.expense.map(category => (
                    <div key={category.id} onClick={() => handleCategoryClick(category)}>
                        <p>{category.name}</p>
                        {mode === 'manage' && (
                            <div>
                                <button>Edit</button>
                                <button>Delete</button>
                            </div>
                        )}
                    </div>
                ))*/}
            </div>

            {/* Кнопка "Добавить" будет видна в обоих режимах */}
            <button>Добавить новую категорию</button>
        </div>
    );
};

export default Categories;