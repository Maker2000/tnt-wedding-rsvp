"use client";
import Header from "@/app/components/Header";
import React, { useEffect } from "react";
import { useGuestsHook } from "./guests.hook";
import { AgGridReact } from "ag-grid-react";
import { useRouter } from "next/navigation";

function Guests() {
  const hook = useGuestsHook();
  const router = useRouter();
  useEffect(() => {
    hook.fetchGuests();
  }, []);

  return (
    <Header title="Guests">
      <div className="h-full ag-theme-quartz ag-theme-custom">
        <AgGridReact
          pagination={true}
          paginationPageSize={20}
          onRowClicked={(e) => {
            router.push(`/admin/guests/${e.data?.id}`);
          }}
          // gridOptions={{
          //   autoSizeStrategy: {
          //     type: "fitGridWidth",
          //     defaultMinWidth: 100,
          //   },
          // }}
          rowData={hook.state.guests}
          columnDefs={hook.state.colDefs}
          // getContextMenuItems={hook.getContextMenuItems}
        />
      </div>
    </Header>
  );
}

export default Guests;
