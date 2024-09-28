import { AlignRight, LogOut } from "lucide-react";
import { Button } from "../ui/button";
const AdminHeader =({setOpen})=>{
    return(
        <header className="flex justify-between px-10 py-4 bg-background">
        {/* Toggle Menu Button - Visible on small screens */}
        <Button onClick={()=>setOpen(true)} className="lg:hidden sm:block">
          <AlignRight />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      
        {/* Logout Button - Positioned to the right */}
        <div className="flex flex-1 justify-end">
          <Button className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium ">
            <LogOut />
            Logout
          </Button>
        </div>
      </header>
    )
}
export default AdminHeader;