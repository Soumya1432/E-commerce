
import { AlignRight, ChartNoAxesCombined, LayoutDashboard, LogOut, ShoppingBasket, Truck } from "lucide-react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { SheetClose, SheetContent, SheetHeader,Sheet, SheetTitle } from "../ui/sheet";

const adminSidebarMenuItems=[
    {
        id:'dashboard',
        label:"Dashboard",
        path:"/admin/dashboard",
        icons: <LayoutDashboard />
    },
    {
        id:'products',
        label:"Products",
        path:"/admin/products",
        icons:  <ShoppingBasket />
    },
    {
        id:'orders',
        label:'Orders',
        path:'/admin/orders',
        icons:<Truck />
    }
    
]


export function MenuItems({setOpen}){
    const navigate =useNavigate();
    return <nav className="mt-8 flex-col flex gap-2">
         {
            adminSidebarMenuItems.map(menuItem=>
                <div key={menuItem.id} onClick={()=>{ navigate(menuItem.path); setOpen ? setOpen(false):null}
                } className="cursor-pointer flex items-center gap-2 rounded-md px-4 py-2 text-muted-foreground hover:bg-muted hover:text-foreground">
                {menuItem.icons}
                <span>{menuItem.label}</span>
                </div>
            )
         }
    </nav>
}

const AdminSidebar =({open,setOpen})=>{
    const navigate=useNavigate();
return(
<Fragment>
   <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
            <div className="flex flex-col h-full">
                <SheetHeader className="border-b">
                    <SheetTitle className="flex gap-2 mt-4 mb-4">
                    <ChartNoAxesCombined size={30} />
                 
                       <span> Admin Panel</span>
                    </SheetTitle>
                </SheetHeader>
            <MenuItems setOpen={setOpen}/>
            </div>
        </SheetContent>
   </Sheet>
    <aside className="hidden lg:flex p-6 w-64 flex-col border-r bg-background  items-center">
        <div className="flex cursor-pointer items-center gap-2" onClick={()=>navigate("/admin/dashboard")}>
            <ChartNoAxesCombined  size={30} />
            <h1 className="text-xl font-extrabold" >Admin Panel</h1>
        </div>
<MenuItems/>
    </aside>
</Fragment>
 )
}
export default AdminSidebar;