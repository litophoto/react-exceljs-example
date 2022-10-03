import React from "react";
import ExcelJS from "exceljs";
import axios from "axios";

const ExcelOutputSample = () => {
  // const data = {};
  const onExport = async () => {
    const res = await axios.get(
      "/sample-v2.xlsx",
      { responseType: "arraybuffer" }
    );
    const data = new Uint8Array(res.data);
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(data);

    const items = [
      { id: 1001, name: "みかん", price: 180 },
      { id: 1002, name: "りんご", price: 210 },
      { id: 1003, name: "バナナ", price: 170 },
    ];
    // 各行のデータ（worksheet.columnsのkeyがオブジェクトのキーと同じになる）
    const worksheet = workbook.getWorksheet("Sheet1");
    worksheet.pageSetup = { orientation: "portrait" };
    const startRow = 2
    let iCount = 0;
    let row = worksheet.getRow(1);
    for (const item of items) {
      let pos = startRow + iCount;
      row = worksheet.getRow(pos);
      console.log(item);
      row.getCell(1).value = item.id;
      row.getCell(2).value = item.name;
      row.getCell(3).value = item.price;
      iCount += 1;
    }
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
