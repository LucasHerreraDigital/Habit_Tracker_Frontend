import { generateInsights } from "../utils/insights";

type Habit = {
  streak: number;
  completedDates: string[];
};

type Props = {
  habits: Habit[];
};

export const Insights = ({ habits }: Props) => {
  const insights = generateInsights(habits);

  return (
    <div className="bg-white rounded-2xl shadow p-5 mb-6">

      <ul className="space-y-2 text-sm text-gray-600">
        {insights.map((text, i) => (
          <li
            key={i}
            className="bg-gray-50 px-3 py-2 rounded-lg"
          >
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
};