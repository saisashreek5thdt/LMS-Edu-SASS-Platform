import { useFeatureAccess } from "../../../lib/useFeatureAccess";

const FeatureList = () => {
  const { checkFeatureAccess } = useFeatureAccess();

  const allFeatures = [
    "Feature A", "Feature B", "Feature C", "Feature D", "Feature E", "Feature F"
  ];

  return (
    <ul>
      {allFeatures.map((feature, idx) => (
        <li key={idx} className={checkFeatureAccess(idx) ? "text-black" : "text-gray-400 line-through"}>
          {feature}
        </li>
      ))}
    </ul>
  );
};

export default FeatureList;