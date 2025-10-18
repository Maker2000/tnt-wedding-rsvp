import { cookies } from "next/headers";
import { CookieKey } from "../models/enums";
import { redirect } from "next/navigation";
import "./../admin.css";
import NavItemElement from "@/components/Nav/NavItemElement";
import { Add, Checklist } from "@mui/icons-material";
import { List, ListItem } from "@mui/material";
export default async function TimeRecordLayout({
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
      <div className="mb-20">{children}</div>
      <div className="fixed bottom-0 left-0 right-0 flex flex-row justify-around pb-4 bg-background h-20 pt-4">
        {[
          {
            icon: <Checklist />,
            route: "/time-record/records",
            title: "Records",
          },
          {
            icon: <Add />,
            route: "/time-record/add-record",
            title: "Add Record",
          },
        ].map((x, i) => (
          <NavItemElement key={i} item={x} />
        ))}
      </div>
    </div>
  );
}
