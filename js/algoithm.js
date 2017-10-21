var table = new Array();
for (var i = 0; i < 36; i++) {
        table[i] = {
                id: i + 1,
                tl: null,
                tr: null,
                bl: null,
                br: null
        }
}

function main() {
        var day = sss.toString();
        grade1 = new Array();
        grade2 = new Array();
        grade3 = new Array();
        grade1Num = new Array();
        grade2Num = new Array();
        grade3Num = new Array();


        for (var b = 0; b < timelist.length; b++) {
                var freelist = findFreeStudent(day, timelist[b]);

                var ss1 = 0;
                var ss2 = 0;
                var ss3 = 0;
                for (var h = 0; h < freelist.length; h++) {
                        if (freelist[h].grade == 1) {
                                ss1++;
                        }
                        if (freelist[h].grade == 2) {
                                ss2++;
                        }
                        if (freelist[h].grade == 3) {
                                ss3++;
                        }

                }

                var arr = arrangeSeat(freelist, ss1, ss2, ss3);
                grade1.push(changeToPercantage(arr[1]));
                grade2.push(changeToPercantage(arr[2]));
                grade3.push(changeToPercantage(arr[3]));
                grade1Num.push(ss1);
                grade2Num.push(ss2);
                grade3Num.push(ss3);
                //
                // console.log(timelist[b] + ": " + ss1 + ", " + ss2 + ", " + ss3);
                // console.log(timelist[b] + ": " + arr[1] + ", " + arr[2] + ", " + arr[3]);
        }

        option.series[0].data = grade1;
        option.series[1].data = grade2;
        option.series[2].data = grade3;
        myChart.setOption(option);
}

function changeToPercantage(number) {
        return ((number / 144) * 100).toFixed(3)
}

var timelist = ["7:50-8:30", "8:40-9:20", "9:30-10:10", "10:30-11:10",
        "11:20-12:00", "12:00-13:10", "13:15-13:55", "14:10-14:50", "15:00-15:40",
        "15:50-16:30", "16:30-18:00", "18:00-21:00"];

function findFreeStudent(day, time) {
        var freeStudent = new Array
        for (var i = 0; i < students_list.length; i++) {
                var stu = students_list[i];
                for (var a = 0; a < stu.free_time.length; a++) {
                        var tstr = stu.free_time[a].split("*");
                        if (day == tstr[0] && time == tstr[1]) {
                                freeStudent.push(stu);
                        }
                }
        }
        return freeStudent;
}

function GetRandomNum(Min, Max) {
        var Range = Max - Min;
        var Rand = Math.random();
        return (Min + Math.round(Rand * Range));
}

