"use client";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/app/components/Loading";

export default function ProfilePage() {
  const [isLoading, setIsLoading] = React.useState(false);
  
  
  const [user, setUser] = React.useState<any>("");
  const [nuser, setNuser] = React.useState({});

  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingNumber, setIsEditingNumber] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [isEditingSkills, setIsEditingSkills] = useState(false);
  const [isEditingCertifications, setIsEditingCertifications] = useState(false);

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/getuser");
    setUser(res.data);
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/users/updateuser", nuser);
      getUserDetails();
      setIsEditingName(false);
      setIsEditingNumber(false);
      setIsEditingEmail(false);
      setIsEditingAbout(false);
      setIsEditingCertifications(false);
      setIsEditingSkills(false);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      console.log("update failed", error.message);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getUserDetails();
    setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading ? <LoadingSpinner /> : ""}
      <div className="border-solid border-[#cecece]  bg-white flex flex-row justify-end w-auto h-24 items-center pl-20 pr-12 md:pr-2 border-t-0 border-b border-x-0 ">
        <div className="flex flex-row gap-4 items-center">
          <img
            src="https://file.rendit.io/n/Rd0ecr7N0GBxOxETggy5.svg"
            className="w-6 shrink-0"
            id="Notification"
          />
          <div className="border-solid border-[#e8eff7] bg-white/50 flex flex-row gap-3 w-64 md:w-auto items-center px-2 border rounded-lg">
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
                {user === "" ? "" : `${user.user.name}`}
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
      <div className="ml-80 md:ml-0 mt-4 relative border-solid  border-white overflow-hidden bg-[#1e2875] flex flex-col w-auto h-10 items-start py-3 border rounded-xl">
        <div className="ml-2 whitespace-nowrap text-xs font-['Outfit'] font-medium text-white w-16">
          MY PROFILE
        </div>
      </div>

      <div>
        <div className="ml-80 md:ml-0 border-solid border-[#ebebee] shadow-[0px_4px_5px_0px_rgba(0,_0,_0,_0.15)] bg-white flex md:flex-col flex-row gap-16 w-auto items-start pt-6 px-5 border-2 rounded-lg">
          <div className="flex flex-col mb-8 gap-4 w-1/2 md:w-full">
            <div className="flex flex-row justify-between items-center mb-px mr-2">
              <img
                src="https://file.rendit.io/n/Xbhs4xLyzPwAu9ltjMkx.png"
                className="w-24 shrink-0"
                id="Ellipse"
              />
              <div className="overflow-hidden bg-[#f0effa] flex flex-col w-18 shrink-0 h-5 px-6 rounded-[88.8888931274414px]">
                <div className="whitespace-nowrap text-xs font-['Outfit'] font-medium text-[rgba(31,_31,_31,_0.8)]">
                  Upload Photo
                </div>
              </div>
            </div>
            <div className="border-solid shadow-[0px_2px_2px_0px_rgba(0,_0,_0,_0.1)] overflow-hidden flex flex-row justify-between ml-1 items-center pb-3 px-3 border-black/15 border rounded">
              <div className="flex flex-col gap-2 h-auto items-start mt-4 mb-px">
                <div className="flex flex-col mb-2 gap-2 w-20">
                  <div className="whitespace-nowrap text-xs font-['Outfit'] font-medium text-[rgba(31,_31,_31,_0.7)] mr-6">
                    Your Name
                  </div>
                  <div className="whitespace-nowrap text-xs font-['Outfit'] font-medium text-[rgba(34,_34,_34,_0.9)]">
                    {user === '' ? "" : `${user.user.name}`}
                    {isEditingName ? (
                      <>
                        
                        <input
                          type="text"
                          className="break border p-1 ml-2 md:w-24"
                          placeholder="Enter your text"
                          onChange={(e) =>
                            setNuser({ ...user.user, name: e.target.value })
                          }
                        />
                        <button
                          onClick={handleSave}
                          className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 ml-2 rounded">
                          Save
                        </button>
                        <button
                          className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-1 px-2 ml-2 rounded"
                          onClick={() => setIsEditingName(false)}>
                          Cancel
                        </button>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="text-xs font-['Outfit'] font-medium text-[rgba(31,_31,_31,_0.7)] w-6">
                  Email
                </div>
                <div className="text-xs font-['Outfit'] font-medium text-[rgba(34,_34,_34,_0.9)] self-stretch mb-2">
                  {user === '' ? "" : `${user.user.email}`}
                  {isEditingEmail ? (
                    <>
                      <input
                        type="text"
                        className="border p-1 ml-2 md:w-24"
                        placeholder="Enter your text"
                        onChange={(e) =>
                          setNuser({ ...user.user, email: e.target.value })
                        }
                      />
                      <button
                        onClick={handleSave}
                        className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 ml-2 rounded">
                        Save
                      </button>
                      <button
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-1 px-2 ml-2 rounded"
                        onClick={() => setIsEditingEmail(false)}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <div className="flex flex-col gap-2 w-20">
                  <div className="whitespace-nowrap text-xs font-['Outfit'] font-medium text-[rgba(31,_31,_31,_0.7)] mr-3">
                    Phone Number
                  </div>
                  <div className="whitespace-nowrap text-xs font-['Outfit'] font-medium text-[rgba(34,_34,_34,_0.9)]">
                    {user === '' ? "" : `${user.user.ph_no}`}
                    {isEditingNumber ? (
                      <>
                        <input
                          type="text"
                          className="border p-1 ml-2 md:w-24"
                          placeholder="Enter your text"
                          onChange={(e) =>
                            setNuser({ ...user.user, ph_no: e.target.value })
                          }
                        />
                        <button
                          onClick={handleSave}
                          className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 ml-2 rounded">
                          Save
                        </button>
                        <button
                          className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-1 px-2 ml-2 rounded"
                          onClick={() => setIsEditingNumber(false)}>
                          Cancel
                        </button>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
              <div className="self-end flex flex-col justify-between w-10 shrink-0 h-32 items-center">
                <div className="overflow-hidden bg-[#f0effa] flex flex-col w-10 h-4 shrink-0 items-center rounded-[64.587158203125px]">
                  <div
                    onClick={() => setIsEditingName(true)}
                    className="text-xs font-['Outfit'] font-medium text-[rgba(31,_31,_31,_0.8)] ">
                    Edit
                  </div>
                </div>
                <div className="overflow-hidden bg-[#f0effa] flex flex-col w-10 h-4 shrink-0 items-center rounded-[64.587158203125px]">
                  <div
                    onClick={() => setIsEditingEmail(true)}
                    className="text-xs font-['Outfit'] font-medium text-[rgba(31,_31,_31,_0.8)] ">
                    Edit
                  </div>
                </div>
                <div className="overflow-hidden bg-[#f0effa] flex flex-col w-10 h-4 shrink-0 items-center rounded-[64.587158203125px]">
                  <div
                    onClick={() => setIsEditingNumber(true)}
                    className="text-xs font-['Outfit'] font-medium text-[rgba(31,_31,_31,_0.8)] ">
                    Edit
                  </div>
                </div>
              </div>
            </div>
            <div className="border-solid shadow-[0px_2px_2px_0px_rgba(0,_0,_0,_0.1)] overflow-hidden relative flex flex-col ml-1 border-black/15 border rounded">
              <div className="border-solid shadow-[0px_2px_2px_0px_rgba(0,_0,_0,_0.1)] overflow-hidden relative flex flex-col gap-3 h-auto shrink-0 mx-0 px-3 py-4 border-black/15 border rounded">
                <div className="flex flex-row justify-between items-center">
                  <div
                    className="whitespace-nowrap text-sm font-['Outfit'] font-medium text-[rgba(34,_34,_34,_0.9)]"
                    id="AboutVishnu5">
                    About
                    <div className="contents" id="AboutVishnu3">
                      {" "}
                    </div>
                    <div className="text-[#413b89] contents" id="AboutVishnu4">
                      {user === '' ? "" : `${user.user.name}`}
                    </div>
                  </div>
                  <div className="overflow-hidden bg-[#f0effa] flex flex-col w-10 shrink-0 h-4 items-center rounded-[64.587158203125px]">
                    <div onClick={() => setIsEditingAbout(true)}
                     className="text-xs font-['Outfit'] font-medium text-[rgba(31,_31,_31,_0.8)]">
                      Edit
                    </div>
                  </div>
                </div>
                <div className="text-xs font-['Outfit'] tracking-[0.11] text-[rgba(73,_69,_79,_0.8)]">
                  {user === '' ? "" : `${user.user.about}`}
                  {isEditingAbout ? (
                    <div>
                      <input
                        type="text"
                        className="border p-1"
                        onChange={(e) =>
                          setNuser({ ...user.user, about: e.target.value })
                        }
                      />
                      <button
                        className="bg-green-500 hover:bg-green-600 text-white py-1 px-2 ml-1 rounded"
                        onClick={handleSave}>
                        Save
                      </button>
                      <button
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-1 px-2 ml-1 rounded"
                        onClick={() => setIsEditingAbout(false)}>
                        Cancel
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            <div className="border-solid shadow-[0px_2px_2px_0px_rgba(0,_0,_0,_0.1)] overflow-hidden flex flex-row justify-between ml-1 items-center pt-4 px-3 border-black/15 border rounded">
              <div className="flex flex-col gap-4 w-12 shrink-0 h-auto mt-px mb-4">
                <div className="text-sm font-['Outfit'] font-medium text-[rgba(34,_34,_34,_0.9)] self-start mb-0 w-3/5">
                  Skills
                </div>
                <div className="text-xs font-['Outfit'] font-medium text-[rgba(34,_34,_34,_0.9)] mr-4">
                {user === '' ? "" : `${user.user.skills}`}
                  {isEditingSkills ? (
                    <div className="flex flex-row">
                      <input
                        type="text"
                        className="border p-1"
                        onChange={(e) =>
                          setNuser({ ...user.user, skills: e.target.value })
                        }
                      />
                      <button
                        className="bg-green-500 hover:bg-green-600 text-white py-1 px-2 ml-1 rounded"
                        onClick={handleSave}>
                        Save
                      </button>
                      <button
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-1 px-2 ml-1 rounded"
                        onClick={() => setIsEditingSkills(false)}>
                        Cancel
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="overflow-hidden bg-[#f0effa] self-start flex flex-col mt-px w-10 shrink-0 h-4 items-center rounded-[64.587158203125px]">
                <div onClick={() => setIsEditingSkills(true)}
                 className="text-xs font-['Outfit'] font-medium text-[rgba(31,_31,_31,_0.8)]">
                  Edit
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-1 gap-2 w-full">
            <div className="border-solid shadow-[0px_2px_2px_0px_rgba(0,_0,_0,_0.1)] overflow-hidden flex flex-row justify-start gap-6 h-24 shrink-0  mb-2 ml-0 border-black/15 border rounded-lg">
              <div className="flex flex-col gap-2 w-3/5 items-start">
                <div className="whitespace-nowrap text-xs font-['Outfit'] font-medium text-[rgba(34,_34,_34,_0.9)] w-auto ml-4 mt-4">
                  Professional Details
                </div>
                <div className="self-stretch relative flex flex-col">
                  <div className="w-auto text-xs font-['Outfit'] tracking-[0.11] text-[rgba(73,_69,_79,_0.8)] absolute top-0 ml-4 left-0">
                    This are the professional details shown to users in the app.
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-between items-center mb-1 ml-0 mr-2">
              <div className="text-xs font-['Outfit'] font-medium text-[rgba(34,_34,_34,_0.9)] w-16 shrink-0">
                Certifications
              </div>
              <div className="overflow-hidden bg-[#f0effa] flex flex-col w-10 shrink-0 h-4 items-center rounded-[64.587158203125px]">
                <div onClick={() => setIsEditingCertifications(true)}
                 className="text-xs font-['Outfit'] font-medium text-[rgba(31,_31,_31,_0.8)]">
                  Edit
                </div>
              </div>
            </div>
            <div className="border-solid border-[#cecece] overflow-hidden bg-white flex flex-row justify-start gap-12 items-center mb-6 mr-1 border rounded-[26.666658401489258px]">
              <div className="flex flex-col gap-1 w-3/5 items-start mt-1 mb-2 mr-0">
                <div className="text-xs font-['Outfit'] tracking-[0.12] text-[rgba(73,_69,_79,_0.8)] ml-2 w-10">
                {user === '' ? "" : `${user.user.certifications}`}
                  {isEditingCertifications ? (
                    <div className="flex flex-row">
                      <input
                        type="text"
                        className="border p-1"
                        onChange={(e) =>
                          setNuser({ ...user.user, certifications: e.target.value })
                        }
                      />
                      <button
                        className="bg-green-500 hover:bg-green-600 text-white py-1 px-2 ml-1 rounded"
                        onClick={handleSave}>
                        Save
                      </button>
                      <button
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-1 px-2 ml-1 rounded"
                        onClick={() => setIsEditingCertifications(false)}>
                        Cancel
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            {/* <div className="flex flex-row justify-between items-center mb-1 ml-0 mr-2">
              <div
                className="whitespace-nowrap text-xs font-['Outfit'] font-medium text-[rgba(34,_34,_34,_0.9)] w-12 shrink-0"
                id="Experience">
                {" "}
                Experience
              </div>
              <div className="overflow-hidden bg-[#f0effa] flex flex-col w-10 shrink-0 h-4 items-center rounded-[64.587158203125px]">
                <div className="text-xs font-['Outfit'] font-medium text-[rgba(31,_31,_31,_0.8)]">
                  Edit
                </div>
              </div>
            </div>
            <div className="border-solid shadow-[0px_2px_2px_0px_rgba(0,_0,_0,_0.1)] overflow-hidden relative flex flex-row justify-between pt-2 px-5 gap-4 items-center mb-1 ml-0 border-black/15 border rounded-lg">
              <div
                className="whitespace-nowrap text-xs font-['Outfit'] font-medium text-[rgba(34,_34,_34,_0.9)] self-start relative w-[172px]"
                id="YearsFulltime">
                7 Years
                {"  "}
                (2014-2021)
                {"                "}
                Full-time
              </div>
              <div className="w-48 text-xs font-['Outfit'] tracking-[0.11] text-[rgba(73,_69,_79,_0.8)] absolute top-6 left-3 h-3">
                Oruphones
                {"        "}
                -- Full Stack Developer
              </div>
              <img
                src="https://file.rendit.io/n/XMypEy5iGrBgv8gW9mk3.png"
                className="relative w-12 shrink-0 mt-1 mb-3"
                id="Image1"
              />
            </div>
            <div className="border-solid shadow-[0px_2px_2px_0px_rgba(0,_0,_0,_0.1)] overflow-hidden relative flex flex-row justify-between pt-2 px-5 gap-5 items-center mb-5 mr-0 border-black/15 border rounded-lg">
              <div
                className="whitespace-nowrap text-xs font-['Outfit'] font-medium text-[rgba(34,_34,_34,_0.9)] self-start relative w-40"
                id="MonthsIntern">
                6 months
                {"  "}
                (2014)
                {"                            "}
                Intern
              </div>
              <div className="w-48 text-xs font-['Outfit'] tracking-[0.11] text-[rgba(73,_69,_79,_0.8)] absolute top-6 left-3 h-3">
                Oruphones
                {"        "}
                -- Full Stack Developer
              </div>
              <img
                src="https://file.rendit.io/n/qmPQkfIueaxwngyxEU5M.png"
                className="relative w-12 shrink-0 mt-1 mb-3"
                id="Image2"
              />
            </div> */}
            {/* <div className="flex flex-row justify-between items-center ml-1 mr-3">
              <div className="text-xs font-['Outfit'] font-medium text-[rgba(34,_34,_34,_0.9)] w-12 shrink-0">
                Education
              </div>
              <div className="overflow-hidden bg-[#f0effa] flex flex-col w-10 shrink-0 h-4 items-center rounded-[64.587158203125px]">
                <div className="text-xs font-['Outfit'] font-medium text-[rgba(31,_31,_31,_0.8)]">
                  Edit
                </div>
              </div>
            </div> */}
            {/* <div
              className="border-solid border-[#cecece] shadow-[0px_3px_5px_0px_rgba(65,_59,_137,_0.1)] bg-white flex flex-col mr-0 gap-2 h-32 shrink-0 pt-3 pb-2 px-3 border rounded-lg"
              id="Review">
              <div
                className="whitespace-nowrap text-xs font-['Outfit'] font-medium tracking-[0.12] text-[#413b89] self-start mb-0 w-24"
                id="IITHYDERABAD">
                IIT
                {"  "}
                HYDERABAD
              </div>
              <div
                className="whitespace-nowrap text-xs font-['Outfit'] font-medium text-[rgba(34,_34,_34,_0.9)] ml-0 mr-6"
                id="Btech">
                {" "}
                (2010-2014)
                {"                                                    "}
                Btech
              </div>
              <div className="text-xs font-['Outfit'] tracking-[0.11] text-[rgba(73,_69,_79,_0.8)]">
                Lorem ipsum dolor sit amet consectetur. Erat auctor a aliquam
                vel congue luctus. Leo diam cras neque mauris ac arcu elit ipsum
                dolor sit amet consectetur.
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
