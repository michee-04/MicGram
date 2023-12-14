import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"
import { Button } from '@/components/ui/button';
import { useSignOutAccount } from "@/lib/react-query/queryAndMutations";
import { useUserContext } from "@/context/AuthContext";

function TopBar() {
  const { mutate: signOut,  isSuccess } = useSignOutAccount();
  const navigate = useNavigate();
  const { user, setIsAuthenticated } = useUserContext();

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess ])

  const deconnexion = () => {
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    window.location.replace("/connexion")
}
  
  return (
    <section className="topbar">
        <div className="flex-between py-4 px-5">
            <Link to="/" className="flex gap-3 items-center" >
              <img 
                src="/public/assets/images/logo.png"
                alt="logo"
                width={130} 
                height={325}
              />
            </Link>

            <div className="flex gap-4">
              <Button variant="ghost" className="shad-button_ghost" onClick={() => signOut()}>
                <img src="/public//assets/icons/logout.svg" />
              </Button>
              <Link to={`/profile/${user.id}`} className="flex-center gap-3">
                <img 
                  src={user.imageUrl || '/public/assets/icons/profile-placeholder.svg'}
                  alt="profile"
                  className="h-8 w-8 rounded-full"
                />
              </Link>
            </div>
        </div>
    </section>
  )
}

export default TopBar