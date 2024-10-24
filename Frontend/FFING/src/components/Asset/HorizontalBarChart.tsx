import React, { useEffect } from "react";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  LinearScale,
} from "chart.js";
import { getTotalAsset } from "../../api/AssetApi";
import { getTargetPropertySpending } from "../../api/goalApi";

ChartJS.register(Title, Tooltip, Legend, BarElement, LinearScale);

interface HorizontalBarChartProps {
  assetDiff: number;
}

const HorizontalBarChart: React.FC<HorizontalBarChartProps> = ({
  assetDiff,
}) => {
  const [property, setProperty] = React.useState(0);
  const [target, setTarget] = React.useState(0);
  const progressPercentage = (property / target) * 100;

  const fetchData = async () => {
    try {
      const response = await getTotalAsset("1");
      const responseGoal = await getTargetPropertySpending("1");
      setProperty(response.data.result.currentAsset.totalAsset);
      setTarget(responseGoal.data.result.goalBalance);
    } catch (error) {
      console.error("Error fetching certain spending data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      {/* 전체 목표 바 */}
      <div className="w-4/5 h-8 bg-[#828181] rounded-2xl overflow-hidden">
        {/* 달성한 자산 바 */}
        <div
          className="h-full transition-all duration-300 ease-in-out"
          style={{
            width: `${progressPercentage}%`,
            backgroundColor: "#FFD55E",
          }}
        />
      </div>

      {/* 목표 달성까지 남은 금액 표시 */}
      <div className="mt-4">
        <span className="font-galmuri-11-bold">
          {assetDiff.toLocaleString()}원
        </span>
        <span> 남았습니다...</span>
      </div>
    </div>
  );
};

export default HorizontalBarChart;
