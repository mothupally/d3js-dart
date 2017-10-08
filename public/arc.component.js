(function() {
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
        ctrl.$onInit = function() {
            svg = d3.select("#" + ctrl.svgParent + " svg > g");
            drawArc(ctrl.innerRadius, ctrl.outerRadius, ctrl.startAngle, ctrl.endAngle);
        };


        function drawArc(innerRadius, outerRadius, startangle, endangle) {
          
          var id = ctrl.scoreid;
          var label = ctrl.label;
            arc = d3.svg.arc()
                .innerRadius(innerRadius)
                .outerRadius(outerRadius)
                .startAngle(startangle * Math.PI / 180)
                .endAngle(endangle * Math.PI / 180);
            svg.append("path")
                .attr("class", "arc")
                .attr("d", arc)
                .attr("id", function(d,i){return "id_" + id;})
                .on("click", arcClick);
            svg.append("text")
                .attr("dy", -13)
                .append("textPath")
                .attr("startOffset","15%")
			          .style("text-anchor","middle")
                .attr("xlink:href",function(d,i){return "#id_" + id;})
                .text(label);

        }

        function arcClick(){
          var x = window.innerWidth / 2 + d3.mouse(this)[0];
          var y = window.innerHeight / 2 + d3.mouse(this)[1];
          scoreElement = document.getElementById(ctrl.scoreid);
          scoreElement.style.left = x + 'px';
          scoreElement.style.top = y + 'px';
          scoreElement.style.display = "block";
          ctrl.arcClicked({data:'test'});
        }

        ctrl.hideToolTip = function() {
           scoreElement = document.getElementById(ctrl.scoreid);
            scoreElement.style.display = "none";
        }

    }

})();
