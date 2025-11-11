import { Suspense } from "react";
import HomePage from "@/components/HomePage";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen text-gray-600">
          Memuat halaman SAWALA...
        </div>
      }
    >
      <HomePage />
    </Suspense>
  );
}
