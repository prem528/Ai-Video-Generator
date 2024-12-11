"use client";

import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Image from "next/image";

function CustomLoading({ loading }) {
  return (
    <div>
      <AlertDialog open={loading}>
        <AlertDialogContent className="bg-white">
          <AlertDialogTitle className="flex flex-col items-center justify-center">
            Generating video
          </AlertDialogTitle>
          <div className="bg-white flex flex-col items-center my-10 justify-center">
            <Image src="/loading.gif" alt="loading" height={100} width={400} />
            <h2>Please do not refresh the browser.</h2>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default CustomLoading;