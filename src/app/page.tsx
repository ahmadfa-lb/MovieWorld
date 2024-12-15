"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Home: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to /page with query parameters for page=1
    router.replace("/page/1Home");
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center " role="status">
      <p className="w-16 h-16 border-4 border-slate-900 border-solid rounded-full animate-spin border-t-transparent"></p>
      <p className="">please wait....</p>
    </div>
  );
};

export default Home;


