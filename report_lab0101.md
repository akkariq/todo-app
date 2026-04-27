# Отчёт по лабораторной работе №1. Часть 1
# React-приложение с Vite. Список задач

**Дата:** 27.04.2026

**Семестр:** 2 курс 2 полугодие (4 семестр)

**Группа:** ПИН-б-о-24-1(2)

**Дисциплина:** Технологии программирования

**Студент:** Иванников Сергей Сергеевич

---

## Цель работы

Практическое знакомство с созданием React-приложений с использованием TypeScript и Vite. Освоение базовых концепций компонентного подхода, управления состоянием через `useState` и построения интерактивного интерфейса To-Do приложения.

---

## Теоретическая часть

### Изученные концепции

#### 1. **Хук `useState`**
`useState` — это хук React, позволяющий функциональным компонентам иметь внутреннее состояние. Возвращает пару: текущее значение состояния и функцию для его обновления. При вызове функции-сеттера React автоматически перерендеривает компонент.

#### 2. **Неизменяемость состояния**
React следит за состоянием через сравнение ссылок. Прямая мутация массива (`push`, `splice`) не вызывает перерендеринга, поэтому используются `filter` и `map` для создания новых массивов.

#### 3. **Vite**
Vite — современный бъдловщик для фронтенда. Использует нативные ES-модули браузера в режиме разработки — запуск проекта занимает миллисекунды. HMR (горячая замена модулей) обновляет страницу без перезагрузки.

#### 4. **TypeScript в React**
Статическая типизация позволяет описывать форму данных через `interface`. IDE подсвечивает ошибки ещё до запуска, что значительно ускоряет разработку.

#### 5. **Tailwind CSS**
Утилитарный CSS-фреймворк: классы применяются напрямую в JSX, что ускоряет верстку и исключает переключение между файлами.

---

## Практическая часть

### Выполненные задачи

- [x] **Задача 1: Создание проекта**
  - Создан проект командой `npm create vite@latest todo-app -- --template react-ts`
  - Установлен Tailwind CSS и настроен конфиг-файл

- [x] **Задача A: Функция удаления задач** (обязательно)
  - Реализована `removeTask` через `filter`
  - Не мутирует исходный массив

- [x] **Задача B: Переключение статуса** (обязательно)
  - Реализована `toggleTask` через `map` и спред-оператор

- [x] **Задача C: Кнопка удаления** (обязательно)
  - Добавлена иконка `×` со стилями hover

- [x] **Задача D: Статистика** (дополнительно)
  - Показываются всего задач и количество выполненных

- [x] **Задача E: Пустой список** (дополнительно)
  - Показывается сообщение, если задач нет

### Структура проекта

```
todo-app/
├── src/
│   ├── App.tsx          # Основной компонент приложения
│   ├── main.tsx         # Точка входа
│   └── index.css        # Глобальные стили с Tailwind
├── index.html           # HTML шаблон
├── package.json         # Зависимости и скрипты
├── tailwind.config.js   # Конфигурация Tailwind
├── vite.config.ts       # Конфигурация Vite
└── tsconfig.json        # Конфигурация TypeScript
```

### Ключевые фрагменты кода

#### Полный код `src/App.tsx`

```tsx
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

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          📝 Список задач
        </h1>

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
              <button
                onClick={() => removeTask(task.id)}
                className="px-3 py-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition"
              >
                ×
              </button>
            </div>
          ))}

          {tasks.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p className="text-lg">Список задач пуст</p>
              <p className="text-sm mt-1">Добавьте первую задачу!</p>
            </div>
          )}
        </div>

        <div className="mt-6 pt-4 border-t flex justify-between text-gray-600">
          <p>Всего задач: <span className="font-semibold">{tasks.length}</span></p>
          <p>Выполнено: <span className="font-semibold text-green-600">{completedCount}</span> из {tasks.length}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
```

---

## Результаты выполнения

### Скриншоты работы приложения

**Главный экран с задачами**

![Главный экран](Снимок%20экрана%202026-04-27%20224929.png)
*Основной экран приложения: список задач, чекбоксы, кнопки удаления и статистика.*

**Добавление новой задачи**

