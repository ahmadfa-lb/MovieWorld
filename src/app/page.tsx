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
    <div className="min-h-screen flex items-center justify-center">
      <p>Redirecting to the first page...</p>
    </div>
  );
};

export default Home;


