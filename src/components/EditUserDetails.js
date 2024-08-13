import React, { useEffect, useRef, useState } from 'react'
import Avatar from './Avatar'
import { updateUserData } from '../services/oprations/authApi';

const EditUserDetails = ({user,onClose}) => {
    const [data,setData] = useState({
        name : user?.user,
        profile_pic : user?.profile_pic ?  (user?.profile_pic ) : null
    })

    const uploadPhotoRef = useRef();

    useEffect(()=>{
        setData((prev)=>{
            return {
                ...prev,
                ...user
            }
        })
    },[user])
    

    const handleOnChange = (e) =>{
        const {name,value} = e.target

        setData((prev)=>{
            return {
                ...prev,
                [name] : value
            }
        })
    }

    // const handleUploadPhoto = async(e)=>{
    //     const file = e.target.files[0]

    //     const uploadPhoto = await uploadFile(file)

    //     setData((prev)=>{
    //         return{
    //             ...prev,
    //             profile_pic : uploadPhoto?.url
    //         }
    //     })
    // }

    const handleOpenUploadPhoto = async (e)=>{
        e.preventDefault()
        e.stopPropagation()
        uploadPhotoRef.current.click()
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()
        e.stopPropagation()
        const res=await updateUserData(data.name);

        if(res.success){
            onClose();
        }     
    }





  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 bg-gray-700 bg-opacity-40 flex justify-center items-center z-10'>
      <div className='bg-white p-4 m-1 rounded w-full max-w-sm'>
         <h2 className='font-semibold'>Profile Details</h2>
         <p className='text-sm'>Edit user Details</p>

         <form className='grid gap-3 mt-3' onSubmit={handleSubmit}>
            <div className='flex flex-col gap-1'>
                <label htmlFor='name'>Name:</label>
                <input
                    type='text'
                    name='name'
                    id='name'
                    value={data.name}
                    onChange={handleOnChange }
                    className='w-full py-1 px-2 focus:outline-primary border-0.5'
                />
            </div>
            <div>
                <div>Photo:</div>
                <div className='my-1 flex items-center gap-4'>
                    <Avatar 
                        width={40}
                        height={40}
                        imageUrl={data?.profile_pic}
                        name={data?.name}
                    />
                    <label htmlFor='profile_pic'>
                    <button className='font-semibold' onClick={handleOpenUploadPhoto}>
                        Change Photo
                    </button>
                    <input
                        type='file'
                        className='hidden'
                        id='profile_pic'
                        // onChange={handleUploadPhoto}
                        ref={uploadPhotoRef}
                    />
                    </label>
                </div>
            </div>
            <div className='flex gap-2 w-fit ml-auto mt-3'>
                <button onClick={onClose} className='border-primary border text-primary px-4 py-1 rounded hover:bg-primary hover:text-white'>Cancel</button>
                <button onSubmit={handleSubmit} className='border-primary bg-primary text-white px-4 py-1 rounded hover:bg-white hover:text-primary hover:border'>Save</button>
            </div>
         </form>
      </div>
    </div>
  )
}

export default React.memo(EditUserDetails)
