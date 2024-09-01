import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex h-screen w-full flex-row items-center justify-center text-2xl">
      <h2 className="font-thin">Carregando</h2>
      <Loader2 className="ml-2 h-6 w-6 animate-spin" />
    </div>
  );
}
