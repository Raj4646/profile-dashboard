"use client";
import React, {useState, useEffect} from "react";
import axios from "axios";


function Navbar() {
    const [user, setUser] = useState(null);
    
    const getUserDetails = async () => {
      const res = await axios.get('/api/users/getuser')
      setUser(res.data)
  }
    useEffect(() => {
        getUserDetails();
      }, []);
    

  return (
    <div className="border-solid border-[#cecece]  bg-white flex flex-row justify-end w-auto h-24 items-center pl-20 pr-12 border-t-0 border-b border-x-0 ">
      <div className="flex flex-row gap-4 items-center">
        <img
          src="https://file.rendit.io/n/Rd0ecr7N0GBxOxETggy5.svg"
          className="w-6 shrink-0"
          id="Notification"
        />
        <div className="border-solid border-[#e8eff7] bg-white/50 flex flex-row gap-3 w-64 items-center px-2 border rounded-lg">
          <div className="overflow-hidden bg-[#ffa78d] flex flex-col w-8 shrink-0 items-center rounded-lg">
            <img
              src="https://file.rendit.io/n/7U2msYDNjEA2fxm5elv3.png"
              className="w-8"
              id="Image1"
            />
          </div>
          <div className="flex flex-col w-2/3 my-2">
            <div className="text-xs font-['Poppins'] font-medium text-[#373b5c] h-[36.77%]">
              Welcome back,
            </div>
            <div className="text-lg font-['Poppins'] font-medium text-[#373b5c] h-[63.25%]">
              {user=== null ? "" : `${user.user.name}`}
            </div>
          </div>
          <img
            src="https://file.rendit.io/n/7ClBtaqbgV9kouBY7Nnq.svg"
            className="w-6 shrink-0"
            id="ArrowDown"
          />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