function arrangeSeat(freelist, grade1, grade2, grade3) {

        // 清理人物和座位
        for (var a = 0; a < freelist.length; a++) {
                freelist[a].isInLibrary = false;
        }
        for (var a = 0; a < freelist.length; a++) {
                freelist[a].isInLibrary = false;
        }
        for (a = 0; a < table.length; a++) {
                table[a].tl = null;
                table[a].tr = null;
                table[a].bl = null;
                table[a].br = null;
        }
        for (a = 0; a < dataSeat.length; a++) {
                dataSeat[a].value[4] = 0;
        }

        var count1 = 0;
        var count2 = 0;
        var count3 = 0;
        var seatCheckTable = {
                bl: ["tl", "br"],
                tl: ["bl", "tr"],
                tr: ["br", "tl"],
                br: ["tr", "bl"]
        };

        for (var kk = 0; kk < 1000; kk++) {

                var arrLeft = new Array();
                for (var k = 0; k < freelist.length; k++) {
                        if (!freelist[k].isInLibrary) {
                                arrLeft.push(k);
                        }
                }
                if (arrLeft.length == 0) {
                        break;
                }

                var idx = GetRandomNum(0, arrLeft.length - 1);
                var stu = freelist[arrLeft[idx]];
                //console.log(stu.id + " " + stu.isInLibrary + " " + stu.grade);

                // 判断某个年级的人数是否已到达上限
                if ((count1 == grade1) && stu.grade == 1) {
                        continue;
                }
                if ((count2 == grade2) && stu.grade == 2) {
                        continue;
                }
                if ((count3 == grade3) && stu.grade == 3) {
                        continue;
                }

                if (stu.grade == 1) {
                        count1++;
                }
                else if (stu.grade == 2) {
                        count2++;
                }
                else {
                        count3++;
                }

                // pick the table
                var tarr = [];
                for(var k = 0; k < table.length; k++) {
                        tarr.push(k);
                }
                tarr.sort(function () {
                        return Math.random() > .5
                });

                for (var i = 0; i < tarr.length; i++) {

                        var idx = tarr[i];

                        var arr = ["bl", "tl", "tr", "br"];
                        arr.sort(function () {
                                return Math.random() > .5
                        });

                        var isfind = false;
                        for(var ia = 0; ia < arr.length; ia++) {

                                if(table[idx][arr[ia]] == null) {
                                        var obj = seatCheckTable[arr[ia]];
                                        //console.log(table[idx][obj[0]]);
                                        if (checkSeat(stu, table[idx][obj[0]], table[idx][obj[1]])) {
                                                table[idx][arr[ia]] = stu;
                                                stu.isInLibrary = true;
                                                findSeat(table[idx].id, arr[ia], stu.id, stu.sex);
                                                isfind = true;
                                                break;
                                        }
                                }
                        }

                        if(isfind) {
                                break;
                        }
                }
        }


        // 检查结果
        var str = "";
        for (var j = 0; j < table.length; j++) {
                var bl, tl, tr, br;
                if (table[j].bl != null) {
                        bl = table[j].bl.id;
                } else {
                        bl = "xxxxxxxxx";
                }
                if (table[j].tl != null) {
                        tl = table[j].tl.id;
                } else {
                        tl = "xxxxxxxxx";
                }
                if (table[j].tr != null) {
                        tr = table[j].tr.id;
                } else {
                        tr = "xxxxxxxxx";
                }
                if (table[j].br != null) {
                        br = table[j].br.id;
                } else {
                        br = "xxxxxxxxx";
                }
                str += "table" + table[j].id + ": " + tl + " " + tr + "\n" + "         " + bl + " " + br + "\n";
        }
        //console.log(str);
        //console.log(freelist);
        //console.log(count1 + ", " + count2 + ", " + count3);

        // 统计结果
        var count = 0;
        var s1 = 0;
        var s2 = 0;
        var s3 = 0;
        for (var h = 0; h < freelist.length; h++) {
                if (freelist[h].isInLibrary) {
                        count++;

                        if (freelist[h].grade == 1) {
                                s1++;
                        }
                        if (freelist[h].grade == 2) {
                                s2++;
                        }
                        if (freelist[h].grade == 3) {
                                s3++;
                        }
                }
        }

        return [count, s1, s2, s3];
}

function findSeat(tid, posi, sid, sex) {

        for (var i = 0; i < dataSeat.length; i++) {
                if (dataSeat[i].value[2] == tid && dataSeat[i].value[3] == posi) {
                        dataSeat[i].value[4] = sid;
                        if(sex == '男') {
                                dataSeat[i].symbol = 'rect';
                        } else {
                                dataSeat[i].symbol = 'circle';
                        }
                        break;
                }
        }
}

function checkSeat(stu, seat1, seat2) {

        if (seat1 == null && seat2 == null) {
                return true;
        }

        var s1flg = false;
        if (seat1 != null) {
                if (checkAvailable(stu, seat1)) {
                        s1flg = false;
                } else {
                        s1flg = true;
                }
        }

        var s2flg = false;
        if (seat2 != null) {
                if (checkAvailable(stu, seat2)) {
                        s2flg = false;
                } else {
                        s2flg = true;
                }
        }

        if (s1flg) {
                return false;
        } else if (s2flg) {
                return false;
        } else {
                return true;
        }
}