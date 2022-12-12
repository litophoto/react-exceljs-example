import XlsxPopulate from "xlsx-populate";
import axios from "axios";
import { saveAs } from 'file-saver'
import jszip from 'jszip'

const getWorkbook = async (url) => {
    const res = await axios.get(url, { responseType: 'arraybuffer' })
    const workbook = await XlsxPopulate.fromDataAsync(res.data)
    return workbook
}

const downloadWorkbook = async (workbook, fileName) => {
    const workbookOutput = await workbook.outputAsync()
    const blob = new Blob([workbookOutput], { type: "application/octet-stream" })
    saveAs(blob, fileName)
}

const downloadZippedWorkbook = async (workbooks, folderName) => {
    const zip = new zip()
    const zipFolder = zip.folder(folderName)
    for (const [workbook, fileName] of workbooks) {
        zipFolder.file(fileName, workbook)
    }
    zip.generateAsync({ type: "blob" }).then(
        blob => saveAs(blob, `${folderName}.zip`)
    )
}

const setDataToWorkbook = async (workbook, jsonMap) => {
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