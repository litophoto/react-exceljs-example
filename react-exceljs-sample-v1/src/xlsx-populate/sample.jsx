import XlsxPopulate from "xlsx-populate";
import {Buffer} from 'buffer';
Buffer.from('anything','base64');
import axios from "axios";
import { saveAs } from 'file-saver'

const ExcelExporter = () => {
  const onExport = async () => {
    const url = '/sample-v2.xlsx'
    const res = await axios.get(url, { responseType: "arraybuffer" })
    XlsxPopulate.fromDataAsync(res.data).then((wb) => {
      wb.sheet("Sheet1").cell("A1").value("This is neat!")

      wb.outputAsync().then(function (blob) {
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          // If IE, you must uses a different method.
          window.navigator.msSaveOrOpenBlob(blob, "out.xlsx");
        } else {
          let url = window.URL.createObjectURL(blob);
          let a = document.createElement("a");
          document.body.appendChild(a);
          a.href = url;
          a.download = "out.xlsx";
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
        }
      });
    })
    // XlsxPopulate.fromBlankAsync().then((sb) => {
    //   // Modify the workbook.
    //   let workbook = getWorkbook('./sample-v2.xlsx')
    //   workbook = getWorksheet(workbook)
    //   workbook.sheet("Sheet1").cell("A1").value("This is neat!");

    //   // // Write to file.
    //   // return workbook.toFileAsync("./out.xlsx");
    //   workbook.outputAsync().then(function (blob) {
    //     if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    //       // If IE, you must uses a different method.
    //       window.navigator.msSaveOrOpenBlob(blob, "out.xlsx");
    //     } else {
    //       let url = window.URL.createObjectURL(blob);
    //       let a = document.createElement("a");
    //       document.body.appendChild(a);
    //       a.href = url;
    //       a.download = "out.xlsx";
    //       a.click();
    //       window.URL.revokeObjectURL(url);
    //       document.body.removeChild(a);
    //     }
    //   });
    // });
    // const workbook = getWorkbook('/sample-v2.xlsx')
    // downloadWorkbook(workbook, 'out.xlsx')
  };

  const onExportWithAsync = async () => {
    const url = '/sample-v2.xlsx'
    const res = await axios.get(url, { responseType: "arraybuffer" })
    const workbook = await XlsxPopulate.fromDataAsync(res.data)

    await workbook.sheet("Sheet1").cell("A1").value("This is neat!")

    const wbout = await workbook.outputAsync()
    const blob = new Blob([wbout], { type: "application/octet-stream" })
    saveAs(blob, 'output.xlsx')
  }

  const onExportByFunction = async () => {
    const url = '/sample-v2.xlsx'
    const workbook = await getWorkbook(url)

    await workbook.sheet("Sheet1").cell("A1").value("This is neat!")
    
    await downloadWorkbook(workbook, 'output.xlsx')
  }

  return (
    <>
      <button onClick={onExportByFunction}>Export</button>
    </>
  );
};

export default ExcelExporter;
