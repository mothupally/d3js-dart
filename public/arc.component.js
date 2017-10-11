(function () {
  angular.module("bullseye").component("bullseyeArc", {
    bindings: {
      scoreid: "<",
      startAngle: "<",
      endAngle: "<",
      innerRadius: "<",
      outerRadius: "<",
      padding: "<",
      strategy: "<",
      segment: "<",
      audience: "<",
      svgParent: "@",
      label: "<",
      score: "<",
      arcClicked: "&",
      arcCallback: "&"
    },
    controller: ArcController,
    templateUrl: "./arc.template.html"
  });

  ArcController.$inject = ["$window", "$scope"];

  function ArcController($window, $scope) {
    var svg;
    var arc;
    var ctrl = this;
    var scoreElement;
    
    ctrl.$onInit = function () {
      initializeSlider();
      drawArc(ctrl.innerRadius, ctrl.outerRadius, ctrl.startAngle, ctrl.endAngle);
    };

    function initializeSlider() {
      var scoreValue = 0;
      if(ctrl.score && ctrl.score.userValue){
        scoreValue = ctrl.score.userValue;
      }
      ctrl.slider = {
        value: scoreValue,
        options: {
          floor: 0,
          ceil: 10,
          step: 1,
          showSelectionBar: true,
          getPointerColor: function (value) {
            if (value <= 4)
              return 'red';
            if (value <= 7)
              return 'orange';
            return '#2AE02A';
          },
          getSelectionBarColor: function(value) {
             if (value <= 4)
              return 'red';
            if (value <= 7)
              return 'orange';
            return '#2AE02A';
        }
        }
      };
    }

    ctrl.$onChanges = function(componentProperties){
      if((typeof componentProperties.score !== 'undefined') && (typeof componentProperties.score.currentValue !== 'undefined')) {
        drawArc(ctrl.innerRadius, ctrl.outerRadius, ctrl.startAngle, ctrl.endAngle);
      }
    }

    function drawArc(innerRadius, outerRadius, startangle, endangle) {
      svg = d3.select("#" + ctrl.svgParent + " svg > g");
      var id = ctrl.scoreid;
      var label = ctrl.label;
      var score = ctrl.score;

      arc = d3.svg.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius)
        .startAngle(startangle * Math.PI / 180)
        .endAngle(endangle * Math.PI / 180)
        .padAngle(0.001);

        
        enableClick(svg, arc, id);
        
        setSegmentLabel(svg, label, id);
        if(score && score.avgValue){
          setScore(svg, score);
        }
        
    }

    function enableClick(svg, arc, id){
      var arcClass = 'arc';
      if(ctrl.score && ctrl.score.userAccessed){
        arcClass = 'user-arc';
      }
      var arcComponent = svg.append("path")
        .attr("class", arcClass)
        .attr("d", arc)
        .attr("id", function (d, i) { return "id_" + id; })
        .on("click", arcClick);
    }
    
    function setSegmentLabel(svg, label, id){
      svg.append("text")
        .attr("dy", -13)
        .append("textPath")
        .attr("startOffset", "15%")
        .style("text-anchor", "middle")
        .attr("xlink:href", function (d, i) { return "#id_" + id; })
        .text(label);
    }
    
    function setScore(svg, score){
      var scoreColor = 'green';
      if(score.avgValue <= 4)
        scoreColor = 'red';
      else if (score.avgValue <= 7)
        scoreColor = 'orange';
      else
        scoreColor = '#2AE02A';
      
       var circle = svg.append("circle")
      .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
      .attr("cx", function(d) { return "translate(" + arc.centroid(d) + ")"; })
      .attr("cy", function(d) { return "translate(" + arc.centroid(d) + ")"; })
      .attr("r", "10")
      .style("fill", scoreColor);
      svg.append("text")
      .attr("transform", function(d) {
          var x = arc.centroid(d)[0] - 5;
          var y = arc.centroid(d)[1] + 5;
         return "translate(" + x +"," + y + ")"; })
      .text(score.avgValue);
    }
    
    function arcClick() {
      var x = window.innerWidth / 2 + d3.mouse(this)[0];
      var y = window.innerHeight / 2 + d3.mouse(this)[1];
      scoreElement = document.getElementById(ctrl.scoreid);
      scoreElement.style.left = x + 'px';
      scoreElement.style.top = y + 'px';
      scoreElement.style.display = "block";
    }

    ctrl.hideScorebox = function () {
      scoreElement = document.getElementById(ctrl.scoreid);
      scoreElement.style.display = "none";
      console.log(ctrl.slider.value);
      if(!ctrl.score || ctrl.slider.value !== ctrl.score.userValue){
        ctrl.arcCallback({selectedScore: ctrl.slider.value, scoreid: ctrl.scoreid}); 
      }
    }
  }
})();
