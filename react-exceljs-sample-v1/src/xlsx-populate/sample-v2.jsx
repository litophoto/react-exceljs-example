import { getWorkbook, downloadWorkbook } from "./functions/xlsxPopulateManager"


const url = '/sv-starter-pokemons.v1.xlsx'
const ExcelExportButton = () => {
    const onExport = async () => {
        const workbook = await getWorkbook(url)
        await downloadWorkbook(workbook, 'output.xlsx')
    }

    return <button onClick={onExport} >Export</button>
}

export default ExcelExportButton