/* global angular */
var myApp = angular.module('myApp', [])
myApp.controller('Controller', function ($scope, $http, $interval) {
  $scope.message = 'Hello AngularJS'

  $http.get('./data')
    .then(function (res) {
      $scope.wifidata = res.data
      console.log(res.data)

      // function dataBar () {
      //   var dataArray = []
      //   var labelsArray = []
      //   $scope.wifidata.forEach(function (err, data) {
      //     var ndata = {
      //       rssi: 2 * ($scope.wifidata[data].rssi + 100),
      //       ssid: $scope.wifidata[data].ssid
      //     }
      //     dataArray.push(ndata.rssi)
      //     labelsArray.push(ndata.ssid)
      //   })
      //   return {da: dataArray, label: labelsArray}
      // }
      //
      // var barData = {
      //   labels: dataBar().label,
      //   datasets: [
      //     {
      //       label: 'test',
      //       fillColor: 'rgba(255,255,0,0.6)',
      //       strokeColor: 'rgba(72,174,209,0.4)',
      //       borderWidth: 1,
      //       data: dataBar().da
      //     }
      //   ]
      // }
      // console.log(dataBar().da)
      // console.log(dataBar().label)
      // // get bar chart canvas
      // var iot = document.getElementById('iot').getContext('2d')
      // // draw bar chart
      // new Chart(iot).Line(barData,{responsive: true})
    })


    function getSpeed () {
      var la = []
      var download = []
      var upload = []
    $http.get('/speed')
      .then(function (res) {
        $scope.speed = res.data
        for (var i = 0; i < $scope.speed.length; i++) {
          download.push($scope.speed[i].speeds.download)
          upload.push($scope.speed[i].speeds.upload)
          la.push($scope.speed[i].server.host)
        }
        var data = {
          	  labels : la,
          		datasets : [
          		  {
                  label: "DOWNLOAD",
                  fill: false,
                  lineTension: 0.1,
                  backgroundColor: "rgba(122, 163, 255, 1)",
                  borderColor: "rgba(122, 163, 255, 1)",
                  borderCapStyle: 'butt',
                  borderDash: [],
                  borderDashOffset: 0.0,
                  borderJoinStyle: 'miter',
                  pointBorderColor: "rgba(122, 163, 255, 1)",
                  pointBackgroundColor: "#fff",
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: "rgba(122, 163, 255, 1)",
                  pointHoverBorderColor: "rgba(122, 163, 255, 1)",
                  pointHoverBorderWidth: 2,
                  pointRadius: 1,
                  pointHitRadius: 10,
          				data : download
          			},
          			{
                  label: "UPLOAD",
                  fill: false,
                  lineTension: 0.1,
                  backgroundColor: "rgba(255, 186, 182, 1)",
                  borderColor: "rgba(255, 186, 182, 1)",
                  borderCapStyle: 'butt',
                  borderDash: [],
                  borderDashOffset: 0.0,
                  borderJoinStyle: 'miter',
                  pointBorderColor: "rgba(255, 186, 182, 1)",
                  pointBackgroundColor: "#fff",
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: "rgba(255, 186, 182, 1)",
                  pointHoverBorderColor: "rgba(255, 186, 182, 1)",
                  pointHoverBorderWidth: 2,
                  pointRadius: 1,
                  pointHitRadius: 10,
          				data : upload
          			}
          		]
            }
              var ctx = document.getElementById('myChart')
              //  myLineChart = new Chart(ctx, data)
              var myLineChart = new Chart(ctx, {
                type: 'line',
                data: data
            })
            console.log(myLineChart)
      })
    }


  ///////////////////////////////////////////////////

$scope.load=true
var count = 0
 var setload = $interval(function () {
  count++
  console.log(count)
  if (count === 4){
    $scope.load = false
    $interval.cancel(setload)
  }
}, 5000)

    $interval(function () {
    getSpeed()
  }, 20000)
})
