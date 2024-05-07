import BgFixed from "@/components/bgfixed";
import Header from "@/components/header";
import Hero from "@/components/hero";
import Reports from "@/components/reports";

export default function Home() {
  return (
    <div className="">
        <BgFixed/>
      <div className="relative z-10 container mx-auto px-[15px] md:px-[50px]">
        <Header />
        <Hero />
        <Reports />
      </div>
    </div>
  );
}
