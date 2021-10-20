function checnum(as) {
    var a = as.value;

    for (var x = 0; x < a.length; x++) {
        var ff = a[x];
        if (isNaN(a) || ff == " " || ff == "-") {
            a = a.substring(0, a.length - 1);
            as.value = a;
        }
    }
}

function tabls_creation() {
    // if something is already present then make it reset
    document.getElementById("mktbl").innerHTML = "";
    document.getElementById("t").innerHTML = "";
    //   if no of jobs is empty then this
    if ($("#nac").val() == "" || $("#mac").val() == "") {
        document.getElementById("mktbl").innerHTML = "";
        document.getElementById("t").innerHTML = "";
    } else if (
        parseFloat($("#nac").val()) > 50 ||
        parseFloat($("#mac").val()) > 50
    ) {
        alert("Jobs and Machine are out of limit");
        $("#nac").val("");
        $("#mac").val("");
    } else {
        var nac = parseFloat($("#nac").val());
        var mac = parseFloat($("#mac").val());
        // Declare variables and create the header, footer, and caption.
        var oTable = document.createElement("TABLE");
        var oTHead = document.createElement("THEAD");
        var oTBody = document.createElement("TBODY");
        var oRow, oCell;
        var i, j;

        // Declare stock data that would normally be read in from a stock Web site.
        var heading = new Array();

        heading[0] = "Jobs";
        for (i = 1; i <= mac; i++) {
            heading[i] = "Machine " + String(i);
        }

        // Insert the created elements into oTable.
        oTable.appendChild(oTHead);
        oTable.appendChild(oTBody);
        oTable.setAttribute("class", "center table ");
        // Insert a row into the header and set its background color.
        oRow = document.createElement("TR");
        oTHead.appendChild(oRow);

        // Create and insert cells into the header row.
        for (a = 0; a <= mac; a++) {
            oCell = document.createElement("TH");
            oCell.setAttribute("class", "text-center");
            oCell.innerHTML = heading[a];
            oRow.appendChild(oCell);
        }

        var idval;
        // Insert rows and cells into bodies.
        for (i = 0; i < nac; i++) {
            oRow = document.createElement("TR");
            oRow.setAttribute("align", "center");
            oTBody.appendChild(oRow);
            for (j = 0; j <= mac; j++) {
                oCell = document.createElement("TD");
                if (j == 0) {
                    oCell.innerHTML = "Job<sub>" + (i + 1) + "</sub>";
                } else {
                    idval = "mac" + String(j - 1) + String(i);
                    readonly = false;
                    oCell.innerHTML =
                        "<input type=text size=4 id=" +
                        idval +
                        " " +
                        readonly +
                        " onkeyup=checnum(this);>";
                }
                oRow.appendChild(oCell);
            }
        }

        // Insert the table into the document tree.
        var frtb = document.getElementById("mktbl");
        frtb.appendChild(oTable);
    }
}

