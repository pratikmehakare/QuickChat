import React from "react";
import toast from "react-hot-toast";
import { deleteConversation, deleteMessages } from "../services/oprations/authApi";


const DeleteMessages = ({  onClose, title,description, action }) => {

    const handleDeleteMsg = async () => {
       if(await deleteMessages()) 
        {
          toast.success("Message Deleted..");
        }
        onClose(); 
    };

    const handleDeleteConv = async () =>{
        if(await deleteConversation())
        {toast.success("Conversation Deleted..");}
        onClose(); 
    }
  

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-gray-700 bg-opacity-40 flex justify-center items-center z-10">
      <div className="bg-white p-4 m-1 rounded w-full max-w-sm">
        <div>
          <h2 className="font-semibold">{title}</h2>
          <p className="text-sm mt-2">
           {description}
          </p>
        </div>

        <div className="flex gap-2 w-fit mt-4">
          <button
            onClick={onClose}
            className="border-primary border text-primary px-4 py-1 rounded hover:bg-primary hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={ action === "deleteMsg" ? handleDeleteMsg : handleDeleteConv }
            className="border-primary bg-primary text-white px-4 py-1 rounded hover:bg-white hover:text-primary hover:border"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(DeleteMessages);
