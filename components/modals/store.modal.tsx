"use client"

import { useStoreModal } from "@/hooks/use-store-modal"
import { Modal } from "@/components/ui/modal"

export const StoreModal = () => {
    const storeModal = useStoreModal()
    return (
        <Modal
            title="Create Store"
            description="Add New Store To manage categories and products"
            isOpen={storeModal.isOpen}
            onClose={storeModal.onClose}
        >
            Create Store

        </Modal>
    )
}