// initialize variables
var MAX = 50;
var data = new Array(MAX);
for (var i = 0; i < MAX; i++) {
    data[i] = new Array(MAX);
}
var no_of_machines;
var no_of_jobs;
var sequence = new Array(MAX);
var sequenceMark = new Array(MAX);
var idleTime = new Array(MAX);
var inTime = new Array(MAX);
for (var i = 0; i < MAX; i++) {
    inTime[i] = new Array(MAX);
}
var outTime = new Array(MAX);
for (var i = 0; i < MAX; i++) {
    outTime[i] = new Array(MAX);
}
var fakeMachine = new Array(MAX);
for (var i = 0; i < MAX; i++) {
    fakeMachine[i] = new Array(MAX);
}
var totalTime;
for (var i = 0; i < MAX; i++) {
    sequence[i] = 0;
    sequenceMark[i] = 0;
    idleTime[i] = 0;
    for (j = 0; j < MAX; j++) {
        data[i][j] = 0;
        inTime[i][j] = 0;
        outTime[i][j] = 0;
        fakeMachine[i][j] = 0;
    }
}
function makeFakeMachine() {
    for (var i = 0; i < no_of_jobs; i++) {
        for (var j = 0; j < no_of_machines - 1; j++) {
            fakeMachine[0][i] = Number(fakeMachine[0][i]) + Number(data[j][i]);
        }
    }
    for (var i = 0; i < no_of_jobs; i++) {
        for (var j = 1; j < no_of_machines; j++) {
            fakeMachine[1][i] = Number(fakeMachine[1][i]) + Number(data[j][i]);
        }
    }
}
function countTotalTime() {
    totalTime = Number(outTime[no_of_machines - 1][no_of_jobs - 1]);
}
function countIdleTime() {
    countTotalTime();
    for (var i = 0; i < no_of_machines; i++) {
        idleTime[i] = Number(inTime[i][0]);
        for (var j = 1; j < no_of_jobs; j++) {
            idleTime[i] =
                Number(idleTime[i]) +
                Number(inTime[i][j]) -
                Number(outTime[i][j - 1]);
        }
        idleTime[i] =
            Number(idleTime[i]) +
            Number(totalTime) -
            Number(outTime[i][no_of_jobs - 1]);
    }
}
function calculateInOutTime() {
    for (var i = 0; i < no_of_machines; i++) {
        if (i == 0) {
            inTime[i][0] = 0;
            outTime[i][0] = Number(data[i][sequence[0] - 1]);
            for (var j = 1; j < no_of_jobs; j++) {
                inTime[i][j] = Number(outTime[i][j - 1]);
                outTime[i][j] =
                    Number(data[i][sequence[j] - 1]) + Number(inTime[i][j]);
            }
        } else {
            for (var j = 0; j < no_of_jobs; j++) {
                if (j == 0) {
                    inTime[i][j] = Number(outTime[i - 1][j]);
                    outTime[i][j] =
                        Number(data[i][sequence[j] - 1]) + Number(inTime[i][j]);
                } else {
                    if (Number(outTime[i - 1][j]) < Number(outTime[i][j - 1]))
                        inTime[i][j] = Number(outTime[i][j - 1]);
                    else inTime[i][j] = Number(outTime[i - 1][j]);
                    outTime[i][j] =
                        Number(inTime[i][j]) + Number(data[i][sequence[j] - 1]);
                }
            }
        }
    }
}
function getMinValue(array, no) {
    var min = 9999;
    for (var i = 0; i < no; i++)
        if (Number(sequenceMark[i]) != 1)
            if (min > Number(array[i])) min = Number(array[i]);
    return min;
}
function getPosition(array, start, end, value) {
    for (var i = start; i < end; i++)
        if (Number(sequenceMark[i]) != 1)
            if (value == Number(array[i])) return i;
    return -1;
}
function countValue(array, no, value) {
    var count = 0;
    for (var i = 0; i < no; i++)
        if (Number(sequenceMark[i]) != 1)
            if (value == Number(array[i])) count++;
    return count;
}
function makeSequence(array) {
    var i, j, minOfM1, minOfM2;
    var pos = -1,
        temp_pos = -1,
        totalMin,
        totalMin1,
        min,
        max;
    var start = 0,
        end = no_of_jobs - 1;
    for (i = 0; i < no_of_jobs; i++) {
        minOfM1 = getMinValue(array[0], no_of_jobs);
        minOfM2 = getMinValue(array[1], no_of_jobs);
        temp_pos = pos = -1;
        if (minOfM1 < minOfM2) {
            totalMin = countValue(array[0], no_of_jobs, minOfM1);
            for (j = 0; j < totalMin; j++) {
                min = 9999;
                if (totalMin > 1) {
                    temp_pos = getPosition(
                        array[0],
                        temp_pos + 1,
                        no_of_jobs,
                        minOfM1
                    );
                    if (Number(array[1][temp_pos]) < min) {
                        min = Number(array[1][temp_pos]);
                        pos = temp_pos;
                    }
                } else pos = getPosition(array[0], pos + 1, no_of_jobs, minOfM1);
                sequence[start++] = pos + 1;
                sequenceMark[pos] = 1;
            }
        } else if (minOfM1 > minOfM2) {
            totalMin = countValue(array[1], no_of_jobs, minOfM2);
            for (j = 0; j < totalMin; j++) {
                if (totalMin > 1) {
                    max = 0;
                    for (var k = 0; k < totalMin; k++) {
                        temp_pos = getPosition(
                            array[1],
                            temp_pos + 1,
                            no_of_jobs,
                            minOfM2
                        );
                        if (Number(array[0][temp_pos]) > max) {
                            max = Number(array[0][temp_pos]);
                            pos = temp_pos;
                        }
                    }
                } else pos = getPosition(array[1], pos + 1, no_of_jobs, minOfM2);
                sequence[end--] = pos + 1;
                sequenceMark[pos] = 1;
            }
        } else if (minOfM1 == minOfM2 && minOfM1 != 9999) {
            totalMin = countValue(array[0], no_of_jobs, minOfM1);
            totalMin1 = countValue(array[1], no_of_jobs, minOfM2);
            for (j = 0; j < totalMin; j++) {
                pos = getPosition(array[0], pos + 1, no_of_jobs, minOfM1);
                sequence[start++] = pos + 1;
                sequenceMark[pos] = 1;
            }
            pos = -1;
            for (j = 0; j < totalMin1; j++) {
                pos = getPosition(array[1], pos + 1, no_of_jobs, minOfM2);
                if (sequenceMark[pos] == 0 && pos != -1) {
                    sequence[end--] = pos + 1;
                    sequenceMark[pos] = 1;
                }
            }
        }
    }
}
function getMax(data, row, col) {
    var i, j;
    var max = 0;
    for (i = 1; i < row - 1; i++) {
        for (j = 0; j < col; j++) {
            if (max < Number(data[i][j])) {
                max = Number(data[i][j]);
            }
        }
    }
    return max;
}
// var a = getMax(data, 3, 5);
// console.log(a);
function displaySequence() {
    console.log("sequence: ");
    for (var i = 0; i < no_of_jobs; i++) {
        console.log(sequence[i]);
    }
}
function sequencing_problem() {
    no_of_machines = 0;
    no_of_jobs = 0;
    totalTime = 0;
    for (var i = 0; i < MAX; i++) {
        sequence[i] = 0;
        sequenceMark[i] = 0;
        idleTime[i] = 0;
        for (j = 0; j < MAX; j++) {
            data[i][j] = 0;
            inTime[i][j] = 0;
            outTime[i][j] = 0;
            fakeMachine[i][j] = 0;
        }
    }
    document.getElementById("t").innerHTML = "";
    var nac = $("#nac").val();
    var mac = $("#mac").val();
    if (nac == "" || mac == "") {
        alert("Enter Values");
        $("#nac").focus();
        document.getElementById("mktbl").innerHTML = "";
        document.getElementById("t").innerHTML = "";
        return false;
    } else {
        var i, j;
        console.log("-----------------");
        for (i = 0; i < mac; i++) {
            for (j = 0; j < nac; j++) {
                data[i][j] = $("#mac" + i + j).val();
                // console.log(data[i][j]);
            }
        }
        console.log("-----------------");
        no_of_jobs = nac;
        no_of_machines = mac;
        if (no_of_machines > 2) {
            var minM1 = getMinValue(data[0], no_of_jobs);
            var maxMM_1 = getMax(data, no_of_machines, no_of_jobs);
            var minMM = getMinValue(data[no_of_machines - 1], no_of_jobs);
            if (minM1 >= maxMM_1 || minMM >= maxMM_1) {
                makeFakeMachine();
                makeSequence(fakeMachine);
            } else {
                alert("NOTE: Solution Can Not possible Sorry...!!!");
                clear_all();
            }
        } else makeSequence(data);
        displaySequence();
        calculateInOutTime();
        countIdleTime();


        // Declare variables and create the header, footer, and caption.
        var oTable = document.createElement("TABLE");
        var oTHead = document.createElement("THEAD");
        var oTBody = document.createElement("TBODY");
        var oRow, oCell;
        var i, j;

        // Declare stock data that would normally be read in from a stock Web site.
        var heading = new Array();

        heading[0] = "Jobs";
        for (i = 1; i <= mac + 1; i++) {
            heading[i] = "Machine " + String(i);
        }

        // Insert the created elements into oTable.
        oTable.appendChild(oTHead);
        oTable.appendChild(oTBody);
        oTable.setAttribute("class", "center table ");
        // Insert a row into the header and set its background color.
        oRow = document.createElement("TR");
        oTHead.appendChild(oRow);

        // Create and insert cells into the header row.
        for (a = 0; a <= mac; a++) {
            oCell = document.createElement("TH");
            if (a != 0) {
                oCell.setAttribute("colspan", 2);
            } else {
                oCell.setAttribute("rowspan", 2);
            }
            oCell.setAttribute("class", "text-center");
            oCell.innerHTML = heading[a];
            oRow.appendChild(oCell);
        }

        // Insert a row into the header and set its background color.
        oRow = document.createElement("TR");
        oTHead.appendChild(oRow);

        // Create and insert cells into the header row.
        for (a = 0; a < 2 * mac; a++) {
            oCell = document.createElement("TH");
            if (a % 2 == 0) {
                headval = "In";
            } else {
                headval = "Out";
            }
            oCell.setAttribute("class", "text-center");
            oCell.innerHTML = headval;
            oRow.appendChild(oCell);
        }

        // Insert rows and cells into bodies.
        for (i = 0; i < nac; i++) {
            oRow = document.createElement("TR");
            oRow.setAttribute("align", "center");
            oTBody.appendChild(oRow);
            for (j = 0; j <= mac; j++) {
                if (j == 0) {
                    oCell = document.createElement("TD");
                    oCell.innerHTML = "Job<sub>" + sequence[i] + "</sub>";
                    oRow.appendChild(oCell);
                    continue;
                }
                oCellIn = document.createElement("TD");
                oCellOut = document.createElement("TD");
                oCellIn.innerHTML = inTime[j - 1][i];
                oCellOut.innerHTML = outTime[j - 1][i];
                oRow.appendChild(oCellIn);
                oRow.appendChild(oCellOut);
            }
        }

        oRow = document.createElement("TR");
        oTBody.appendChild(oRow);
        oCell = document.createElement("TD");
        oCell.setAttribute("colspan", 2 * mac + 1);
        oCell.setAttribute("align", "center");
        oCell.setAttribute("class", "success");
        oCell.innerHTML = "Total Elapsed Time is " + totalTime;
        oRow.appendChild(oCell);

        for (var i = 1; i <= mac; i++) {
            oRow = document.createElement("TR");
            oTBody.appendChild(oRow);
            oCell = document.createElement("TD");
            oCell.setAttribute("colspan", 2 * mac + 1);
            oCell.setAttribute("align", "center");
            oCell.setAttribute("class", "info");
            oCell.innerHTML =
                "Idle Time of Machine " + i + " " + " is " + idleTime[i - 1];
            oRow.appendChild(oCell);
        }

        // Insert the table into the document tree.
        var frtb = document.getElementById("t");
        frtb.appendChild(oTable);
    }
}

function clear_all() {
    document.getElementById("mktbl").innerHTML = "";
    document.getElementById("t").innerHTML = "";
    $("#nac").val("");
    $("#mac").val("");
}