function exportXLS({ contents, filename }) {
  const ws = XLSX.utils.json_to_sheet(contents);
  
  ws["!cols"] = [{ wch: 10 }, { wch: 20 }, { wch: 20 }];

  const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
  XLSX.writeFile(wb, filename + ".xlsx");
}

function importarXLS(data, headerAsColumn = true, type = "binary") {
  var workbook = XLSX.read(data, { type: type });
  var sheet_name_list = workbook.SheetNames;
  return XLSX.utils.sheet_to_json(
    workbook.Sheets[sheet_name_list[0]],
    headerAsColumn ? null : { header: 1 }
  );
}
