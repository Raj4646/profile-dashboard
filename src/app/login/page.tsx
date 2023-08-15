"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import LoadingSpinner from '@/app/components/Loading'


export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [message, setMessage] = React.useState('');
  
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      setIsLoading(true);
      onLogin();
    }
  }


  const onLogin = async () => {
    try {
      if(user.email==="" || user.password===""){
        setMessage('Email or Password cannot be blank')
      }
      else{
        setIsLoading(true);
        const response = await axios.post("/api/users/login", user);
        console.log('Login Successful');
        setIsLoading(false);
        router.push("/profile");
      }
    } catch (error: any) {
      if(error){
        setMessage('Invalid Credential')
        setIsLoading(false)
      }
      console.log("Login failed", error.message);
    }
  }
  

  return (
    <>
          {isLoading ? <LoadingSpinner /> : ""}
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className=" p-8 rounded-xl shadow-md w-80">
        <h2 className="text-2xl font-semibold mb-4 ">Login</h2>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={user.email}
              onChange={(e) => setUser({...user, email: e.target.value})}
              name="email"
              className="text-black w-full px-3 py-2 border rounded-sm"
              placeholder="Email address"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={user.password}
              onChange={(e) => setUser({...user, password: e.target.value})}
              name="password"
              className="text-black w-full px-3 py-2 border rounded-sm"
              placeholder="Password"
              onKeyDown={handleKeyDown}
            />
          </div>
          {message==='' ? "" : message}
          <button
            onClick={onLogin}
            className="w-full py-2 bg-blue-500 text-white rounded-sm hover:bg-blue-600 mb-2">
            Log In
          </button>
          <Link href={'/signup'}>Go to signup</Link>
      </div>
    </div>
    </>
  );
}
