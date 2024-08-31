import Navbar from "@/components/Header/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <div className="w-full h-[100vh]">
      <Navbar /> 
      <main>
        {children}
      </main>
    </div>
    </>
  );
}
