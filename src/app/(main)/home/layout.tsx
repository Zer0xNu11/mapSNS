import Navbar from "@/components/Header/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <body> 
      <Navbar />   
        {children}
      </body>
  );
}
