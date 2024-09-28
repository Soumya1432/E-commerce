// import CommonForm from "@/components/common/form";
// import { Button } from "@/components/ui/button";
// import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
// import { addProductFormElements } from "@/config";
// import { Fragment, useState } from "react";

// const initialFormData={
//    image:null,
//    title:"",
//    description:"",
//    category:" ",
//    brand:"",
//    price:"",
//    salePrice:"",
//    totalStock:"",
//    averageReview:0,
// }

// const AdminProducts =()=>{
//   const [openCreateProductsDialog, setOpenCreateProductsDialog] =useState(false);
//   const [ formData,setFormData] = useState(initialFormData);

// function onSubmit(event){
//   event.preventDefault();

// }
//     return(
//     <Fragment>
//         <div className="mb-5 w-full  flex justify-end">
//             <Button  onClick={()=>setOpenCreateProductsDialog(true)}> Add New Product</Button>
//         </div>
//         <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 "></div>
//         <Sheet open={openCreateProductsDialog} onOpenChange={()=>{setOpenCreateProductsDialog(false); setFormData(initialFormData) }} >
          
//           <SheetContent side="right" className="overflow-auto">
//               <SheetHeader>
//               <SheetTitle>Add New Products </SheetTitle>
//               </SheetHeader>
//               <div className="py-6">
//                  {/* <CommonForm onSubmit={onSubmit} formData={formData} setFormData={setFormData} buttonText={'Add '}  /> */}
//                  <CommonForm onSubmit={onSubmit} formData={formData} setFormData={setFormData} buttonText={"add"} formControls={addProductFormElements} />
//               </div>
//           </SheetContent>
//         </Sheet>
//     </Fragment>
//     )
//   }
//   export default AdminProducts;


import ProductImageUpload from "@/components/admin-view/imageUpload";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { addNewProduct, fetchAllProducts } from "@/store/admin/products-slice";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminProductTile from "./productTile";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: " ",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
  averageReview: 0,
};

const AdminProducts = () => {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile,setImageFile] = useState(null);
  const [uploadedImageUrl,setUploadedImageUrl]= useState("");
  const [ imageLoadingState, setImageLoadingState] = useState(false);
  const { productList } = useSelector(state=>state.adminProducts)
  const dispatch = useDispatch();
  const { toast } = useToast();
  function onSubmit(event) {
    event.preventDefault();
    // Handle the form submission
    dispatch(addNewProduct({
      ...formData,
      image:uploadedImageUrl
    })).then((data)=>{
      console.log(data);
      if(data?.payload?.success)
      {
         dispatch(fetchAllProducts())
         setOpenCreateProductsDialog(false);
        setImageFile(null);
        setFormData(initialFormData);
        toast({
          title:"Product add successfully"
        })
      }
    })
  }

   useEffect(()=>{
      dispatch(fetchAllProducts())
   },[dispatch])
   console.log(productList,uploadedImageUrl,"productlist");
  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreateProductsDialog(true)}>Add New Product</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
         {
           productList && productList.length > 0 ?
           productList.map( (productItem) =>(
                  <AdminProductTile product={productItem} />
           )): null
         }
      </div>

      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={(open) => setOpenCreateProductsDialog(open)} // Updated to handle both open and close actions
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>Add New Products</SheetTitle>
          </SheetHeader>
        <ProductImageUpload
         imageFIle={imageFile}  
         setImageFile={setImageFile} 
         uploadedImageUrl={uploadedImageUrl}
          setUploadedImageUrl={setUploadedImageUrl}
          setImageLoadingState={setImageLoadingState}
          imageLoadingState={imageLoadingState}
           />
          <div className="py-6">
            {/* Ensure that CommonForm is working as expected */}
            <CommonForm
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonText={"Add"}
              formControls={addProductFormElements}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};

export default AdminProducts;
