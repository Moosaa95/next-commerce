import prisma from "@/lib/getDb"

interface DashboardProps {
    params: {storeId: string};
}

const Dashboard: React.FC<DashboardProps> = async({
    params
}) => {
    // try {
        const store = await prisma.store.findFirst({
            where: {
                id: params.storeId
            }
        })
    // }catch(err){
    //     console.log('DASHBOARd err', err);
        
    // }
    return (
        <div>This is a dahboard

            Active store: {store?.name}
        </div>
    )
}
export default Dashboard