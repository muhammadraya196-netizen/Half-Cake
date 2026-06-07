import { CakeSlice } from "lucide-react";

export function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-11 w-11 place-items-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
        <CakeSlice size={24} />
      </div>
      <div>
        <p className="text-base font-black text-slate-950">Ray Cake POS</p>
        <p className="text-xs font-medium text-slate-500">Bakery retail suite</p>
      </div>
    </div>
  );
}
