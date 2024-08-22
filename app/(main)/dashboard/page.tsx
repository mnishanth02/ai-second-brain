import { FC } from "react";
import { redirect } from "next/navigation";

interface DashboardPageProps {}

const DashboardPage: FC<DashboardPageProps> = ({}) => {
  redirect("/dashboard/files");
};

export default DashboardPage;
