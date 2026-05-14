type Props = {
  insight: string;
  loading?: boolean;
};

export const AIInsight = ({
  insight,
  loading,
}: Props) => {
    
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mt-6 mb-6">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-2xl">🧠</span>

        <h2 className="text-xl font-semibold text-gray-800">
          AI Insight
        </h2>
      </div>

      {loading ? (
        <p className="text-gray-400 animate-pulse">
          Generating insight...
        </p>
      ) : (
        <p className="text-gray-600 leading-relaxed">
          {insight}
        </p>
      )}
    </div>
  );
};