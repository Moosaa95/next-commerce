import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prisma from "@/lib/getDb";

// updating the store 
export async function PATCH(
    req: Request,
    {params} : {params: {storeId : string}}
){
    try {
        
        const {userId} = auth()
        const body = await req.json()

        const {name} = body 



        if (!userId) return new NextResponse("unauthenticated", {status:401})

        
        if (!name) return new NextResponse("Name is Required", {status:400})

        if (!params.storeId) return new NextResponse("Store Id is Required", {status:400})

        const store = await prisma.store.updateMany({
            where: {
                id: params.storeId,
                userId
            },
            data: {
                name
            }
        })
        
        return NextResponse.json(store)

    } catch (error) {
        console.log('STORE PATCH', error);
        return new NextResponse("internal error", {status: 500})
        
    }
}


export async function DELETE(
    req: Request,
    {params} : {params: {storeId : string}}
){
    try {
        
        const {userId} = auth()
        



        if (!userId) return new NextResponse("unauthenticated", {status:401})

        

        if (!params.storeId) return new NextResponse("Store Id is Required", {status:400})

        const store = await prisma.store.deleteMany({
            where: {
                id: params.storeId,
                userId
            }
        })
        
        return NextResponse.json(store)

    } catch (error) {
        console.log('STORE DELETE', error);
        return new NextResponse("internal error", {status: 500})
        
    }
}