// This is JSON - JavaScript Object Notation
// Key - value pair

var tasks = [];

// build the tasks array by collecting the
// entered tasks and their difficulty level and who they are assiged to
function taskListBuilder() {
  // console.log("Building a list of tasks!");
  event.preventDefault(); //to prevent the form from submitting to server and refreshing the page

  var form = document.querySelector("form");
  // var form = document.getElementById("todo-tasks");
  //create a new house JSON

  // Find the task
  var name = form.taskName.value;

  // Find who the task is assigned to
  var personName = countTasksAssigned();

  // group task by difficulty
  // groupAssignedTasksByDifficulty();

  // Find the difficulty of the task
  var d = document.getElementById("difficulty");
  var selected = d.options[d.selectedIndex].text;

  var newTask = {task: name, person: personName, difficult: selected};
  form.taskName.value = "";
  tasks.push(newTask);
}


// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['corechart']});

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawChart);


// Hold all our count data in key/value format so it's easy to access
var taskCounter = {
  jeremy: 0,
  victor: 0,
  robert: 0,
  david: 0,
  michael:0
};

// Hold all our count data in key/value format so it's easy to access
var taskDifficulty = {
  jeremy: [0, 0, 0, 0],
  victor: [0, 0, 0, 0],
  robert: [0, 0, 0, 0],
  david:  [0, 0, 0, 0],
  michael:[0, 0, 0, 0]
};


// count the number of tasks assigned to each person
function countTasksAssigned() {
  var form = document.querySelector("form");

  // Find who the task is assigned to
  var radios = document.getElementsByName("assignee");
  var forId = form.assignee.value;
  var whoIs = 'label[for=' + radios[forId].id + ']';
  var assigned = document.querySelector(whoIs);


  var d = document.getElementById("difficulty");
  var selected = d.options[d.selectedIndex].text;

  if(assigned.innerHTML === "Jeremy"){
    taskCounter.jeremy += 1;

    if (selected === "Easy") {
      taskDifficulty.jeremy[0] += 1;
    } else if (selected === "Regular") {
      taskDifficulty.jeremy[1] += 1;
    } else if (selected === "Hard") {
      taskDifficulty.jeremy[2] += 1;
    } else if (selected === "Devilish") {
      taskDifficulty.jeremy[3] += 1;
    }
  } else if (assigned.innerHTML === "Victor") {
    taskCounter.victor += 1;

    if (selected === "Easy") {
      taskDifficulty.victor[0] += 1;
    } else if (selected === "Regular") {
      taskDifficulty.victor[1] += 1;
    } else if (selected === "Hard") {
      taskDifficulty.victor[2] += 1;
    } else if (selected === "Devilish") {
      taskDifficulty.victor[3] += 1;
    }
  }  else if (assigned.innerHTML === "Robert") {
    taskCounter.robert += 1;

    if (selected === "Easy") {
      taskDifficulty.robert[0] += 1;
    } else if (selected === "Regular") {
      taskDifficulty.robert[1] += 1;
    } else if (selected === "Hard") {
      taskDifficulty.robert[2] += 1;
    } else if (selected === "Devilish") {
      taskDifficulty.robert[3] += 1;
    }

  }  else if (assigned.innerHTML === "David") {
    taskCounter.david += 1;

    if (selected === "Easy") {
      taskDifficulty.david[0] += 1;
    } else if (selected === "Regular") {
      taskDifficulty.david[1] += 1;
    } else if (selected === "Hard") {
      taskDifficulty.david[2] += 1;
    } else if (selected === "Devilish") {
      taskDifficulty.david[3] += 1;
    }
  }  else if (assigned.innerHTML === "Michael") {
    taskCounter.michael += 1;

    if (selected === "Easy") {
      taskDifficulty.michael[0] += 1;
    } else if (selected === "Regular") {
      taskDifficulty.michael[1] += 1;
    } else if (selected === "Hard") {
      taskDifficulty.michael[2] += 1;
    } else if (selected === "Devilish") {
      taskDifficulty.michael[3] += 1;
    }
  }


  // var div1 = document.getElementById("list-container");
  var parent = document.querySelector("#list-container");
  //clear out any existing staff
  // parent.innerHTML = "";
  parent.innerHTML = "<h3>Task Assignment Chart: </h3>";

  // draw pie chart
  drawChart();

  // draw stacked column chart
  drawStacked();

    // parent.innerHTML = "<hr>";
  return assigned.innerHTML;
}

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawChart() {

    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'People');
    data.addColumn('number', 'Numer of Tasks');

    data.addRows([
          ['Jeremy', taskCounter.jeremy],
          ['Victor', taskCounter.victor],
          ['Robert', taskCounter.robert],
          ['David', taskCounter.david],
          ['Michael', taskCounter.michael]
    ]);

    // Set chart options
    var options = {'title':'Number of Tasks Assigned to Each Person',
                       'width':400,
                       'height':300};

   // Instantiate and draw our chart, passing in some options.
   var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
   chart.draw(data, options);
}





google.charts.load('current', {packages: ['corechart', 'bar']});
google.charts.setOnLoadCallback(drawStacked);



function drawStacked() {
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'People');
  data.addColumn('number', 'Easy Tasks');
  data.addColumn('number', 'Regular Tasks');
  data.addColumn('number', 'Hard Tasks');
  data.addColumn('number', 'Devilish Tasks');

  var t = taskDifficulty;

  data.addRows([
    ['Jeremy', t.jeremy[0], t.jeremy[1], t.jeremy[2], t.jeremy[3]],
    ['Victor', t.victor[0], t.victor[1], t.victor[2], t.victor[3]],
    ['Robert', t.robert[0], t.robert[1], t.robert[2], t.robert[3]],
    ['David', t.david[0], t.david[1], t.david[2], t.david[3]],
    ['Michael', t.michael[0], t.michael[1], t.michael[2], t.michael[3]],
  ]);

  var options = {
    title: 'Task Assigned to People Grouped by Difficulty',
    isStacked: true,
    hAxis: {
      title: 'People',
      format: 'String'
    },
    vAxis: {
      title: 'Difficulty of Task'
    }
  };

  var chart = new google.visualization.ColumnChart(document.getElementById('chart_column'));
  chart.draw(data, options);
}



function onWindowLoad() {
   //Select the form, and attach houseBuilder as onSubmit handler
   var form = document.querySelector("form");
   form.onsubmit = taskListBuilder;
}

window.onload = onWindowLoad;
