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
            <section className="grid gap-2 grid-cols-3 border 
                border-neutral-200 rounded-lg bg-white p-2">
                {/* ------- Total Earnings -------  */}
                <div className="w-full rounded-lg flex items-center gap-4 bg-green-600/10 p-2">
                    <div className="rounded-full flex-shrink-0 border border-green-600 w-max p-1">
                        <DollarSign className="text-green-600" size={30}/>
                    </div>
                    <span className="text-xl">
                        <p>Total Earnings</p>
                        <b>0$</b>
                    </span>
                </div>
                {/* ------- Confirmed Orders -------  */}
                <div className="w-full rounded-lg flex items-center gap-4 bg-violet-600/10 p-2">
                    <div className="rounded-full flex-shrink-0 border border-violet-600 w-max p-1">
                        <Check className="text-violet-600" size={30}/>
                    </div>
                    <span className="text-xl">
                        <p>Confirmed Orders</p>
                        <b>0</b>
                    </span>
                </div>
                {/* ------- Return Orders -------  */}
                <div className="w-full rounded-lg flex items-center gap-4 bg-red-600/10 p-2">
                    <div className="rounded-full flex-shrink-0 border border-red-600 w-max p-1">
                        <Undo2 className="text-red-600" size={30}/>
                    </div>
                    <span className="text-xl">
                        <p>Return Orders</p>
                        <b>0</b>
                    </span>
                </div>
            </section>
            <section className="w-full border border-neutral-300 rounded-lg 
                bg-white overflow-hidden shadow-lg">
                <div className="w-full border-b border-neutral-200 py-2 px-4 bg-blue-100">
                    <h1 className="text-xl font-semibold">
                        Profile Information
                    </h1>
                    <p className="text-sm para-color">
                        Update your personal details here.
                    </p>
                </div>
                <div className="w-full flex justify-center py-4">
                    <div className="relative group shadow border-2 border-neutral-400 bg-neutral-100 w-[200px] h-[200px] overflow-hidden rounded-full">
                        <Image src={session?.user?.image} alt="" fill className="object-cover"/>
                        <label 
                            onChange={HandleChooseFile} 
                            htmlFor="Uppload-Image" 
                            className="hover:bg-neutral-700 opacity-0 scale-x-0 group-hover:scale-x-100 group-hover:opacity-100 transition-all duration-200 absolute bottom-4 right-12 z-40 text-sm font-semibold 
                            flex items-center gap-1 bg-neutral-800 text-white py-1 px-2 rounded cursor-pointer">
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
                                className="border border-neutral-300 focus:border-blue-600 
                                focus:text-blue-600 font-semibold rounded outline-none 
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
                                className="border border-neutral-300 focus:border-blue-600 
                                focus:text-blue-600 font-semibold rounded outline-none 
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
                                className="border border-neutral-300 focus:border-blue-600 
                                focus:text-blue-600 font-semibold rounded outline-none 
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
                                className="border border-neutral-300 focus:border-blue-600 
                                focus:text-blue-600 font-semibold rounded outline-none 
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
                                focus:text-blue-600
                                focus:border-blue-600 
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
                        className="py-1 px-4 text-xl font-semibold bg-[#1c44f5] 
                        rounded-lg text-white hover:bg-[#1c44f5e3] cursor-pointer">
                            Save
                    </button>
                </div>
            </section>
            {/* --------- Update Password ---------- */}
            <section className="-full border overflow-hidden shadow-lg border-neutral-300 rounded-lg bg-white">
                <div className="w-full bg-blue-100 border-b border-neutral-200 py-2 px-4">
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
                            className="border border-neutral-300 focus:border-blue-600 
                            focus:text-blue-600 font-semibold placeholder-shown:border-
                            blue-500 rounded outline-none py-2 px-3"
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
                            className="border border-neutral-300 focus:border-blue-600 
                            focus:text-blue-600 font-semibold rounded outline-none 
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
                        className="py-1 px-4 text-xl font-semibold bg-[#1c44f5] 
                        rounded-lg text-white hover:bg-[#1c44f5e3] cursor-pointer">
                            Update
                    </button>
                </div>
            </section>
            {PrevImage !== null && (
                <section className="w-full h-screen flex justify-center items-center absolute right-0 top-0 bg-blue-500/20 ">
                    <div className="w-[400px] rounded-lg border border-neutral-100 p-2 shadow-lg bg-white">
                        <div className="relative w-full h-[400px] overflow-hidden rounded-lg">
                            <Image src={PrevImage} alt="" fill className="object-cover"/>
                        </div>
                        <div className="py-2 w-full flex gap-2 justify-end">
                            <button onClick={HandleCancelUpploadImage} className="py-1 px-2 rounded text-xl bg-neutral-100 
                                border border-neutral-300 hover:bg-neutral-200 cursor-pointer">Cancel</button>
                            <button 
                                disabled={IsLoading}
                                onClick={HandleSaveUpdate} 
                                className={`py-1 px-2 rounded text-xl text-white 
                                font-semibold ${IsLoading ? 'bg-blue-600/60' : 'bg-[#1c44f5] hover:bg-[#1c44f5e3] cursor-pointer'}`}>
                                {IsLoading ? 'Loading...' : 'Update'}
                            </button>
                        </div>
                    </div>
                </section>
            )}
        </main>
    )
}