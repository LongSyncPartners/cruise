import React from "react";
import { Box, Typography } from "@mui/material";

export default function Page4({ data }) {
  const { page4 } = data;

  return (
    <Box>
      <Typography className="jp-text " mb={0.5}>
        4．特記事項
      </Typography>

      <Box className="jp-box" sx={{ padding: "4mm", height: "160mm" }}>
        <Typography
          className="jp-text"
          sx={{ whiteSpace: "pre-wrap", lineHeight: 1.35 }}
        >
          {page4.text}
        </Typography>
      </Box>
    </Box>
  );
}
