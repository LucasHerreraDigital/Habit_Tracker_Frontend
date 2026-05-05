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

    const formatted = d.toLocaleDateString("en-CA");

    const count = allDates.filter((date) => date === formatted).length;

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
      <div className="w-full max-w-3xl">
        <div className="grid grid-rows-7 grid-flow-col gap-[3px] justify-center">
          {days.map((day, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-sm ${day.color} hover:scale-125 transition`}
              title={`${day.date} - ${day.count} hábitos`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};