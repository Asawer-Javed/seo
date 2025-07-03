import PropTypes from "prop-types";

export default function KeywordCard({ item }) {
  // numeric helpers
  const toNumber = (val) => {
    const n = Number(val);
    return isNaN(n) ? 0 : n;
  };

  // normalize helpers
  const normalize = (val, max) => Math.min((toNumber(val) / max) * 100, 100);

  // categorical mappings
  const tailScore = {
    short: 33,
    medium: 66,
    long: 100,
  };

  const trendScore = {
    up: 100,
    stable: 50,
    down: 0,
  };

  // normalize each value
  const comp = normalize(item.competition, 100);
  const compIndex = normalize(item.competition_index, 100);
  const diff = normalize(item.difficulty, 100);
  const cpc = normalize(item.cpc, 10); // assuming 10 is max CPC
  const traffic = normalize(item.potential_traffic, 10000); // scale traffic
  const volume = normalize(item.search_volume, 100000); // scale volume
  const tail = tailScore[item.tail_type?.toLowerCase()] || 0;
  const trend = trendScore[item.trend?.toLowerCase()] || 0;
  const competitors = normalize(item.serp_analysis?.competitors, 50);

  // average all metrics
  const progressValues = [
    comp,
    compIndex,
    diff,
    cpc,
    traffic,
    volume,
    tail,
    trend,
    competitors,
  ];
  const progressValue = Math.round(
    progressValues.reduce((a, b) => a + b, 0) / progressValues.length
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col gap-2 border border-blue-100 hover:shadow-lg transition max-w-md w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-lg font-bold text-blue-700">{item.keyword}</span>
        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
          {item.category}
        </span>
      </div>
      <div className="flex flex-wrap gap-2 text-sm">
        <span className="bg-blue-50 px-2 py-1 rounded">
          Competition: <b>{item.competition}</b>
        </span>
        <span className="bg-blue-50 px-2 py-1 rounded">
          Comp. Index: <b>{item.competition_index}</b>
        </span>
        <span className="bg-blue-50 px-2 py-1 rounded">
          Difficulty: <b>{item.difficulty}</b>
        </span>
        <span className="bg-gray-100 px-2 py-1 rounded">
          CPC: <b>${item.cpc}</b>
        </span>
        <span className="bg-gray-100 px-2 py-1 rounded">
          Traffic: <b>{item.potential_traffic}</b>
        </span>
        <span className="bg-gray-100 px-2 py-1 rounded">
          Search Volume: <b>{item.search_volume}</b>
        </span>
        <span className="bg-gray-100 px-2 py-1 rounded">
          Tail: <b>{item.tail_type}</b>
        </span>
        <span className="bg-gray-100 px-2 py-1 rounded">
          Trend: <b>{item.trend}</b>
        </span>
        <span className="bg-gray-100 px-2 py-1 rounded">
          Competitors: <b>{item.serp_analysis?.competitors}</b>
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full mt-4">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 transition-all"
            style={{ width: `${progressValue}%` }}
          />
        </div>
        <div className="text-xs text-gray-600 mt-1">
          Overall progress: {progressValue}%
        </div>
      </div>
    </div>
  );
}

KeywordCard.propTypes = {
  item: PropTypes.shape({
    keyword: PropTypes.string,
    category: PropTypes.string,
    competition: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    competition_index: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    difficulty: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    cpc: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    potential_traffic: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    search_volume: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    tail_type: PropTypes.string,
    trend: PropTypes.string,
    serp_analysis: PropTypes.shape({
      competitors: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  }).isRequired,
};
