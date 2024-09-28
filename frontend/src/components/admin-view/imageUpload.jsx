import React, { useEffect, useRef } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { FileIcon, UploadCloudIcon, XIcon } from 'lucide-react';
import { Button } from '../ui/button';
import axios from 'axios';
import { Skeleton } from '../ui/skeleton';

const ProductImageUpload = ({imageFIle,setImageFile,imageLoadingState,uploadedImageUrl,setUploadedImageUrl,setImageLoadingState }) => {
  const inputRef = useRef(null);
  function handleImageFileChange(event){
    console.log(event.target.files[0]);
    const seletedFile =event.target.files?.[0];
    if(seletedFile){
      setImageFile(seletedFile);
    }
  }

function handleDragOver(event){
  event.preventDefault();


}
function handleDrop(event){
  event.preventDefault();
  const droppedFile = event.dataTransfer.files?.[0];
  if(droppedFile){
    setImageFile(droppedFile);
  }
}
function handleRemoveImage(){
   setImageFile(null);
   if(inputRef.current){
    inputRef.current.value = ""
   }
   console.log(inputRef)
}

async function uploadedImageToCloudinary()
{
  setImageLoadingState(true)
  const data = new FormData();
  data.append('my_file',imageFIle);
  const response = await axios.post('http://localhost:3000/api/admin/products/upload-image',data);
  console.log(response);
  if(response.data?.success)
  {
    setUploadedImageUrl(response.data.result.url);
    setImageLoadingState(false);
  }
}
 useEffect(()=>{
  if(imageFIle !==null){
    uploadedImageToCloudinary()
  }
 },[imageFIle])

  return (
    <div className='w-full max-w-md mx-auto'>
        <Label  className="text-lg font-semibold block mb-2 ">
        Upload Image
        </Label>
        <div onDragOver={handleDragOver} onDrop={handleDrop} className='border-2 border-slate-400 border-dashed rounded-lg p-4  mt-4'>
             <Input id="image-upload" type="file" className="" ref={inputRef} onChange={handleImageFileChange}/>
             {
               !imageFIle ? (
               <Label  htmlFor="image-upload" className="flex flex-col items-center justify-center h-32 cursor-pointer" >
                <UploadCloudIcon className='w-10 h-10 text-muted-foreground mb-2 '/>
                <span>Drag & Drop or click to upload image </span>
               </Label> ) : (
                imageLoadingState ?
                <Skeleton className="h-10 bg-gray-600" /> :
               <div className='flex items-center justify-between'>
                  <div className='flex items-center'>
                        <FileIcon className='w-8 text-primary mr-2 h-8' />
                    </div> 
                    <p className='text-sm font-medium'>{imageFIle.name}</p>
                    <Button variant="ghost" className="text-muted-foreground hover:text-foreground" onClick={handleRemoveImage}>
                       <XIcon className='w-4 h-4' />
                       <span name="sr-only">Remove File</span>
                    </Button>
               </div>
               )
             }
        </div>
    </div>
  )
}

export default ProductImageUpload
