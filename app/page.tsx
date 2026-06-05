import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className=" min-h-screen container mx-auto py-4 px-6 flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl">Sklep</h1>
      <Button>Przycisk</Button>
    </div>
  );
}
