function init(id, div) {

  // const id = 0;
  // const div = document.getElementById("chartdiv");
// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");


// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root)
]);


// Create the map chart
// https://www.amcharts.com/docs/v5/charts/map-chart/
var chart = root.container.children.push(am5map.MapChart.new(root, {
  // panX: "translateX",
  // panY: "translateY",
  rotationX: -160,
  projection: am5map.geoEqualEarth()
}));


// Create main polygon series for countries
// https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/
var polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
  geoJSON: am5geodata_worldLow 
}));

polygonSeries.mapPolygons.template.setAll({
  tooltipText: "{name}",
  toggleKey: "active",
  interactive: true
  ,fill: am5.color("#D8DEF6")
  ,templateField: "polygonSettings"
});


// polygonSeries.mapPolygons.template.events.on("click", function(ev) {
//   console.log("Clicked on", ev.target.dataItem.get("id"));
// });

polygonSeries.mapPolygons.template.events.on("click", function(ev, id, div) {
      var url = ev.target.dataItem.dataContext.url;
      var country = ev.target.dataItem.get("id");
      
      if(url) {
      createBar(id, div, country);
      // createAknown(id, div, country);
      // createPie(id, div, country);
      createString(id, div, country);}

      // if(url) {
      //   $.ajax({
      //     method: 'GET'
      //     , url: url
      //     , data : sendData
      //     , success : function(resp) {
      //       createBar(id, div, resp);
      //       createAknown(id, div, resp);
      //       createPie(id, div, resp);
      //       createString(id, div, resp);
      //     }
      //   });
        // url = url + `?country=${id}`
        // console.log("Clicked on",id, url);
        // window.location.href = url;
      });

polygonSeries.mapPolygons.template.states.create("hover", {
  fill: am5.color("#B0B2B5")
});

polygonSeries.data.setAll([{
  id: "CN",
  url: "/trade/statShow",
  polygonSettings: {
    fill: am5.color("#025EEC")
  }
}, {
  id: "US",
  url: "/trade/statShow",
  polygonSettings: {
    fill: am5.color("#0963EE")
  }
}, {
  id: "VN",
  url: "/trade/statShow",
  polygonSettings: {
    fill: am5.color("#146AEF")
  }
}, {
  id: "JP",
  url: "/trade/statShow",
  polygonSettings: {
    fill: am5.color("#1D70EF")
  }
}, {
  id: "HK",
  url: "/trade/statShow",
  polygonSettings: {
    fill: am5.color("#2676F0")
  }
}, {
  id: "TW",
  url: "/trade/statShow",
  polygonSettings: {
    fill: am5.color("#2C7AF2")
  }
}, {
  id: "SG",
  url: "/trade/statShow",
  polygonSettings: {
    fill: am5.color("#347FF3")
  }
}, {
  id: "IN",
  url: "/trade/statShow",
  polygonSettings: {
    fill: am5.color("#3C84F5")
  }
}, {
  id: "AU",
  url: "/trade/statShow",
  polygonSettings: {
    fill: am5.color("#4589F5")
  }
}, {
  id: "MX",
  url: "/trade/statShow",
  polygonSettings: {
    fill: am5.color("#4E8FF7")
  }
}, {
  id: "DE",
  url: "/trade/statShow",
  polygonSettings: {
    fill: am5.color("#5695F8")
  }
}, {
  id: "MY",
  url: "/trade/statShow",
  polygonSettings: {
    fill: am5.color("#609BF8")
  }
}, {
  id: "ID",
  url: "/trade/statShow",
  polygonSettings: {
    fill: am5.color("#68A0F8")
  }
}, {
  id: "PL",
  url: "/trade/statShow",
  polygonSettings: {
    fill: am5.color("#70A4F6")
  }
}, {
  id: "PH",
  url: "/trade/statShow",
  polygonSettings: {
    fill: am5.color("#7BAAF5")
  }
}, {
  id: "TR",
  url: "/trade/statShow",
  polygonSettings: {
    fill: am5.color("#83AFF5")
  }
},
{
  id: "CA",
  url: "/trade/statShow",
  polygonSettings: {
    fill: am5.color("#8CB5F6")
  }
}, {
  id: "TH",
  url: "/trade/statShow",
  polygonSettings: {
    fill: am5.color("#94BAF6")
  }
}, {
  id: "NL",
  url: "/trade/statShow",
  polygonSettings: {
    fill: am5.color("#9FBFF2")
  }
}, {
  id: "HU",
  url: "/trade/statShow",
  polygonSettings: {
    fill: am5.color("#A2C1F2")
  }
}]);



