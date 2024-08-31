import Navbar from "@/components/Header/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <div className="bg-red-300 w-[100-vh] h-[100vh]">
      <Navbar /> 
      <main>
        {children}
      </main>
    </div>
    </>
  );
}
