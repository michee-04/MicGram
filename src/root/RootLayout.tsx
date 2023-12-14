import BottomBar from "@/components/shared/BottomBar"
import LeftSlideBar from "@/components/shared/LeftSlideBar"
import TopBar from "@/components/shared/TopBar"
import { Outlet } from "react-router-dom"

function RootLayout() {
  return (
    <div className="w-full md:flex">
      <TopBar />
      <LeftSlideBar />

      <section className="flex flex-1 h-full">
        <Outlet />
      </section>

      <BottomBar />
    </div>
  )
}

export default RootLayout