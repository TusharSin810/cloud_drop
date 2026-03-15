import Navbar from "@/components/Navbar";
import VantaClouds from "@/components/VantaCouds";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <>
            <VantaClouds />
            <div className="relative z-10">
                <Navbar/>
                {children}
            </div>
        </>
  );
}
