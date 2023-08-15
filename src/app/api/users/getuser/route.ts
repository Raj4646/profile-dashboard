import { getTokenData } from "@/helpers/getTokenData";

import { NextRequest, NextResponse } from "next/server";
import User from "@/app/models/userModel";
import { connect } from "@/db/db";

connect();

export async function GET(request:NextRequest){

    try {
        const userId = await getTokenData(request);
        const user = await User.findOne({_id: userId}).select("-password");
        return NextResponse.json({
            user
        })
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 400});
    }

}