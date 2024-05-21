import {
  Carousel,
} from "@/components/ui/carousel"

export default function GubersList({ children }: { children: React.ReactNode }) {

  return (
    <Carousel
      opts={{
        align: "start",
        dragFree: true
      }}
      orientation="vertical"
      className="w-full max-w-xs"
    >
      {children}
    </Carousel>
  )
}