import { getWorkbook, downloadWorkbook, setDataToWorkbook } from "./functions/xlsxPopulateManager";
import { starterPokemons } from "./excel-data/starter-pokemon.v1";
const starterPokemon1stGeneration = starterPokemons["FirstGeneration"];

const url = "/sv-starter-pokemons.v1.xlsx";
const ExcelExportButton = () => {
  const onExport = async () => {
    const workbook = await getWorkbook(url);
    
    const firstPokemonWorkbook = await setDataToWorkbook(workbook, starterPokemon1stGeneration)
    await downloadWorkbook(firstPokemonWorkbook, "output.xlsx");
  };

  return <button onClick={onExport}>Export</button>;
};

export default ExcelExportButton;
