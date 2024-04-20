import axios from "axios";
import { useEffect, useState } from "react";

interface BasicData {
  datum: string;
  umrti: number;
  vyleceni: number;
  potvrzene_pripady_celkem: number;
  potvrzene_pripady_vcerejsi_den: number;
  provedene_testy_celkem: number;
  provedene_testy_vcerejsi_den: number;
  provedene_antigenni_testy_celkem: number;
  provedene_antigenni_testy_vcerejsi_den: number;
  vykazana_ockovani_celkem: number;
  vykazana_ockovani_vcerejsi_den: number;
  aktualne_hospitalizovani: number;
  reinfekce_celkem: number;
  reinfekce_vcerejsi_den: number;
}

function formatNumber(num: number) {
  if (num === undefined) return "Načítání...";
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
}

function App() {
  const [basicData, setBasicData] = useState({} as BasicData);

  useEffect(() => {
    axios.get("https://api.huljak.cz/covid/stats").then((response) => {
      setBasicData(response.data[0]);
      console.log(response.data[0]);
    });
  }, []);

  const generateCard = (
    title: string,
    data: number,
    dataYesterday: number | null
  ) => {
    return (
      <div className="card">
        {title}:<div className="data">{formatNumber(data)}</div>
        {dataYesterday !== null && (
          <div className="data">
            + {formatNumber(dataYesterday)} za včerejší den
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <h1>COVID-19 - Česká republika</h1>
      <div className="wrapper">
        {generateCard(
          "PCR testy",
          basicData.provedene_testy_celkem,
          basicData.provedene_testy_vcerejsi_den
        )}
        {generateCard(
          "Antigenní testy",
          basicData.provedene_antigenni_testy_celkem,
          basicData.provedene_antigenni_testy_vcerejsi_den
        )}
        {generateCard(
          "Potvrzené případy",
          basicData.potvrzene_pripady_celkem,
          basicData.potvrzene_pripady_vcerejsi_den
        )}
        {generateCard(
          "Vykázaná očkování",
          basicData.vykazana_ockovani_celkem,
          basicData.vykazana_ockovani_vcerejsi_den
        )}
        {generateCard(
          "Reinfekce",
          basicData.reinfekce_celkem,
          basicData.reinfekce_vcerejsi_den
        )}

        {generateCard("Vyléčení", basicData.vyleceni, null)}
        {generateCard("Úmrtí", basicData.umrti, null)}
        {generateCard(
          "Hospitalizovaní",
          basicData.aktualne_hospitalizovani,
          null
        )}
      </div>
      <footer>
        <a href="https://onemocneni-aktualne.mzcr.cz/covid-19" target="_blank">
          Ministerstvo zdravotnictví ČR
        </a>
        <div>
          Aktualizace dat:{" "}
          <span>{new Date(basicData.datum).toLocaleDateString("cs-CZ")}</span>
        </div>
      </footer>
    </>
  );
}

export default App;
