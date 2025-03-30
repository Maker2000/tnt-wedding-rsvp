import { cookies } from "next/headers";
import BottomNav from "../components/Nav/BottomNav";
import SideNav from "../components/Nav/SideNav";
import "./../admin.css";
import { CookieKey } from "../models/enums";
import { redirect } from "next/navigation";
export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let adminSession = await cookies().then((x) => {
    return x.get(CookieKey.adminToken);
  });
  if (!adminSession) return redirect("/login");
  return (
    <div className="h-full w-full">
      <div className="sm:ml-20 md:mb-20 mb-0">{children}</div>
      <SideNav />
      <BottomNav />
    </div>
  );
}
