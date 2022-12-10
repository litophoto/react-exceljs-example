import XlsxPopulate from "xlsx-populate";
import axios from "axios";
import { saveAs } from 'file-saver'

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

export { getWorkbook, downloadWorkbook }