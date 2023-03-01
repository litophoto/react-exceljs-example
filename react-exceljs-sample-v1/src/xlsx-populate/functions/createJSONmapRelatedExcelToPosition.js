// 没案definedNameが使えない場合は使ってもいいかもしれない

import { getWorkbook } from "./xlsxPopulateManager";

const createJSONmapRelatedExcelToPosition = async (excelFileUrl, prefix) => {
    // TODO: get workbook from excel file url
    const workbook = await getWorkbook(excelFileUrl)
    // TODO: search position from excel file
    // TODO: create json mapping

    
    const jsonMappping = {}
}