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
    name: "",
    email: "",
    password: "",
  });

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      setIsLoading(true);
      onSignup();
    }
  }


  const onSignup = async () => {
    try {
      if(user.email==="" || user.password==="" || user.name===""){
        setMessage('Email or Password or Name cannot be blank')
      }
      else{
        setIsLoading(true);
        const response = await axios.post("/api/users/signup", user);
        console.log('Signup Successful');
        setIsLoading(false);
        router.push("/login");
      }
    } catch (error: any) {
      if(error){
        setMessage('Error')
        setIsLoading(false)
      }
    }
  }
  

  return (
    <>
          {isLoading ? <LoadingSpinner /> : ""}
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className=" p-8 rounded-xl shadow-md w-80">
        <h2 className="text-2xl font-semibold mb-4 ">Signup</h2>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={user.name}
              onChange={(e) => setUser({...user, name: e.target.value})}
              name="name"
              className="text-black w-full px-3 py-2 border rounded-sm"
              placeholder="Name"
            />
          </div>
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
            onClick={onSignup}
            className="w-full py-2 bg-blue-500 text-white rounded-sm hover:bg-blue-600 mb-2">
            Sign up
          </button>
          <Link href={'/login'}>Go to Login</Link>
      </div>
    </div>
    </>
  );
}
