import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import NowPlaying from "@/components/layout/NowPlaying";
import MainContent from "@/components/layout/MainContent";

export default function App() {
  return (
    <div className="flex bg-[#500000] text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gradient-to-t from-black/70 to-transparent rounded-lg">
        <Header />
        <MainContent />
      </div>
      <NowPlaying />
    </div>
  );
}
