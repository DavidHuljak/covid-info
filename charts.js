function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
}

function formatDate(num) {
  var a = new Date(num);
  var month = ("" + (a.getMonth() + 1)).slice(-2);
  var day = ("" + a.getDate()).slice(-2);
  var year = "" + a.getFullYear();
  return day + "." + month + ". " + year;
}

var getDaysInMonth = function (month, year) {
  return new Date(year, month, 0).getDate();
};

var month = getDaysInMonth(new Date().getMonth(), new Date().getFullYear());
monthPlus = month;
month = -month;

function createChart(id, title, name, type, xData, yData, color) {
  var chart = document.getElementById(id);
  var myChart = echarts.init(chart);
  var option = {
    tooltip: {
      trigger: "axis",
    },
    title: {
      left: "center",
      text: title,
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
        name: name,
        type: type,
        smooth: true,
        symbol: "none",
        sampling: "average",
        data: yData,
        itemStyle: {
          color: color,
        },
        areaStyle: {
          color: color,
        },
      },
    ],
  };
  myChart.setOption(option);
}

displayWeekTests();
displayWeekCases();
displayWeekCures();
displayWeekDeaths();
displayWeekRNumber();

function updatePeriod() {
  var select = document.getElementById("select");
  if (select.options[select.selectedIndex].value == "week") {
    displayWeekTests();
    displayWeekCases();
    displayWeekCures();
    displayWeekDeaths();
    displayWeekRNumber();
  } else if (select.options[select.selectedIndex].value == "month") {
    displayMonthTests();
    displayMonthCases();
    displayMonthCures();
    displayMonthDeaths();
    displayMonthRNumber();
  } else {
    displayAllTests();
    displayAllCases();
    displayAllCures();
    displayAllDeaths();
    displayAllRNumber();
  }
}
//tests charts

function displayWeekTests() {
  fetch(`https://onemocneni-aktualne.mzcr.cz/api/v2/covid-19/testy.json`)
    .then((response) => response.json())
    .then((data) => {
      var date = data.data.slice(-7).map(function (e) {
        return formatDate(e.datum);
      });

      var tests = data.data.slice(-7).map(function (e) {
        return e.prirustkovy_pocet_testu;
      });

      createChart(
        "testsChart",
        "Provedené testy",
        "Provedené testy",
        "line",
        date,
        tests,
        "darkred"
      );
    });
}

function displayMonthTests() {
  fetch(`https://onemocneni-aktualne.mzcr.cz/api/v2/covid-19/testy.json`)
    .then((response) => response.json())
    .then((data) => {
      var date = data.data.slice(month).map(function (e) {
        return formatDate(e.datum);
      });

      var tests = data.data.slice(month).map(function (e) {
        return e.prirustkovy_pocet_testu;
      });

      createChart(
        "testsChart",
        "Provedené testy",
        "Provedené testy",
        "line",
        date,
        tests,
        "darkred"
      );
    });
}

function displayAllTests() {
  fetch(`https://onemocneni-aktualne.mzcr.cz/api/v2/covid-19/testy.json`)
    .then((response) => response.json())
    .then((data) => {
      var date = data.data.map(function (e) {
        return formatDate(e.datum);
      });

      var tests = data.data.map(function (e) {
        return e.prirustkovy_pocet_testu;
      });

      createChart(
        "testsChart",
        "Provedené testy",
        "Provedené testy",
        "line",
        date,
        tests,
        "darkred"
      );
    });
}

//cases charts

function displayWeekCases() {
  fetch(`https://onemocneni-aktualne.mzcr.cz/api/v2/covid-19/nakaza.json`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      var date = data.data.slice(-7).map(function (e) {
        return formatDate(e.datum);
      });

      var cases = data.data.slice(-7).map(function (e) {
        return e.prirustkovy_pocet_nakazenych;
      });

      createChart(
        "casesChart",
        "Potvrzené případy",
        "Potvrzené případy",
        "line",
        date,
        cases,
        "darkred"
      );
    });
}

function displayMonthCases() {
  fetch(`https://onemocneni-aktualne.mzcr.cz/api/v2/covid-19/nakaza.json`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      var date = data.data.slice(month).map(function (e) {
        return formatDate(e.datum);
      });

      var cases = data.data.slice(month).map(function (e) {
        return e.prirustkovy_pocet_nakazenych;
      });

      createChart(
        "casesChart",
        "Potvrzené případy",
        "Potvrzené případy",
        "line",
        date,
        cases,
        "darkred"
      );
    });
}

function displayAllCases() {
  fetch(`https://onemocneni-aktualne.mzcr.cz/api/v2/covid-19/nakaza.json`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      var date = data.data.map(function (e) {
        return formatDate(e.datum);
      });

      var cases = data.data.map(function (e) {
        return e.prirustkovy_pocet_nakazenych;
      });

      createChart(
        "casesChart",
        "Potvrzené případy",
        "Potvrzené případy",
        "line",
        date,
        cases,
        "darkred"
      );
    });
}

//cures charts

function displayWeekCures() {
  fetch(
    `https://onemocneni-aktualne.mzcr.cz/api/v2/covid-19/nakazeni-vyleceni-umrti-testy.json`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      var date = data.data.slice(-7).map(function (e) {
        return formatDate(e.datum);
      });

      var cures = data.data.slice(-8).map(function (e) {
        return e.kumulativni_pocet_vylecenych;
      });

      var result = data.data.slice(-7).map(function (e, index) {
        return e.kumulativni_pocet_vylecenych - cures[index];
      });

      createChart(
        "curesChart",
        "Vyléčení",
        "Vyléčení",
        "line",
        date,
        result,
        "darkred"
      );
    });
}

