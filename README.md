# 🧠 Habit Tracker App

Aplicación fullstack para el seguimiento de hábitos diarios con sistema de streaks, heatmap estilo GitHub e insights automáticos generados por IA.

---

## 🌐 Demo

🔗 [https://tu-app.vercel.app](https://tu-app.vercel.app)

---

## 🧩 Backend API

👉 [https://github.com/LucasHerreraDigital/Habit_Tracker_Backend.git](https://github.com/LucasHerreraDigital/Habit_Tracker_Backend.git)

---

## ✨ Features

- 🔐 **Autenticación JWT** — registro, login y rutas protegidas
- 📌 **CRUD de hábitos** — creá, editá y eliminá hábitos fácilmente
- 🔥 **Sistema de streaks** — visualizá tu racha activa y tu récord histórico
- 📊 **Heatmap estilo GitHub** — actividad diaria de los últimos 365 días
- 🧠 **Insights automáticos** — análisis inteligente de tus patrones y progreso
- 📅 **Resumen semanal** — reporte con los hábitos completados en la semana
- ✨ **Animaciones fluidas** — transiciones y feedback visual con Framer Motion

---

## 🛠️ Tech Stack

### Frontend
- ⚛️ React + TypeScript
- 🎨 TailwindCSS
- 🎞️ Framer Motion

### Backend
- 🟢 Node.js
- 🚂 Express
- 🍃 MongoDB + Mongoose

---

## 📁 Estructura del proyecto

```
habit-tracker/
├── client/                 # Frontend React
│   ├── src/
│   │   ├── components/     # Componentes reutilizables
│   │   ├── pages/          # Vistas principales
│   │   ├── hooks/          # Custom hooks
│   │   ├── services/       # Llamadas a la API
│   │   └── types/          # Tipados TypeScript
│   └── ...
├── server/                 # Backend Node.js
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── middleware/
└── README.md
```

---

## ⚙️ Instalación

### Prerequisitos

- Node.js >= 18
- MongoDB (local o Atlas)

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-user/habit-tracker.git
cd habit-tracker
```

### 2. Configurar variables de entorno

```bash
# En /server
cp .env.example .env
```

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/habit-tracker
JWT_SECRET=tu_secreto_jwt
```

### 3. Instalar dependencias y correr

```bash
# Backend
cd server
npm install
npm run dev

# Frontend (en otra terminal)
cd client
npm install
npm run dev
```

La app estará disponible en [http://localhost:5173](http://localhost:5173)

---

## 🔌 Endpoints principales

| Método | Ruta | Descripción |
|--------|------|-------------|
| `POST` | `/api/auth/register` | Registrar usuario |
| `POST` | `/api/auth/login` | Iniciar sesión |
| `GET` | `/api/habits` | Obtener todos los hábitos |
| `POST` | `/api/habits` | Crear hábito |
| `PUT` | `/api/habits/:id` | Actualizar hábito |
| `DELETE` | `/api/habits/:id` | Eliminar hábito |
| `POST` | `/api/habits/:id/check` | Marcar hábito como completado |
| `GET` | `/api/insights` | Obtener insights del usuario |

---

## 🖼️ Screenshots

> _Podés agregar capturas de pantalla acá_

---

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si querés colaborar:

1. Hacé un fork del proyecto
2. Creá tu rama (`git checkout -b feature/nueva-feature`)
3. Commiteá tus cambios (`git commit -m 'Add: nueva feature'`)
4. Pusheá la rama (`git push origin feature/nueva-feature`)
5. Abrí un Pull Request

---

## 📄 Licencia

Distribuido bajo la licencia MIT. Ver [`LICENSE`](LICENSE) para más información.

---

<p align="center">Hecho con ❤️ por <a href="https://github.com/tu-user">tu-user</a></p>
