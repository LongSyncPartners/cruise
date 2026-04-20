import { type SxProps, type Theme } from "@mui/material/styles";
import { type SystemStyleObject } from "@mui/system";
import { backdropClasses } from "@mui/material/Backdrop";

export const createStickyColumnSx = (widths: number[]): SystemStyleObject<Theme> => {
  const sx: SystemStyleObject<Theme> = {
    "& .sticky-col": {
      position: "sticky",
      zIndex: 999,
      backgroundColor: "#fff",
    },
    "& .MuiDataGrid-columnHeader.sticky-col": {
      zIndex: 999,
      backgroundColor: backdropClasses.root,
    },
    "& .MuiDataGrid-columnHeader": {
        paddingLeft: "10px",
    },
  };

  let currentLeft = 0;

  widths.forEach((width, index) => {
    sx[`& .sticky-col-${index}`] = {
      left: currentLeft,
    };
    currentLeft += width;
  });

  if (widths.length > 0) {
    sx[`& .sticky-col-${widths.length - 1}::after`] = {
      content: '""',
      position: "absolute",
      top: 0,
      right: 0,
      width: "1px",
      height: "100%",
      backgroundColor: "#d0d0d0",
    };
  }

  return sx;
};