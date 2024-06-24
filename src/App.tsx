import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import MainContent from "./components/layout/MainContent";
import NowPlaying from "./components/layout/NowPlaying";

export default function App() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 bg-[#500000]">
          <MainContent />
        </main>
      </div>
      <NowPlaying />

    </div>
  );
}
