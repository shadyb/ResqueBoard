angular.module("app").controller("scheduledJobController",["$scope","$timeout","$http",function(a,b,c){"use strict";a.jobs=[],a.loading=!1,a.date=!1,a.stats={total:0,future:0,past:0};var d=new CalHeatMap,e=new Date,f=8,g="api/scheduled-jobs/stats/{{t:start}}/{{t:end}}";d.init({itemSelector:"#scheduled-jobs-graph",legend:[1,4,8,12],itemName:["job","jobs"],range:f,start:e,cellSize:10,animationDuration:200,tooltip:!0,nextSelector:"#scheduled-jobs-graph .graph-browse-next",previousSelector:"#scheduled-jobs-graph .graph-browse-previous",data:g,onClick:function(b){a.loading=!0;var d=d3.time.format("%H:%M, %A %B %e %Y");a.date=d(b),c({method:"GET",url:"api/scheduled-jobs/"+ +b/1e3+"/"+(+b/1e3+60)}).success(function(b){a.jobs=[];for(var c in b){for(var d in b[c])b[c][d].created=new Date(1e3*b[c][d].s_time);a.jobs=b}a.loading=!1}).error(function(){})}}),e=d.options.start,a.clear=function(){a.date=!1,a.jobs=[]};var h=5e3,i=function(){c({method:"GET",url:"api/stats?fields=scheduled_full"}).success(function(b){a.stats=b.scheduled}).error(function(){}),d.update(g),new Date-e>36e5*f&&d.next(),b(i,h)};i()}]);