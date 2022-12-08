import { useRef } from "react";
import { utils, writeFile } from 'xlsx'

const ReactTable = () => {
  const tbl = useRef(null);
  const writeXlsx = () => {
    const wb = utils.table_to_book(tbl.current);
    writeFile(wb, "ReactTable.xlsx");
  };

  return (
    <>
      <button onClick={writeXlsx}>Export</button>
      <table ref={tbl}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Apple</td>
            <td>2</td>
          </tr>
          <tr>
            <td>2</td>
            <td>りんご</td>
            <td>200</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default ReactTable;
