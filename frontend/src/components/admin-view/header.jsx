import { AlignRight, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/store/authSlice";

const AdminHeader =({setOpen})=>{
  const dispatch = useDispatch();
  function handleLogout(event){
    event.preventDefault();
      dispatch(logoutUser());
  }
    return(
        <header className="flex justify-between px-10 py-4 bg-background">
        {/* Toggle Menu Button - Visible on small screens */}
        <Button onClick={()=>setOpen(true)} className="lg:hidden sm:block">
          <AlignRight />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      
        {/* Logout Button - Positioned to the right */}
        <div className="flex flex-1 justify-end">
          <Button onClick={handleLogout} className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium ">
            <LogOut  />
            Logout
          </Button>
        </div>
      </header>
    )
}
export default AdminHeader;