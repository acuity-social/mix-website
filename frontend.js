var $ = require("jquery");

$(function() {

  window.addEventListener('scroll', function(e) {
    var distanceY = window.pageYOffset || document.documentElement.scrollTop,
    shrinkOn = 100,
    header = document.querySelector('#fixed-menu');

    if (distanceY > shrinkOn) {
      $(header).addClass('dark');
    } else {
      if ($(header).hasClass('dark')) {
        $(header).removeClass('dark');
      }
    }
  });

  var smoothScroll = require("jquery-smooth-scroll");

  $('a').smoothScroll({
    offset: -100,
    autoFocus: true
  });

  $('#nav-icon').click(function() {
    $(this).toggleClass('open');
    $('#mobilemenu').toggleClass('open-nav');
  });

  $('a').click(function() {
    $('#nav-icon').removeClass('open');
    $('#mobilemenu').removeClass('open-nav');
  });

  $("#iframe1").height($("#iframe1").width() * 0.4);

  $(window).resize(function() {
    $("#iframe1").height($("#iframe1").width() * 0.4);
  });

  var Web3 = require('web3');
  var web3 = new Web3(new Web3.providers.HttpProvider("https://rpc.link-blockchain.org:8647"));
  var link_revenue_sol_linkrevenueContract = web3.eth.contract([{"constant":false,"inputs":[],"name":"withdraw","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"startTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"changeOwner","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"withdrawn","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getReleased","outputs":[{"name":"released","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"oldOwner","type":"address"},{"indexed":false,"name":"newOwner","type":"address"}],"name":"ChangeOwner","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"recipient","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"}]);
  var link_revenue_sol_linkrevenue = link_revenue_sol_linkrevenueContract.at("0x97c7f4f8f0bbf384578a9f5754ae73f37ff49ec2");

  var Highcharts = require('highcharts');
  Highcharts.setOptions({lang: {thousandsSep: ','}});

  $("#crowdfund-section #api").text(web3.version.api);
  
  web3.version.getNode(function(error, result) {
    if (error) {
      console.log(error);
    }
    else {
      $("#crowdfund-section #node").text(result);
    }
  });

  web3.version.getNetwork(function(error, result) {
    if (error) {
      console.log(error);
    }
    else {
      $("#crowdfund-section #network").text(result);
    }
  });

  web3.version.getEthereum(function(error, result) {
    if (error) {
      console.log(error);
    }
    else {
      $("#crowdfund-section #ethereum").text(parseInt(result, 16));
    }
  });

  web3.eth.getBlockNumber(function(error, result) {
    if (error) {
      console.log(error);
    }
    else {
      $("#crowdfund-section #block-number").text(result);
    }
  });

  link_revenue_sol_linkrevenue.startTime(function(error, result) {
    if (error) {
      console.log(error);
    }
    else {
      $("#crowdfund-section #start").text(new Date(result * 1000));
      var end = parseInt(result) + 2000 * 24 * 60 * 60;
      $("#crowdfund-section #end").text(new Date(end * 1000));
      web3.eth.getBlock('latest', function(error, result) {
        if (error) {
          console.log(error);
        }
        else {
          var days = 2000 - parseInt((end - result.timestamp) / 86400);
          
          var rate = Math.max(0, 50000 - (parseInt(days / 200) * 5000));
          $("#crowdfund-section #current-rate").text(rate.toLocaleString() + " LINK per day");

          var chart = new Highcharts.Chart({
            title: {
              text: null
            },
            chart: {
              renderTo: 'chart1',
              type: 'bar',
              height: 70,
            },
            credits: false,
            tooltip: false,
            legend: false,
            navigation: {
              buttonOptions: {
                enabled: false
              }
            },
            xAxis: {
              visible: false,
            },
            yAxis: {
              visible: false,
              min: 0,
              max: 2000,
            },
            series: [{
              data: [2000],
              grouping: false,
              animation: false,
              enableMouseTracking: false,
              showInLegend: false,
              color: 'lightskyblue',
              pointWidth: 25,
              borderWidth: 0,
              borderRadiusTopLeft: '4px',
              borderRadiusTopRight: '4px',
              borderRadiusBottomLeft: '4px',
              borderRadiusBottomRight: '4px'
            }, {
              enableMouseTracking: false,
              data: [days],
              borderRadiusBottomLeft: '4px',
              borderRadiusBottomRight: '4px',
              color: 'navy',
              borderWidth: 0,
              pointWidth: 25,
              animation: {
                duration: 250,
              },
              dataLabels: {
                enabled: true,
                inside: true,
                align: 'left',
                format: '{point.y} / 2000 days',
                style: {
                  color: 'white',
                  textOutline: false,
                }
              }
            }]
          });
        }
      });
    }
  });

  link_revenue_sol_linkrevenue.getReleased(function(error, result) {
    if (error) {
      console.log(error);
    }
    else {
      var released = parseInt(web3.fromWei(result, "ether"));

      Highcharts.chart('chart2', {
        credits: false,
        tooltip: false,
        legend: false,
        navigation: {
          buttonOptions: {
            enabled: false
          }
        },
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: null
        },
        tooltip: {
            pointFormat: '<b>{point.y} LINK</b> ({point.percentage:.1f}%)'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                }
            }
        },
        series: [{
            colorByPoint: true,
            data: [{
                name: 'Unreleased',
                y: 55000000 - released 
            }, {
                name: 'Released',
                y: released,
                sliced: true,
                selected: true
            }]
        }]
      });
    }
  });
});
