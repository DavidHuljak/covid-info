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
      document.getElementById("tests").innerHTML = formatNumber(
        data.data[0].provedene_testy_celkem
      );
      document.getElementById("newTests").innerHTML =
        "+ " +
        formatNumber(data.data[0].provedene_testy_vcerejsi_den) +
        " za " +
        formatDate(data.data[0].provedene_testy_vcerejsi_den_datum);
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
      var uzdraveni1 = data.data.slice(-1)[0].kumulativni_pocet_vylecenych;
      var uzdraveni2 = data.data.slice(-2)[0].kumulativni_pocet_vylecenych;

      var umrti1 = data.data.slice(-1)[0].kumulativni_pocet_umrti;
      var umrti2 = data.data.slice(-2)[0].kumulativni_pocet_umrti;

      var uzdraveni = uzdraveni1 - uzdraveni2;
      var umrti = umrti1 - umrti2;

      document.getElementById("newCures").innerHTML =
        "+ " + formatNumber(uzdraveni) + " za " + date;
      document.getElementById("newDeaths").innerHTML =
        "+ " + formatNumber(umrti) + " za " + date;
    });
}

getBasicData();
getCalculatdeData();
