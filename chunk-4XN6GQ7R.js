import{a as Z,b as U}from"./chunk-ZYO3UFDX.js";import{c as E}from"./chunk-XEFXM5D2.js";import{k as V,l as Y}from"./chunk-YLTIPCWY.js";import"./chunk-PLAWPLVZ.js";import"./chunk-6XXA7HXI.js";import"./chunk-JUQ4HMHQ.js";import"./chunk-ZK5AIQ47.js";import{a as N,c as L,g as H}from"./chunk-Y2A3B5DR.js";import{C as y,G as S,P as R,h as T,z as O}from"./chunk-PY3B2YYB.js";import{Ab as n,Bb as i,Cb as c,Da as I,Gb as l,Ib as B,Ja as D,Jb as f,Kc as P,Tb as m,Ya as d,Yb as v,Za as z,_ as x,aa as _,da as p,fa as u,ga as w,ha as k,ib as C,jb as A,nc as s,rb as j,ub as g,vb as F,za as M}from"./chunk-NXOHNOOV.js";var Q=["mat-button",""],X=[[["",8,"material-icons",3,"iconPositionEnd",""],["mat-icon",3,"iconPositionEnd",""],["","matButtonIcon","",3,"iconPositionEnd",""]],"*",[["","iconPositionEnd","",8,"material-icons"],["mat-icon","iconPositionEnd",""],["","matButtonIcon","","iconPositionEnd",""]]],tt=[".material-icons:not([iconPositionEnd]), mat-icon:not([iconPositionEnd]), [matButtonIcon]:not([iconPositionEnd])","*",".material-icons[iconPositionEnd], mat-icon[iconPositionEnd], [matButtonIcon][iconPositionEnd]"];var et=new _("MAT_BUTTON_CONFIG");var at=[{attribute:"mat-button",mdcClasses:["mdc-button","mat-mdc-button"]},{attribute:"mat-flat-button",mdcClasses:["mdc-button","mdc-button--unelevated","mat-mdc-unelevated-button"]},{attribute:"mat-raised-button",mdcClasses:["mdc-button","mdc-button--raised","mat-mdc-raised-button"]},{attribute:"mat-stroked-button",mdcClasses:["mdc-button","mdc-button--outlined","mat-mdc-outlined-button"]},{attribute:"mat-fab",mdcClasses:["mdc-fab","mat-mdc-fab-base","mat-mdc-fab"]},{attribute:"mat-mini-fab",mdcClasses:["mdc-fab","mat-mdc-fab-base","mdc-fab--mini","mat-mdc-mini-fab"]},{attribute:"mat-icon-button",mdcClasses:["mdc-icon-button","mat-mdc-icon-button"]}],ot=(()=>{class o{get ripple(){return this._rippleLoader?.getRipple(this._elementRef.nativeElement)}set ripple(t){this._rippleLoader?.attachRipple(this._elementRef.nativeElement,t)}get disableRipple(){return this._disableRipple}set disableRipple(t){this._disableRipple=t,this._updateRippleDisabled()}get disabled(){return this._disabled}set disabled(t){this._disabled=t,this._updateRippleDisabled()}constructor(t,a,e,r){this._elementRef=t,this._platform=a,this._ngZone=e,this._animationMode=r,this._focusMonitor=p(O),this._rippleLoader=p(R),this._isFab=!1,this._disableRipple=!1,this._disabled=!1;let b=p(et,{optional:!0}),h=t.nativeElement,$=h.classList;this.disabledInteractive=b?.disabledInteractive??!1,this.color=b?.color??null,this._rippleLoader?.configureRipple(h,{className:"mat-mdc-button-ripple"});for(let{attribute:q,mdcClasses:J}of at)h.hasAttribute(q)&&$.add(...J)}ngAfterViewInit(){this._focusMonitor.monitor(this._elementRef,!0)}ngOnDestroy(){this._focusMonitor.stopMonitoring(this._elementRef),this._rippleLoader?.destroyRipple(this._elementRef.nativeElement)}focus(t="program",a){t?this._focusMonitor.focusVia(this._elementRef.nativeElement,t,a):this._elementRef.nativeElement.focus(a)}_getAriaDisabled(){return this.ariaDisabled!=null?this.ariaDisabled:this.disabled&&this.disabledInteractive?!0:null}_getDisabledAttribute(){return this.disabledInteractive||!this.disabled?null:!0}_updateRippleDisabled(){this._rippleLoader?.setDisabled(this._elementRef.nativeElement,this.disableRipple||this.disabled)}static{this.\u0275fac=function(a){z()}}static{this.\u0275dir=k({type:o,inputs:{color:"color",disableRipple:[2,"disableRipple","disableRipple",s],disabled:[2,"disabled","disabled",s],ariaDisabled:[2,"aria-disabled","ariaDisabled",s],disabledInteractive:[2,"disabledInteractive","disabledInteractive",s]},features:[A]})}}return o})();var W=(()=>{class o extends ot{constructor(t,a,e,r){super(t,a,e,r)}static{this.\u0275fac=function(a){return new(a||o)(d(I),d(T),d(M),d(D,8))}}static{this.\u0275cmp=u({type:o,selectors:[["button","mat-button",""],["button","mat-raised-button",""],["button","mat-flat-button",""],["button","mat-stroked-button",""]],hostVars:14,hostBindings:function(a,e){a&2&&(j("disabled",e._getDisabledAttribute())("aria-disabled",e._getAriaDisabled()),F(e.color?"mat-"+e.color:""),g("mat-mdc-button-disabled",e.disabled)("mat-mdc-button-disabled-interactive",e.disabledInteractive)("_mat-animation-noopable",e._animationMode==="NoopAnimations")("mat-unthemed",!e.color)("mat-mdc-button-base",!0))},exportAs:["matButton"],standalone:!0,features:[C,v],attrs:Q,ngContentSelectors:tt,decls:7,vars:4,consts:[[1,"mat-mdc-button-persistent-ripple"],[1,"mdc-button__label"],[1,"mat-mdc-focus-indicator"],[1,"mat-mdc-button-touch-target"]],template:function(a,e){a&1&&(B(X),c(0,"span",0),f(1),n(2,"span",1),f(3,1),i(),f(4,2),c(5,"span",2)(6,"span",3)),a&2&&g("mdc-button__ripple",!e._isFab)("mdc-fab__ripple",e._isFab)},styles:['.mat-mdc-button-base{text-decoration:none}.mdc-button{-webkit-user-select:none;user-select:none;position:relative;display:inline-flex;align-items:center;justify-content:center;box-sizing:border-box;min-width:64px;border:none;outline:none;line-height:inherit;-webkit-appearance:none;overflow:visible;vertical-align:middle;background:rgba(0,0,0,0);padding:0 8px}.mdc-button::-moz-focus-inner{padding:0;border:0}.mdc-button:active{outline:none}.mdc-button:hover{cursor:pointer}.mdc-button:disabled{cursor:default;pointer-events:none}.mdc-button[hidden]{display:none}.mdc-button .mdc-button__label{position:relative}.mat-mdc-button{padding:0 var(--mat-text-button-horizontal-padding, 8px);height:var(--mdc-text-button-container-height);font-family:var(--mdc-text-button-label-text-font, var(--mat-app-label-large-font));font-size:var(--mdc-text-button-label-text-size, var(--mat-app-label-large-size));letter-spacing:var(--mdc-text-button-label-text-tracking, var(--mat-app-label-large-tracking));text-transform:var(--mdc-text-button-label-text-transform);font-weight:var(--mdc-text-button-label-text-weight, var(--mat-app-label-large-weight))}.mat-mdc-button:has(.material-icons,mat-icon,[matButtonIcon]){padding:0 var(--mat-text-button-with-icon-horizontal-padding, 8px)}.mat-mdc-button>.mat-icon{margin-right:var(--mat-text-button-icon-spacing, 8px);margin-left:var(--mat-text-button-icon-offset, 0)}[dir=rtl] .mat-mdc-button>.mat-icon{margin-right:var(--mat-text-button-icon-offset, 0);margin-left:var(--mat-text-button-icon-spacing, 8px)}.mat-mdc-button .mdc-button__label+.mat-icon{margin-right:var(--mat-text-button-icon-offset, 0);margin-left:var(--mat-text-button-icon-spacing, 8px)}[dir=rtl] .mat-mdc-button .mdc-button__label+.mat-icon{margin-right:var(--mat-text-button-icon-spacing, 8px);margin-left:var(--mat-text-button-icon-offset, 0)}.mat-mdc-button .mat-ripple-element{background-color:var(--mat-text-button-ripple-color)}.mat-mdc-button .mat-mdc-button-persistent-ripple::before{background-color:var(--mat-text-button-state-layer-color, var(--mat-app-primary))}.mat-mdc-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before{background-color:var(--mat-text-button-disabled-state-layer-color, var(--mat-app-on-surface-variant))}.mat-mdc-button:hover .mat-mdc-button-persistent-ripple::before{opacity:var(--mat-text-button-hover-state-layer-opacity, var(--mat-app-hover-state-layer-opacity))}.mat-mdc-button.cdk-program-focused .mat-mdc-button-persistent-ripple::before,.mat-mdc-button.cdk-keyboard-focused .mat-mdc-button-persistent-ripple::before,.mat-mdc-button.mat-mdc-button-disabled-interactive:focus .mat-mdc-button-persistent-ripple::before{opacity:var(--mat-text-button-focus-state-layer-opacity, var(--mat-app-focus-state-layer-opacity))}.mat-mdc-button:active .mat-mdc-button-persistent-ripple::before{opacity:var(--mat-text-button-pressed-state-layer-opacity, var(--mat-app-pressed-state-layer-opacity))}.mat-mdc-button .mat-mdc-button-touch-target{position:absolute;top:50%;height:48px;left:0;right:0;transform:translateY(-50%);display:var(--mat-text-button-touch-target-display)}.mat-mdc-button,.mat-mdc-button .mdc-button__ripple{border-radius:var(--mdc-text-button-container-shape, var(--mat-app-corner-full))}.mat-mdc-button:not(:disabled){color:var(--mdc-text-button-label-text-color, var(--mat-app-primary))}.mat-mdc-button[disabled],.mat-mdc-button.mat-mdc-button-disabled{cursor:default;pointer-events:none;color:var(--mdc-text-button-disabled-label-text-color)}.mat-mdc-button.mat-mdc-button-disabled-interactive{pointer-events:auto}.mat-mdc-unelevated-button{transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);padding:0 var(--mat-filled-button-horizontal-padding, 16px);height:var(--mdc-filled-button-container-height);font-family:var(--mdc-filled-button-label-text-font, var(--mat-app-label-large-font));font-size:var(--mdc-filled-button-label-text-size, var(--mat-app-label-large-size));letter-spacing:var(--mdc-filled-button-label-text-tracking, var(--mat-app-label-large-tracking));text-transform:var(--mdc-filled-button-label-text-transform);font-weight:var(--mdc-filled-button-label-text-weight, var(--mat-app-label-large-weight))}.mat-mdc-unelevated-button>.mat-icon{margin-right:var(--mat-filled-button-icon-spacing, 8px);margin-left:var(--mat-filled-button-icon-offset, -4px)}[dir=rtl] .mat-mdc-unelevated-button>.mat-icon{margin-right:var(--mat-filled-button-icon-offset, -4px);margin-left:var(--mat-filled-button-icon-spacing, 8px)}.mat-mdc-unelevated-button .mdc-button__label+.mat-icon{margin-right:var(--mat-filled-button-icon-offset, -4px);margin-left:var(--mat-filled-button-icon-spacing, 8px)}[dir=rtl] .mat-mdc-unelevated-button .mdc-button__label+.mat-icon{margin-right:var(--mat-filled-button-icon-spacing, 8px);margin-left:var(--mat-filled-button-icon-offset, -4px)}.mat-mdc-unelevated-button .mat-ripple-element{background-color:var(--mat-filled-button-ripple-color)}.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before{background-color:var(--mat-filled-button-state-layer-color, var(--mat-app-on-primary))}.mat-mdc-unelevated-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before{background-color:var(--mat-filled-button-disabled-state-layer-color, var(--mat-app-on-surface-variant))}.mat-mdc-unelevated-button:hover .mat-mdc-button-persistent-ripple::before{opacity:var(--mat-filled-button-hover-state-layer-opacity, var(--mat-app-hover-state-layer-opacity))}.mat-mdc-unelevated-button.cdk-program-focused .mat-mdc-button-persistent-ripple::before,.mat-mdc-unelevated-button.cdk-keyboard-focused .mat-mdc-button-persistent-ripple::before,.mat-mdc-unelevated-button.mat-mdc-button-disabled-interactive:focus .mat-mdc-button-persistent-ripple::before{opacity:var(--mat-filled-button-focus-state-layer-opacity, var(--mat-app-focus-state-layer-opacity))}.mat-mdc-unelevated-button:active .mat-mdc-button-persistent-ripple::before{opacity:var(--mat-filled-button-pressed-state-layer-opacity, var(--mat-app-pressed-state-layer-opacity))}.mat-mdc-unelevated-button .mat-mdc-button-touch-target{position:absolute;top:50%;height:48px;left:0;right:0;transform:translateY(-50%);display:var(--mat-filled-button-touch-target-display)}.mat-mdc-unelevated-button:not(:disabled){color:var(--mdc-filled-button-label-text-color, var(--mat-app-on-primary));background-color:var(--mdc-filled-button-container-color, var(--mat-app-primary))}.mat-mdc-unelevated-button,.mat-mdc-unelevated-button .mdc-button__ripple{border-radius:var(--mdc-filled-button-container-shape, var(--mat-app-corner-full))}.mat-mdc-unelevated-button[disabled],.mat-mdc-unelevated-button.mat-mdc-button-disabled{cursor:default;pointer-events:none;color:var(--mdc-filled-button-disabled-label-text-color);background-color:var(--mdc-filled-button-disabled-container-color)}.mat-mdc-unelevated-button.mat-mdc-button-disabled-interactive{pointer-events:auto}.mat-mdc-raised-button{transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);padding:0 var(--mat-protected-button-horizontal-padding, 16px);box-shadow:var(--mdc-protected-button-container-elevation-shadow, var(--mat-app-level1));height:var(--mdc-protected-button-container-height);font-family:var(--mdc-protected-button-label-text-font, var(--mat-app-label-large-font));font-size:var(--mdc-protected-button-label-text-size, var(--mat-app-label-large-size));letter-spacing:var(--mdc-protected-button-label-text-tracking, var(--mat-app-label-large-tracking));text-transform:var(--mdc-protected-button-label-text-transform);font-weight:var(--mdc-protected-button-label-text-weight, var(--mat-app-label-large-weight))}.mat-mdc-raised-button>.mat-icon{margin-right:var(--mat-protected-button-icon-spacing, 8px);margin-left:var(--mat-protected-button-icon-offset, -4px)}[dir=rtl] .mat-mdc-raised-button>.mat-icon{margin-right:var(--mat-protected-button-icon-offset, -4px);margin-left:var(--mat-protected-button-icon-spacing, 8px)}.mat-mdc-raised-button .mdc-button__label+.mat-icon{margin-right:var(--mat-protected-button-icon-offset, -4px);margin-left:var(--mat-protected-button-icon-spacing, 8px)}[dir=rtl] .mat-mdc-raised-button .mdc-button__label+.mat-icon{margin-right:var(--mat-protected-button-icon-spacing, 8px);margin-left:var(--mat-protected-button-icon-offset, -4px)}.mat-mdc-raised-button .mat-ripple-element{background-color:var(--mat-protected-button-ripple-color)}.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before{background-color:var(--mat-protected-button-state-layer-color, var(--mat-app-primary))}.mat-mdc-raised-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before{background-color:var(--mat-protected-button-disabled-state-layer-color, var(--mat-app-on-surface-variant))}.mat-mdc-raised-button:hover .mat-mdc-button-persistent-ripple::before{opacity:var(--mat-protected-button-hover-state-layer-opacity, var(--mat-app-hover-state-layer-opacity))}.mat-mdc-raised-button.cdk-program-focused .mat-mdc-button-persistent-ripple::before,.mat-mdc-raised-button.cdk-keyboard-focused .mat-mdc-button-persistent-ripple::before,.mat-mdc-raised-button.mat-mdc-button-disabled-interactive:focus .mat-mdc-button-persistent-ripple::before{opacity:var(--mat-protected-button-focus-state-layer-opacity, var(--mat-app-focus-state-layer-opacity))}.mat-mdc-raised-button:active .mat-mdc-button-persistent-ripple::before{opacity:var(--mat-protected-button-pressed-state-layer-opacity, var(--mat-app-pressed-state-layer-opacity))}.mat-mdc-raised-button .mat-mdc-button-touch-target{position:absolute;top:50%;height:48px;left:0;right:0;transform:translateY(-50%);display:var(--mat-protected-button-touch-target-display)}.mat-mdc-raised-button:not(:disabled){color:var(--mdc-protected-button-label-text-color, var(--mat-app-primary));background-color:var(--mdc-protected-button-container-color, var(--mat-app-surface))}.mat-mdc-raised-button,.mat-mdc-raised-button .mdc-button__ripple{border-radius:var(--mdc-protected-button-container-shape, var(--mat-app-corner-full))}.mat-mdc-raised-button:hover{box-shadow:var(--mdc-protected-button-hover-container-elevation-shadow, var(--mat-app-level2))}.mat-mdc-raised-button:focus{box-shadow:var(--mdc-protected-button-focus-container-elevation-shadow, var(--mat-app-level1))}.mat-mdc-raised-button:active,.mat-mdc-raised-button:focus:active{box-shadow:var(--mdc-protected-button-pressed-container-elevation-shadow, var(--mat-app-level1))}.mat-mdc-raised-button[disabled],.mat-mdc-raised-button.mat-mdc-button-disabled{cursor:default;pointer-events:none;color:var(--mdc-protected-button-disabled-label-text-color);background-color:var(--mdc-protected-button-disabled-container-color)}.mat-mdc-raised-button[disabled].mat-mdc-button-disabled,.mat-mdc-raised-button.mat-mdc-button-disabled.mat-mdc-button-disabled{box-shadow:var(--mdc-protected-button-disabled-container-elevation-shadow, var(--mat-app-level0))}.mat-mdc-raised-button.mat-mdc-button-disabled-interactive{pointer-events:auto}.mat-mdc-outlined-button{border-style:solid;transition:border 280ms cubic-bezier(0.4, 0, 0.2, 1);padding:0 var(--mat-outlined-button-horizontal-padding, 15px);height:var(--mdc-outlined-button-container-height);font-family:var(--mdc-outlined-button-label-text-font, var(--mat-app-label-large-font));font-size:var(--mdc-outlined-button-label-text-size, var(--mat-app-label-large-size));letter-spacing:var(--mdc-outlined-button-label-text-tracking, var(--mat-app-label-large-tracking));text-transform:var(--mdc-outlined-button-label-text-transform);font-weight:var(--mdc-outlined-button-label-text-weight, var(--mat-app-label-large-weight));border-radius:var(--mdc-outlined-button-container-shape, var(--mat-app-corner-full));border-width:var(--mdc-outlined-button-outline-width)}.mat-mdc-outlined-button>.mat-icon{margin-right:var(--mat-outlined-button-icon-spacing, 8px);margin-left:var(--mat-outlined-button-icon-offset, -4px)}[dir=rtl] .mat-mdc-outlined-button>.mat-icon{margin-right:var(--mat-outlined-button-icon-offset, -4px);margin-left:var(--mat-outlined-button-icon-spacing, 8px)}.mat-mdc-outlined-button .mdc-button__label+.mat-icon{margin-right:var(--mat-outlined-button-icon-offset, -4px);margin-left:var(--mat-outlined-button-icon-spacing, 8px)}[dir=rtl] .mat-mdc-outlined-button .mdc-button__label+.mat-icon{margin-right:var(--mat-outlined-button-icon-spacing, 8px);margin-left:var(--mat-outlined-button-icon-offset, -4px)}.mat-mdc-outlined-button .mat-ripple-element{background-color:var(--mat-outlined-button-ripple-color)}.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before{background-color:var(--mat-outlined-button-state-layer-color, var(--mat-app-primary))}.mat-mdc-outlined-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before{background-color:var(--mat-outlined-button-disabled-state-layer-color, var(--mat-app-on-surface-variant))}.mat-mdc-outlined-button:hover .mat-mdc-button-persistent-ripple::before{opacity:var(--mat-outlined-button-hover-state-layer-opacity, var(--mat-app-hover-state-layer-opacity))}.mat-mdc-outlined-button.cdk-program-focused .mat-mdc-button-persistent-ripple::before,.mat-mdc-outlined-button.cdk-keyboard-focused .mat-mdc-button-persistent-ripple::before,.mat-mdc-outlined-button.mat-mdc-button-disabled-interactive:focus .mat-mdc-button-persistent-ripple::before{opacity:var(--mat-outlined-button-focus-state-layer-opacity, var(--mat-app-focus-state-layer-opacity))}.mat-mdc-outlined-button:active .mat-mdc-button-persistent-ripple::before{opacity:var(--mat-outlined-button-pressed-state-layer-opacity, var(--mat-app-pressed-state-layer-opacity))}.mat-mdc-outlined-button .mat-mdc-button-touch-target{position:absolute;top:50%;height:48px;left:0;right:0;transform:translateY(-50%);display:var(--mat-outlined-button-touch-target-display)}.mat-mdc-outlined-button:not(:disabled){color:var(--mdc-outlined-button-label-text-color, var(--mat-app-primary));border-color:var(--mdc-outlined-button-outline-color, var(--mat-app-outline))}.mat-mdc-outlined-button[disabled],.mat-mdc-outlined-button.mat-mdc-button-disabled{cursor:default;pointer-events:none;color:var(--mdc-outlined-button-disabled-label-text-color);border-color:var(--mdc-outlined-button-disabled-outline-color)}.mat-mdc-outlined-button.mat-mdc-button-disabled-interactive{pointer-events:auto}.mat-mdc-outlined-button .mdc-button__ripple{border-width:var(--mdc-outlined-button-outline-width);border-style:solid;border-color:rgba(0,0,0,0)}.mat-mdc-button,.mat-mdc-unelevated-button,.mat-mdc-raised-button,.mat-mdc-outlined-button{-webkit-tap-highlight-color:rgba(0,0,0,0)}.mat-mdc-button .mat-mdc-button-ripple,.mat-mdc-button .mat-mdc-button-persistent-ripple,.mat-mdc-button .mat-mdc-button-persistent-ripple::before,.mat-mdc-unelevated-button .mat-mdc-button-ripple,.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple,.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before,.mat-mdc-raised-button .mat-mdc-button-ripple,.mat-mdc-raised-button .mat-mdc-button-persistent-ripple,.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before,.mat-mdc-outlined-button .mat-mdc-button-ripple,.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple,.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-mdc-button .mat-mdc-button-ripple,.mat-mdc-unelevated-button .mat-mdc-button-ripple,.mat-mdc-raised-button .mat-mdc-button-ripple,.mat-mdc-outlined-button .mat-mdc-button-ripple{overflow:hidden}.mat-mdc-button .mat-mdc-button-persistent-ripple::before,.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before,.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before,.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before{content:"";opacity:0}.mat-mdc-button .mdc-button__label,.mat-mdc-button .mat-icon,.mat-mdc-unelevated-button .mdc-button__label,.mat-mdc-unelevated-button .mat-icon,.mat-mdc-raised-button .mdc-button__label,.mat-mdc-raised-button .mat-icon,.mat-mdc-outlined-button .mdc-button__label,.mat-mdc-outlined-button .mat-icon{z-index:1;position:relative}.mat-mdc-button .mat-mdc-focus-indicator,.mat-mdc-unelevated-button .mat-mdc-focus-indicator,.mat-mdc-raised-button .mat-mdc-focus-indicator,.mat-mdc-outlined-button .mat-mdc-focus-indicator{top:0;left:0;right:0;bottom:0;position:absolute}.mat-mdc-button:focus .mat-mdc-focus-indicator::before,.mat-mdc-unelevated-button:focus .mat-mdc-focus-indicator::before,.mat-mdc-raised-button:focus .mat-mdc-focus-indicator::before,.mat-mdc-outlined-button:focus .mat-mdc-focus-indicator::before{content:""}.mat-mdc-button._mat-animation-noopable,.mat-mdc-unelevated-button._mat-animation-noopable,.mat-mdc-raised-button._mat-animation-noopable,.mat-mdc-outlined-button._mat-animation-noopable{transition:none !important;animation:none !important}.mat-mdc-button>.mat-icon,.mat-mdc-unelevated-button>.mat-icon,.mat-mdc-raised-button>.mat-icon,.mat-mdc-outlined-button>.mat-icon{display:inline-block;position:relative;vertical-align:top;font-size:1.125rem;height:1.125rem;width:1.125rem}.mat-mdc-outlined-button .mat-mdc-button-ripple,.mat-mdc-outlined-button .mdc-button__ripple{top:-1px;left:-1px;bottom:-1px;right:-1px}.mat-mdc-unelevated-button .mat-mdc-focus-indicator::before,.mat-mdc-raised-button .mat-mdc-focus-indicator::before{margin:calc(calc(var(--mat-mdc-focus-indicator-border-width, 3px) + 2px)*-1)}.mat-mdc-outlined-button .mat-mdc-focus-indicator::before{margin:calc(calc(var(--mat-mdc-focus-indicator-border-width, 3px) + 3px)*-1)}',".cdk-high-contrast-active .mat-mdc-button:not(.mdc-button--outlined),.cdk-high-contrast-active .mat-mdc-unelevated-button:not(.mdc-button--outlined),.cdk-high-contrast-active .mat-mdc-raised-button:not(.mdc-button--outlined),.cdk-high-contrast-active .mat-mdc-outlined-button:not(.mdc-button--outlined),.cdk-high-contrast-active .mat-mdc-icon-button{outline:solid 1px}"],encapsulation:2,changeDetection:0})}}return o})();var G=(()=>{class o{static{this.\u0275fac=function(a){return new(a||o)}}static{this.\u0275mod=w({type:o})}static{this.\u0275inj=x({imports:[y,S,y]})}}return o})();var zt=(()=>{class o{constructor(t){this.router=t}navigateByCityId(t){this.router.navigate(["forecast",t])}navigateToCity(t){this.router.navigateByUrl(`/forecast/${t.id}`,{state:t})}static{this.\u0275fac=function(a){return new(a||o)(d(E))}}static{this.\u0275cmp=u({type:o,selectors:[["app-home"]],standalone:!0,features:[v],decls:21,vars:0,consts:[[1,"header"],[1,"content"],[3,"itemSelected"],[1,"suggestions"],["mat-flat-button","","type","button","color","primary",3,"click"],["href","https://openweathermap.org/","matTooltip","Data provided by Open Weather",1,"attribution","c-pointer","attribution-bg"],["alt","attribution to https://openweathermap.org","priority","","width","100","height","57","ngSrc","./assets/OpenWeatherLogo.png"]],template:function(a,e){a&1&&(n(0,"div",0),c(1,"app-switch-theme"),i(),n(2,"div",1)(3,"h1"),m(4,"What's the weather like?"),i(),n(5,"mat-card")(6,"mat-card-content")(7,"h3"),m(8,"Welcome to my Demo application for weather forecasts. Look for a city using the search input, or pick one from the list below."),i(),n(9,"app-searchbar",2),l("itemSelected",function(b){return e.navigateToCity(b)}),i(),n(10,"div",3)(11,"button",4),l("click",function(){return e.navigateByCityId(3170647)}),m(12," Pisa, IT "),i(),n(13,"button",4),l("click",function(){return e.navigateByCityId(3171366)}),m(14," Pavia, IT "),i(),n(15,"button",4),l("click",function(){return e.navigateByCityId(3169070)}),m(16," Rome, IT "),i(),n(17,"button",4),l("click",function(){return e.navigateByCityId(2643743)}),m(18," London, GB "),i()()()()(),n(19,"a",5),c(20,"img",6),i())},dependencies:[H,N,L,G,W,P,Z,U,Y,V],styles:["[_nghost-%COMP%]{display:block;overflow-y:auto;overflow-x:hidden;height:100%;position:relative}.attribution[_ngcontent-%COMP%]{position:absolute;bottom:0;left:0}.header[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:end;height:50px;padding:.5rem 1rem;width:calc(100% - 2rem)}.content[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;justify-content:center;height:calc(90% - 107px);width:100%}.content[_ngcontent-%COMP%]   mat-card[_ngcontent-%COMP%]{height:fit-content}.content[_ngcontent-%COMP%]   mat-card[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{margin-top:0}.content[_ngcontent-%COMP%]   mat-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{text-align:justify}.content[_ngcontent-%COMP%]   mat-card[_ngcontent-%COMP%]   .suggestions[_ngcontent-%COMP%]{margin-top:2rem;display:flex;align-items:center;flex-wrap:wrap;justify-content:space-around}.content[_ngcontent-%COMP%]   mat-card[_ngcontent-%COMP%]   .suggestions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{margin:0 .5rem 1rem;min-width:120px}@media (min-width: 590px){mat-card[_ngcontent-%COMP%]{width:60%}}@media (max-width: 590px){mat-card[_ngcontent-%COMP%]{width:calc(100% - 2rem);height:fit-content}}"]})}}return o})();export{zt as default};