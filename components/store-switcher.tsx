'use client'

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useStoreModal } from "@/hooks/use-store-modal";
import { Store } from "@prisma/client"
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, PlusCircle, Store as StoreIcon} from "lucide-react";
import { cn } from "@/lib/utils";
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandSeparator } from "@/components/ui/command";



type PopOverTriggerPops = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface StoreSwitcherProps extends PopOverTriggerPops {
    items: Store[];

}

const StoreSwitcher = ({
    className, 
    items = []
} : StoreSwitcherProps) => {
    const storeModal = useStoreModal();
    const params = useParams()
    const router = useRouter()

    const formattedItems = items.map((item) => ({
        label: item.name,
        value: item.id
    }))

    const [open, setOpen] = useState(false)

    const currentStore = formattedItems.find((item) => item.value === params.storeId);

    const onStoreSelect = (store: {value:string, label:string}) => {
        setOpen(false)
        router.push(`/${store.value}`)
    }
  return (
    <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
            <Button 
                variant='outline'
                size='sm'
                role="combobox"
                aria-expanded={open}
                aria-label="Select a Store"
                className={cn("w-[200px] justify-between", className)}
            >
                <StoreIcon className="w-4 h-4 mr-2"/>
                {currentStore?.label}
                <ChevronsUpDown className="w-4 h-4 ml-auto opacity-50 shrink-0" />
            </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
            <Command>
                <CommandList>
                    <CommandInput placeholder="Search Store....." />
                    <CommandEmpty>No Store Found</CommandEmpty>
                    <CommandGroup heading="Stores">
                        {formattedItems.map((store) => (
                            <CommandItem
                            key={store.value}
                            onSelect={() => onStoreSelect(store)}
                            className="text-sm"
                            >
                                <StoreIcon className="w-4 h-4 mr-2" />
                                {store.label}
                                <Check className={cn("ml-auto h-4 w-4", currentStore?.value === store.value ? "opacity-100" : "opacity-0")} />
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>
                <CommandSeparator />
                <CommandList>
                    <CommandGroup>
                        <CommandItem
                         onSelect={() => {
                            setOpen(false)
                            storeModal.onOpen()
                         }}
                        >
                            <PlusCircle className="w-5 h-5 mr-2"/>
                            Create Store
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </Command>
            
        </PopoverContent>
    </Popover>
  )
}

export default StoreSwitcher