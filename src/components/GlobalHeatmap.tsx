import { formatDate } from "../utils/formatDate";

type GlobalHeatmapProps = {
  habits: {
    completedDates: string[];
  }[];
};

export const GlobalHeatmap = ({ habits }: GlobalHeatmapProps) => {
  const today = new Date();

  const allDates = habits.flatMap((h) => h.completedDates);

  const days = [];

  for (let i = 83; i >= 0; i--) {
    const d = new Date();
    d.setDate(today.getDate() - i);

    const formatted = formatDate(d);

    const count = allDates.filter((date) =>
      date.startsWith(formatted)
    ).length;

    let color = "bg-gray-200";

    if (count === 1) color = "bg-green-300";
    if (count === 2) color = "bg-green-400";
    if (count >= 3) color = "bg-green-600";

    days.push({
      date: formatted,
      count,
      color,
    });
  }

  return (
    <div className="w-full flex justify-center mb-6">
      <div className="overflow-x-auto">
        <div className="grid grid-rows-7 grid-flow-col gap-[1px] bg-gray-300 p-[2px] rounded-md">
          {days.map((day, i) => (
            <div
              key={i}
              className={`w-4 h-4 ${day.color} rounded-[2px] hover:scale-110 transition-transform duration-150`}
              title={`${day.date} - ${day.count} hábitos`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};