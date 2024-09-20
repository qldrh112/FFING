import React from "react";
import { Radar } from "react-chartjs-2";
import 'chart.js/auto';

const PetStatusChart: React.FC = () => {

  const currentWeek = { 식비: 6, 쇼핑: 8, 교통: 6, 생활: 6, 문화: 6 };
  const previousWeek = { 식비: 8, 쇼핑: 6, 교통: 6, 생활: 8, 문화: 8 };

  const labels = ['식비', '쇼핑', '교통', '생활', '문화'];

  const data = {
    labels,
    datasets: [
      {
        label: '이번 주',
        data: Object.values(currentWeek),
        backgroundColor: 'rgba(54, 162, 235, 0.2)', // 파란색
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: '저번 주',
        data: Object.values(previousWeek),
        backgroundColor: 'rgba(255, 99, 132, 0.2)', // 빨간색
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,  // 차트 위에 라벨을 숨김
      },
    },
    scales: {
      r: {
        angleLines: {
          display: false,
        },
        suggestedMin: 0,
        suggestedMax: 10,
        ticks: {
          stepSize: 2,          // 각 능력치 간격 조정
          backdropPadding: 0,    // 레이블과 배경 패딩 없앰
          max: 10,               // 최대값 설정
          min: 0,                // 최소값 설정
        },
        pointLabels: {
          padding: 0,           // 능력치 레이블과 중앙 사이 간격 줄임
        },
      },
    },
  };

  const changes = labels.map((label, index) => {
    const current = Object.values(currentWeek)[index];
    const previous = Object.values(previousWeek)[index];
    const difference = current - previous;

    return {
      label,
      value: current,
      change: difference,
    };
  });

  return (
    <div className="flex justify-center bg-gray-100 items-center p-3">
      {/* 카드 스타일 적용 */}
      <div className="shadow-lg rounded-lg p-0 max-w-4xl w-full flex flex-row">
        {/* 레이더 차트 */}
        <div className="w-2/3 flex justify-center items-center">
          <Radar data={data} options={options} />
        </div>

        {/* 오른쪽 수치 및 변화 */}
        <div className="w-1/3 flex flex-col justify-center p-4">
          {changes.map(({ label, value, change }) => (
            <div key={label} className="flex items-center justify-between my-0.5">
              <span className="text-xs font-medium text-gray-700">{label}: {value}</span>
              {change !== 0 && (
                <span className={`ml-2 text-xs font-bold ${change > 0 ? 'text-blue-500' : 'text-red-500'}`}>
                  {change > 0 ? `▲ ${Math.abs(change)}` : `▼ ${Math.abs(change)}`}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PetStatusChart;
