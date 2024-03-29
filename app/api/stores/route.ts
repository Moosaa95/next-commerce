import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prisma from "@/lib/getDb"


export async function POST(req:Request) {
    try {
        const {userId} = auth()
        const body = await req.json()

        const {name} = body
        if (!userId) {
            return new NextResponse("Unauthorized", {status:401})

        }

        if (!name) {
            return new NextResponse("name is required", {status: 400})
        }
        

        const store = await prisma.store.create({
            data: {
                name,
                userId
            }
        })

        console.log('STORE RESPONSE', store);
        

        return NextResponse.json(store)

    }
    catch(err){
        console.log('[STORES_POST]', err);
        return new NextResponse("Internal Error", {status: 500})
        
    } 
      
}