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

var month = getDaysInMonth(new Date().getMonth(), new Date().getFullYear());
monthPlus = month;
month = -month;

displayWeekTests();
displayWeekCases();
displayWeekCures();
displayWeekRNumber();

function updatePeriod() {
  var select = document.getElementById("select");
  if (select.options[select.selectedIndex].value == "week") {
    displayWeekTests();
    displayWeekCases();
    displayWeekRNumber();
  } else if (select.options[select.selectedIndex].value == "month") {
    displayMonthTests();
    displayMonthCases();
    displayMonthRNumber();
  } else {
    displayAllTests();
    displayAllCases();
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

      var cures1 = data.data.slice(-7).map(function (e) {
        return e.kumulativni_pocet_vylecenych;
      });

      // console.log(date);
      // console.log(cures);
      //console.log(cures - cures1);
    });
}

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
      console.log(monthPlus);
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
