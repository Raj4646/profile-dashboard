import {connect} from "@/db/db";
import { getTokenData } from "@/helpers/getTokenData";
import User from "@/app/models/userModel";
import { NextRequest, NextResponse } from "next/server";


connect()

export async function POST(request: NextRequest){

    try {
        const userId = await getTokenData(request);

        const reqBody = await request.json()

        // console.log(reqBody)
        
        // const { newData } = reqBody;

        const existingData = await User.findOne({_id: userId}).select("-password");

        // console.log(existingData)

        existingData.name = reqBody.name; // Update the specific field
        existingData.ph_no = reqBody.ph_no; // Update the specific field
        existingData.email = reqBody.email; // Update the specific field
        existingData.about = reqBody.about; // Update the specific field
        existingData.skills = reqBody.skills; // Update the specific field
        existingData.certifications = reqBody.certifications; // Update the specific field

        const savedData = await existingData.save();

        // console.log(savedData)

        return NextResponse.json({
            message: 'user updated',
            succes: true,
            savedData
        })
        
        } catch (error: any) {
        return NextResponse.json({error: error.message},
            {status: 500})
    }
}