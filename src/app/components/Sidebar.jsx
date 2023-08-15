"use client";
import React from "react";
import Link from "next/link";
import axios from "axios";
import {useRouter} from "next/navigation";
import LoadingSpinner from '@/app/components/Loading'



function Sidebar() {
    const router = useRouter()
    const [isLoading, setIsLoading] = React.useState(false);
  
    const logout = async () => {
        try {
            setIsLoading(true)
            await axios.get('/api/users/logout')
            setIsLoading(false)
            router.push('/login')
        } catch (error) {
          setIsLoading(false)
            console.log(error.message);
        }
    }

  return (
    <>
    {isLoading ? <LoadingSpinner /> : ""}
    <div className="flex md:h-0">
      <aside className="w-80 absolute left-0 top-0 h-screen bg-white p-10 md:hidden">
        <div className="border-solid shadow-[0px_2px_2px_0px_rgba(0,_0,_0,_0.1)] overflow-hidden flex flex-col w-44 h-12 px-8 py-2 border-black/15 border rounded-lg">
          <div className="text-2xl font-['Outfit'] font-medium text-[rgba(34,_34,_34,_0.9)] mr-px">
            Dashboard
          </div>
        </div>

        <div className="flex mt-10 flex-row w-full" id="NewRootRoot">
          <img
            src="https://file.rendit.io/n/XTpAriCFq8wqWdeNvMnk.svg"
            className="w-4"
            id="ChevronrightRoot"
          />

          <div className="border-solid w-40  border-[#413b89] shadow-[0px_2px_2px_0px_rgba(0,_0,_0,_0.1)] overflow-hidden flex justify-center h-12 shrink-0 items-center border rounded-lg">
          
            <div className="whitespace-nowrap text-xl font-['Palatino_Linotype'] text-[#1a1558] ">
            <Link href={'/profile'}>My Profile</Link>
            </div>
          </div>
        </div>
        <div className="flex mt-5 flex-row w-full" id="NewRootRoot">
          <img
            src="https://file.rendit.io/n/XTpAriCFq8wqWdeNvMnk.svg"
            className="w-4 mr-1"
            id="ChevronrightRoot"
          />

          <div className="flex justify-center h-12 shrink-0 items-center ">
            <div className="whitespace-nowrap text-xl font-['Palatino_Linotype'] text-[#1a1558] ">
              <Link href={'/connections'}>My Connections</Link>
            </div>
          </div>
        </div>
      </aside>
        <div className=" md:top-9 md:right-0 md:left-4 md:relative cursor-pointer fixed left-24 bottom-6 whitespace-nowrap font-['Outfit'] font-medium text-lg text-[rgba(34,_34,_34,_0.9)] w-auto">
          <a onClick={logout}>Logout</a>
        </div>
    </div>
    </>
  );
}

export default Sidebar;
