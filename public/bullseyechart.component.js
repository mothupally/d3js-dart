(function () {
  angular.module("bullseye").component("bullseyeChart", {
    bindings: {
      strategies: '<',
      segments: '<',
      audience: '<',
      width: '<',
      height: '<',
      data: '<',
      onUpdate: '&'
    },
    controller: ChartController,
    templateUrl: "./bullseyechart.template.html"
  });

  function ChartController() {
    var ctrl = this;
    var innerRadius = 0;
    var outerRadius = 100;
    var radiusWidth = outerRadius - innerRadius;
    ctrl.arcs = [];
    ctrl.$onInit = function () {
      createArcsdata();
      drawAxes();
      drawCircle();
      drawStratergyTextElements();
      setupStratergyIcons();
    }

    function findElement(array, element){
      if(!Array.isArray(array)){
        return;
      }
      for(var i=0; i< array.length; i++){
        if(array[i].name === element){
          return array[i];
        }
      }
    }
    
    function createArcsdata() {
      var radiusWidth = outerRadius - innerRadius;
      var baseangle = 0;
      var padding = 0.75;

      for (var i = 0; i < ctrl.strategies.length; i++) {
        var strategy = '';
        var audience = '';
        var segment = '';
        var label = '';
        var score = {
          userValue: '',
          avgValue: '',
          userAccessed: false,
          isEnabled: true
        };
        for (var j = 0; j < ctrl.segments.length; j++) {
          var crossangle = 90 / ctrl.segments[j].audience.length;
          var startangle = j * 90;

          for (var l = 0; l < ctrl.segments[j].audience.length; l++) {
            startangle = l * crossangle + j * 90;
            endangle = startangle + crossangle;
            strategy = ctrl.strategies[i];
            audience = ctrl.segments[j].audience[l];
            segment = ctrl.segments[j].name;

            if (i === ctrl.strategies.length - 1) {
              label = audience;
            }
            var segmentdata = findElement(ctrl.data, strategy);
            if(segmentdata && segmentdata.data && segmentdata.data[segment]){
             score = findElement(segmentdata.data[segment], audience);
            }
            ctrl.arcs.push({
              name: "arc_" + i + "_" + j + "_" + l,
              scoreid: "arc_" + i + "_" + j + "_" + l,
              innerradius: innerRadius,
              outerradius: outerRadius,
              startangle: startangle,
              endangle: endangle,
              strategy: strategy,
              segment: segment,
              audience: audience,
              label: label,
              score: score,
              userValue: score.userValue
            });
          }
        }
        innerRadius += radiusWidth + padding;
        outerRadius += radiusWidth;
      }
    }

    // x and y axes
    function drawAxes() {
      //Create the Scale we will use for the XAxis
      var axisScale = d3.scale.linear()
        .range([0 - outerRadius + radiusWidth, outerRadius - radiusWidth]);

      //Create the Axis
      var axis = d3.svg.axis()
        .scale(axisScale)
        .tickFormat("");

      var xAxisGroup = d3.selectAll("#xaxes")
        .attr("class", "axis")
        .call(axis);

      // define the y axis
      var yAxis = d3.svg.axis()
        .orient("left")
        .scale(axisScale)
        .tickFormat("");

      var yAxisGroup = d3.selectAll("#yaxes")
        .attr("class", "axis")
        .call(yAxis);
    }

    // segment circle
    function drawCircle() {
      var circleRadius =  innerRadius + 60;
      drawArc(circleRadius, circleRadius+1, 0, 90, ctrl.segments[0].name,"25%", "middle","30px");
      drawArc(circleRadius, circleRadius+1, 90, 180, ctrl.segments[1].name,"25%", "middle","30px");
      drawArc(circleRadius, circleRadius+1, 180, 270, ctrl.segments[2].name,"25%", "middle","30px");
      drawArc(circleRadius, circleRadius+1, 270, 360, ctrl.segments[3].name,"25%", "middle","30px");
    }

    function drawArc(innerRadius, outerRadius, startangle, endangle,segmentname, startOffset,textanchor,fontsize) {

      var arc = d3.svg.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius)
        .startAngle(startangle * Math.PI / 180)
        .endAngle(endangle * Math.PI / 180);
      svg = d3.select("#chart svg #circle");
      d3.selectAll("#circle")
        .append("path")
        .attr("class", "customer-arc")
        .attr("d", arc)
        .attr("id", function (d, i) { return "id_" + segmentname; });
        svg.append("text")
        .attr("dy", -13)
        .append("textPath")
        .attr("startOffset", startOffset)
        .style("text-anchor", textanchor)
        .attr("xlink:href", function (d, i) { return "#id_" + segmentname; })
        .style("font-size", fontsize)
        .text(segmentname);

    }

    function drawStratergyTextElements(){
      var radius = radiusWidth / 2;
      drawArc(radius, radius, 0, 90, ctrl.strategies[0],"2%", "start","12px");
      radius += radiusWidth;
      drawArc(radius, radius, 0, 90, ctrl.strategies[1],"2%", "start","15px");
      radius += radiusWidth;
      drawArc(radius, radius, 0, 90, ctrl.strategies[2],"1%", "start","15px");
      radius += radiusWidth;
      drawArc(radius, radius, 0, 90, ctrl.strategies[3],"1%", "start","15px");
    }
    
    function setupStratergyIcons(){
        var y = -1*radiusWidth;
        y = y + 0.32 * y;
        var x = '-25'; 
        var size = '55';
        var bizStratergypng = 'Biz.png';
        var brandStratergypng = 'brand.png';
        var experienceStratergypng = 'exp.png';
        var digStratergypng = 'digi.png';
        
        setupIcon(x,y,size,bizStratergypng, ctrl.strategies[0]);
        y = y - radiusWidth;
        setupIcon(x,y,'65',brandStratergypng, ctrl.strategies[1]);
        y = y - radiusWidth;
        setupIcon(x,y,size,experienceStratergypng, ctrl.strategies[2]);
        y = y - radiusWidth;
        setupIcon(x,y,size,digStratergypng, ctrl.strategies[3]);
    }
    
    ctrl.getStrategyId = function(id){
      return id.replace(' ','_');
    }
    function setupIcon(x, y, size, icon, strategydivId){
        d3.selectAll("#icons")
          .append("svg:image")
          .attr('x', x)
          .attr('y', y)
          .attr('width', size)
          .attr('height', size)
          .attr('xlink:href', icon)
          .on('mouseenter',function(d){
            console.log('mouse in');
             var stgdiv = document.getElementById(ctrl.getStrategyId(strategydivId));
            stgdiv.style.opacity = 1;
            stgdiv.style.left = d3.event.pageX + 30 +  "px";
            stgdiv.style.top = d3.event.pageY - 28 + "px";
            stgdiv.style.position = 'absolute';
          })
         .on('mouseleave', function(d){
           console.log('mouse out');
            var stgdiv = document.getElementById(ctrl.getStrategyId(strategydivId));
           stgdiv.style.opacity = 0;
         });
    }

    ctrl.arclicked = function (data) {
      // Make a service call and save the data model
    }
    
    ctrl.callback = function(selectedScore, scoreid){
      score = selectedScore;
      scoreid = scoreid;
      var arc = findElement(ctrl.arcs, scoreid);
      if(arc){
        arc.score.avgValue = (arc.score.avgValue + selectedScore)/2;
        arc.score.userValue = selectedScore;
        arc.score.userAccessed = true;
        arc.userValue = selectedScore;
      }
      ctrl.onUpdate({selectedScore: selectedScore});
    }
  }
})();
