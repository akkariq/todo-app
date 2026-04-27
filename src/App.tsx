import React, { useState } from 'react';

// Тип для задачи
interface Task {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  // Состояние для списка задач
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: 'Изучить React', completed: true },
    { id: 2, text: 'Написать To-Do приложение', completed: false },
  ]);

  // Состояние для поля ввода новой задачи
  const [newTask, setNewTask] = useState('');

  // Добавление новой задачи
  const addTask = () => {
    if (newTask.trim() === '') return;
    const task: Task = {
      id: Date.now(),
      text: newTask.trim(),
      completed: false,
    };
    setTasks([...tasks, task]);
    setNewTask('');
  };

  // Удаление задачи по ID — используем filter для создания нового массива без мутации
  const removeTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Переключение статуса задачи — используем map для неизменяемого обновления
  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Количество выполненных задач
  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          📝 Список задач
        </h1>

        {/* Форма добавления задачи */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTask()}
            placeholder="Введите новую задачу..."
            className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addTask}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Добавить
          </button>
        </div>

        {/* Список задач */}
        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="h-5 w-5 text-blue-600 cursor-pointer"
                />
                <span
                  className={`${
                    task.completed ? 'line-through text-gray-400' : 'text-gray-800'
                  }`}
                >
                  {task.text}
                </span>
              </div>

              {/* Кнопка удаления */}
              <button
                onClick={() => removeTask(task.id)}
                className="px-3 py-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition"
                title="Удалить"
              >
                ×
              </button>
            </div>
          ))}

          {/* Пустой список */}
          {tasks.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p className="text-lg">Список задач пуст</p>
              <p className="text-sm mt-1">Добавьте первую задачу!</p>
            </div>
          )}
        </div>

        {/* Статистика */}
        <div className="mt-6 pt-4 border-t flex justify-between text-gray-600">
          <p>Всего задач: <span className="font-semibold">{tasks.length}</span></p>
          <p>Выполнено: <span className="font-semibold text-green-600">{completedCount}</span> из {tasks.length}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
