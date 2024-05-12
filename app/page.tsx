import Hero from "@/components/home/hero";
import Reports from "@/components/home/reports/reportsBuilder";
import Gubers from "@/components/home/gubers/gubers";

export default function Home() {

  return (
    <div>
      <Hero />
      <Reports />
      <Gubers />
    </div>
  );
}
