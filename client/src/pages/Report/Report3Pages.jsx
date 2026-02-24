import React from "react";
import { Paper } from "@mui/material";
import Page1 from "./Page1";
import Page2 from "./Page2";
import Page3 from "./Page3";
import Page4 from "./Page4";

export function Report3Pages({ data }) {
  return (
    <>
      <Paper className="print-page" elevation={0}><Page1 data={data} /><Page2 data={data} /></Paper>
      <Paper className="print-page break-before" elevation={0}><Page3 data={data} /></Paper>
      <Paper className="print-page break-before" elevation={0}><Page4 data={data} /></Paper>
    </>
  );
}
