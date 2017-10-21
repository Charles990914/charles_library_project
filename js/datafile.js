var counter = 0;
var students_list = new Array();
var class_list = {};

d3.csv("./data/namelist/2016届-Table 1.csv", function (data) {

    // 初始化学生名单
    for (var i = 0; i < data.length; i++) {
        //console.log(data[i]["class1601_id"]);

        for (var j = 1; j <= 10; j++) {

            var cstr = "";
            if (j < 10) {
                cstr = "0" + j;
            } else {
                cstr = "10";
            }

            var student = {
                grade: 3,
                id: data[i]["class16" + cstr + "_id"],
                name: data[i]["class16" + cstr + "_name"],
                class: "16" + cstr,
                sex: data[i]["class16" + cstr + "_sex"],
                friends: [],
                free_time: [],
                isInLibrary: false
            }

            if (student.id.length != 0) {
                students_list.push(student);

                // 统计班级人数
                if (class_list["16" + cstr] == undefined) {
                    class_list["16" + cstr] = 1;
                } else {
                    class_list["16" + cstr] += 1;
                }
            }
        }

    }

    counter++;
    checkLoadingProcess();

});

d3.csv("./data/namelist/2017届-Table 1.csv", function (data) {


    // 初始化学生名单
    for (var i = 0; i < data.length; i++) {
        //console.log(data[i]["class1601_id"]);

        for (var j = 1; j <= 11; j++) {

            var cstr = "";
            if (j < 10) {
                cstr = "0" + j;
            } else {
                cstr = j.toString();
            }

            var student = {
                grade: 2,
                id: data[i]["class17" + cstr + "_id"],
                name: data[i]["class17" + cstr + "_name"],
                class: "17" + cstr,
                sex: data[i]["class17" + cstr + "_sex"],
                friends: [],
                free_time: [],
                isInLibrary: false
            }

            if (student.id.length != 0) {
                students_list.push(student);

                // 统计班级人数
                if (class_list["17" + cstr] == undefined) {
                    class_list["17" + cstr] = 1;
                } else {
                    class_list["17" + cstr] += 1;
                }
            }
        }

    }
    counter++;
    checkLoadingProcess();
});


d3.csv("./data/namelist/2018届-Table 1.csv", function (data) {

    // 初始化学生名单
    for (var i = 0; i < data.length; i++) {
        //console.log(data[i]["class1601_id"]);

        for (var j = 1; j <= 10; j++) {

            var cstr = "";
            if (j < 10) {
                cstr = "0" + j;
            } else {
                cstr = "10";
            }

            var student = {
                grade: 1,
                id: data[i]["class18" + cstr + "_id"],
                name: data[i]["class18" + cstr + "_name"],
                class: "18" + cstr,
                sex: data[i]["class18" + cstr + "_sex"],
                friends: [],
                free_time: [],
                isInLibrary: false
            };

            if (student.id.length != 0) {
                students_list.push(student);

                // 统计班级人数
                if (class_list["18" + cstr] == undefined) {
                    class_list["18" + cstr] = 1;
                } else {
                    class_list["18" + cstr] += 1;
                }
            }
        }

    }

    counter++;
    checkLoadingProcess();
});

function checkLoadingProcess() {
    console.log(class_list);
    if (counter == 3) {
        // 初始化朋友关系
        initFriends();

        main();
    }
}


function checkFriend(stu1, stu2) {
    var isfind = false;
    for (var i = 0; i < stu1.friends.length; i++) {
        if (stu1.friends[i] == stu2) {
                isfind = true;
            }

    }
    return isfind;
}

function checkAvailable(stu1, stu2) {
    var isfind = false;
    for (var i = 0; i < stu1.friends.length; i++) {
        if (stu1.friends[i] == stu2) {
            if (stu1.sex == stu2.sex) {
                isfind = true;
            }
            else {
               if (Math.random() > .5){
                   isfind = true;
               }
               else isfind = false;
            }
        }
    }
    return isfind;
}

