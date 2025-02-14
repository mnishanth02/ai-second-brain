import Footer from "./_lib/components/footer";
import { Header } from "./_lib/components/header";

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-1 flex-col">
      <Header />
      <main className="h-cover container">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
