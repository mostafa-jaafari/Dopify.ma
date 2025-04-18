'use client';
import { db } from "Firebase";
import { EmailAuthProvider, getAuth, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Check, DollarSign, Pen, Undo2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function ProfilePage(){
    const { data: session , update} = useSession();
    const Current_Email = session?.user?.email;
    const [UpdateInfos, setUpdateInfos] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phonenumber: '',
        country: '',
    });
    const [UpdatePassword, setUpdatePassword] = useState({
        prevpassword: '',
        newpassword: '',
    })
    const HandleChangeInputs = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if(name === 'prevpassword' || name === 'newpassword'){
            setUpdatePassword({...UpdatePassword, [name]: value});
        }else{
            setUpdateInfos({...UpdateInfos, [name]: value});
        }
    }
    const Hadle_Cancel_Updates_User_Data = () => {
        setUpdateInfos({
            firstname: '',
            lastname: '',
            email: '',
            phonenumber: '',
            country: '',
        })
    }
    const Handle_Save_Updates_User_Data = async () => {
        try{
            const DocRef = doc(db, 'users', Current_Email);
            const DocSnap = await getDoc(DocRef);
            if (!DocSnap.exists()) {
                return;
              }
              const existingData = DocSnap.data();
              const Updated_Inputs = Object.fromEntries(
                Object.entries(UpdateInfos)
                    .filter(([key, value]) => value.trim() !== '' && value !== existingData[key]) // تحقق من أن القيمة جديدة
                    .map(([key, value]) => [key, value])
            );
            if (Object.keys(Updated_Inputs).length > 0) {
                await updateDoc(DocRef, Updated_Inputs);
            }
        }catch(error){
            console.log(error);
        }
    }
    // --------- Update Password ----------
    const Hadle_Cancel_Update_Password = () => {
        setUpdatePassword({
            prevpassword: '',
            newpassword: '',
        })
    }
    const Handle_Save_Update_Password = async () => {
        try {
            const Auth = getAuth();
            const user = Auth.currentUser;
        
            if (user) {
              // إعادة التوثيق باستخدام بيانات المستخدم الحالية
              const credential = EmailAuthProvider.credential(user.email!, UpdatePassword.prevpassword); // استخدم كلمة المرور الحالية
        
              await reauthenticateWithCredential(user, credential); // إعادة التوثيق قبل تغيير كلمة المرور
              // تحديث كلمة المرور
              await updatePassword(user, UpdatePassword.newpassword);
            } else {
            }
          } catch (error) {
            console.error("Error updating password:", error);
          }
    }
    const [PrevImage, setPrevImage] = useState(null);
    const [SelectedFile, setSelectedFile] = useState(null);
    const HandleChooseFile = (e) => {
        const file = e.target.files[0];
        if(file){
            setSelectedFile(file);
            const URLImage = URL.createObjectURL(file);
            setPrevImage(URLImage);
        }
    }
        // Clean the Preview Image after change the file
        useEffect(() => {
            return () => {
                if(PrevImage){
                    URL.revokeObjectURL(PrevImage);
                }
            }
        }, [PrevImage])
    const HandleCancelUpploadImage = () => {
        setPrevImage(null);
        SelectedFile(null);
    }
    const [IsLoading, setIsLoading] = useState(false);
        // Import the file choosen from the user to the cloudinary then to firestore
        const HandleSaveUpdate = async () => {
            const formData = new FormData();
            formData.append("file", SelectedFile);
            formData.append("upload_preset", "Dopify.ma");
            formData.append("cloud_name", "dipa1pgem");
            const DocRef = doc(db, 'users', Current_Email);
            try{
                setIsLoading(true)
                const response = await fetch("https://api.cloudinary.com/v1_1/dipa1pgem/image/upload", {
                    method: "POST",
                    body: formData,
                  });
            
                const data = await response.json();
                await updateDoc(DocRef, {
                    profileimage: data.secure_url,
                })
                await update();
                alert('successfully');
            }catch(error){
            }finally{
                setPrevImage(null);
                setIsLoading(false);
            }
        }
    return (
        <main className="w-full space-y-8">
            <section className="w-full border border-neutral-300 rounded-lg 
                bg-white overflow-hidden shadow">
                <div className="w-full border-b border-neutral-200 py-2 px-4 bg-black text-white">
                    <h1 className="text-xl font-semibold">
                        Profile Information
                    </h1>
                    <p className="text-sm para-color">
                        Update your personal details here.
                    </p>
                </div>
                <div className="w-full flex justify-center py-4">
                    <div className="relative group shadow border-2 border-black 
                    bg-neutral-100 w-[200px] h-[200px] overflow-hidden 
                    rounded-full hover:opacity-80">
                        <Image 
                            src={session?.user?.image} 
                            alt="" 
                            fill 
                            className="object-cover"/>
                        <label 
                            onChange={HandleChooseFile} 
                            htmlFor="Uppload-Image" 
                            className="hover:bg-neutral-700 opacity-0 scale-x-0 
                            group-hover:scale-x-100 group-hover:opacity-100 
                            transition-all duration-200 absolute bottom-4 
                            right-12 z-40 text-sm font-semibold flex items-center 
                            gap-1 bg-neutral-800 border border-neutral-500 text-white py-1 px-2 rounded 
                            cursor-pointer">
                        <input 
                            type="file" 
                            id="Uppload-Image" 
                            className="hidden"
                        />
                            <Pen size={16}/> Edit
                        </label>
                    </div>
                </div>
                <section className="w-full p-4 flex flex-wrap">
                    {/* ------- First Name & Last Name -------  */}
                    <div className="w-full grid grid-cols-2 gap-2">
                        {/* ------- First Name -------  */}
                        <div className="flex flex-col">
                            <label 
                                htmlFor="FirstName"
                                className="text-sm cursor-pointer"
                            >
                                    First Name
                            </label>
                            <input 
                                onChange={HandleChangeInputs}
                                value={UpdateInfos.firstname}
                                type="text" 
                                name="firstname" 
                                id="FirstName"
                                className="border border-neutral-300 focus:border-black 
                                font-semibold rounded outline-none 
                                py-2 px-3"
                                />
                        </div>
                        {/* ------- Last Name -------  */}
                        <div className="flex flex-col">
                            <label 
                                htmlFor="LastName"
                                className="text-sm cursor-pointer"
                            >
                                    Last Name
                            </label>
                            <input 
                                onChange={HandleChangeInputs}
                                value={UpdateInfos.lastname}
                                type="text" 
                                name="lastname" 
                                id="LastName"
                                className="border border-neutral-300 focus:border-black 
                                font-semibold rounded outline-none 
                                py-2 px-3"
                                />
                        </div>
                    </div>
                    {/* ------- Email Address & Phone Number -------  */}
                    <div className="w-full grid grid-cols-2 gap-2">
                        {/* ------- Email Adress -------  */}
                        <div className="flex flex-col">
                            <label 
                                htmlFor="EmailAddress"
                                className="text-sm cursor-pointer"
                            >
                                    Email Address
                            </label>
                            <input 
                                onChange={HandleChangeInputs}
                                value={UpdateInfos.email}
                                type="email" 
                                name="email" 
                                id="EmailAddress"
                                className="border border-neutral-300 focus:border-black 
                                font-semibold rounded outline-none 
                                py-2 px-3"
                                />
                        </div>
                        {/* ------- Phone Number -------  */}
                        <div className="flex flex-col">
                            <label 
                                htmlFor="PhoneNumber"
                                className="text-sm cursor-pointer"
                            >
                                    Phone Number
                            </label>
                            <input 
                                onChange={HandleChangeInputs}
                                value={UpdateInfos.phonenumber}
                                type="number" 
                                name="phonenumber" 
                                id="PhoneNumber"
                                className="border border-neutral-300 focus:border-black 
                                font-semibold rounded outline-none 
                                py-2 px-3"
                                />
                        </div>
                    </div>
                    {/* ---------- County ------------ */}
                    <div className="w-full grid grid-cols-2 gap-2 py-2">
                            <select 
                                onChange={HandleChangeInputs}
                                value={UpdateInfos.country}
                                name="country" 
                                // id="Country"
                                className='py-2 border border-neutral-300 grow 
                                                                focus:border-black 
                                outline-none 
                                rounded-lg 
                                px-3'
                                >
                                <option value="morocco" selected>Morocco</option>
                                <option value="egypt">Egypt</option>
                                <option value="tunisia">Tunisia</option>
                                <option value="algeria">Algeria</option>
                            </select>
                    </div>
                </section>
                <div className="w-full flex gap-2 justify-end p-4">
                    <button 
                        onClick={Hadle_Cancel_Updates_User_Data} 
                        className="py-1 px-3 border border-neutral-400 rounded-lg
                        hover:bg-neutral-100 cursor-pointer">
                            Cancel
                    </button>
                    <button 
                        onClick={Handle_Save_Updates_User_Data} 
                        className="py-1 px-4 text-xl font-semibold bg-black 
                        rounded-lg text-white hover:bg-[#000000e3] cursor-pointer">
                            Save
                    </button>
                </div>
            </section>
            {/* --------- Update Password ---------- */}
            <section className="-full border overflow-hidden shadow border-neutral-300 rounded-lg bg-white">
                <div className="w-full bg-black text-white border-b border-neutral-200 py-2 px-4">
                    <h1 className="text-xl font-semibold">
                        Update Password
                    </h1>
                    <p className="text-sm para-color">
                        Update your password here.
                    </p>
                </div>
                {/* ------- Prev Password & New Password -------  */}
                <div className="w-full grid grid-cols-2 gap-2 px-4 py-2">
                    {/* ------- PrevPassword -------  */}
                    <div className="flex flex-col">
                        <label 
                            htmlFor="PrevPassword"
                            className="text-sm cursor-pointer"
                        >
                                Previous Password
                        </label>
                        <input 
                            onChange={HandleChangeInputs}
                            value={UpdatePassword.prevpassword}
                            type="password" 
                            name="prevpassword" 
                            id="PrevPassword"
                            className="border border-neutral-300 focus:border-black 
                            font-semibold rounded outline-none 
                            py-2 px-3"
                            />
                    </div>
                        {/* ------- New Password -------  */}
                    <div className="flex flex-col">
                        <label 
                            htmlFor="NewPassword"
                            className="text-sm cursor-pointer"
                        >
                                New Password
                        </label>
                        <input 
                            onChange={HandleChangeInputs}
                            value={UpdatePassword.newpassword}
                            type="password" 
                            name="newpassword" 
                            id="NewPassword"
                            className="border border-neutral-300 focus:border-black 
                            font-semibold rounded outline-none 
                            py-2 px-3"
                            />
                    </div>
                    </div>
                    <div className="w-full flex gap-2 justify-end p-4">
                    <button 
                        onClick={Hadle_Cancel_Update_Password} 
                        className="py-1 px-3 border border-neutral-400 rounded-lg
                        hover:bg-neutral-100 cursor-pointer">
                            Cancel
                    </button>
                    <button 
                        onClick={Handle_Save_Update_Password} 
                        className="py-1 px-4 text-xl font-semibold bg-black 
                        rounded-lg text-white hover:bg-[#000000e3] cursor-pointer">
                            Update
                    </button>
                </div>
            </section>
            {PrevImage !== null && (
                <section className="w-full h-screen flex justify-center items-center absolute right-0 top-0 bg-black/20 ">
                    <div className="w-[400px] rounded-lg border border-neutral-100 p-2 shadow bg-white">
                        <div className="relative w-full h-[400px] overflow-hidden rounded-lg">
                            <Image 
                                src={PrevImage} 
                                alt="" 
                                fill 
                                className="object-cover"/>
                        </div>
                        <div className="py-2 w-full flex gap-2 justify-end">
                            <button onClick={HandleCancelUpploadImage} className="py-1 px-2 rounded text-xl bg-neutral-100 
                                border border-neutral-300 hover:bg-neutral-200 cursor-pointer">Cancel</button>
                            <button 
                                disabled={IsLoading}
                                onClick={HandleSaveUpdate} 
                                className={`py-1 px-2 rounded text-xl text-white 
                                font-semibold ${IsLoading ? 'bg-black/60' : 'bg-black hover:bg-[#000000e3] cursor-pointer'}`}>
                                {IsLoading ? 'Loading...' : 'Update'}
                            </button>
                        </div>
                    </div>
                </section>
            )}
        </main>
    )
}