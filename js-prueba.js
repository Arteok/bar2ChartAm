am5.ready(function () {

    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    var root = am5.Root.new("chartdiv");


    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([
        am5themes_Animated.new(root)
    ]);

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    var chart = root.container.children.push(am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "none",
        wheelY: "none",
        layout: root.horizontalLayout
    }));


    // Add legend
    // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
    var legendData = [];
    var legend = chart.children.push(
        am5.Legend.new(root, {
            nameField: "name",
            fillField: "color",
            strokeField: "color",

        /*  centerY: am5.p50,
            marginLeft: 20,
            x: 500,
            y:100,
            layout: root.horizontalLayout,
            clickTarget: "none" */

            /* centerX: am5.p60, */
            /* x: am5.p0,
            y: am5.p100,
            layout: root.horizontalLayout, */
            /* clickTarget: "none" */

            /* centerX: am5.percent(50),
            x: am5.percent(40),
            marginTop: 90,
            marginBottom: 15 */
        })
    );

    var data = [{
            instituto: "icpa",
            carrera: "LICENCIADO EN BIOLOGÍA",
            cantidad: 133
        }, {
            instituto: "icpa",
            carrera: "LICENCIADO EN CIENCIAS AMBIENTALES",
            cantidad: 78
        },
        {
            instituto: "icpa",
            carrera: "LICENCIADO EN GEOLOGÍA",
            cantidad: 61
        }, {
            instituto: "icse",
            carrera: "LICENCIADO EN MEDIOS AUDIOVISUALES",
            cantidad: 360
        }, {
            instituto: "icse",
            carrera: "LICENCIADO EN SOCIOLOGÍA",
            cantidad: 342
        }, {
            instituto: "icse",
            carrera: "LICENCIADO EN CIENCIA POLÍTICA",
            cantidad: 299
        }, {
            instituto: "idei",
            carrera: "CONTADOR PÚBLICO",
            cantidad: 927
        }, {
            instituto: "idei",
            carrera: "TÉCNICO UNIVERSITARIO CONTABLE",
            cantidad: 438
        }, {
            instituto: "idei",
            carrera: "LICENCIADO EN GESTIÓN EMPRESARIAL",
            cantidad: 327
        }, {
            instituto: "idei",
            carrera: "TÉCNICO EN TURISMO",
            cantidad: 254
        }, {
            instituto: "idei",
            carrera: "LICENCIADO/A EN SISTEMAS",
            cantidad: 236
        }, {
            instituto: "idei",
            carrera: "LICENCIADO EN TURISMO",
            cantidad: 233
        }, {
            instituto: "idei",
            carrera: "LICENCIADO EN ECONOMÍA",
            cantidad: 223
        }, {
            instituto: "idei",
            carrera: "INGENIERO INDUSTRIAL",
            cantidad: 220
        }, {
            instituto: "idei",
            carrera: "ANALISTA UNIVERSITARIO DE SISTEMAS",
            cantidad: 188
        }, {
            instituto: "idei",
            carrera: "LICENCIADO EN ADMINISTRACIÓN PÚBLICA",
            cantidad: 80
        }, {
            instituto: "iec",
            carrera: "LICENCIADO EN GESTIÓN EDUCATIVA",
            cantidad: 261
        }, {
            instituto: "iec",
            carrera: "ESPECIALISTA EN ENSEÑANZA DE LA LENGUA Y LITERATURA",
            cantidad: 29
        }, {
            instituto: "iec",
            carrera: "ESPECIALISTA EN ENSEÑANZA DE LA BIOLOGÍA",
            cantidad: 22
        }, {
            instituto: "iec",
            carrera: "ESPECIALISTA EN ENSEÑANZA DE LA MATEMÁTICA",
            cantidad: 16
        },
    ];



    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    var yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
        categoryField: "carrera",
        renderer: am5xy.AxisRendererY.new(root, {
            minGridDistance: 10
        }),
        tooltip: am5.Tooltip.new(root, {})
    }));

    yAxis.get("renderer").labels.template.setAll({
        fontSize: 12,
        location: 0.5
    })

    yAxis.data.setAll(data);

    var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererX.new(root, {}),
        tooltip: am5.Tooltip.new(root, {})
    }));


    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    var series = chart.series.push(am5xy.ColumnSeries.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        valueXField: "cantidad",
        categoryYField: "carrera",
        tooltip: am5.Tooltip.new(root, {
            pointerOrientation: "horizontal"
        })
    }));

    series.columns.template.setAll({
        tooltipText: "{categoryY}: [bold]{valueX}[/]",
        width: am5.percent(90),
        strokeOpacity: 0
    });

    series.columns.template.adapters.add("fill", function (fill, target) {
        if (target.dataItem) {
            switch (target.dataItem.dataContext.instituto) {
                case "icpa":
                    return chart.get("colors").getIndex(16);
                    break;
                case "icse":
                    return chart.get("colors").getIndex(1);
                    break;
                case "idei":
                    return chart.get("colors").getIndex(9);
                    break;
                case "iec":
                    return chart.get("colors").getIndex(12);
                    break;
            }
        }
        return fill;
    })

    series.data.setAll(data);

    function createRange(label, category, color) {
        var rangeDataItem = yAxis.makeDataItem({
            category: category
        });

        var range = yAxis.createAxisRange(rangeDataItem);

        rangeDataItem.get("label").setAll({
            fill: color,
            text: label,
            location: 1,
            fontWeight: "bold",
            dx: -130
        });

        rangeDataItem.get("grid").setAll({
            stroke: color,
            strokeOpacity: 1,
            location: 1
        });

        rangeDataItem.get("tick").setAll({
            stroke: color,
            strokeOpacity: 1,
            location: 1,
            visible: true,
            length: 130
        });

        legendData.push({
            name: label,
            color: color
        });
    }


    createRange("ICPA", "LICENCIADO EN GEOLOGÍA", chart.get("colors").getIndex(16));
    createRange("ICSE", "LICENCIADO EN CIENCIA POLÍTICA", chart.get("colors").getIndex(1));
    createRange("IDEI", "LICENCIADO EN ADMINISTRACIÓN PÚBLICA", chart.get("colors").getIndex(9));
    createRange("IEC", "ESPECIALISTA EN ENSEÑANZA DE LA MATEMÁTICA", chart.get("colors").getIndex(12));

    /* legend.data.setAll(legendData); */

    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    
   var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
        xAxis: xAxis,
        yAxis: yAxis})); 

 

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    /* series.appear();
    chart.appear(1000, 100); */

    series.data.setAll(data);

    series.appear(1000, 100);

}); // end am5.ready()