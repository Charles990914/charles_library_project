(function() {

        var dataStuff = {};
        document.dataStuff = dataStuff;
        var curData = {
                "1500": 0,
                "1530": 80,
                "1600": 0,
                "1630": 80,
                "1700": 0,
                "1730": 80,
                "1800": 0,
                "1830": 80,
                "1900": 0,
                "1930": 80,
                "2000": 0,
                "2030": 80,
                "2100": 0,
                "2130": 80,
                "2200": 0,
                "2230": 80,
                "2300": 85,
                "2330": 90,
                "0000": 30,
                "0030": 55,
                "0100": 55,
                "0130": 55,
                "0200": 55,
                "0230": 55,
                "0300": 55,
                "0330": 55,
                "0400": 55,
                "0430": 55,
                "0500": 55,
                "0530": 55,
                "0600": 55,
                "0630": 55,
                "0700": 55,
                "0730": 55,
                "0800": 55,
                "0830": 55,
                "0900": 55,
                "0930": 55,
                "1000": 55,
                "1030": 55,
                "1100": 55,
                "1130": 55,
                "1200": 55,
                "1230": 55,
                "1300": 55,
                "1330": 55,
                "1400": 55,
                "1430": 55,
        };
        var times = [
                "1500",
                "1530",
                "1600",
                "1630",
                "1700",
                "1730",
                "1800",
                "1830",
                "1900",
                "1930",
                "2000",
                "2030",
                "2100",
                "2130",
                "2200",
                "2230",
                "2300",
                "2330",
                "0000",
                "0030",
                "0100",
                "0130",
                "0200",
                "0230",
                "0300",
                "0330",
                "0400",
                "0430",
                "0500",
                "0530",
                "0600",
                "0630",
                "0700",
                "0730",
                "0800",
                "0830",
                "0900",
                "0930",
                "1000",
                "1030",
                "1100",
                "1130",
                "1200",
                "1230",
                "1300",
                "1330",
                "1400",
                "1430",
        ];

        dataStuff.update = function() {
                var totalPeople = 0;

                for (var t in curData)
                        curData[t] = 0;

                for (var year in document.data) {
                        if (document.controls.years[year]) {
                                for (var course in document.data[year]) {
                                        if (document.controls.courses[course]) {
                                                totalPeople += document.data[year][course].total;
                                                for (var t in document.data[year][course].times) {
                                                        curData[t] += document.data[year][course].times[t];
                                                }
                                        }
                                }
                        }
                }


                if (totalPeople == 0) {
                        totalPeople = 1;
                        $("#sampleSize").html(0);
                        $("#hoursPerNight").html("&mdash;");
                        $("#stayUpTill").html("&mdash;");
                        $("#wakeUpAt").html("&mdash;");


                        return;
                }

                var totalHours = 0;
                for (var t in curData)
                        totalHours += curData[t];
                totalHours /= 2;

                // make curData percent
                for (var t in curData) {
                        console.log(curData[t]);
                        curData[t] /= totalPeople / 100;
                }

                var stayUpTill = 1500;
                for (var i=0; i<times.length; i++) {
                        if (curData[times[i]] > 50)
                                break;
                        stayUpTill = times[i];
                }

                var wakeUpAt = 1430;
                for (var i=times.length; i>=0; i--) {
                        if (curData[times[i]] > 50)
                                break;
                        wakeUpAt = times[i];
                }


                function milit2twelve (m) {
                        if (m == "0000")
                                return "midnight";
                        if (m == "1200")
                                return "noon";
                        var hr = (m+"").substring(0,2) * 1;
                        var min = (m+"").substring(2,4) * 1;
                        var ampm = hr >= 12 ? "p.m." : "a.m.";
                        if (hr > 12)
                                hr -= 12;
                        if (hr == 0)
                                hr = 12;
                        if (min == 0)
                                min = "00";
                        return hr + ":" + min + " " + ampm;
                }

                $("#sampleSize").html(totalPeople);
                $("#hoursPerNight").html((totalHours/totalPeople).toFixed(1));
                $("#stayUpTill").html(milit2twelve(stayUpTill));
                $("#wakeUpAt").html(milit2twelve(wakeUpAt));
        };

        dataStuff.sleepData = function () {
                var values = [];
                for (var i=0; i<times.length; i++) {
                        values.push({"label": times[i], "value": curData[times[i]], "color": '#001F54'});
                }

                return [{
                        "key": "When are MIT students asleep?",
                        "values": values,
                }];
        };

        dataStuff.update();


})();