import BottomBar from "@/components/shared/BottomBar";
import LeftSlideBar from "@/components/shared/LeftSlideBar";
import TopBar from "@/components/shared/TopBar";
import TopCreator from "@/components/shared/TopCreator";
import { Outlet, useLocation } from "react-router-dom";

function RootLayout() {
  const location = useLocation();

  // Vérifiez si l'URL actuelle est la page d'accueil
  const isHomePage = location.pathname === '/';

  return (
    <div className="w-full md:flex">
      <TopBar />
      <LeftSlideBar />


      <section className="flex flex-1 h-full">
        <Outlet />

        {/* Affichez TopCreator uniquement sur la page d'accueil */}
        {isHomePage && <TopCreator />}
      </section>

      <BottomBar />
    </div>
  );
}

export default RootLayout;
