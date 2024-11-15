import{a as _,b as y}from"./chunk-ZKZTFVTC.js";import"./chunk-JUQ4HMHQ.js";import{c as v}from"./chunk-ZK5AIQ47.js";import{a as x,c as D,e as R,g as E}from"./chunk-Y2A3B5DR.js";import"./chunk-PY3B2YYB.js";import{Ab as s,Bb as m,Cb as f,Da as d,Dc as g,Kb as C,Tb as M,Xa as u,Ya as r,Yb as T,fa as c,ib as l,jc as I,oa as h,wa as p}from"./chunk-NXOHNOOV.js";var U=(()=>{class i extends y{constructor(t,e,a,n){super(e,a,n),this.localeId=t,this.canvasId="temperatureChart",this.meanTemperature=[],this.maxTemperature=[],this.minTemperature=[],this.time=[]}ngOnChanges(t){t.forecastResult&&!t.forecastResult.isFirstChange()&&(this.calculateDataSets(),this.createChart())}ngAfterViewInit(){this.datePipe=new g(this.localeId),this.calculateDataSets(),super.ngAfterViewInit()}calculateDataSets(){let t=this.forecastResult?.list||[];this.meanTemperature=[],this.maxTemperature=[],this.minTemperature=[],this.time=[],t.forEach(e=>{let{main:{temp:a,temp_max:n,temp_min:O},dt:o}=e;if(!o){console.warn(`Date not found for forecast ${e}`);return}let P=this.datePipe.transform(o*1e3,"MMM, d HH");this.time.push(P),this.meanTemperature.push(a),this.maxTemperature.push(n),this.minTemperature.push(O)})}createChart(){let t={labels:this.time,datasets:[{data:this.meanTemperature,label:"Mean"},{data:this.maxTemperature,label:"Max"},{data:this.minTemperature,label:"Min"}]};if(this.chart){this.chart.data=t,this.chart.update();return}this.chart=new _(this.canvasId,{type:"line",data:t,options:{}}),this.updateColors()}static{this.\u0275fac=function(e){return new(e||i)(r(I),r(v),r(p),r(d))}}static{this.\u0275cmp=c({type:i,selectors:[["app-temperature-chart"]],inputs:{forecastResult:"forecastResult"},standalone:!0,features:[l,h,T],decls:5,vars:1,consts:[[3,"id"]],template:function(e,a){e&1&&(s(0,"mat-card")(1,"mat-card-header"),M(2,"Temperature (\xB0C)"),m(),s(3,"mat-card-content"),f(4,"canvas",0),m()()),e&2&&(u(4),C("id",a.canvasId))},dependencies:[E,x,D,R],styles:["[_nghost-%COMP%]   mat-card[_ngcontent-%COMP%]{height:100%}[_nghost-%COMP%]   mat-card-content[_ngcontent-%COMP%]{height:calc(100% - 2rem - 20px)}"]})}}return i})();export{U as TemperatureChartComponent};