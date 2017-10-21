(function() {

        var controls = {
                years: {},
                courses: {},
                yearDict: {
                        "Freshman": "Freshmen",
                        "Sophomore": "Sophomores",
                        "Junior": "Juniors",
                        "Senior": "Seniors",
                        "Masters": "Master's students",
                        "PhD": "PhD students"
                },
                courseDict: {
                        "Course1": "Course 1",
                        "Course2": "Course 2",
                        "Course3": "Course 3",
                        "Course4": "Course 4",
                        "Course5": "Course 5",
                        "Course6": "Course 6",
                        "Course7": "Course 7",
                        "Course8": "Course 8",
                        "Course9": "Course 9",
                        "Course10": "Course 10",
                        "Course11": "Course 11",
                        "Course12": "Course 12",
                        "Course14": "Course 14",
                        "Course15": "Course 15",
                        "Course16": "Course 16",
                        "Course17": "Course 17",
                        "Course18": "Course 18",
                        "Course20": "Course 20",
                        "Course21": "Course 21",
                        "Course22": "Course 22",
                        "Course24": "Course 24",
                        "Other": "Undeclared/Other"
                },
                yearGroupDict: {
                        "All": {
                                "list": ["Freshman", "Sophomore", "Junior", "Senior","Masters","PhD"],
                                "display": "All"
                        },
                        "None": {
                                "list": [],
                                "display": "None"
                        },
                        "Undergraduate": {
                                "list": ["Freshman", "Sophomore", "Junior", "Senior"],
                                "display": "Undergraduates"
                        },
                        "Graduate": {
                                "list": ["Masters","PhD"],
                                "display": "Graduate students"
                        }
                },
                courseGroupDict: {
                        "All": {
                                "list": ["Course1","Course2","Course3","Course4","Course5","Course6","Course7","Course8","Course9","Course10","Course11","Course12","Course14","Course15","Course16","Course17","Course18","Course20","Course21","Course22","Course24","Other"],
                                "display": "All"
                        },
                        "None": {
                                "list": [],
                                "display": "None"
                        },
                        "Architecture": {
                                "list": ["Course4","Course11"],
                                "display": "Architecture & Planning"
                        },
                        "Engineering": {
                                "list": ["Course1","Course2","Course3","Course6","Course10","Course16","Course20","Course22"],
                                "display": "Engineering"
                        },
                        "HASS": {
                                "list": ["Course17","Course14","Course21","Course24"],
                                "display": "Humanities, Arts, & Social Sciences"
                        },
                        "Management": {
                                "list": ["Course15"],
                                "display": "Management"
                        },
                        "Science": {
                                "list": ["Course5","Course7","Course8","Course9","Course12","Course18"],
                                "display": "Science"
                        }
                }
        }

        document.controls = controls;

        controls.initYearGroup = "Undergraduate";
        controls.initCourseGroup = "All";

        controls.setupControls = function () {
                for (var year in controls.yearDict) {
                        if (controls.yearGroupDict[controls.initYearGroup].list.indexOf(year) >= 0)
                                controls.years[year] = true;
                        else
                                controls.years[year] = false;
                }
                for (var course in controls.courseDict) {
                        if (controls.courseGroupDict[controls.initCourseGroup].list.indexOf(course) >= 0)
                                controls.courses[course] = true;
                        else
                                controls.courses[course] = false;
                }
        };
        controls.toggle = function (controlType, list) { // e.g. toggle('years',[Freshman])
                for (var i=0; i<list.length; i++) {
                        controls[controlType][list[i]] = !controls[controlType][list[i]];
                }
        }
        controls.set = function (controlType, list, val) {
                for (var i=0; i<list.length; i++) {
                        controls[controlType][list[i]] = val;
                }
        }
        controls.makeClickables = function () {
                for (var s in controls.years) {
                        $("#years").append("<span id='year" + s + "' class='yearControl'>" + controls.yearDict[s] + "</span>");
                }
                for (var s in controls.courses) {
                        $("#courses").append("<span id='course" + s + "' class='courseControl'>" + controls.courseDict[s] + "</span>");
                }
                for (var g in controls.yearGroupDict) {
                        $("#yearGroups").append("<span id='yearGroup" + g + "' class='yearGroupControl'>" + controls.yearGroupDict[g].display + "</span>");
                }
                for (var g in controls.courseGroupDict) {
                        $("#courseGroups").append("<span id='courseGroup" + g + "' class='courseGroupControl'>" + controls.courseGroupDict[g].display + "</span>");
                }
        };
        controls.update = function() {
                for (var y in controls.years) {
                        if (controls.years[y])
                                $("#year"+y).addClass("selected");
                        else
                                $("#year"+y).removeClass("selected");
                }
                for (var c in controls.courses) {
                        if (controls.courses[c])
                                $("#course"+c).addClass("selected");
                        else
                                $("#course"+c).removeClass("selected");
                }
        };
        controls.updateAll = function() {
                document.controls.update();
                document.dataStuff.update();
                document.graphStuff.update();
        }


        document.controls.setupControls();
        document.controls.makeClickables();
        document.controls.update();
        $("#yearGroup" + controls.initYearGroup).addClass("selected");
        $("#courseGroup" + controls.initCourseGroup).addClass("selected");

        $(".yearControl").click(function() {
                controls.toggle("years",[$(this).attr("id").substring("year".length)]);
                $(".yearGroupControl").removeClass("selected");
                controls.updateAll();
        });
        $(".courseControl").click(function() {
                controls.toggle("courses",[$(this).attr("id").substring("course".length)]);
                $(".courseGroupControl").removeClass("selected");
                controls.updateAll();
        });
        $(".yearControl").dblclick(function() {
                controls.set("years",controls.yearGroupDict.All.list,false);
                controls.set("years",[$(this).attr("id").substring("year".length)],true);
                $(".yearGroupControl").removeClass("selected");
                controls.updateAll();
        });
        $(".courseControl").dblclick(function() {
                controls.set("courses",controls.courseGroupDict.All.list,false);
                controls.set("courses",[$(this).attr("id").substring("course".length)],true);
                $(".courseGroupControl").removeClass("selected");
                controls.updateAll();
        });
        $(".yearGroupControl").click(function() {
                controls.set("years",controls.yearGroupDict.All.list,false);
                controls.set("years",controls.yearGroupDict[$(this).attr("id").substring("yearGroup".length)].list,true);
                $(".yearGroupControl").removeClass("selected");
                $(this).addClass("selected");
                controls.updateAll();
        });
        $(".courseGroupControl").click(function() {
                controls.set("courses",controls.courseGroupDict.All.list,false);
                controls.set("courses",controls.courseGroupDict[$(this).attr("id").substring("courseGroup".length)].list,true);
                $(".courseGroupControl").removeClass("selected");
                $(this).addClass("selected");
                controls.updateAll();
        });


})();