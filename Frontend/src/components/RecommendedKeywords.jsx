import PropTypes from "prop-types";
import KeywordCard from "./KeywordCard";

export default function RecommendedKeywords({ keywords }) {
  if (!Array.isArray(keywords) || keywords.length === 0) return null;
  return (
    <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {keywords.map((item, idx) => (
        <KeywordCard key={idx} item={item} />
      ))}
    </div>
  );
}

RecommendedKeywords.propTypes = {
  keywords: PropTypes.arrayOf(PropTypes.object),
};