// polygonSeries.mapPolygons.template.states.create("hover", {
//   fill: root.interfaceColors.get("primaryButtonHover")
// });

// polygonSeries.mapPolygons.template.states.create("active", {
//   fill: root.interfaceColors.get("primaryButtonHover")
// });

// var previousPolygon;

// polygonSeries.mapPolygons.template.on("active", function (active, target) {
//   if (previousPolygon && previousPolygon != target) {
//     previousPolygon.set("active", false);
//   }
//   if (target.get("active")) {
//     polygonSeries.zoomToDataItem(target.dataItem );
//   }
//   else {
//     chart.goHome();
//   }
//   previousPolygon = target;
// });


// Add zoom control
// https://www.amcharts.com/docs/v5/charts/map-chart/map-pan-zoom/#Zoom_control
var zoomControl = chart.set("zoomControl", am5map.ZoomControl.new(root, {}));
zoomControl.homeButton.set("visible", true);


// Set clicking on "water" to zoom out
chart.chartContainer.get("background").events.on("click", function () {
  chart.goHome();
})


// Make stuff animate on load
chart.appear(1000, 100);
};

// // click event 추가
// function clickEvent() {
//   polygonSeries.mapPolygons.template.events.on("click", function(ev) {
//     var url = ev.target.dataItem.dataContext.url;
//     var id = ev.target.dataItem.get("id");
//     var sendData = {"country" : id};
//     if(url) {
//       $.ajax({
//         method: 'GET'
//         , url: url
//         , data : sendData
//         , success : function(resp) {
//           alert(resp)
//         }
//       });
//       // url = url + `?country=${id}`
//       // console.log("Clicked on",id, url);
//       // window.location.href = url;
//     }
//   });
// };

// ======= createDiv =======
// var id = 0;
// var div = document.getElementById("chartdiv");

function createDiv(id, div) {
  var container = document.createElement("div");
  container.id = "chart" + id;
  container.style.width = "450px";
  container.style.height = "450px";
  // container.style.float = "left";
  container.style.margin = "10px";
  container.style.border = "1px solid #eee";
  return container;
}

// === 함수 실행 ===
// createBullet();
// createFunnel();
// createBar();
// createAknown();
// createPie();
// createString();

// ================================== bulletChart ========================================
// =======================================================================================

function createBullet(id, div) {
  var newspace = createDiv(id, div);
  newspace.style.display = "inline-block";
  div.before(newspace);
  var root = am5.Root.new(newspace);
  
  root.setThemes([
    am5themes_Animated.new(root)
  ]);

  // Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
var chart = root.container.children.push(am5xy.XYChart.new(root, {
  panX: true,
  panY: true,
  wheelX: "panX",
  wheelY: "zoomX",
    width: am5.percent(100),  //
    height: am5.percent(100), //
    layout: root.verticalLayout //
}));

chart.get("colors").set("step", 3);


// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
cursor.lineY.set("visible", false);


// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
  maxDeviation: 0.3,
  baseInterval: {
    timeUnit: "month",
    count: 1
  },
  renderer: am5xy.AxisRendererX.new(root, {
    minorGridEnabled: true
  }),
  tooltip: am5.Tooltip.new(root, {})
}));

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  maxDeviation: 0.3,
  renderer: am5xy.AxisRendererY.new(root, {})
}));


// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series = chart.series.push(am5xy.LineSeries.new(root, {
  name: "수출(백만$)",
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "value1",
  valueXField: "date",
  tooltip: am5.Tooltip.new(root, {
    labelText: "수출: {valueY}\n수입: {value2}"
  })
}));

series.strokes.template.setAll({
  strokeWidth: 2
});

series.get("tooltip").get("background").set("fillOpacity", 0.5);

var series2 = chart.series.push(am5xy.LineSeries.new(root, {
  name: "수입(10억$)",
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "value2",
  valueXField: "date"
}));
series2.strokes.template.setAll({
  strokeDasharray: [2, 2],
  strokeWidth: 2
});

// Create animating bullet by adding two circles in a bullet container and
// animating radius and opacity of one of them.
series.bullets.push(function() {
  var container = am5.Container.new(root, {
    templateField: "bulletSettings"
  });
  // var circle0 = container.children.push(am5.Circle.new(root, {
  //   radius: 5,
  //   fill: am5.color(0xff0000)
  // }));
  var circle1 = container.children.push(am5.Circle.new(root, {
    radius: 5,
    fill: am5.color(0xff0000)
  }));

  circle1.animate({
    key: "radius",
    to: 20,
    duration: 1000,
    easing: am5.ease.out(am5.ease.cubic),
    loops: Infinity
  });
  circle1.animate({
    key: "opacity",
    to: 0,
    from: 1,
    duration: 1000,
    easing: am5.ease.out(am5.ease.cubic),
    loops: Infinity
  });

  return am5.Bullet.new(root, {
    sprite: container
  })
})

// Create animating bullet by adding two circles in a bullet container and
// animating radius and opacity of one of them.
series2.bullets.push(function() {
  var container = am5.Container.new(root, {
    templateField: "bulletSettings"
  });
  // var circle0 = container.children.push(am5.Circle.new(root, {
  //   radius: 5,
  //   fill: am5.color(0xff0000)
  // }));
  var circle1 = container.children.push(am5.Circle.new(root, {
    radius: 5,
    fill: am5.color(0xff0000)
  }));

  circle1.animate({
    key: "radius",
    to: 20,
    duration: 1000,
    easing: am5.ease.out(am5.ease.cubic),
    loops: Infinity
  });
  circle1.animate({
    key: "opacity",
    to: 0,
    from: 1,
    duration: 1000,
    easing: am5.ease.out(am5.ease.cubic),
    loops: Infinity
  });

  return am5.Bullet.new(root, {
    sprite: container
  })
})


// Set date fields
// https://www.amcharts.com/docs/v5/concepts/data/#Parsing_dates
root.dateFormatter.setAll({
  dateFormat: "yyyy-MM-dd",
  dateFields: ["valueX"]
});


// Set data
var data = [{
  date: new Date(2023, 1, 1).getTime(),
  value1: 46339, // 46339145,
  value2: 59037, // 59037259
  bulletSettings: {
    visible: false
  }
}, {
  date: new Date(2023, 2, 1).getTime(),
  value1: 49994, //49994593
  value2: 55370, //55370498
  bulletSettings: {
    visible: false
  }
}, {
  date: new Date(2023, 3, 1).getTime(),
  value1: 54882, //54882484
  value2: 59635, //59635920
  bulletSettings: {
    visible: false
  }
}, {
  date: new Date(2023, 4, 1).getTime(),
  value1: 49430, //49430879
  value2: 51940, //51940137
  bulletSettings: {
    visible: false
  }
}, {
  date: new Date(2023, 5, 1).getTime(),
  value1: 52054, //52054195
  value2: 54251, //54251194
  bulletSettings: {
    visible: false
  }
}, {
  date: new Date(2023, 6, 1).getTime(),
  value1: 54297, //54297754
  value2: 53055, //53055480
  bulletSettings: {
    visible: false
  }
}, {
  date: new Date(2023, 7, 1).getTime(),
  value1: 50457, //50457776
  value2: 48738, //48738114
  bulletSettings: {
    visible: false
  }
}, {
  date: new Date(2023, 8, 1).getTime(),
  value1: 51994, //51994074
  value2: 51009, //51009758
  bulletSettings: {
    visible: false
  }
}, {
  date: new Date(2023, 9, 1).getTime(),
  value1: 54650, //54650691
  value2: 50972, //50972525
  bulletSettings: {
    visible: false
  }
}, {
  date: new Date(2023, 10, 1).getTime(),
  value1: 54989, //54989950
  value2: 53440, //53440582
  bulletSettings: {
    visible: false
  }
}, {
  date: new Date(2023, 11, 1).getTime(),
  value1: 55561, //55561090
  value2: 51997, //51997805
  bulletSettings: {
    visible: false
  }
}, {
  date: new Date(2023, 12, 1).getTime(),
  value1: 57573, //57573193
  value2: 53122, //53122854
  bulletSettings: {
    visible: true
  }
}
]

