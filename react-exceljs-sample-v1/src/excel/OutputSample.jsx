import React from "react";
import ExcelJS from "exceljs";

const ExcelOutputSample = () => {
  // const data = {};
  const onExport = async () => {
    const workbook = new ExcelJS.Workbook();
    workbook.addWorksheet("Sheet Name");
    const worksheet = workbook.getWorksheet("Sheet Name");

    worksheet.columns = [
      { header: "ID", key: "id" },
      { header: "名前", key: "name" },
      { header: "値段", key: "price" },
    ];
    // 各行のデータ（worksheet.columnsのkeyがオブジェクトのキーと同じになる）
    worksheet.addRows([
      {
        id: 1,
        name: "りんご",
        price: 200,
      },
      {
        id: 2,
        name: "ぶとう",
        price: 150,
      },
      {
        id: 3,
        name: "ばなな",
        price: 180,
      },
    ]);

    const uint8Array = await workbook.xlsx.writeBuffer();
    const blob = new Blob([uint8Array], { type: "application/octet-binary" });
    // const download = "output.xlsx";
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sample.xlsx`;
    a.click();
    // ダウンロード後は不要なのでaタグを除去
    a.remove();
  };

  return (
    <>
      <h1>xl</h1>
      <hr />
      <button onClick={() => onExport()}>Out</button>
      <hr />
    </>
  );
};

export default ExcelOutputSample;
