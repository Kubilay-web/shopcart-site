import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../globals.css";
import ChatIcon from "@/components/new/ChatIcon";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
      <ChatIcon />
      <Footer />
    </>
  );
}