series.data.setAll(data);
series2.data.setAll(data);

series.set("selectedDataItem", series.dataItems[0]);

// Add legend

// var legend = chart.children.push(am5.Legend.new(root, {}));
// legend.data.setAll(series.dataItems[0].get("children"));

var legend = chart.children.push( 
  am5.Legend.new(root, {
    width: am5.percent(100),
    centerX: am5.percent(50),
    x: am5.percent(50),
    // layout: root.horizontalLayout
  })
);
legend.data.setAll(chart.series.values);
// console.log(chart.series.values);

// var legend = chart.children.push(am5.Legend.new(root, {
//   nameField: "categoryX",
//   centerX: am5.percent(50),
//   x: am5.percent(50)
// })); 

// legend.data.setAll(series.dataItems);

// var legendData = [
//   { name: "수출(10억$)"}, // , color: am5.color(0xff0000) }, // 시리즈 1의 이름과 선 색상
//   { name: "수입(10억$)"} //, color: am5.color(0x0000ff) }  // 시리즈 2의 이름과 선 색상
// ];

// 범례에 데이터를 설정합니다.
// legend.data.setAll(legendData);





// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
series.appear(1000);
series2.appear(1000);
chart.appear(1000, 100);
}

// ====================================== pieChart =======================================
// =======================================================================================
function createPie(id, div) {
  var newspace = createDiv(id, div);
  newspace.style.display = "inline-block";
  newspace.style.float = "right";
  // newspace.style.width = "500px";
  div.after(newspace);
  var root = am5.Root.new(newspace
    // , {tooltipContainerBounds: {
    //   top: 50,
    //   right: 500,
    //   bottom: 50,
    //   left: 500
    // }}
  );

  // root.resize();

  root.setThemes([
    am5themes_Animated.new(root)
  ]);

  // Parse chart config
// https://www.amcharts.com/docs/v5/concepts/serializing/
am5plugins_json.JsonParser.new(root).parse({
  refs: [{
    data: [{
      country: "France",
      sales: 100000
    }, {
      country: "Spain",
      sales: 160000
    }, {
      country: "United Kingdom",
      sales: 80000
    }],
  }, {
    series: {
      type: "PieSeries",
      settings: {
        name: "Series",
        valueField: "sales",
        categoryField: "country"
      },
      properties: {
        data: "#data"
      }
    },
  }],
  type: "PieChart",
  options: {
    responsive: false},
  settings: {
    layout: "vertical",
  },
  properties: {
    series: [
      "#series"
    ]
  },
  children: [{
    type: "Legend",
    settings: {
      centerX: {
        type: "Percent",
        value: 50
      },
      x: {
        type: "Percent",
        value: 50
      },
      layout: "horizontal"
    },
    properties: {
      data: "#series.dataItems"
    }
  }]
}, {
  parent: root.container
}).then(function (chart) {
  // Make stuff animate on load
  // https://www.amcharts.com/docs/v5/concepts/animations/#Forcing_appearance_animation
  chart.series.getIndex(0).appear(1000);
  chart.appear(1000, 100);
});
}

