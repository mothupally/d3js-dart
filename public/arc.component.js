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
      arcClicked: "&"
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
      svg = d3.select("#" + ctrl.svgParent + " svg > g");
      drawArc(ctrl.innerRadius, ctrl.outerRadius, ctrl.startAngle, ctrl.endAngle);
    };

    function initializeSlider() {
      ctrl.slider = {
        value: 0,
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

    function drawArc(innerRadius, outerRadius, startangle, endangle) {

      var id = ctrl.scoreid;
      var label = ctrl.label;
      var score = ctrl.score;
      arc = d3.svg.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius)
        .startAngle(startangle * Math.PI / 180)
        .endAngle(endangle * Math.PI / 180);
        //.padAngle(.003);
      svg.append("path")
        .attr("class", "arc")
        .attr("d", arc)
        .attr("id", function (d, i) { return "id_" + id; })
        .on("click", arcClick);
      svg.append("text")
        .attr("dy", -13)
        .append("textPath")
        .attr("startOffset", "15%")
        .style("text-anchor", "middle")
        .attr("xlink:href", function (d, i) { return "#id_" + id; })
        .text(label);
      var circle = svg.append("circle")
      .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
      .attr("cx", function(d) { return "translate(" + arc.centroid(d) + ")"; })
      .attr("cy", function(d) { return "translate(" + arc.centroid(d) + ")"; })
      .attr("r", "10")
      .style("fill","green");
      svg.append("text")
      .attr("transform", function(d) {
          var x = arc.centroid(d)[0] - 5;
          var y = arc.centroid(d)[1] + 5;
         return "translate(" + x +"," + y + ")"; })
      .text(score);
    }

    function arcClick() {
      var x = window.innerWidth / 2 + d3.mouse(this)[0];
      var y = window.innerHeight / 2 + d3.mouse(this)[1];
      scoreElement = document.getElementById(ctrl.scoreid);
      scoreElement.style.left = x + 'px';
      scoreElement.style.top = y + 'px';
      scoreElement.style.display = "block";
      ctrl.arcClicked({ data: 'test' });
    }

    ctrl.hideScorebox = function () {
      scoreElement = document.getElementById(ctrl.scoreid);
      scoreElement.style.display = "none";
    }

  }

})();
