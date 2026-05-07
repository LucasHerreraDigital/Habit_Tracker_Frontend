import { useEffect, useState } from "react";
import {
  getHabits,
  deleteHabit,
  createHabit,
  completeHabit,
} from "../api/Habits";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Heatmap } from "../components/Heatmap";
import { GlobalHeatmap } from "../components/GlobalHeatmap";
import { Insights } from "../components/Insights";
import { useAuth } from "../context/AuthContext";

type Habit = {
  _id: string;
  title: string;
  streak: number;
  completedDates: string[];
};

export const Habits = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");

  const [animatedId, setAnimatedId] = useState<string | null>(null);
  const [floatingId, setFloatingId] = useState<string | null>(null);

  const {logout} = useAuth();

  const fireConfetti = () => {
    confetti({
      particleCount: 25,
      spread: 50,
      origin: { y: 0.6 },
      gravity: 0.9,
      scalar: 0.8,
      colors: ["#22c55e", "#3b82f6", "#f59e0b"]
    });
  };

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

  const handleComplete = async (id: string) => {
    try {
      setAnimatedId(id);
      setFloatingId(id);
      fireConfetti()

      const updated = await completeHabit(id);
      console.log(updated)
      setHabits((prev) => prev.map((h) => (h._id === id ? updated : h)));

      setTimeout(() => {
        setAnimatedId(null);
        setFloatingId(null);
      }, 800);
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

  const isCompletedToday = (habit: Habit) => {
    const today = new Date().toLocaleDateString("en-CA");
    return habit.completedDates.includes(today);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-6">
      <div className="w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Mis Hábitos</h1>

          <button
            onClick={logout}
            className="bg-red-100 text-red-500 px-3 py-1 rounded-lg hover:bg-red-200 transition text-sm"
          >
            Logout
          </button>
        </div>
        <GlobalHeatmap habits={habits}/>
        <Insights habits={habits} />

        {/* FORM */}
        <form onSubmit={handleCreate} className="flex gap-2 mb-6">
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
          <div className="text-center text-gray-500">Cargando hábitos...</div>
        )}

        {/* EMPTY */}
        {!loading && habits.length === 0 && (
          <div className="text-center text-gray-400">
            No tenés hábitos todavía
          </div>
        )}

        {/* LIST */}
        <div className="space-y-3">
          {habits.map((habit) => {
            const completedToday = isCompletedToday(habit);
            const isAnimating = animatedId === habit._id;

            return (
              <motion.div
                key={habit._id}
                initial={{ scale: 1 }}
                animate={{
                  scale: isAnimating ? 1.05 : 1,
                  boxShadow: isAnimating
                    ? "0px 0px 15px rgba(34,197,94,0.6)"
                    : "0px 0px 0px rgba(0,0,0,0)",
                }}
                transition={{ duration: 0.25 }}
                className="relative flex items-center justify-between bg-white p-4 rounded-2xl shadow"
              >
                {/* 🔥 +1 FLOATING */}
                {floatingId === habit._id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={{ opacity: 1, y: -25, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                    className="absolute left-6 top-2 text-orange-500 font-bold text-sm"
                  >
                    🔥 +1
                  </motion.div>
                )}

                {/* LEFT */}
                <div
                  className={`flex items-center gap-3 ${
                    completedToday
                      ? "opacity-60 cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                  onClick={() => {
                    if (!completedToday) {
                      handleComplete(habit._id);
                    }
                  }}
                >
                  {/* CHECK */}
                  <motion.div
                    animate={{
                      scale: isAnimating ? 1.3 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                    className={`w-5 h-5 rounded-full border flex items-center justify-center
                      ${
                        completedToday
                          ? "bg-green-500 border-green-500"
                          : "border-gray-400"
                      }`}
                  >
                    {completedToday && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </motion.div>

                  {/* TITLE + STREAK */}
                  <div className="flex flex-col">
                    <span
                      className={`text-lg ${
                        completedToday ? "line-through text-gray-400" : ""
                      }`}
                    >
                      {habit.title}
                    </span>

                    <span className="text-sm text-orange-500 font-semibold">
                      🔥 {habit.streak}
                    </span>
                    {/* STATUS HOY */}
                    {completedToday && (
                      <span className="text-xs text-green-500 font-medium">
                        ✔ Hoy
                      </span>
                    )}

                    {/* HEATMAP 👇 ACÁ */}
                    <Heatmap dates={habit.completedDates} />
                  </div>
                </div>

                {/* DELETE */}
                <button
                  onClick={() => handleDelete(habit._id)}
                  className="text-red-400 hover:text-red-600 transition"
                >
                  ✕
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
