import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import prisma from "@/lib/getDb"
import SettingsForm from "./components/settings-form"

interface SettingsProps {
    params: {
        storeId: string
    }
}

const Settings:React.FC<SettingsProps> = async({params}) => {

    const {userId} = auth()

    if (!userId) {
        redirect('/sign-in')

    }

    const store = await prisma.store.findFirst({
        where: {
            id: params.storeId,
            userId
        }
    })

    console.log('stoaras', store);
    

    if (!store){
        redirect('/')
    }

    

  return (
    <div className="flex-col">
        <div className="flex-1 p-6 space-y-4">
            <SettingsForm initialData={store} />
        </div>
    </div>
  )
}

export default Settings