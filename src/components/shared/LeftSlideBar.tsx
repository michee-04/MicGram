import { useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom"
import { Button } from '@/components/ui/button';
import { useSignOutAccount } from "@/lib/react-query/queryAndMutations";
import { INITIAL_USER, useUserContext } from "@/context/AuthContext";
import { sidebarLinks } from "@/constants";
import { INavLink } from "@/types";


function LeftSlideBar() {
  const { mutate: signOut,  isSuccess } = useSignOutAccount();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user, setUser, setIsAuthenticated, isLoading } = useUserContext();

  const handleSignOut = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    signOut();
    setIsAuthenticated(false);
    setUser(INITIAL_USER);
    navigate("/connexion");
  };

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess ])

  
  const deconnexion = () => {
    localStorage.removeItem("cookieFallback");
    setIsAuthenticated(false);
    window.location.replace("/connexion")
}
  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
        <Link to="/" className="flex gap-3 items-center">
          <img
            src="/public/assets/images/logo.png" 
            alt="logo"
            width={170}
            height={36} 
          />
        </Link>

        {/* <Button variant="ghost" className="shad-button_ghos" onClick={deconnexion}>
          <img src="/public//assets/icons/logout.svg" />
        </Button> */}

        <Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
          <img 
            src={user.imageUrl || "/public/assets/icons/profile-placeholder.svg"}
            alt="profile" 
            className="h-14 w-14 rounded-full"
          />

          <div className="flex flex-col">
            <p className="body-bold">
              {user.name}
            </p>

            <p className="small-regular text-light-3">
              @{user.username}
            </p>
          </div>
        </Link>

        <ul className="flex flex-col gap-6">
          {sidebarLinks.map((link: INavLink) =>{
            const isActive = pathname === link.route;
            
            return (
              <li
                key={link.route}
                className=
                  {`leftsidebar-link group ${
                    isActive && 'bg-primary-500'
                  }`}>
                  <NavLink
                    to={link.route}
                    className="flex gap-4 items-center p-4"
                  >
                    <img
                      src={link.imgURL} 
                      alt={link.label}
                      className={`group-hover:invert-white ${
                        isActive && "invert-white"
                      }`}
                    />
                    {link.label}
                  </NavLink>
                
              </li>
            )
          })}
        </ul>
      </div>

      <Button variant="ghost"
        className="shad-button_ghost" onClick={(e) => handleSignOut(e)}
      >
        <img src="/public/assets/icons/logout.svg"
        alt="logout"
        />
        <p className="small-medium lg:base-medium">Logout</p>
      </Button>
    </nav>
  )
}

export default LeftSlideBar