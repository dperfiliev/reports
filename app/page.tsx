import BgFixed from "@/components/bgfixed";
import Header from "@/components/header";
import Hero from "@/components/hero";
import Reports from "@/components/reports";
import Gubers from "@/components/gubers";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="">
        <BgFixed/>
      <div className="relative z-10 container mx-auto px-[15px] md:px-[50px]">
        <Header />
        <Hero />
        <Reports />
        <Gubers />
        <Footer />
      </div>
    </div>
  );
}
