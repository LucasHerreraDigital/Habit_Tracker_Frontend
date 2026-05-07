import { formatDate } from "../utils/formatDate";
type HeatmapProps = {
  dates: string[];
};

export const Heatmap = ({ dates }: HeatmapProps) => {
  const today = new Date();
  const days = [];

  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(today.getDate() - i);

    const formatted = formatDate(d);

    const count = dates.filter((date) => date.startsWith(formatted)).length;

    let color = "bg-gray-200";

    if (count === 1) color = "bg-green-300";
    if (count >= 2) color = "bg-green-500";

    days.push({
      date: formatted,
      color,
      count,
    });
  }

  return (
    <div className="grid grid-cols-7 gap-[2px] mt-2">
      {days.map((day, i) => (
        <div
          key={i}
          className={`w-3 h-3 rounded-sm ${day.color} hover:scale-125 transition`}
          title={`${day.date} - ${
            day.count > 0 ? "Completado" : "No completado"
          }`}
        />
      ))}
    </div>
  );
};