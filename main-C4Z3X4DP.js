import{f as ne,g as h,h as M,m as ae,n as C,p as se,u as de}from"./chunk-OZ3WVFMD.js";import{b as X,c as S,e as Q,g as N,n as ie,q as le}from"./chunk-XEFXM5D2.js";import{a as Z,b as q,c as I,d as J}from"./chunk-PLAWPLVZ.js";import{c as $,d as m,e as F,g as s,i as _,j as u,k as n}from"./chunk-6XXA7HXI.js";import{a as E,b as ee,c as te,d as re,e as oe}from"./chunk-ZK5AIQ47.js";import"./chunk-PY3B2YYB.js";import{$a as V,Ab as z,Bb as B,Cb as H,D as O,Ja as p,Sb as Y,U as w,X as P,Ya as D,Yb as G,Z as f,Za as L,aa as j,bb as v,ca as y,cb as W,da as l,eb as A,fa as x,fc as K,ja as k,n as c,sb as U,vc as R,x as b,za as g}from"./chunk-NXOHNOOV.js";var ce=$("animateRoute",[_("homeState => forecastState",[s({position:"relative"}),n(":enter, :leave",[s({position:"absolute",top:0,left:0,width:"100%"})]),n(":enter",[s({left:"100%",opacity:0})]),n(":leave",u()),F([n(":leave",[m("1s ease-out",s({left:"-100%",opacity:0}))]),n(":enter",[m("1s ease-out",s({left:"0%",opacity:1}))])]),n(":enter",u())]),_("forecastState => homeState",[s({position:"relative"}),n(":enter, :leave",[s({position:"absolute",top:0,right:0,width:"100%"})]),n(":enter",[s({right:"100%",opacity:0})]),n(":leave",u()),F([n(":leave",[m("1s ease-out",s({right:"-100%",opacity:0}))]),n(":enter",[m("1s ease-out",s({right:"0%",opacity:1}))])]),n(":enter",u())])]);var me=(()=>{class i{constructor(e,r){this.themeSubject=e,this.renderer=r}ngOnInit(){this.themeSubject.subscribe(e=>this.applyTheme(e))}applyTheme(e){let r=document.querySelector("body");r?.classList&&(this.renderer.removeClass(r,N("light")),this.renderer.removeClass(r,N("dark")),this.renderer.addClass(r,N(e)))}getRouteTransition(e){let{activatedRouteData:{animationState:r="static"}}=e;return r}static{this.\u0275fac=function(r){return new(r||i)(D(te),D(W))}}static{this.\u0275cmp=x({type:i,selectors:[["app-root"]],standalone:!0,features:[G],decls:3,vars:1,consts:[["outlet","outlet"]],template:function(r,o){if(r&1&&(z(0,"div"),H(1,"router-outlet",null,0),B()),r&2){let a=Y(2);U("@animateRoute",o.getRouteTransition(a))}},dependencies:[X],styles:["div[_ngcontent-%COMP%]{height:100%;width:100%;background-color:inherit}"],data:{animation:[ce]}})}}return i})();var Ie=(()=>{class i extends C{constructor(e,r,o){super(e,r,o)}ngOnDestroy(){this.flush()}static{this.\u0275fac=function(r){return new(r||i)(y(R),y(h),y(M))}}static{this.\u0275prov=f({token:i,factory:i.\u0275fac})}}return i})();function Se(){return new ae}function Ne(i,t,e){return new de(i,t,e)}var ue=[{provide:M,useFactory:Se},{provide:C,useClass:Ie},{provide:v,useFactory:Ne,deps:[I,C,g]}],Ee=[{provide:h,useFactory:()=>new se},{provide:p,useValue:"BrowserAnimations"},...ue],Ge=[{provide:h,useClass:ne},{provide:p,useValue:"NoopAnimations"},...ue];function he(){return A("NgEagerAnimations"),[...Ee]}var fe=i=>{let t;try{if(t=+(i.paramMap.get("id")||""),!t)throw Error("Id not found or not valid")}catch{return c({errorStatus:404})}let e=l(le),o=l(S).getCurrentNavigation()?.extras?.state,a=o?.id===t?c(o):e.getCityWeather(t);return e.navigationStarted=!0,b({countryInfo:a,forecastResult:e.getFiveDaysForecast(t)}).pipe(O(d=>c({errorStatus:d.status})))};var ye=(i,t)=>l(E).pipe(w(r=>{let o=!!r;return o||l(S).navigate(["home"]),c(o)}));var ge=[{path:"",redirectTo:"home",pathMatch:"full"},{path:"home",loadComponent:()=>import("./chunk-4XN6GQ7R.js"),data:{animationState:"homeState"}},{path:"forecast/:id",loadComponent:()=>import("./chunk-FNLWEHIQ.js"),data:{animationState:"forecastState"},canActivate:[ye],resolve:[fe]},{path:"**",redirectTo:"home"}];var Me="@",Ce=(()=>{class i{constructor(e,r,o,a,d){this.doc=e,this.delegate=r,this.zone=o,this.animationType=a,this.moduleImpl=d,this._rendererFactoryPromise=null,this.scheduler=l(V,{optional:!0}),this.loadingSchedulerFn=l(De,{optional:!0})}ngOnDestroy(){this._engine?.flush()}loadImpl(){let e=()=>this.moduleImpl??import("./chunk-KIIYTZQ2.js").then(o=>o),r;return this.loadingSchedulerFn?r=this.loadingSchedulerFn(e):r=e(),r.catch(o=>{throw new P(5300,!1)}).then(({\u0275createEngine:o,\u0275AnimationRendererFactory:a})=>{this._engine=o(this.animationType,this.doc);let d=new a(this.delegate,this._engine,this.zone);return this.delegate=d,d})}createRenderer(e,r){let o=this.delegate.createRenderer(e,r);if(o.\u0275type===0)return o;typeof o.throwOnSyntheticProps=="boolean"&&(o.throwOnSyntheticProps=!1);let a=new T(o);return r?.data?.animation&&!this._rendererFactoryPromise&&(this._rendererFactoryPromise=this.loadImpl()),this._rendererFactoryPromise?.then(d=>{let Re=d.createRenderer(e,r);a.use(Re),this.scheduler?.notify(10)}).catch(d=>{a.use(o)}),a}begin(){this.delegate.begin?.()}end(){this.delegate.end?.()}whenRenderingDone(){return this.delegate.whenRenderingDone?.()??Promise.resolve()}static{this.\u0275fac=function(r){L()}}static{this.\u0275prov=f({token:i,factory:i.\u0275fac})}}return i})(),T=class{constructor(t){this.delegate=t,this.replay=[],this.\u0275type=1}use(t){if(this.delegate=t,this.replay!==null){for(let e of this.replay)e(t);this.replay=null}}get data(){return this.delegate.data}destroy(){this.replay=null,this.delegate.destroy()}createElement(t,e){return this.delegate.createElement(t,e)}createComment(t){return this.delegate.createComment(t)}createText(t){return this.delegate.createText(t)}get destroyNode(){return this.delegate.destroyNode}appendChild(t,e){this.delegate.appendChild(t,e)}insertBefore(t,e,r,o){this.delegate.insertBefore(t,e,r,o)}removeChild(t,e,r){this.delegate.removeChild(t,e,r)}selectRootElement(t,e){return this.delegate.selectRootElement(t,e)}parentNode(t){return this.delegate.parentNode(t)}nextSibling(t){return this.delegate.nextSibling(t)}setAttribute(t,e,r,o){this.delegate.setAttribute(t,e,r,o)}removeAttribute(t,e,r){this.delegate.removeAttribute(t,e,r)}addClass(t,e){this.delegate.addClass(t,e)}removeClass(t,e){this.delegate.removeClass(t,e)}setStyle(t,e,r,o){this.delegate.setStyle(t,e,r,o)}removeStyle(t,e,r){this.delegate.removeStyle(t,e,r)}setProperty(t,e,r){this.shouldReplay(e)&&this.replay.push(o=>o.setProperty(t,e,r)),this.delegate.setProperty(t,e,r)}setValue(t,e){this.delegate.setValue(t,e)}listen(t,e,r){return this.shouldReplay(e)&&this.replay.push(o=>o.listen(t,e,r)),this.delegate.listen(t,e,r)}shouldReplay(t){return this.replay!==null&&t.startsWith(Me)}},De=new j("");function ve(i="animations"){return A("NgAsyncAnimations"),k([{provide:v,useFactory:(t,e,r)=>new Ce(t,e,r,i),deps:[R,I,g]},{provide:p,useValue:i==="noop"?"NoopAnimations":"BrowserAnimations"}])}var Ae={providers:[Q(ge),he(),q(),re(),ee(),{provide:K,useFactory:oe,multi:!0,deps:[Z,E]},{provide:ie,useValue:{appearance:"outline"}},ve()]};J(me,Ae).catch(i=>console.error(i));
