(function () {
  var app = angular.module('bullseye', ['rzModule']);

  app.controller('AppController', AppController);

  function AppController() {
    var ctrl = this;
    ctrl.strategies = ['Biz Strategy', 'Brand Strategy', 'Experience Strategy', 'Digital Transformation'];
    ctrl.segments = [
      { name: 'Customers', audience: ['Enterprise', 'Mid-Market', 'Consumer', 'Small-Scale'] },
      { name: 'Channels', audience: ['Hybrid', 'National', 'International'] },
      { name: 'Suppliers', audience: ['Affluent', 'Midlevel'] },
      { name: 'Employees', audience: ['ITOps', 'Architects', 'CEOs'] }
    ];
    ctrl.data = [
      {
        name: 'Digital Transformation',
        data: {
          'Customers':
          [
            {
              name: 'Enterprise',
              'avgValue': 4,
              'userAccessed': false,
              'userValue': 3,
              'isEnabled': true
            },
            {
              name: 'Mid-Market',
              'avgValue': 6,
              'userAccessed': true,
              'userValue': 5,
              'isEnabled': true
            },
            {
              name: 'Consumer',
              'avgValue': 8,
              'userAccessed': false,
              'userValue': 5,
              'isEnabled': false
            },
            {
              name: 'Small-Scale',
              'avgValue': 7,
              'userAccessed': false,
              'userValue': 5,
              'isEnabled': true
            }
          ],
          'Channels':
          [
            {
              name: 'Hybrid',
              'avgValue': 1,
              'userAccessed': false,
              'userValue': 3,
              'isEnabled': true
            },
            {
              name: 'National',
              'avgValue': 8,
              'userAccessed': false,
              'userValue': 5,
              'isEnabled': true
            },
            {
              name: 'International',
              'avgValue': 6,
              'userAccessed': true,
              'userValue': 5,
              'isEnabled': true
            }
          ],
          'Suppliers':
          [
            {
              name: 'Affluent',
              'avgValue': 7,
              'userAccessed': false,
              'userValue': 3,
              'isEnabled': true
            },
            {
              name: 'Midlevel',
              'avgValue': 5,
              'userAccessed': true,
              'userValue': 5,
              'isEnabled': true
            }
          ],
          'Employees':
          [
            {
              name: 'ITOps',
              'avgValue': 6,
              'userAccessed': false,
              'userValue': 3,
              'isEnabled': true
            },
            {
              name: 'Architects',
              'avgValue': 8,
              'userAccessed': false,
              'userValue': 5,
              'isEnabled': true
            },
            {
              name: 'CEOs',
              'avgValue': 4,
              'userAccessed': true,
              'userValue': 5,
              'isEnabled': true
            }
          ]

        },
        
      },
      {
        name: 'Biz Strategy',
        data: {
          'Customers':
          [
            {
              name: 'Enterprise',
              'avgValue': 1,
              'userAccessed': false,
              'userValue': 3,
              'isEnabled': true
            },
            {
              name: 'Mid-Market',
              'avgValue': 4,
              'userAccessed': true,
              'userValue': 5,
              'isEnabled': true
            },
            {
              name: 'Consumer',
              'avgValue': 4,
              'userAccessed': false,
              'userValue': 5,
              'isEnabled': true
            },
            {
              name: 'Small-Scale',
              'avgValue': 4,
              'userAccessed': true,
              'userValue': 5,
              'isEnabled': true
            }
          ],
          'Channels':
          [
            {
              name: 'Hybrid',
              'avgValue': 1,
              'userAccessed': false,
              'userValue': 3,
              'isEnabled': true
            },
            {
              name: 'National',
              'avgValue': 4,
              'userAccessed': true,
              'userValue': 5,
              'isEnabled': true
            },
            {
              name: 'International',
              'avgValue': 6,
              'userAccessed': false,
              'userValue': 5,
              'isEnabled': true
            }
          ],
          'Suppliers':
          [
            {
              name: 'Affluent',
              'avgValue': 1,
              'userAccessed': true,
              'userValue': 3,
              'isEnabled': true
            },
            {
              name: 'Midlevel',
              'avgValue': 8,
              'userAccessed': true,
              'userValue': 5,
              'isEnabled': true
            }
          ],
          'Employees':
          [
            {
              name: 'ITOps',
              'avgValue': 1,
              'userAccessed': false,
              'userValue': 3,
              'isEnabled': true
            },
            {
              name: 'Architects',
              'avgValue': 9,
              'userAccessed': false,
              'userValue': 5,
              'isEnabled': true
            },
            {
              name: 'CEOs',
              'avgValue': 6,
              'userAccessed': true,
              'userValue': 5,
              'isEnabled': true
            }
          ]
        }
      }
    ];
    ctrl.width = window.innerWidth;
    ctrl.height = window.innerHeight;

    ctrl.callback = function (selectedScore) {
      console.log('appjs' + selectedScore)
    }
  }

})();
