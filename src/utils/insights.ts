type Habit = {
  streak: number;
  completedDates: string[];
};

export const generateInsights = (habits: Habit[]) => {
  const allDates = habits.flatMap((h) => h.completedDates);

  if (allDates.length === 0) {
    return ["Empezá hoy 🚀"];
  }

  // 📅 agrupar por día de la semana
  const daysMap = [0, 0, 0, 0, 0, 0, 0]; // lunes-domingo

  allDates.forEach((dateStr) => {
    const d = new Date(dateStr);
    const day = (d.getDay() + 6) % 7; // lunes = 0
    daysMap[day]++;
  });

  const dayNames = ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"];

  const bestDayIndex = daysMap.indexOf(Math.max(...daysMap));
  const bestDay = dayNames[bestDayIndex];

  // 📊 promedio semanal
  const uniqueDates = [...new Set(allDates)];
  const weeks = Math.max(1, Math.ceil(uniqueDates.length / 7));
  const weeklyAvg = (uniqueDates.length / weeks).toFixed(1);

  // 🔥 consistencia reciente (últimos 7 días)
  const today = new Date();
  let recent = 0;

  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    const formatted = d.toLocaleDateString("en-CA");

    if (allDates.includes(formatted)) {
      recent++;
    }
  }

  // 🧊 días sin actividad (últimos 7)
  const inactive = 7 - recent;

  // 💪 nivel
  let level = "bajo";
  if (recent >= 3) level = "medio";
  if (recent >= 5) level = "alto";

  return [
    `🔥 Tu mejor día es ${bestDay}`,
    `📊 Promedio semanal: ${weeklyAvg} días`,
    `📅 Esta semana: ${recent}/7 días activos`,
    inactive > 0
      ? `🧊 ${inactive} días sin actividad reciente`
      : "💪 ¡Semana perfecta!",
    `⚡ Nivel de disciplina: ${level}`,
  ];
};