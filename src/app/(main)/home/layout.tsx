import Navbar from "@/components/Header/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <div className="relative bg-gray-500 w-[100vw] h-screen overflow-hidden">
      <Navbar /> 
      <main className="pt-[72px]">
        {children}
      </main>
    </div>
    </>
  );
}
