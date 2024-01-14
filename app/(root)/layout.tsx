import React from "react";
import prisma from "@/lib/getDb"
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
export default async function ({
    children
} : {children:React.ReactNode}){

    const {userId} = auth()

    if (!userId){
        redirect('/sign-in')
    }

    
    try {
        const store = await prisma.store.findFirst({
          where: {
            userId,
          },
        });
      
        console.log('find first', store);
      
        if (store) {
          redirect(`/${store.id}`);
        }
      } catch (error) {
        console.error('Error querying Prisma:', error);
        // Handle the error, redirect, or display an error message to the user.
      }
    return (
        <div>
            <h1>He POSH</h1>
            {children}
        </div>
    )
}