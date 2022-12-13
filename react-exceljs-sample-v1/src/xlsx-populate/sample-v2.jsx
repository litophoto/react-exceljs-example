import { getWorkbook, downloadWorkbook, setDataToWorkbook } from "./functions/xlsxPopulateManager";
import { starterPokemons } from "./excel-data/starter-pokemon.v1";
const starterPokemon1stGeneration = starterPokemons["FirstGeneration"];

import { downloadZippedWorkbook } from "./functions/xlsxPopulateManager";

const url = "/sv-starter-pokemons.v1.xlsx";
const ExcelExportButton = () => {
  const onExport = async () => {
    const workbook = await getWorkbook(url);
    
    const firstPokemonWorkbook = await setDataToWorkbook(workbook, starterPokemon1stGeneration)
    // await downloadWorkbook(firstPokemonWorkbook, "output.xlsx");
    await downloadZippedWorkbook([['file.xlsx', firstPokemonWorkbook]], 'sample-folder-name')
    // await downloadZippedWorkbook([firstPokemonWorkbook, "first-workbook-test.xlsx"], "output")
  };

  return <button onClick={onExport}>Export</button>;
};

export default ExcelExportButton;
