'use client';
import Link from 'next/link';
import React from 'react'

export default function RegisterForm() {
  return (
    <main className='w-full px-20 pt-6 flex flex-col items-center'>
        <Link href='/' className='text-blue-600 font-bold text-3xl uppercase'>
            Dropify
        </Link>
        <h1 className='text-xl uppercase font-semibold'>Hey Welcome Back!</h1>
        <p>Register an account</p>
        <form className='w-full space-y-2 p-10 shadow-lg rounded-lg text-center'>
            <section className='flex gap-2'>
                <div className='w-full flex flex-col items-start'>
                    <label className='px-1 text-sm' htmlFor="FirstName">First Name</label>
                    <input type="text" id="FirstName" placeholder='FirstName' className='w-full border border-neutral-400 outline-none p-2 rounded-lg font-semibold placeholder:font-normal' required/>
                </div>
                <div className='w-full flex flex-col items-start'>
                    <label className='px-1 text-sm' htmlFor="FirstName">First Name</label>
                    <input type="text" id="FirstName" placeholder='FirstName' className='w-full border border-neutral-400 outline-none p-2 rounded-lg font-semibold placeholder:font-normal' required/>
                </div>
            </section>
            <div className='w-full flex flex-col items-start'>
                <label className='px-1 text-sm' htmlFor="EmailAddress">Email Address</label>
                <input type="email" id="EmailAddress" placeholder='Email Address' className='w-full border border-neutral-400 outline-none p-2 rounded-lg font-semibold placeholder:font-normal' required/>
            </div>
            <section className='flex items-end gap-2'>
                <select className='w-full outline-none h-12 rounded-lg border border-neutral-400 font-semibold' required>
                    <option value="" disabled selected>Select Country</option>
                    <option value="Morocco">Morocco</option>
                    <option value="Egypt">Egypt</option>
                    <option value="Tunisie">Tunisie</option>
                </select>
                <div className='w-full flex flex-col items-start'>
                    <label className='px-1 text-sm' htmlFor="PhoneNumber">Phone Number</label>
                    <input type="number" id="PhoneNumber" placeholder='Phone Number' className='w-full border border-neutral-400 outline-none p-2 rounded-lg font-semibold placeholder:font-normal' required/>
                </div>
            </section>
            <div className='w-full flex flex-col items-start'>
                <label className='px-1 text-sm' htmlFor="Password">Password</label>
                <input type="password" id="Password" placeholder='Password' className='w-full border border-neutral-400 outline-none p-2 rounded-lg font-semibold placeholder:font-normal' required/>
            </div>
            <div className='w-full flex flex-col items-start'>
                <label className='px-1 text-sm' htmlFor="ConfirmPassword">Confirm Password</label>
                <input type="password" id="ConfirmPassword" placeholder='Confirm Password' className='w-full border border-neutral-400 outline-none p-2 rounded-lg font-semibold placeholder:font-normal' required/>
            </div>
            <button className='py-2 w-full bg-blue-600 rounded-full text-neutral-100 font-semibold cursor-pointer'>Register</button>
        </form>
    </main>
  )
}
