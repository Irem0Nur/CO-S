import Navbar from "./Navbar";
import ChatBox from "./ChatBox";
import Footer from "./Footer";

type PageLayoutProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export default function PageLayout({
  title,
  description,
  children,
}: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-[#f7f5f2] text-[#2b2b2b]">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 pb-20 pt-32">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold">{title}</h1>
          <p className="mx-auto mt-3 max-w-2xl text-[#2b2b2b]/60">
            {description}
          </p>
        </div>

        {children}
      </main>

      <ChatBox />
      <Footer />
    </div>
  );
}