function displayMonthCures() {
  fetch(
    `https://onemocneni-aktualne.mzcr.cz/api/v2/covid-19/nakazeni-vyleceni-umrti-testy.json`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      var date = data.data.slice(month).map(function (e) {
        return formatDate(e.datum);
      });

      var cures = data.data.slice(month - 1).map(function (e) {
        return e.kumulativni_pocet_vylecenych;
      });

      var result = data.data.slice(month).map(function (e, index) {
        return e.kumulativni_pocet_vylecenych - cures[index];
      });

      createChart(
        "curesChart",
        "Vyléčení",
        "Vyléčení",
        "line",
        date,
        result,
        "darkred"
      );
    });
}

function displayAllCures() {
  fetch(
    `https://onemocneni-aktualne.mzcr.cz/api/v2/covid-19/nakazeni-vyleceni-umrti-testy.json`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      var date = data.data.map(function (e) {
        return formatDate(e.datum);
      });

      var cures = data.data.slice(-data.data.length).map(function (e) {
        return e.kumulativni_pocet_vylecenych;
      });

      var result = data.data
        .slice(-data.data.length + 1)
        .map(function (e, index) {
          return e.kumulativni_pocet_vylecenych - cures[index];
        });

      createChart(
        "curesChart",
        "Vyléčení",
        "Vyléčení",
        "line",
        date,
        result,
        "darkred"
      );
    });
}

//deaths charts

function displayWeekDeaths() {
  fetch(
    `https://onemocneni-aktualne.mzcr.cz/api/v2/covid-19/nakazeni-vyleceni-umrti-testy.json`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      var date = data.data.slice(-7).map(function (e) {
        return formatDate(e.datum);
      });

      var deaths = data.data.slice(-8).map(function (e) {
        return e.kumulativni_pocet_umrti;
      });

      var result = data.data.slice(-7).map(function (e, index) {
        return e.kumulativni_pocet_umrti - deaths[index];
      });

      createChart(
        "deathsChart",
        "Umrtí",
        "Umrtí",
        "line",
        date,
        result,
        "darkred"
      );
    });
}

function displayMonthDeaths() {
  fetch(
    `https://onemocneni-aktualne.mzcr.cz/api/v2/covid-19/nakazeni-vyleceni-umrti-testy.json`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      var date = data.data.slice(month).map(function (e) {
        return formatDate(e.datum);
      });

      var deaths = data.data.slice(month - 1).map(function (e) {
        return e.kumulativni_pocet_umrti;
      });

      var result = data.data.slice(month).map(function (e, index) {
        return e.kumulativni_pocet_umrti - deaths[index];
      });

      createChart(
        "deathsChart",
        "Umrtí",
        "Umrtí",
        "line",
        date,
        result,
        "darkred"
      );
    });
}

function displayAllDeaths() {
  fetch(
    `https://onemocneni-aktualne.mzcr.cz/api/v2/covid-19/nakazeni-vyleceni-umrti-testy.json`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      var date = data.data.map(function (e) {
        return formatDate(e.datum);
      });

      var deaths = data.data.slice(-data.data.length).map(function (e) {
        return e.kumulativni_pocet_umrti;
      });

      var result = data.data
        .slice(-data.data.length + 1)
        .map(function (e, index) {
          return e.kumulativni_pocet_umrti - deaths[index];
        });

      createChart(
        "deathsChart",
        "Umrtí",
        "Umrtí",
        "line",
        date,
        result,
        "darkred"
      );
    });
}

//r number charts

function displayWeekRNumber() {
  fetch(
    `https://api.apify.com/v2/key-value-stores/DO0Mg4d1cPbWhtPSD/records/LATEST?disableRedirect=true`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      var date = data.data
        .slice(0, 7)
        .reverse()
        .map(function (e) {
          return formatDate(e[0]);
        });

      var rNumber = data.data
        .slice(0, 7)
        .reverse()
        .map(function (e) {
          return e[2];
        });

      createChart(
        "rChart",
        "Reprodukční číslo",
        "Reprodukční číslo",
        "line",
        date,
        rNumber,
        "darkred"
      );
    });
}

function displayMonthRNumber() {
  fetch(
    `https://api.apify.com/v2/key-value-stores/DO0Mg4d1cPbWhtPSD/records/LATEST?disableRedirect=true`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      var date = data.data
        .slice(0, monthPlus)
        .reverse()
        .map(function (e) {
          return formatDate(e[0]);
        });

      var rNumber = data.data
        .slice(0, monthPlus)
        .reverse()
        .map(function (e) {
          return e[2];
        });

      createChart(
        "rChart",
        "Reprodukční číslo",
        "Reprodukční číslo",
        "line",
        date,
        rNumber,
        "darkred"
      );
    });
}

function displayAllRNumber() {
  fetch(
    `https://api.apify.com/v2/key-value-stores/DO0Mg4d1cPbWhtPSD/records/LATEST?disableRedirect=true`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      var date = data.data.reverse().map(function (e) {
        return formatDate(e[0]);
      });

      var rNumber = data.data.map(function (e) {
        return e[2];
      });

      createChart(
        "rChart",
        "Reprodukční číslo",
        "Reprodukční číslo",
        "line",
        date,
        rNumber,
        "darkred"
      );
    });
}
