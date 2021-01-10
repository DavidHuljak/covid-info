const prefix = "[CovidCR] ";

console.log(prefix + "Loaded!");

$(window).on("load", function () {
  var $preloader = $("#load-animation"),
    $spinner = $preloader.find(".text");
  $spinner.delay(750).fadeOut();
  $preloader.delay(750).fadeOut("slow");
});

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

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

function getBasicData() {
  fetch(
    `https://onemocneni-aktualne.mzcr.cz/api/v2/covid-19/zakladni-prehled.json`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      document.getElementById("PCRTests").innerHTML = formatNumber(
        data.data[0].provedene_testy_celkem
      );
      document.getElementById("newPCRTests").innerHTML =
        "+ " +
        formatNumber(data.data[0].provedene_testy_vcerejsi_den) +
        " za " +
        formatDate(data.data[0].provedene_testy_vcerejsi_den_datum);
      document.getElementById("ATests").innerHTML = formatNumber(
        data.data[0].provedene_antigenni_testy_celkem
      );
      document.getElementById("newATests").innerHTML =
        "+ " +
        formatNumber(data.data[0].provedene_antigenni_testy_vcerejsi_den) +
        " za " +
        formatDate(data.data[0].provedene_antigenni_testy_vcerejsi_den_datum);
      document.getElementById("cases").innerHTML = formatNumber(
        data.data[0].potvrzene_pripady_celkem
      );
      document.getElementById("newCases").innerHTML =
        "+ " +
        formatNumber(data.data[0].potvrzene_pripady_vcerejsi_den) +
        " za " +
        formatDate(data.data[0].potvrzene_pripady_vcerejsi_den_datum);
      document.getElementById("cures").innerHTML = formatNumber(
        data.data[0].vyleceni
      );
      document.getElementById("deaths").innerHTML = formatNumber(
        data.data[0].umrti
      );
      document.getElementById("update").innerHTML = formatDate(
        data.data[0].datum
      );
      console.log(prefix + "Displaying basic data.");
    });
}

function getCalculatdeData() {
  fetch(
    `https://onemocneni-aktualne.mzcr.cz/api/v2/covid-19/nakazeni-vyleceni-umrti-testy.json`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      var date = formatDate(data.data.slice(-1)[0].datum);

      var uzdraveni =
        data.data.slice(-1)[0].kumulativni_pocet_vylecenych -
        data.data.slice(-2)[0].kumulativni_pocet_vylecenych;

      var umrti =
        data.data.slice(-1)[0].kumulativni_pocet_umrti -
        data.data.slice(-2)[0].kumulativni_pocet_umrti;

      document.getElementById("newCures").innerHTML =
        "+ " + formatNumber(uzdraveni) + " za " + date;
      document.getElementById("newDeaths").innerHTML =
        "+ " + formatNumber(umrti) + " za " + date;
    });
}

function getRNumber() {
  fetch(
    `https://api.apify.com/v2/key-value-stores/DO0Mg4d1cPbWhtPSD/records/LATEST?disableRedirect=true`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      document.getElementById("rNumber").innerHTML =
        "Reprodukční číslo: <strong>" + data.data[0][2];
    });
}

getBasicData();
getCalculatdeData();
getRNumber();
