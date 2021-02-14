function showData(number) {
  switch (number) {
    case 1:
      drawChart(
        `https://onemocneni-aktualne.mzcr.cz/api/v2/covid-19/testy.json`,
        -7,
        1,
        1,
        "Provedené PCR testy",
        "testsChart"
      );
      drawChart(
        `https://onemocneni-aktualne.mzcr.cz/api/v2/covid-19/testy-pcr-antigenni.json`,
        -7,
        1,
        2,
        "Provedené Antigenní testy",
        "ATestsChart"
      );
      drawChart(
        `https://onemocneni-aktualne.mzcr.cz/api/v2/covid-19/nakaza.json`,
        -7,
        1,
        3,
        "Potvrzené případy",
        "casesChart"
      );
      drawChart(
        `https://onemocneni-aktualne.mzcr.cz/api/v2/covid-19/nakazeni-vyleceni-umrti-testy.json`,
        -7,
        1,
        4,
        "Vyléčení",
        "curesChart"
      );
      drawChart(
        `https://onemocneni-aktualne.mzcr.cz/api/v2/covid-19/nakazeni-vyleceni-umrti-testy.json`,
        -7,
        1,
        5,
        "Umrtí",
        "deathsChart"
      );
      drawChart(
        `https://api.apify.com/v2/key-value-stores/DO0Mg4d1cPbWhtPSD/records/LATEST?disableRedirect=true`,
        7,
        2,
        7,
        "Reprodukční číslo",
        "rChart"
      );
      break;
    case 2:
      drawChart(
        `https://onemocneni-aktualne.mzcr.cz/api/v2/covid-19/testy.json`,
        -month,
        1,
        1,
        "Provedené PCR testy",
        "testsChart"
      );
      drawChart(
        `https://onemocneni-aktualne.mzcr.cz/api/v2/covid-19/testy-pcr-antigenni.json`,
        -month,
        1,
        2,
        "Provedené Antigenní testy",
        "ATestsChart"
      );
      drawChart(
        `https://onemocneni-aktualne.mzcr.cz/api/v2/covid-19/nakaza.json`,
        -month,
        1,
        3,
        "Potvrzené případy",
        "casesChart"
      );
      drawChart(
        `https://onemocneni-aktualne.mzcr.cz/api/v2/covid-19/nakazeni-vyleceni-umrti-testy.json`,
        -month,
        1,
        4,
        "Vyléčení",
        "curesChart"
      );
      drawChart(
        `https://onemocneni-aktualne.mzcr.cz/api/v2/covid-19/nakazeni-vyleceni-umrti-testy.json`,
        -month,
        1,
        5,
        "Umrtí",
        "deathsChart"
      );
      drawChart(
        `https://api.apify.com/v2/key-value-stores/DO0Mg4d1cPbWhtPSD/records/LATEST?disableRedirect=true`,
        month,
        2,
        7,
        "Reprodukční číslo",
        "rChart"
      );
      break;
    case 3:
      drawChart(
        `https://onemocneni-aktualne.mzcr.cz/api/v2/covid-19/testy.json`,
        null,
        1,
        1,
        "Provedené PCR testy",
        "testsChart"
      );
      drawChart(
        `https://onemocneni-aktualne.mzcr.cz/api/v2/covid-19/testy-pcr-antigenni.json`,
        null,
        1,
        2,
        "Provedené Antigenní testy",
        "ATestsChart"
      );
      drawChart(
        `https://onemocneni-aktualne.mzcr.cz/api/v2/covid-19/nakaza.json`,
        null,
        1,
        3,
        "Potvrzené případy",
        "casesChart"
      );
      drawChart(
        `https://onemocneni-aktualne.mzcr.cz/api/v2/covid-19/nakazeni-vyleceni-umrti-testy.json`,
        1,
        1,
        4,
        "Vyléčení",
        "curesChart"
      );
      drawChart(
        `https://onemocneni-aktualne.mzcr.cz/api/v2/covid-19/nakazeni-vyleceni-umrti-testy.json`,
        1,
        1,
        5,
        "Umrtí",
        "deathsChart"
      );
      drawChart(
        `https://api.apify.com/v2/key-value-stores/DO0Mg4d1cPbWhtPSD/records/LATEST?disableRedirect=true`,
        -1,
        2,
        7,
        "Reprodukční číslo",
        "rChart"
      );
  }
}

showData(1);

const select = document.getElementById("select");
select.addEventListener("change", () => {
  if (select.options[select.selectedIndex].value == "week") {
    showData(1);
    console.log(prefix + "Displaying week data.");
  } else if (select.options[select.selectedIndex].value == "month") {
    showData(2);
    console.log(prefix + "Displaying month data.");
  } else {
    showData(3);
    console.log(prefix + "Displaying all data.");
  }
});

function drawChart(fetchURL, slice, x, y, chartName, chartID) {
  fetch(fetchURL)
    .then((response) => response.json())
    .then((data) => {
      var xData;
      var yData;
      var result;

      switch (x) {
        case 1:
          xData = data.data.slice(slice).map(function (e) {
            return formatDate(e.datum);
          });
          break;
        case 2:
          xData = data.data
            .slice(0, slice)
            .reverse()
            .map(function (e) {
              return formatDate(e[0]);
            });
      }

      switch (y) {
        case 1:
          //PCR
          yData = data.data.slice(slice).map(function (e) {
            return e.prirustkovy_pocet_testu;
          });
          break;
        case 2:
          //Antigenne
          yData = data.data.slice(slice).map(function (e) {
            return e.pocet_AG_testy;
          });
          break;
        case 3:
          //Pripady
          yData = data.data.slice(slice).map(function (e) {
            return e.prirustkovy_pocet_nakazenych;
          });
          break;
        case 4:
          //Vylieceni
          result = data.data.slice(slice - 1).map(function (e) {
            return e.kumulativni_pocet_vylecenych;
          });

          yData = data.data.slice(slice).map(function (e, index) {
            return e.kumulativni_pocet_vylecenych - result[index];
          });
          break;
        case 5:
          //Umrti
          result = data.data.slice(slice - 1).map(function (e) {
            return e.kumulativni_pocet_umrti;
          });

          yData = data.data.slice(slice).map(function (e, index) {
            return e.kumulativni_pocet_umrti - result[index];
          });
          break;
        case 6:
          //TODO: Graf hospitalizovaných
          result = data.data.slice(slice - 1).map(function (e) {
            return e.pocet_hosp;
          });

          yData = data.data.slice(slice).map(function (e, index) {
            return e.pocet_hosp - result[index];
          });
          break;
        case 7:
          //Reprodukcni cislo
          yData = data.data
            .slice(0, slice)
            .reverse()
            .map(function (e) {
              return e[2];
            });
      }

      var chart = document.getElementById(chartID);
      var newChart = echarts.init(chart);
      var option = {
        tooltip: {
          trigger: "axis",
        },
        title: {
          left: "center",
          text: chartName,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: xData,
        },
        yAxis: {
          type: "value",
          boundaryGap: [0, "100%"],
        },

        series: [
          {
            name: chartName,
            type: "line",
            smooth: true,
            symbol: "none",
            sampling: "average",
            data: yData,
            itemStyle: {
              color: "darkred",
            },
            areaStyle: {
              color: "darkred",
            },
          },
        ],
      };
      newChart.setOption(option);
    });
}
