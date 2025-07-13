import { CircularProgress } from "@mui/material";
import React from "react";

const FullScreenLoading = ({ message, isLoading }: { message: string; isLoading: boolean }) => {
  return (
    <div className={`absolute text-lg flex items-center justify-center flex-col w-full h-screen backdrop-blur-sm ${!isLoading ? "hidden" : "block"}`}>
      {message}
      <CircularProgress className="self-center text-primary m-2 " thickness={3} size={50} />
    </div>
  );
};
export const Loading = ({ message }: { message: string }) => {
  return (
    <div className={`flex items-center justify-center flex-col`}>
      {message}
      <CircularProgress className="self-center text-primary m-2 " thickness={3} size={50} />
    </div>
  );
};
export default FullScreenLoading;
