(function() {
    var app = angular.module("bullseye", []);

    app.controller("AppController", AppController);

    function AppController() {
      var ctrl = this;
      ctrl.strategies = ['Biz Strategy', 'Brand Strategy', 'Experience Strategy','Digital Transformation'];
      ctrl.segments = [
          {name:'Customers', audience:['Enterprise','Mid-Market','Consumer','Small-Scale']},
          {name:'Channels', audience:['Hybrid','National','International']},
          {name:'Suppliers', audience:['Affluent','Midlevel']},
          {name:'Employees', audience:['ITOps','Architects','CEOs']}
        ];
      ctrl.width = window.innerWidth;
      ctrl.height = window.innerHeight;
    }
})();
