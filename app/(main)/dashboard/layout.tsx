import SideNav from "../_lib/components/dashboard/side-nav";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex gap-24 pt-12">
      <SideNav />

      {children}
    </div>
  );
};

export default DashboardLayout;
