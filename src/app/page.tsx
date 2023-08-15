"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function Page(){
    const router = useRouter();
    router.push("/profile");

    return(
        <h1>hi</h1>
    );
}