![Добавление задачи](Снимок%20экрана%202026-04-27%20224935.png)
*Ввод текста и нажатие «Добавить» или Enter.*

**Задача в состоянии «выполнено»**

![Выполненная задача](Снимок%20экрана%202026-04-27%20224940.png)
*Чекбокс активирован — текст зачеркнут и осерён.*

**Удаление задачи**

![Удаление](Снимок%20экрана%202026-04-27%20224944.png)
*Нажатие × — задача мгновенно исчезает из списка.*

### Результат сборки

```
$ npm run build

> todo-app@0.1.0 build
> tsc && vite build

vite v5.0.8 building for production...
✓ 1487 modules transformed.
dist/index.html                   0.46 kB │ gzip:  0.30 kB
dist/assets/index-DiwrgTda.css    5.23 kB │ gzip:  1.67 kB
dist/assets/index-B7UFJqdQ.js   142.50 kB │ gzip: 45.75 kB
✓ built in 2.14s
```

### Метрики проекта

| Метрика | Значение |
|---------|----------|
| **Фреймворк** | React 18 + TypeScript + Vite |
| **CSS-фреймворк** | Tailwind CSS v3 |
| **Состояние** | `useState` (задачи + поле ввода) |
| **Операции** | Добавить, удалить, переключить статус |
| **Дополнительно** | Статистика, пустой список |
| **Репозиторий** | github.com/akkariq/todo-app |

---

## Ответы на контрольные вопросы

### 1. Объясните принцип работы хука `useState`

**Ответ:**
`useState` — это хук, позволяющий функциональным компонентам React хранить внутреннее состояние между рендерами. Вызывается как `const [state, setState] = useState(initialValue)` и возвращает пару: текущее значение состояния и функцию его обновления. Каждый вызов сеттера (например, `setTasks(...)`) триггерит перерендеринг компонента с новым значением. В данном проекте используется два состояния: `tasks` (массив задач) и `newTask` (текст в поле ввода).

### 2. Почему в React важно использовать неизменяемое состояние?

**Ответ:**
React определяет необходимость перерендеринга через **сравнение ссылок** (поверхностное сравнение). Если прямо изменить исходный массив (например, через `push`), ссылка на объект останется той же — React не зафиксирует изменение и не перерендерит компонент. Правильный подход — создавать **новый массив** через `filter` или `map`, тогда React видит изменение ссылки и перерендеривает компонент.

### 3. Какой метод массива использован для удаления задачи и почему?

**Ответ:**
Для удаления использовался **`filter`**:
```typescript
setTasks(tasks.filter((task) => task.id !== id));
```
`filter` создаёт новый массив, включая только те элементы, для которых условие верно. Удаляемая задача просто не попадает в новый массив. Исходный массив не изменяется, что соответствует принципу неизменяемости в React.

### 4. В чём преимущества TypeScript при разработке React-приложений?

**Ответ:**
TypeScript добавляет статическую типизацию, которая: (1) позволяет описывать форму данных через `interface` (например, `interface Task`); (2) подсвечивает ошибки ещё до запуска в компиляторе; (3) даёт автодополнение в IDE; (4) улучшает читаемость кода для команды. `useState<Task[]>` явно говорит, что в массиве могут храниться только элементы типа `Task`.

---

## Выводы

1. **`useState`** — основной инструмент для управления состоянием в функциональных компонентах. Запуск сеттера автоматически обновляет UI.
2. **Неизменяемость** состояния — ключевой принцип React. Методы `filter` и `map` создают новые массивы, не мутируя исходные.
3. **Vite + TypeScript** обеспечивают быстрый цикл разработки с типовой безопасностью.
4. **Tailwind CSS** позволил быстро стилизовать интерфейс без отдельного CSS-файла.
5. Были реализованы все обязательные (A, B, C) и дополнительные (D, E) задачи.

---

## Приложения

### Ссылки

- **GitHub репозиторий:** https://github.com/akkariq/todo-app

### Инструкция по запуску локально

```bash
git clone https://github.com/akkariq/todo-app.git
cd todo-app
npm install
npm run dev
# Открыть: http://localhost:5173
```
