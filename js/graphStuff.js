(function() {

        var graphStuff = {
                nvd3chart: {}
        };

        document.graphStuff = graphStuff;

        graphStuff.update = function() {
                d3.select('#chart1 svg')
                        .datum(document.dataStuff.sleepData())
                        .transition()
                        .duration(1000)
                        .call(graphStuff.nvd3chart);
        };

        nv.addGraph(function() {

                graphStuff.nvd3chart = nv.models.discreteBarChart()
                        .x(function(d) {return d.label})
                        .y(function(d) {return d.value})
                        .staggerLabels(false)
                        .showValues(false)
                        .forceY([0,100])
                        .tooltips(true)
                        .tooltipContent(function(key, x, y, e, graph) {

                                function milit2twelve (m) {
                                        if (m == "0000")
                                                return "midnight";
                                        if (m == "1200")
                                                return "noon";
                                        var hr = m.substring(0,2) * 1;
                                        var min = m.substring(2,4) * 1;
                                        var ampm = hr >= 12 ? "p.m." : "a.m.";
                                        var daynight = (hr >= 5 && hr < 19) ? "day" : "night";
                                        if (hr > 12)
                                                hr -= 12;
                                        if (hr == 0)
                                                hr = 12;
                                        if (min == 0)
                                                min = "00";
                                        return "<b>" + hr + ":" + min + " " + ampm + "</b> on a typical week" + daynight;
                                }

                                return '<div style="width:200px;">At ' + milit2twelve(x) + ', <b>' + (y * 1).toFixed(1) + '%</b> of respondents in the selected groups are asleep.</div>';
                        });

                graphStuff.nvd3chart.xAxis
                        .axisLabel('Time')
                        .rotateLabels(-40);

                graphStuff.nvd3chart.yAxis
                        .axisLabel('Percent of People Asleep')
                        .tickFormat(d3.format('n'));

                // d3.select('#chart1 svg')
                //     .datum(sleepData2())
                //   .transition().duration(500).call(graphStuff.nvd3chart);

                graphStuff.update();

                nv.utils.windowResize(graphStuff.nvd3chart.update);

                return graphStuff.nvd3chart;
        });


})()