function initFriends() {
    for (var a = 0; a < students_list.length; a++) {
        var student = students_list[a];
        student.free_time.push("1*12:00-13:10", "1*16:30-18:00", "2*12:00-13:10", "2*16:30-18:00",
            "3*12:00-13:10", "3*16:30-18:00", "4*12:00-13:10", "4*16:30-18:00", "5*12:00-13:10")
        if (student.class == "1801") {
            student.free_time.push("1*15:50-16:30", "3*15:50-16:30", "4*15:00-15:40", "4*15:50-16:30");
        }
        if (student.class == "1802") {
            student.free_time.push("1*15:50-16:30", "3*15:50-16:30", "4*14:10-14:50", "4*15:50-16:30");
        }
        if (student.class == "1803") {
            student.free_time.push("1*15:50-16:30", "3*15:50-16:30", "4*15:00-15:40", "4*15:50-16:30");
        }
        if (student.class == "1804") {
            student.free_time.push("1*15:50-16:30", "3*15:50-16:30", "4*15:00-15:40", "4*15:50-16:30");
        }
        if (student.class == "1805") {
            student.free_time.push("1*15:50-16:30", "3*15:50-16:30", "4*13:15-13:55", "4*15:50-16:30");
        }
        if (student.class == "1806") {
            student.free_time.push("3*15:50-16:30", "4*15:50-16:30");
        }
        if (student.class == "1807") {
            student.free_time.push("1*15:50-16:30", "3*15:50-16:30", "4*15:50-16:30");
        }
        if (student.class == "1808") {
            student.free_time.push("1*15:50-16:30", "3*15:50-16:30", "4*15:50-16:30");
        }
        if (student.class == "1809") {
            student.free_time.push("1*15:50-16:30", "3*15:50-16:30", "4*15:50-16:30");
        }
        if (student.class == "1810") {
            student.free_time.push("1*15:50-16:30", "3*15:00-15:40", "3*15:50-16:30", "4*14:10-14:50", "4*15:50-16:30");
        }
        if (student.class == "1701") {
            student.free_time.push("1*15:50-16:30", "3*13:15-13:55", "3*15:50-16:30", "4*13:15-13:55", "4*15:50-16:30");
        }
        if (student.class == "1702") {
            student.free_time.push("1*15:50-16:30", "2*14:10-14:50", "3*15:50-16:30", "4*14:10-14:50", "4*15:50-16:30");
        }
        if (student.class == "1703") {
            student.free_time.push("1*15:00-15:40", "3*15:00-15:40", "3*15:50-16:30", "4*15:50-16:30");
        }
        if (student.class == "1704") {
            student.free_time.push("1*15:00-15:40", "3*15:00-15:40", "3*15:50-16:30", "4*15:50-16:30");
        }
        if (student.class == "1705") {
            student.free_time.push("1*15:00-15:40", "3*15:00-15:40", "3*15:50-16:30", "4*15:50-16:30");
        }
        if (student.class == "1706") {
            student.free_time.push("1*15:00-15:40", "3*15:00-15:40", "3*15:50-16:30", "4*15:50-16:30");
        }
        if (student.class == "1707") {
            student.free_time.push("1*15:50-16:30", "3*15:50-16:30", "4*15:50-16:30");
        }
        if (student.class == "1708") {
            student.free_time.push("3*15:50-16:30", "4*15:50-16:30");
        }
        if (student.class == "1709") {
            student.free_time.push("3*15:50-16:30", "4*15:50-16:30");
        }
        if (student.class == "1710") {
            student.free_time.push("1*15:50-16:30", "3*15:50-16:30", "4*15:50-16:30");
        }
        if (student.class == "1711") {
            student.free_time.push("1*15:50-16:30", "3*15:50-16:30", "4*15:50-16:30");
        }
        if (student.class == "1601") {
            student.free_time.push("1*9:30-10:10", "1*13:15-13:55", "1*15:50-16:30", "2*7:50-8:30", "2*8:40-9:20",
                "2*13:15-13:55", "2*15:50-16:30", "3*13:15-13:55", "3*14:10-14:50", "3*15:00-15:40", "3*15:50-16:30",
                "4*13:15-13:55", "4*15:50-16:30");
        }
        if (student.class == "1602") {
            student.free_time.push("1*9:30-10:10", "1*13:15-13:55", "1*15:50-16:30", "2*7:50-8:30", "2*8:40-9:20",
                "2*13:15-13:55", "2*15:50-16:30", "3*13:15-13:55", "3*14:10-14:50", "3*15:00-15:40", "3*15:50-16:30",
                "4*13:15-13:55", "4*15:50-16:30");
        }
        if (student.class == "1603") {
            student.free_time.push("1*9:30-10:10", "1*13:15-13:55", "1*15:50-16:30", "2*7:50-8:30", "2*8:40-9:20",
                "2*13:15-13:55", "2*15:50-16:30", "3*13:15-13:55", "3*14:10-14:50", "3*15:00-15:40", "3*15:50-16:30",
                "4*13:15-13:55", "4*15:50-16:30");
        }
        if (student.class == "1604") {
            student.free_time.push("1*9:30-10:10", "1*13:15-13:55", "1*15:50-16:30", "2*7:50-8:30", "2*8:40-9:20",
                "2*13:15-13:55", "2*15:50-16:30", "3*13:15-13:55", "3*14:10-14:50", "3*15:00-15:40", "3*15:50-16:30",
                "4*13:15-13:55", "4*15:50-16:30");
        }
        if (student.class == "1605") {
            student.free_time.push("1*9:30-10:10", "1*13:15-13:55", "1*15:50-16:30", "2*7:50-8:30", "2*8:40-9:20",
                "2*13:15-13:55", "2*15:50-16:30", "3*13:15-13:55", "3*14:10-14:50", "3*15:00-15:40", "3*15:50-16:30",
                "4*13:15-13:55", "4*15:50-16:30");
        }
        if (student.class == "1606") {
            student.free_time.push("1*9:30-10:10", "1*13:15-13:55", "1*15:50-16:30", "2*7:50-8:30", "2*8:40-9:20",
                "2*13:15-13:55", "2*15:50-16:30", "3*13:15-13:55", "3*14:10-14:50", "3*15:00-15:40", "3*15:50-16:30",
                "4*13:15-13:55", "4*15:50-16:30");
        }
        if (student.class == "1607") {
            student.free_time.push("1*9:30-10:10", "1*13:15-13:55", "1*15:50-16:30", "2*7:50-8:30", "2*8:40-9:20",
                "2*13:15-13:55", "2*15:50-16:30", "3*13:15-13:55", "3*14:10-14:50", "3*15:00-15:40", "3*15:50-16:30",
                "4*13:15-13:55", "4*15:50-16:30");
        }
        if (student.class == "1608") {
            student.free_time.push("1*9:30-10:10", "1*13:15-13:55", "1*15:50-16:30", "2*7:50-8:30", "2*8:40-9:20",
                "2*13:15-13:55", "2*15:50-16:30", "3*13:15-13:55", "3*14:10-14:50", "3*15:00-15:40", "3*15:50-16:30",
                "4*13:15-13:55", "4*15:50-16:30");
        }
        if (student.class == "1609") {
            student.free_time.push("1*13:15-13:55", "1*15:50-16:30", "2*13:15-13:55", "2*15:50-16:30", "3*13:15-13:55"
                , "3*15:50-16:30", "4*13:15-13:55", "4*15:50-16:30");
        }
        if (student.class == "1610") {
            student.free_time.push("1*13:15-13:55", "1*15:50-16:30", "2*13:15-13:55", "2*15:50-16:30", "3*13:15-13:55"
                , "3*15:50-16:30", "4*13:15-13:55", "4*15:50-16:30");
        }
        for (var b = 0; b < students_list.length; b++) {
            // 同班同学
            if (student.class == students_list[b].class) {
                student.friends.push(students_list[b]);
            }
        }

        var cc = student.friends.length - class_list[student.class];
        for (var c = 0; c < students_list.length; c++) {
            // 同级不同班
            if (student.class != students_list[c].class &&
                student.class.substr(0, 2) == students_list[c].class.substr(0, 2)) {
                var isfriend = true;
                if (Math.random() < 0.1) {
                    isfriend = true;
                } else {
                    isfriend = false;
                }

                if (isfriend && cc < 60 && checkFriend(student)) {

                    if ((students_list[c].friends.length - class_list[students_list[c].class]) < 60) {
                        student.friends.push(students_list[c]);
                        students_list[c].friends.push(student);
                        cc++;
                    }
                }
            }
        }

        var ccc = student.friends.length - class_list[student.class] - 60;
        for (var d = 0; d < students_list.length; d++) {
            // 不同级
            if (student.class.substr(0, 2) != students_list[d].class.substr(0, 2)) {
                var isfriend;
                if (Math.random() < 0.05) {
                    isfriend = true;
                } else {
                    isfriend = false;
                }

                if (isfriend && ccc < 40) {

                    if ((students_list[d].friends.length - class_list[students_list[d].class]) < 100) {
                        student.friends.push(students_list[d]);
                        students_list[d].friends.push(student);
                        ccc++;
                    }
                }
            }
        }


    }
    console.log(students_list);

}