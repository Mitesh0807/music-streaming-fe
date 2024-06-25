import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import MainContent from "./components/layout/MainContent";
import NowPlaying from "./components/layout/NowPlaying";

export default function App() {
  return (
    <div className="flex h-screen overflow-hidden bg-green-950">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 bg-[#500000] bg-gradient-to-t from-black/70 to-transparent rounded-lg scrollbar-thin">
          <MainContent />
        </main>
      </div>
      <NowPlaying />
    </div>
  );
}