// =============================== slicedFunnelChart =====================================
// =======================================================================================
function createFunnel(id, div) {
  var newspace = createDiv(id, div);
  newspace.style.display = "inline-block";
  newspace.style.float = "right";
  div.before(newspace);
  var root = am5.Root.new(newspace);

  root.setThemes([
    am5themes_Animated.new(root)
  ]);

  // Create chart
// https://www.amcharts.com/docs/v5/charts/percent-charts/sliced-chart/
var chart = root.container.children.push(am5percent.SlicedChart.new(root, {
  layout: root.verticalLayout
}));


// Create series
// https://www.amcharts.com/docs/v5/charts/percent-charts/sliced-chart/#Series
var series = chart.series.push(am5percent.FunnelSeries.new(root, {
  alignLabels: false,
  orientation: "vertical",
  valueField: "value",
  categoryField: "category"
}));


// Set data
// https://www.amcharts.com/docs/v5/charts/percent-charts/sliced-chart/#Setting_data
series.data.setAll([
  { value: 10, category: "One" },
  { value: 9, category: "Two" },
  { value: 6, category: "Three" },
  { value: 5, category: "Four" },
  { value: 4, category: "Five" },
  { value: 3, category: "Six" },
  { value: 1, category: "Seven" }
]);


// Play initial series animation
// https://www.amcharts.com/docs/v5/concepts/animations/#Animation_of_series
series.appear();


// Create legend
// https://www.amcharts.com/docs/v5/charts/percent-charts/legend-percent-series/
// var legend = chart.children.push(am5.Legend.new(root, {
//   centerX: am5.p50,
//   x: am5.p50,
//   marginTop: 15,
//   marginBottom: 15
// }));

// legend.data.setAll(series.dataItems);


// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/#Forcing_appearance_animation
chart.appear(1000, 100);
};


// =============================== barChart ==============================================
// =======================================================================================
function createBar(id, div, country) {
  $.ajax({
    url: "/trade/barChart"
    ,method: "GET"
    ,data: {"country":country}
    , success: function(resp) {createRealBar(id, div, resp)}
  })}

  function createRealBar(id, div, resp) {
    console.log(typeof(resp));
    var space = document.getElementById("chart2");
    console.log(space);
    var root;
    if(space == null) {
      var newspace = createDiv(id, div);
      newspace.style.display = "inline-block";
      root = am5.Root.new(newspace);
      div.after(newspace);
      console.log(newspace);
    }
    else{
      maybeDisposeRoot("chart2");
      root = am5.Root.new(space);
      }

  root.setThemes([
    am5themes_Animated.new(root)
  ]);

  // data
  var data = [];
  $.each(resp, function(index, item) {
    data.push({
      "country": item.importMarket,
      "value": item.price
    })
    });
    console.log(data);

  // Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
var chart = root.container.children.push(am5xy.XYChart.new(root, {
  panX: true,
  panY: true,
  wheelX: "none",
  wheelY: "none",
  responsive: false
}));

// We don't want zoom-out button to appear while animating, so we hide it
chart.zoomOutButton.set("forceHidden", true);


// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xRenderer = am5xy.AxisRendererX.new(root, {
  minGridDistance: 30
});
xRenderer.labels.template.setAll({
  rotation: -90,
  centerY: am5.p50,
  centerX: 0,
  paddingRight: 15
});
xRenderer.grid.template.set("visible", false);

var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
  maxDeviation: 0.3,
  categoryField: "country",
  renderer: xRenderer
}));

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  maxDeviation: 0.3,
  min: 0,
  renderer: am5xy.AxisRendererY.new(root, {})
}));


// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series = chart.series.push(am5xy.ColumnSeries.new(root, {
  name: "Series 1",
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "value",
  categoryXField: "country"
}));

