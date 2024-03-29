import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import prisma from "@/lib/getDb"

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

    return (
        <>
            <div>this will be nav</div>
            {children}
        </>
    )
}