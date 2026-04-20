export const downloadCsvStub = async (fileName: string = "sample.csv") => {
    
  // fake delay 2s 
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const csvContent = [
    ["ID", "Name", "Age"],
    ["1", "XXXXX", "30"],
    ["2", "XXXXXXX", "25"],
  ]
    .map((row) => row.join(","))
    .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.setAttribute("download", fileName);
  document.body.appendChild(link);

  link.click();

  // cleanup
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};