// Rounded corners for columns
series.columns.template.setAll({
  cornerRadiusTL: 5,
  cornerRadiusTR: 5
});

// Make each column to be of a different color
series.columns.template.adapters.add("fill", function (fill, target) {
  return chart.get("colors").getIndex(series.columns.indexOf(target ));
});
                                                                                                                                                                      
series.columns.template.adapters.add("stroke", function (stroke, target) {
  return chart.get("colors").getIndex(series.columns.indexOf(target ));
});

// Add Label bullet
series.bullets.push(function () {
  return am5.Bullet.new(root, {
    locationY: 1,
    sprite: am5.Label.new(root, {
      text: "{valueYWorking.formatNumber('#.')}",
      fill: root.interfaceColors.get("alternativeText"),
      centerY: 0,
      centerX: am5.p50,
      populateText: true
    })
  });
});                                   


// Set data
// var data = [{
//   "country": "USA",
//   "value": 2025
// }, {
//   "country": "China",
//   "value": 1882
// }, {
//   "country": "Japan",
//   "value": 1809
// }, {
//   "country": "Germany",
//   "value": 1322
// }, {
//   "country": "UK",
//   "value": 1122
// }, {
//   "country": "France",
//   "value": 1114
// }, {
//   "country": "India",
//   "value": 984
// }, {
//   "country": "Spain",
//   "value": 711
// }, {
//   "country": "Netherlands",
//   "value": 665
// }, {
//   "country": "Russia",
//   "value": 580
// }, {
//   "country": "South Korea",
//   "value": 443
// }, {
//   "country": "Canada",
//   "value": 441
// }];

xAxis.data.setAll(data);
series.data.setAll(data);

// update data with random values each 1.5 sec
// setInterval(function () {
//   updateData();
// }, 1500)

function updateData() {
  am5.array.each(series.dataItems, function (dataItem) {
    var value = dataItem.get("valueY") + Math.round(Math.random() * 300 - 150);
    if (value < 0) {
      value = 10;
    }
    // both valueY and workingValueY should be changed, we only animate workingValueY
    dataItem.set("valueY", value);
    dataItem.animate({
      key: "valueYWorking",
      to: value,
      duration: 600,
      easing: am5.ease.out(am5.ease.cubic)
    });
  })

  sortCategoryAxis();
}


// Get series item by category
function getSeriesItem(category) {
  for (var i = 0; i < series.dataItems.length; i++) {
    var dataItem = series.dataItems[i];
    if (dataItem.get("categoryX") == category) {
      return dataItem;
    }
  }
}


// Axis sorting
function sortCategoryAxis() {

  // Sort by value
  series.dataItems.sort(function (x, y) {
    return y.get("valueY") - x.get("valueY"); // descending
    //return y.get("valueY") - x.get("valueY"); // ascending
  })

  // Go through each axis item
  am5.array.each(xAxis.dataItems, function (dataItem) {
    // get corresponding series item
    var seriesDataItem = getSeriesItem(dataItem.get("category"));

    if (seriesDataItem) {
      // get index of series data item
      var index = series.dataItems.indexOf(seriesDataItem);
      // calculate delta position
      var deltaPosition = (index - dataItem.get("index", 0)) / series.dataItems.length;
      // set index to be the same as series data item index
      dataItem.set("index", index);
      // set deltaPosition instanlty
      dataItem.set("deltaPosition", -deltaPosition);
      // animate delta position to 0
      dataItem.animate({
        key: "deltaPosition",
        to: 0,
        duration: 1000,
        easing: am5.ease.out(am5.ease.cubic)
      })
    }
  });

  // Sort axis items by index.
  // This changes the order instantly, but as deltaPosition is set,
  // they keep in the same places and then animate to true positions.
  xAxis.dataItems.sort(function (x, y) {
    return x.get("index") - y.get("index");
  });
}


// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
series.appear(1000);
chart.appear(1000, 100);
  };

// =============================== StringChart ==============================================
// ==========================================================================================\
function createString(id, div, country) {

  $.ajax({
    url: "/trade/stringChart"
    ,method: "GET"
    ,data: {"country":country}
    , success: function(resp) {createRealString(id, div, resp)}
  })}

function createRealString(id, div, resp) {
  var space = document.getElementById("chart5");
  console.log(space);
  var root;
  if(space == null) {
    var newspace = createDiv(id, div);
    newspace.style.display = "inline-block";
    root = am5.Root.new(newspace);
    div.after(newspace);
    console.log(newspace);
  }
  else{
    maybeDisposeRoot("chart5");
    root = am5.Root.new(space);
    }

  root.setThemes([
    am5themes_Animated.new(root)
  ]);
  console.log(typeof(resp));
  var data = [];
  $.each(resp, function(index, item) {
      data.push({
        date: new Date(item.dateYear, item.dateMonth, 12).getTime(),
        value1: item.exportPrice,
        value2: item.importPrice,
        previousDate: new Date(2019, 5, 5)
      })
      });
//end each
  console.log(data);

// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
var chart = root.container.children.push(am5xy.XYChart.new(root, {
  panX: true,
  panY: true,
  wheelX: "panX",
  wheelY: "zoomX"
  , layout: root.verticalLayout
}));

chart.get("colors").set("step", 3);


// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
cursor.lineY.set("visible", false);


// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
  maxDeviation: 0.3,
  baseInterval: {
    timeUnit: "month",
    count: 1
  },
  renderer: am5xy.AxisRendererX.new(root, {
    minorGridEnabled: true
  }),
  tooltip: am5.Tooltip.new(root, {})
}));

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  maxDeviation: 0.3,
  renderer: am5xy.AxisRendererY.new(root, {})
}));


// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series = chart.series.push(am5xy.LineSeries.new(root, {
  name: "수출액",
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "value1",
  valueXField: "date",
  tooltip: am5.Tooltip.new(root, {
    labelText: "{valueX}: {valueY}\n{previousDate}: {value2}"
  })
}));

series.strokes.template.setAll({
  strokeWidth: 2
});

series.get("tooltip").get("background").set("fillOpacity", 0.5);

var series2 = chart.series.push(am5xy.LineSeries.new(root, {
  name: "수출액",
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "value2",
  valueXField: "date"
}));
series2.strokes.template.setAll({
  strokeDasharray: [2, 2],
  strokeWidth: 2
});

// Set date fields
// https://www.amcharts.com/docs/v5/concepts/data/#Parsing_dates
root.dateFormatter.setAll({
  dateFormat: "yyyy-MM-dd",
  dateFields: ["valueX"]
});

series.data.setAll(data);
series2.data.setAll(data);


series.set("selectedDataItem", series.dataItems[0]);

// Add legend
// var legend = chart.children.push(am5.Legend.new(root, {
//   // nameField: "categoryX",
//   centerX: am5.percent(50),
//   x: am5.percent(50)
// }));

// legend.data.setAll(chart.series.values);

var legend = chart.children.push( 
  am5.Legend.new(root, {
    width: am5.percent(100),
    centerX: am5.percent(50),
    x: am5.percent(50)
    // , layout: root.verticalLayout
  })
);
legend.data.setAll(chart.series.values);

// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
series.appear(1000);
series2.appear(1000);
chart.appear(1000, 100);
};

function maybeDisposeRoot(divId) {
  am5.array.each(am5.registry.rootElements, function(root) {
    if (root.dom.id === divId) {
      root.dispose();
    }
  });
}


// ====================================== 미정 그래프 =======================================
// =========================================================================================
function createAknown(id, div) {
  var newspace = createDiv(id, div);
  newspace.style.display = "inline-block";
  // newspace.style.float = "right";
  div.after(newspace);
  var root = am5.Root.new(newspace);



};






