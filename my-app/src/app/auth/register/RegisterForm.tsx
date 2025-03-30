'use client';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import Link from 'next/link';
import React, { useState } from 'react'
import { auth, db } from '../../../../Firebase';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function RegisterForm() {
    const [IsError, setIsError] = useState('');
    const [IsLoading, setIsLoading] = useState<boolean>(false);
    const [RegisterInputs, setRegisterInputs] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmpassword: '',
        country: 'Morocco',
        phonenumber: '',
    })

    const HandleChangeInputs = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { value, name } = e.target;
        setRegisterInputs({...RegisterInputs, [name]: value});
    }
    
    const HandleSubmitRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            setIsLoading(true);
            if(RegisterInputs.password !== RegisterInputs.confirmpassword){
                setIsError('Passwords do not match. Please try again.')
                return;
            }
            const DocRef = doc(db, 'users', RegisterInputs.email);
            const DocSnap = (await getDoc(DocRef));
            if(DocSnap.exists()){
                setIsError('User is already exists !');
                return;
            }
            await createUserWithEmailAndPassword(auth, RegisterInputs.email, RegisterInputs.password);
            await setDoc(DocRef, {
                firstname: RegisterInputs.firstname,
                lastname: RegisterInputs.lastname,
                email: RegisterInputs.email,
                password: RegisterInputs.password,
                phonenumber: RegisterInputs.phonenumber,
                country: RegisterInputs.country,
            })
            setIsError('Account created successfully.')
        }catch(error){
            if(error instanceof Error){
                if(error.message.includes('auth/email-already-in-use')){
                    setIsError('Email is already exists !');
                    return;
                }if(error.message.includes('auth/invalid-email')){
                    setIsError('Invalide Email !');
                    return;
                }if(error.message.includes('auth/weak-password')){
                    setIsError('Weak password, should be atleast 6 carachters');
                    return;
                }if(error.message.includes('auth/network-request-failed')){
                    setIsError('Failed ,check your internet');
                    return;
                }if(error.message.includes('auth/user-disabled')){
                    setIsError('Email is blocked right now !');
                    return;
                }
            }
        }finally{
            setIsLoading(false);
        }
    }
  return (
    <form  
        onSubmit={HandleSubmitRegister}
        className="max-w-[500px] w-full space-y-4 rounded-lg px-6 py-8 border border-neutral-700"        >
        {/* --------- First Name & Last Name --------- */}
        <section className='flex gap-2'>
            {/* --------- First Name --------- */}
            <div className='w-full relative flex flex-col'>
                <input 
                    onChange={HandleChangeInputs}
                    value={RegisterInputs.firstname}
                    type="text" 
                    name="firstname" 
                    id="FirstName" 
                    placeholder='' 
                    className='w-full peer border border-neutral-700 outline-none focus:border-[#009eb3] rounded-lg p-3'
                    required
                />
                <label 
                    htmlFor="FirstName"
                    className='absolute cursor-pointer left-3 bottom-10 transition-all bg-[#000000] px-1 text-neutral-500
                    peer-focus:bottom-10
                    peer-focus:text-[#009eb3]
                    peer-placeholder-shown:bottom-3'
                    >
                    First Name
                </label>
            </div>
            {/* --------- Last Name --------- */}
            <div className='w-full relative flex flex-col'>
                <input 
                    onChange={HandleChangeInputs}
                    value={RegisterInputs.lastname}
                    type="text" 
                    name="lastname" 
                    id="LastName" 
                    placeholder='' 
                    className='w-full peer border border-neutral-700 outline-none focus:border-[#009eb3] rounded-lg p-3'
                    required
                />
                <label 
                    htmlFor="LastName"
                    className='absolute cursor-pointer left-3 bottom-10 transition-all bg-[#000000] px-1 text-neutral-500
                    peer-focus:bottom-10
                    peer-focus:text-[#009eb3]
                    peer-placeholder-shown:bottom-3'
                    >
                    Last Name
                </label>
            </div>
        </section>
        {/* --------- Email --------- */}
        <section>
            <div className='relative flex flex-col'>
                <input 
                    onChange={HandleChangeInputs}
                    value={RegisterInputs.email}
                    type="email" 
                    name="email" 
                    id="EmailAddress" 
                    placeholder='' 
                    className='w-full peer border border-neutral-700 outline-none focus:border-[#009eb3] rounded-lg p-3'
                    required
                />
                <label 
                    htmlFor="EmailAddress"
                    className='absolute cursor-pointer left-3 bottom-10 transition-all bg-[#000000] px-1 text-neutral-500
                    peer-focus:bottom-10
                    peer-focus:text-[#009eb3]
                    peer-placeholder-shown:bottom-3'
                    >
                    Email Address
                </label>
            </div>
        </section>
        {/* --------- Password --------- */}
        <section>
            <div className='relative flex flex-col'>
                <input 
                    onChange={HandleChangeInputs}
                    value={RegisterInputs.password}
                    type="password" 
                    name="password" 
                    id="Password" 
                    placeholder='' 
                    className='w-full peer border border-neutral-700 outline-none focus:border-[#009eb3] rounded-lg p-3'
                    required
                />
                <label 
                    htmlFor="Password"
                    className='absolute cursor-pointer left-3 bottom-10 transition-all bg-[#000000] px-1 text-neutral-500
                    peer-focus:bottom-10
                    peer-focus:text-[#009eb3]
                    peer-placeholder-shown:bottom-3'
                    >
                    Password
                </label>
            </div>
        </section>
        {/* --------- Confirm Password --------- */}
        <section>
            <div className='relative flex flex-col'>
                <input 
                    onChange={HandleChangeInputs}
                    value={RegisterInputs.confirmpassword}
                    type="password" 
                    name="confirmpassword" 
                    id="ConfirmPassword" 
                    placeholder='' 
                    className='w-full peer border border-neutral-700 outline-none focus:border-[#009eb3] rounded-lg p-3'
                    required
                />
                <label 
                    htmlFor="ConfirmPassword"
                    className='absolute cursor-pointer left-3 bottom-10 transition-all bg-[#000000] px-1 text-neutral-500
                    peer-focus:bottom-10
                    peer-focus:text-[#009eb3]
                    peer-placeholder-shown:bottom-3'
                    >
                    Confirm Password
                </label>
            </div>
        </section>
        {/* --------- Country & Phone Number --------- */}
        <section className='w-full flex gap-2'>
            <select 
                onChange={HandleChangeInputs}
                value={RegisterInputs.country}
                name="country" 
                id="Country"
                className='grow border border-neutral-700 focus:text-[#009eb3] focus:border-[#009eb3] outline-none rounded-lg px-3'
                >
                <option value="morocco" selected>Morocco</option>
                <option value="egypt">Egypt</option>
                <option value="tunisia">Tunisia</option>
                <option value="algeria">Algeria</option>
            </select>
            <div className='relative flex flex-col'>
                <input 
                    onChange={HandleChangeInputs}
                    value={RegisterInputs.phonenumber}
                    type="number" 
                    name="phonenumber" 
                    id="PhoneNumber" 
                    placeholder='' 
                    className='w-full peer border border-neutral-700 outline-none focus:border-[#009eb3] rounded-lg p-3'
                    required
                />
                <label 
                    htmlFor="PhoneNumber"
                    className='absolute cursor-pointer left-3 bottom-10 transition-all bg-[#000000] px-1 text-neutral-500
                    peer-focus:bottom-10
                    peer-focus:text-[#009eb3]
                    peer-placeholder-shown:bottom-3'
                    >
                    Phone Number
                </label>
            </div>
        </section>
        {IsError && (
            <span className={`w-full flex items-center justify-start py-2 px-3 border rounded-lg space-x-2 
            ${IsError === 'Account created successfully.' ? 'bg-[#00ff0033] text-green-500 border-green-500' : 'bg-[#ff000020] text-red-500 border-red-500'}`}>
                {IsError === 'Account created successfully.' ? (
                    <CheckCircle className='text-green-500'/>
                ) : (
                    <AlertCircle className="w-5 h-5 text-red-500" />
                )}
                    <p className="font-semibold">{IsError}</p>
            </span>
        )}
        <button 
            type="submit"
            disabled={IsLoading}
            className='primary-button w-full'>
            {IsLoading ? 'Loading...' : 'Register'}
        </button>
        <span className="w-full flex justify-center gap-1">
                <p className="para-color">Already have an account ? </p>
                <Link 
                    href='/auth/login' 
                    className="primary-color font-semibold hover:underline">
                    Login
                </Link>
        </span>
    </form>
  )
}
