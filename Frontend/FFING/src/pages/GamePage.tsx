import React, { useState, useEffect } from "react";
import TextHeader from "../components/Common/TextHeader";
import NavBar from "../components/Common/Navbar";
import PetIdle from "../components/Game/PetIdle";
import PetStatusChart from "../components/Game/PetStatusChart";
import RandomMatching from "./RandomMatching";
import DirectMatching from "./DirectMatching";
import { getPets } from "../api/PetPediaApi";
import useViewportStore from "../store/useViewportStore";

const GamePage: React.FC = () => {
  const [isRandomModalOpen, setIsRandomModalOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const dvw = useViewportStore((state) => state.dvw);
  const dvh = useViewportStore((state) => state.dvh);

  // 펫 능력치를 가져오는 함수
  const fetchData = async (userId: string) => {
    try {
      const responsePetStats = await getPets(userId);
      console.log(responsePetStats);
    } catch (error) {
      console.error("Error fetching pet data:", error);
    }
  };

  useEffect(() => {
    fetchData("1");
  }, []);

  // 랜덤 매칭 모달 열기
  const handleOpenRandomModal = () => {
    setIsRandomModalOpen(true);
  };

  // 랜덤 매칭 모달 닫기
  const handleCloseRandomModal = () => {
    setIsRandomModalOpen(false);
  };

  // 초대 매칭 모달 열기
  const handleOpenInviteModal = () => {
    setIsInviteModalOpen(true);
  };

  // 초대 매칭 모달 닫기
  const handleCloseInviteModal = () => {
    setIsInviteModalOpen(false);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-screen h-screen">
        <header style={{ height: `${dvh * 10}px` }}>
          <TextHeader title="이규석 님" />
        </header>
        <main className="mx-auto" style={{ height: `${dvh * 80}px`, width: `${dvw * 90}px` }}>
          {/* 내 펫이 인사를 하는 컴포넌트 */}
          <div style={{ height: "40%" }}>
            <PetIdle />
          </div>
          {/* 내 펫의 스탯 차트 */}
          <div style={{ height: "40%" }}>
            <PetStatusChart />
          </div>
          {/* 매칭 시작과 초대 버튼 */}
          <div className="flex rounded-lg overflow-hidden w-full max-w-screen-md mx-auto mt-6 h-16 text-2xl">
            <button
              onClick={handleOpenRandomModal}
              className="flex-grow bg-[#FFD874] text-black py-2 rounded-l-lg font-bold"
            >
              랜덤 매칭
            </button>
            <button
              onClick={handleOpenInviteModal}
              className="flex-grow bg-[#FFD874] text-black py-2 rounded-r-lg font-bold"
            >
              초대 매칭
            </button>
          </div>
          {/* 랜덤 매칭 모달 */}
          {isRandomModalOpen && (
            <RandomMatching isOpen={isRandomModalOpen} onClose={handleCloseRandomModal} myUserId={"1"} />
          )}
          {/* 초대 매칭 모달 */}
          {isInviteModalOpen && (
            <DirectMatching isOpen={isInviteModalOpen} onClose={handleCloseInviteModal} myUserId={"1"} />
          )}
        </main>
        <footer>
          <NavBar />
        </footer>
      </div>
    </div>
  );
};

export default GamePage;
