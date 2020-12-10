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
month = -month;

displayWeekTests();
displayWeekCases();
displayWeekCures();

function updatePeriod() {
  var select = document.getElementById("select");
  if (select.options[select.selectedIndex].value == "week") {
    displayWeekTests();
    displayWeekCases();
  } else if (select.options[select.selectedIndex].value == "month") {
    displayMonthTests();
    displayMonthCases();
  } else {
    displayAllTests();
    displayAllCases();
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

      var chart = document.getElementById("testsChart");
      var myChart = echarts.init(chart);
      var option = {
        tooltip: {
          trigger: "axis",
        },
        title: {
          left: "center",
          text: "Provedené testy",
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: date,
        },
        yAxis: {
          type: "value",
          boundaryGap: [0, "100%"],
        },

        series: [
          {
            name: "Provedené testy",
            type: "line",
            smooth: true,
            symbol: "none",
            sampling: "average",
            data: tests,
            itemStyle: {
              color: "darkred",
            },
            areaStyle: {
              color: "darkred",
            },
          },
        ],
      };
      myChart.setOption(option);
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

      var chart = document.getElementById("testsChart");
      var myChart = echarts.init(chart);
      var option = {
        tooltip: {
          trigger: "axis",
        },
        title: {
          left: "center",
          text: "Provedené testy",
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: date,
        },
        yAxis: {
          type: "value",
          boundaryGap: [0, "100%"],
        },

        series: [
          {
            name: "Provedené testy",
            type: "line",
            smooth: true,
            symbol: "none",
            sampling: "average",
            data: tests,
            itemStyle: {
              color: "darkred",
            },
            areaStyle: {
              color: "darkred",
            },
          },
        ],
      };
      myChart.setOption(option);
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

      var chart = document.getElementById("testsChart");
      var myChart = echarts.init(chart);
      var option = {
        tooltip: {
          trigger: "axis",
        },
        title: {
          left: "center",
          text: "Provedené testy",
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: date,
        },
        yAxis: {
          type: "value",
          boundaryGap: [0, "100%"],
        },

        series: [
          {
            name: "Provedené testy",
            type: "line",
            smooth: true,
            symbol: "none",
            sampling: "average",
            data: tests,
            itemStyle: {
              color: "darkred",
            },
            areaStyle: {
              color: "darkred",
            },
          },
        ],
      };
      myChart.setOption(option);
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

      var chart = document.getElementById("casesChart");
      var myChart = echarts.init(chart);
      var option = {
        tooltip: {
          trigger: "axis",
        },
        title: {
          left: "center",
          text: "Potvrzené případy",
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: date,
        },
        yAxis: {
          type: "value",
          boundaryGap: [0, "100%"],
        },

        series: [
          {
            name: "Potvrzené případy",
            type: "line",
            smooth: true,
            symbol: "none",
            sampling: "average",
            data: cases,
            itemStyle: {
              color: "darkred",
            },
            areaStyle: {
              color: "darkred",
            },
          },
        ],
      };
      myChart.setOption(option);
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

      var chart = document.getElementById("casesChart");
      var myChart = echarts.init(chart);
      var option = {
        tooltip: {
          trigger: "axis",
        },
        title: {
          left: "center",
          text: "Potvrzené případy",
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: date,
        },
        yAxis: {
          type: "value",
          boundaryGap: [0, "100%"],
        },

        series: [
          {
            name: "Potvrzené případy",
            type: "line",
            smooth: true,
            symbol: "none",
            sampling: "average",
            data: cases,
            itemStyle: {
              color: "darkred",
            },
            areaStyle: {
              color: "darkred",
            },
          },
        ],
      };
      myChart.setOption(option);
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

      var chart = document.getElementById("casesChart");
      var myChart = echarts.init(chart);
      var option = {
        tooltip: {
          trigger: "axis",
        },
        title: {
          left: "center",
          text: "Potvrzené případy",
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: date,
        },
        yAxis: {
          type: "value",
          boundaryGap: [0, "100%"],
        },

        series: [
          {
            name: "Potvrzené případy",
            type: "line",
            smooth: true,
            symbol: "none",
            sampling: "average",
            data: cases,
            itemStyle: {
              color: "darkred",
            },
            areaStyle: {
              color: "darkred",
            },
          },
        ],
      };
      myChart.setOption(option);
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

      // console.log(date);
      // console.log(cures);
    });
}
