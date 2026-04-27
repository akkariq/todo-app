<div align="center">

# 📝 Todo App

**React · TypeScript · Vite · Tailwind CSS**

[![React](https://img.shields.io/badge/React-18.2-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

Простое приложение для управления списком задач, написанное в рамках лабораторной работы №1.1.

</div>

---

## 🖼️ Скриншоты

| Главный экран | Выполненная задача |
|---|---|
| ![](%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202026-04-27%20212117.png) | ![](%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202026-04-27%20212302.png) |

| Добавление задачи | Пустой список |
|---|---|
| ![](%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202026-04-27%20212249.png) | ![](%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202026-04-27%20212319.png) |

---

## ✨ Функциональность

- ➕ **Добавление задач** — через кнопку или нажатие `Enter`
- ✅ **Отметка выполнения** — чекбокс с зачёркиванием текста
- 🗑️ **Удаление задач** — кнопка `×` у каждой задачи
- 📊 **Статистика** — счётчик всего и выполненных задач
- 🚫 **Пустой список** — информационное сообщение при отсутствии задач

---

## 🛠️ Стек технологий

| Технология | Версия | Назначение |
|---|---|---|
| [React](https://reactjs.org/) | 18.2 | UI-библиотека, хуки (`useState`) |
| [TypeScript](https://www.typescriptlang.org/) | 5.2 | Статическая типизация |
| [Vite](https://vitejs.dev/) | 5.0 | Сборщик, dev-сервер с HMR |
| [Tailwind CSS](https://tailwindcss.com/) | 3.3 | Утилитарные CSS-классы |

---

## 🚀 Запуск проекта

### Требования

- Node.js ≥ 18
- npm ≥ 9

### Установка и запуск

```bash
# 1. Клонировать репозиторий
git clone https://github.com/akkariq/todo-app.git
cd todo-app

# 2. Установить зависимости
npm install

# 3. Запустить в режиме разработки
npm run dev
```

Открыть в браузере: **http://localhost:5173**

### Другие команды

```bash
npm run build    # Сборка для продакшна
npm run preview  # Предпросмотр собранного проекта
npm run lint     # Проверка кода ESLint
```

---

## 📁 Структура проекта

```
todo-app/
├── src/
│   ├── App.tsx          # Основной компонент (состояние, логика)
│   ├── main.tsx         # Точка входа React
│   └── index.css        # Подключение Tailwind CSS
├── index.html           # HTML-шаблон
├── package.json         # Зависимости и скрипты
├── tailwind.config.js   # Конфигурация Tailwind
├── vite.config.ts       # Конфигурация Vite
└── tsconfig.json        # Конфигурация TypeScript
```

---

## 🧠 Ключевые концепции

### Хук `useState`
Управление состоянием задач и поля ввода:
```tsx
const [tasks, setTasks] = useState<Task[]>([...]);
const [newTask, setNewTask] = useState('');
```

### Неизменяемость состояния
Удаление через `filter` — создаёт новый массив без мутации:
```tsx
const removeTask = (id: number) => {
  setTasks(tasks.filter((task) => task.id !== id));
};
```

Переключение статуса через `map` + spread-оператор:
```tsx
const toggleTask = (id: number) => {
  setTasks(tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task
  ));
};
```

---

## 📄 Отчёт

Полный отчёт по лабораторной работе: [report_lab0101.md](./report_lab0101.md)

---

<div align="center">

**Лабораторная работа №1.1 · Технологии программирования · 2026**

</div>
