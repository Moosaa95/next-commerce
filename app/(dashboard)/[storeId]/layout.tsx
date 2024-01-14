import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import prisma from "@/lib/getDb"
import Navbar from "@/components/navbar"

export default async function DashboardLayout({
    children, params
}: {
    children: React.ReactNode
    params: {storeId: string}
}) {
    const {userId} = auth()

    if (!userId){
        redirect("/sign-in")
    }

    console.log(params, 'para');
    
    try {

        const store = await prisma.store.findFirst({
        where: {
            id: params.storeId,
            userId
             }
        })

    console.log('store', store);
    

    if (!store){
        redirect('/')
    } 
    } catch (error) {
        console.log(error, '=======');
        
    }

    

    return (
        <>
            <Navbar />
            {children}
        </>
    )
}