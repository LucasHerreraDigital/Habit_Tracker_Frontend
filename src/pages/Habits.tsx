import { useEffect, useState } from "react";
import {
  getHabits,
  deleteHabit,
  toggleHabit,
  createHabit,
} from "../api/Habits";

type Habit = {
  _id: string;
  title: string;
  completed: boolean;
};

export const Habits = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");

  const fetchHabits = async () => {
    try {
      const data = await getHabits();
      setHabits(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const newHabit = await createHabit(title);
      setHabits((prev) => [newHabit, ...prev]);
      setTitle("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggle = async (id: string) => {
    try {
      const updated = await toggleHabit(id);
      setHabits((prev) =>
        prev.map((h) => (h._id === id ? updated : h))
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteHabit(id);
      setHabits((prev) => prev.filter((h) => h._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-6">
      <div className="w-full max-w-2xl">

        {/* HEADER */}
        <h1 className="text-3xl font-bold mb-6 text-center">
           Mis Hábitos
        </h1>

        {/* FORM */}
        <form
          onSubmit={handleCreate}
          className="flex gap-2 mb-6"
        >
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Agregar nuevo hábito..."
            className="flex-1 p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-5 rounded-xl transition">
            +
          </button>
        </form>

        {/* LOADING */}
        {loading && (
          <div className="text-center text-gray-500">
            Cargando hábitos...
          </div>
        )}

        {/* EMPTY */}
        {!loading && habits.length === 0 && (
          <div className="text-center text-gray-400">
            No tenés hábitos todavía 
          </div>
        )}

        {/* LIST */}
        <div className="space-y-3">
          {habits.map((habit) => (
            <div
              key={habit._id}
              className="flex items-center justify-between bg-white p-4 rounded-2xl shadow hover:shadow-md transition"
            >
              {/* LEFT */}
              <div
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => handleToggle(habit._id)}
              >
                {/* CHECK */}
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center transition
                    ${
                      habit.completed
                        ? "bg-green-500 border-green-500"
                        : "border-gray-400"
                    }`}
                >
                  {habit.completed && (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>

                {/* TITLE */}
                <span
                  className={`text-lg transition ${
                    habit.completed
                      ? "line-through text-gray-400"
                      : ""
                  }`}
                >
                  {habit.title}
                </span>
              </div>

              {/* DELETE */}
              <button
                onClick={() => handleDelete(habit._id)}
                className="text-red-400 hover:text-red-600 transition"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};