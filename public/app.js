(function() {
    var app = angular.module('bullseye', ['rzModule']);

    app.controller('AppController', AppController);
    
    function AppController() {
      var ctrl = this;
      ctrl.strategies = ['Biz Strategy', 'Brand Strategy', 'Experience Strategy','Digital Transformation'];
      ctrl.segments = [
          {name:'Customers', audience:['Enterprise','Mid-Market','Consumer','Small-Scale']},
          {name:'Channels', audience:['Hybrid','National','International']},
          {name:'Suppliers', audience:['Affluent','Midlevel']},
          {name:'Employees', audience:['ITOps','Architects','CEOs']}
        ];
      ctrl.data = [
         {
          name: 'Digital Transformation',
          data:{
            'Customers':{
              'Enterprise':1,
              'Mid-Market':2,
              'Consumer':3,
              'Small-Scale':4
            },
            'Channels':{
              'Hybrid': 2,
              'National':3,
              'International':4
            },
            'Suppliers':{
              'Affluent':8,
              'Midlevel':9
            },
            'Employees':{
              'ITOps': 5,
              'Architects': 7,
              'CEOs': 4
            }
          }
        },
        {
          name: 'Experience Strategy',
          data:{
            'Customers':{
              'Enterprise':1,
              'Mid-Market':2,
              'Consumer':3,
              'Small-Scale':4
            },
            'Channels':{
              'Hybrid': 2,
              'National':3,
              'International':4
            },
            'Suppliers':{
              'Affluent':8,
              'Midlevel':9
            },
            'Employees':{
              'ITOps': 5,
              'Architects': 7,
              'CEOs': 4
            }
          }
        },
        {
          name: 'Biz Strategy',
          data:{
            'Customers':{
              'Enterprise':1,
              'Mid-Market':2,
              'Consumer':3,
              'Small-Scale':4
            },
            'Channels':{
              'Hybrid': 2,
              'National':3,
              'International':4
            },
            'Suppliers':{
              'Affluent':8,
              'Midlevel':9
            },
            'Employees':{
              'ITOps': 5,
              'Architects': 7,
              'CEOs': 4
            }
          }
        },
        {
          name: 'Brand Strategy',
          data:{
            'Customers':{
              'Enterprise':1,
              'Mid-Market':2,
              'Consumer':3,
              'Small-Scale':4
            },
            'Channels':{
              'Hybrid': 2,
              'National':3,
              'International':4
            },
            'Suppliers':{
              'Affluent':8,
              'Midlevel':9
            },
            'Employees':{
              'ITOps': 5,
              'Architects': 7,
              'CEOs': 4
            }
          }
        }
      ];
      ctrl.width = window.innerWidth;
      ctrl.height = window.innerHeight;
    }
})();
