import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"


export default function GubersListScroll({ children }: { children: React.ReactNode }) {
    return (
        <ScrollArea type="always" classNameViewport="gubers-scroll" className="">
            <div className="mb-8 flex">
                {children}
            </div>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    )
}