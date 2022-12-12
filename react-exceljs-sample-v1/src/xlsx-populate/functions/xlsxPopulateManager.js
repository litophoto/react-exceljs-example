import XlsxPopulate from "xlsx-populate";
import axios from "axios";
import { saveAs } from 'file-saver'
import jszip from 'jszip'

const getWorkbook = async (url) => {
    // 外部urlからWorkbookを取得するかん関数
    const res = await axios.get(url, { responseType: 'arraybuffer' })
    const workbook = await XlsxPopulate.fromDataAsync(res.data)
    return workbook
}

const downloadWorkbook = async (workbook, fileName) => {
    // 一つのワークブックをダウンロードする関数
    // fileNameは.xlsxで終わるstring
    const workbookOutput = await workbook.outputAsync()
    const blob = new Blob([workbookOutput], { type: "application/octet-stream" })
    saveAs(blob, fileName)
}

const downloadZippedWorkbook = async (workbooks, folderName) => {
    const zip = new jszip()
    const zipFolder = zip.folder(folderName)
    // for (const [workbook, fileName] of workbooks) {
    //     zipFolder.file(fileName, workbook)
    // }
    zipFolder.file(workbooks[0][0], workbooks[0][1])
    zip.generateAsync({ type: "blob" }).then(
        blob => saveAs(blob, `${folderName}.zip`)
    )
}

const setDataToWorkbook = async (workbook, jsonMap) => {
    // データのマッピングを行うメイン機能
    for (const [key, value] of Object.entries(jsonMap)) {
        try {
            await workbook.definedName(key).value(value);
        } catch (e) {
            console.log(key)
        }
    }
    return workbook
}

export { getWorkbook, downloadWorkbook, downloadZippedWorkbook, setDataToWorkbook }