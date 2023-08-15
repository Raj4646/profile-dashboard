import {connect} from "@/db/db";
import User from "@/app/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';

connect()


export async function POST(request: NextRequest){

    try {
        const reqBody = await request.json()
        const {name, email, password} = reqBody

        console.log(reqBody);

        const user = await User.findOne({email})

        if (user){
            return NextResponse.json({error: "user already exist"},
            {status: 400})
        }

        //hash pass
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash
        (password, salt)

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save()
        console.log(savedUser);

        return NextResponse.json({
            message: 'user created',
            succes: true,
            savedUser
        })
        
    } catch (error: any) {
        return NextResponse.json({error: error.message},
            {status: 500})
        
    }

}
    


