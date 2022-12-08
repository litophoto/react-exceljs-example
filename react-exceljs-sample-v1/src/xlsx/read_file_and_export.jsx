import axios from "axios";
import { useRef } from "react";
import { utils, writeFile, readFile, read } from "xlsx";

const ReadFileAndExport = () => {
  const tbl = useRef(null);
  const writeXlsx = async () => {
    const filename = "sample-v2.xlsx";
    const res = await axios.get("/sample-v2.xlsx", {
      responseType: "arraybuffer",
    });
    const wb = readFile(res.data);
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

export default ReadFileAndExport;
