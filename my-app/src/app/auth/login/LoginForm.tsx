'use client';
import { signIn } from "next-auth/react"; // Correctly import signIn from NextAuth
import { SignInGoogle } from "@/Buttons/AuthButtons";
import Link from "next/link";
import React, { ChangeEvent, useState } from "react";
import { AlertCircle, CheckCircle } from "lucide-react";


export default function LoginForm() {
    const [LoginInputs, setLoginInputs] = useState({
        email: '',
        password: '',
    });
    const [IsError, setIsError] = useState('');
    const [IsLoading, setIsLoading] = useState(false);

    const HandleChangeInputs = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        setLoginInputs({ ...LoginInputs, [name]: value });
    }

    const HandleSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        setIsLoading(true);
        e.preventDefault();

        try {
            // Use NextAuth signIn method with credentials
            const result = await signIn("credentials", {
                redirect: true,
                email: LoginInputs.email,
                password: LoginInputs.password,
            });

            if (result?.error) {
                setIsError('Incorrect email or password.');
            } else {
                setIsError('Login Successfully.');
            }
        } catch (error) {
            console.error("Error during login:", error);
            setIsError('Login failed.');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form 
            onSubmit={HandleSubmitLogin}
            className="max-w-[500px] w-full space-y-2 rounded-lg px-6 pt-14 pb-7 border border-neutral-700"
        >
            {/* Email and Password inputs */}
            <div className="relative flex flex-col ">
                <input 
                    type="email" 
                    name="email" 
                    value={LoginInputs.email}
                    onChange={HandleChangeInputs}
                    id="Email" 
                    className="peer outline-none focus:border-[#009eb3] border border-neutral-700 p-3 rounded-lg"
                    required
                />
                <label 
                    htmlFor="Email"
                    className="absolute transition-all bottom-10 left-3 text-neutral-400 bg-[#000000] px-1 peer-focus:bottom-10 peer-focus:text-sm peer-focus:text-[#009eb3] peer-placeholder-shown:bottom-3 peer-placeholder-shown:text-md"
                >
                    Email Address
                </label>
            </div>

            <div className="relative flex flex-col">
                <input 
                    type="password" 
                    name="password" 
                    value={LoginInputs.password}
                    onChange={HandleChangeInputs}
                    id="Password" 
                    className="peer outline-none focus:border-[#009eb3] border border-neutral-700 p-3 rounded-lg"
                    required
                />
                <label 
                    htmlFor="Password"
                    className="absolute transition-all bottom-10 left-3 text-neutral-400 bg-[#000000] px-1 peer-focus:bottom-10 peer-focus:text-sm peer-focus:text-[#009eb3] peer-placeholder-shown:bottom-3 peer-placeholder-shown:text-md"
                >
                    Password
                </label>
            </div>

            {/* Error message */}
            {IsError && (
                <span className={`w-full flex items-center justify-start py-2 px-3 border rounded-lg space-x-2 ${IsError === 'Login Successfully.' ? 'bg-[#00ff0033] text-green-500' : 'bg-[#ff000020] text-red-500'}`}>
                    {IsError === 'Login Successfully.' ? (
                        <CheckCircle className='text-green-500'/>
                    ) : (
                        <AlertCircle className="w-5 h-5 text-red-500" />
                    )}
                    <p className="font-semibold">{IsError}</p>
                </span>
            )}

            {/* Submit Button */}
            <button 
                type="submit"
                disabled={IsLoading}
                className='primary-button w-full'
            >
                {IsLoading ? 'Loading...' : 'Login'}
            </button>

            {/* Links */}
            <span className="w-full flex justify-center gap-1">
                <p className="para-color">Don&apos;t have an account ? </p>
                <Link href='/auth/register' className="primary-color font-semibold hover:underline">Register</Link>
            </span>

            {/* Google Sign In Button */}
            <SignInGoogle />
        </form>
    )
}
