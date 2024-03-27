/** @format */

import { Route, Routes } from "react-router-dom"
import AuthLayout from "./auth/AuthLayout"
import Connexion from "./auth/forms/Connexion"
import Inscription from "./auth/forms/Inscription"
import { Toaster } from "./components/ui/toaster"
import "./global.css"
import RootLayout from "./root/RootLayout"
import {
  AllUsers,
  CreatePost,
  EditPost,
  Explore,
  Home,
  PostDetails,
  Profile,
  Saved,
  UpdateProfile,
} from "./root/page"
import AllChat from "./root/page/AllChats"
// import { ThemeProvider } from "./components/ui/theme-provider"

const App = () => {
  return (
    // <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
    <main className='flex h-screen'>
      <Routes>
        {/* public routes */}
        <Route element={<AuthLayout />}>
          <Route path='/connexion' element={<Connexion />} />
          <Route path='/inscription' element={<Inscription />} />
        </Route>

        {/* private routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path='/explore' element={<Explore />} />
          <Route path='/saved' element={<Saved />} />
          <Route path='/all-users' element={<AllUsers />} />
          <Route path='/create-post' element={<CreatePost />} />
          <Route path='/chats' element={<AllChat />} />
          <Route path='/update-post/:id' element={<EditPost />} />
          <Route path='/posts/:id' element={<PostDetails />} />
          <Route path='/profile/:id/*' element={<Profile />} />
          <Route path='/update-profile/:id' element={<UpdateProfile />} />
        </Route>
      </Routes>

      <Toaster />
    </main>
  // </ThemeProvider>
  )
}

export default App
