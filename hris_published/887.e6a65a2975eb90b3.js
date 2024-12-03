"use strict";(self.webpackChunkhris_admin=self.webpackChunkhris_admin||[]).push([[887],{7466:(X,F,m)=>{m.d(F,{Fk:()=>Y});var s=m(5879),x=m(3680),P=(m(7849),m(2495),m(8337),m(6223),m(6814));let Y=(()=>{var p;class h{}return(p=h).\u0275fac=function(a){return new(a||p)},p.\u0275mod=s.oAB({type:p}),p.\u0275inj=s.cJS({imports:[x.BQ,P.ez,x.si,x.BQ]}),h})()},1545:(X,F,m)=>{m.d(F,{C0:()=>K,VY:()=>B,Vq:()=>W,T5:()=>De,Ic:()=>Se,fd:()=>Me});var s=m(8484),x=m(7849),M=m(9388),f=m(2495),D=m(6028),e=m(5879),P=m(2831),T=m(8645),L=m(2096),k=m(7921),y=m(9773);function N(i,n){1&i&&e.Hsn(0)}const R=["*"];let E=(()=>{var i;class n{constructor(t){this._elementRef=t}focus(){this._elementRef.nativeElement.focus()}}return(i=n).\u0275fac=function(t){return new(t||i)(e.Y36(e.SBq))},i.\u0275dir=e.lG2({type:i,selectors:[["","cdkStepHeader",""]],hostAttrs:["role","tab"]}),n})(),z=(()=>{var i;class n{constructor(t){this.template=t}}return(i=n).\u0275fac=function(t){return new(t||i)(e.Y36(e.Rgc))},i.\u0275dir=e.lG2({type:i,selectors:[["","cdkStepLabel",""]]}),n})(),Q=0;const A=new e.OlP("STEPPER_GLOBAL_OPTIONS");let C=(()=>{var i;class n{get editable(){return this._editable}set editable(t){this._editable=(0,f.Ig)(t)}get optional(){return this._optional}set optional(t){this._optional=(0,f.Ig)(t)}get completed(){return null==this._completedOverride?this._getDefaultCompleted():this._completedOverride}set completed(t){this._completedOverride=(0,f.Ig)(t)}_getDefaultCompleted(){return this.stepControl?this.stepControl.valid&&this.interacted:this.interacted}get hasError(){return null==this._customError?this._getDefaultError():this._customError}set hasError(t){this._customError=(0,f.Ig)(t)}_getDefaultError(){return this.stepControl&&this.stepControl.invalid&&this.interacted}constructor(t,o){this._stepper=t,this.interacted=!1,this.interactedStream=new e.vpe,this._editable=!0,this._optional=!1,this._completedOverride=null,this._customError=null,this._stepperOptions=o||{},this._displayDefaultIndicatorType=!1!==this._stepperOptions.displayDefaultIndicatorType}select(){this._stepper.selected=this}reset(){this.interacted=!1,null!=this._completedOverride&&(this._completedOverride=!1),null!=this._customError&&(this._customError=!1),this.stepControl&&this.stepControl.reset()}ngOnChanges(){this._stepper._stateChanged()}_markAsInteracted(){this.interacted||(this.interacted=!0,this.interactedStream.emit(this))}_showError(){return this._stepperOptions.showError??null!=this._customError}}return(i=n).\u0275fac=function(t){return new(t||i)(e.Y36((0,e.Gpc)(()=>I)),e.Y36(A,8))},i.\u0275cmp=e.Xpm({type:i,selectors:[["cdk-step"]],contentQueries:function(t,o,d){if(1&t&&e.Suo(d,z,5),2&t){let l;e.iGM(l=e.CRH())&&(o.stepLabel=l.first)}},viewQuery:function(t,o){if(1&t&&e.Gf(e.Rgc,7),2&t){let d;e.iGM(d=e.CRH())&&(o.content=d.first)}},inputs:{stepControl:"stepControl",label:"label",errorMessage:"errorMessage",ariaLabel:["aria-label","ariaLabel"],ariaLabelledby:["aria-labelledby","ariaLabelledby"],state:"state",editable:"editable",optional:"optional",completed:"completed",hasError:"hasError"},outputs:{interactedStream:"interacted"},exportAs:["cdkStep"],features:[e.TTD],ngContentSelectors:R,decls:1,vars:0,template:function(t,o){1&t&&(e.F$t(),e.YNc(0,N,1,0,"ng-template"))},encapsulation:2,changeDetection:0}),n})(),I=(()=>{var i;class n{get linear(){return this._linear}set linear(t){this._linear=(0,f.Ig)(t)}get selectedIndex(){return this._selectedIndex}set selectedIndex(t){const o=(0,f.su)(t);this.steps&&this._steps?(this._isValidIndex(o),this.selected?._markAsInteracted(),this._selectedIndex!==o&&!this._anyControlsInvalidOrPending(o)&&(o>=this._selectedIndex||this.steps.toArray()[o].editable)&&this._updateSelectedItemIndex(o)):this._selectedIndex=o}get selected(){return this.steps?this.steps.toArray()[this.selectedIndex]:void 0}set selected(t){this.selectedIndex=t&&this.steps?this.steps.toArray().indexOf(t):-1}get orientation(){return this._orientation}set orientation(t){this._orientation=t,this._keyManager&&this._keyManager.withVerticalOrientation("vertical"===t)}constructor(t,o,d){this._dir=t,this._changeDetectorRef=o,this._elementRef=d,this._destroyed=new T.x,this.steps=new e.n_E,this._sortedHeaders=new e.n_E,this._linear=!1,this._selectedIndex=0,this.selectionChange=new e.vpe,this.selectedIndexChange=new e.vpe,this._orientation="horizontal",this._groupId=Q++}ngAfterContentInit(){this._steps.changes.pipe((0,k.O)(this._steps),(0,y.R)(this._destroyed)).subscribe(t=>{this.steps.reset(t.filter(o=>o._stepper===this)),this.steps.notifyOnChanges()})}ngAfterViewInit(){this._stepHeader.changes.pipe((0,k.O)(this._stepHeader),(0,y.R)(this._destroyed)).subscribe(t=>{this._sortedHeaders.reset(t.toArray().sort((o,d)=>o._elementRef.nativeElement.compareDocumentPosition(d._elementRef.nativeElement)&Node.DOCUMENT_POSITION_FOLLOWING?-1:1)),this._sortedHeaders.notifyOnChanges()}),this._keyManager=new x.Em(this._sortedHeaders).withWrap().withHomeAndEnd().withVerticalOrientation("vertical"===this._orientation),(this._dir?this._dir.change:(0,L.of)()).pipe((0,k.O)(this._layoutDirection()),(0,y.R)(this._destroyed)).subscribe(t=>this._keyManager.withHorizontalOrientation(t)),this._keyManager.updateActiveItem(this._selectedIndex),this.steps.changes.subscribe(()=>{this.selected||(this._selectedIndex=Math.max(this._selectedIndex-1,0))}),this._isValidIndex(this._selectedIndex)||(this._selectedIndex=0)}ngOnDestroy(){this._keyManager?.destroy(),this.steps.destroy(),this._sortedHeaders.destroy(),this._destroyed.next(),this._destroyed.complete()}next(){this.selectedIndex=Math.min(this._selectedIndex+1,this.steps.length-1)}previous(){this.selectedIndex=Math.max(this._selectedIndex-1,0)}reset(){this._updateSelectedItemIndex(0),this.steps.forEach(t=>t.reset()),this._stateChanged()}_getStepLabelId(t){return`cdk-step-label-${this._groupId}-${t}`}_getStepContentId(t){return`cdk-step-content-${this._groupId}-${t}`}_stateChanged(){this._changeDetectorRef.markForCheck()}_getAnimationDirection(t){const o=t-this._selectedIndex;return o<0?"rtl"===this._layoutDirection()?"next":"previous":o>0?"rtl"===this._layoutDirection()?"previous":"next":"current"}_getIndicatorType(t,o="number"){const d=this.steps.toArray()[t],l=this._isCurrentStep(t);return d._displayDefaultIndicatorType?this._getDefaultIndicatorLogic(d,l):this._getGuidelineLogic(d,l,o)}_getDefaultIndicatorLogic(t,o){return t._showError()&&t.hasError&&!o?"error":!t.completed||o?"number":t.editable?"edit":"done"}_getGuidelineLogic(t,o,d="number"){return t._showError()&&t.hasError&&!o?"error":t.completed&&!o?"done":t.completed&&o?d:t.editable&&o?"edit":d}_isCurrentStep(t){return this._selectedIndex===t}_getFocusIndex(){return this._keyManager?this._keyManager.activeItemIndex:this._selectedIndex}_updateSelectedItemIndex(t){const o=this.steps.toArray();this.selectionChange.emit({selectedIndex:t,previouslySelectedIndex:this._selectedIndex,selectedStep:o[t],previouslySelectedStep:o[this._selectedIndex]}),this._containsFocus()?this._keyManager.setActiveItem(t):this._keyManager.updateActiveItem(t),this._selectedIndex=t,this.selectedIndexChange.emit(this._selectedIndex),this._stateChanged()}_onKeydown(t){const o=(0,D.Vb)(t),d=t.keyCode,l=this._keyManager;null==l.activeItemIndex||o||d!==D.L_&&d!==D.K5?l.setFocusOrigin("keyboard").onKeydown(t):(this.selectedIndex=l.activeItemIndex,t.preventDefault())}_anyControlsInvalidOrPending(t){return!!(this._linear&&t>=0)&&this.steps.toArray().slice(0,t).some(o=>{const d=o.stepControl;return(d?d.invalid||d.pending||!o.interacted:!o.completed)&&!o.optional&&!o._completedOverride})}_layoutDirection(){return this._dir&&"rtl"===this._dir.value?"rtl":"ltr"}_containsFocus(){const t=this._elementRef.nativeElement,o=(0,P.ht)();return t===o||t.contains(o)}_isValidIndex(t){return t>-1&&(!this.steps||t<this.steps.length)}}return(i=n).\u0275fac=function(t){return new(t||i)(e.Y36(M.Is,8),e.Y36(e.sBO),e.Y36(e.SBq))},i.\u0275dir=e.lG2({type:i,selectors:[["","cdkStepper",""]],contentQueries:function(t,o,d){if(1&t&&(e.Suo(d,C,5),e.Suo(d,E,5)),2&t){let l;e.iGM(l=e.CRH())&&(o._steps=l),e.iGM(l=e.CRH())&&(o._stepHeader=l)}},inputs:{linear:"linear",selectedIndex:"selectedIndex",selected:"selected",orientation:"orientation"},outputs:{selectionChange:"selectionChange",selectedIndexChange:"selectedIndexChange"},exportAs:["cdkStepper"]}),n})(),Y=(()=>{var i;class n{constructor(t){this._stepper=t,this.type="submit"}}return(i=n).\u0275fac=function(t){return new(t||i)(e.Y36(I))},i.\u0275dir=e.lG2({type:i,selectors:[["button","cdkStepperNext",""]],hostVars:1,hostBindings:function(t,o){1&t&&e.NdJ("click",function(){return o._stepper.next()}),2&t&&e.Ikx("type",o.type)},inputs:{type:"type"}}),n})(),p=(()=>{var i;class n{constructor(t){this._stepper=t,this.type="button"}}return(i=n).\u0275fac=function(t){return new(t||i)(e.Y36(I))},i.\u0275dir=e.lG2({type:i,selectors:[["button","cdkStepperPrevious",""]],hostVars:1,hostBindings:function(t,o){1&t&&e.NdJ("click",function(){return o._stepper.previous()}),2&t&&e.Ikx("type",o.type)},inputs:{type:"type"}}),n})(),h=(()=>{var i;class n{}return(i=n).\u0275fac=function(t){return new(t||i)},i.\u0275mod=e.oAB({type:i}),i.\u0275inj=e.cJS({imports:[M.vT]}),n})();var u=m(6814),a=m(3680),c=m(617),b=m(7394),g=m(4664),O=m(7398),w=m(3997),_=m(6825);function S(i,n){if(1&i&&e.GkF(0,8),2&i){const r=e.oxw();e.Q6J("ngTemplateOutlet",r.iconOverrides[r.state])("ngTemplateOutletContext",r._getIconContext())}}function ee(i,n){if(1&i&&(e.TgZ(0,"span",13),e._uU(1),e.qZA()),2&i){const r=e.oxw(2);e.xp6(1),e.Oqu(r._getDefaultTextForState(r.state))}}function te(i,n){if(1&i&&(e.TgZ(0,"span",14),e._uU(1),e.qZA()),2&i){const r=e.oxw(2);e.xp6(1),e.Oqu(r._intl.completedLabel)}}function ie(i,n){if(1&i&&(e.TgZ(0,"span",14),e._uU(1),e.qZA()),2&i){const r=e.oxw(2);e.xp6(1),e.Oqu(r._intl.editableLabel)}}function oe(i,n){if(1&i&&(e.TgZ(0,"mat-icon",13),e._uU(1),e.qZA()),2&i){const r=e.oxw(2);e.xp6(1),e.Oqu(r._getDefaultTextForState(r.state))}}function re(i,n){if(1&i&&(e.ynx(0,9),e.YNc(1,ee,2,1,"span",10),e.YNc(2,te,2,1,"span",11),e.YNc(3,ie,2,1,"span",11),e.YNc(4,oe,2,1,"mat-icon",12),e.BQk()),2&i){const r=e.oxw();e.Q6J("ngSwitch",r.state),e.xp6(1),e.Q6J("ngSwitchCase","number"),e.xp6(1),e.Q6J("ngIf","done"===r.state),e.xp6(1),e.Q6J("ngIf","edit"===r.state)}}function ae(i,n){if(1&i&&(e.TgZ(0,"div",15),e.GkF(1,16),e.qZA()),2&i){const r=e.oxw();e.xp6(1),e.Q6J("ngTemplateOutlet",r._templateLabel().template)}}function ne(i,n){if(1&i&&(e.TgZ(0,"div",15),e._uU(1),e.qZA()),2&i){const r=e.oxw();e.xp6(1),e.Oqu(r.label)}}function se(i,n){if(1&i&&(e.TgZ(0,"div",17),e._uU(1),e.qZA()),2&i){const r=e.oxw();e.xp6(1),e.Oqu(r._intl.optionalLabel)}}function de(i,n){if(1&i&&(e.TgZ(0,"div",18),e._uU(1),e.qZA()),2&i){const r=e.oxw();e.xp6(1),e.Oqu(r.errorMessage)}}function ce(i,n){}function le(i,n){if(1&i&&(e.Hsn(0),e.YNc(1,ce,0,0,"ng-template",0)),2&i){const r=e.oxw();e.xp6(1),e.Q6J("cdkPortalOutlet",r._portal)}}const pe=["*"];function me(i,n){1&i&&e._UZ(0,"div",11)}const Z=function(i,n){return{step:i,i:n}};function ue(i,n){if(1&i&&(e.ynx(0),e.GkF(1,9),e.YNc(2,me,1,0,"div",10),e.BQk()),2&i){const r=n.$implicit,t=n.index,o=n.last;e.oxw(2);const d=e.MAs(4);e.xp6(1),e.Q6J("ngTemplateOutlet",d)("ngTemplateOutletContext",e.WLB(3,Z,r,t)),e.xp6(1),e.Q6J("ngIf",!o)}}const J=function(i){return{animationDuration:i}},q=function(i,n){return{value:i,params:n}};function _e(i,n){if(1&i){const r=e.EpF();e.TgZ(0,"div",12),e.NdJ("@horizontalStepTransition.done",function(o){e.CHM(r);const d=e.oxw(2);return e.KtG(d._animationDone.next(o))}),e.GkF(1,13),e.qZA()}if(2&i){const r=n.$implicit,t=n.index,o=e.oxw(2);e.ekj("mat-horizontal-stepper-content-inactive",o.selectedIndex!==t),e.Q6J("@horizontalStepTransition",e.WLB(8,q,o._getAnimationDirection(t),e.VKq(6,J,o._getAnimationDuration())))("id",o._getStepContentId(t)),e.uIk("aria-labelledby",o._getStepLabelId(t)),e.xp6(1),e.Q6J("ngTemplateOutlet",r.content)}}function he(i,n){if(1&i&&(e.TgZ(0,"div",4)(1,"div",5),e.YNc(2,ue,3,6,"ng-container",6),e.qZA(),e.TgZ(3,"div",7),e.YNc(4,_e,2,11,"div",8),e.qZA()()),2&i){const r=e.oxw();e.xp6(2),e.Q6J("ngForOf",r.steps),e.xp6(2),e.Q6J("ngForOf",r.steps)}}function be(i,n){if(1&i){const r=e.EpF();e.TgZ(0,"div",15),e.GkF(1,9),e.TgZ(2,"div",16)(3,"div",17),e.NdJ("@verticalStepTransition.done",function(o){e.CHM(r);const d=e.oxw(2);return e.KtG(d._animationDone.next(o))}),e.TgZ(4,"div",18),e.GkF(5,13),e.qZA()()()()}if(2&i){const r=n.$implicit,t=n.index,o=n.last,d=e.oxw(2),l=e.MAs(4);e.xp6(1),e.Q6J("ngTemplateOutlet",l)("ngTemplateOutletContext",e.WLB(10,Z,r,t)),e.xp6(1),e.ekj("mat-stepper-vertical-line",!o),e.xp6(1),e.ekj("mat-vertical-stepper-content-inactive",d.selectedIndex!==t),e.Q6J("@verticalStepTransition",e.WLB(15,q,d._getAnimationDirection(t),e.VKq(13,J,d._getAnimationDuration())))("id",d._getStepContentId(t)),e.uIk("aria-labelledby",d._getStepLabelId(t)),e.xp6(2),e.Q6J("ngTemplateOutlet",r.content)}}function fe(i,n){if(1&i&&(e.ynx(0),e.YNc(1,be,6,18,"div",14),e.BQk()),2&i){const r=e.oxw();e.xp6(1),e.Q6J("ngForOf",r.steps)}}function ge(i,n){if(1&i){const r=e.EpF();e.TgZ(0,"mat-step-header",19),e.NdJ("click",function(){const d=e.CHM(r).step;return e.KtG(d.select())})("keydown",function(o){e.CHM(r);const d=e.oxw();return e.KtG(d._onKeydown(o))}),e.qZA()}if(2&i){const r=n.step,t=n.i,o=e.oxw();e.ekj("mat-horizontal-stepper-header","horizontal"===o.orientation)("mat-vertical-stepper-header","vertical"===o.orientation),e.Q6J("tabIndex",o._getFocusIndex()===t?0:-1)("id",o._getStepLabelId(t))("index",t)("state",o._getIndicatorType(t,r.state))("label",r.stepLabel||r.label)("selected",o.selectedIndex===t)("active",o._stepIsNavigable(t,r))("optional",r.optional)("errorMessage",r.errorMessage)("iconOverrides",o._iconOverrides)("disableRipple",o.disableRipple||!o._stepIsNavigable(t,r))("color",r.color||o.color),e.uIk("aria-posinset",t+1)("aria-setsize",o.steps.length)("aria-controls",o._getStepContentId(t))("aria-selected",o.selectedIndex==t)("aria-label",r.ariaLabel||null)("aria-labelledby",!r.ariaLabel&&r.ariaLabelledby?r.ariaLabelledby:null)("aria-disabled",!o._stepIsNavigable(t,r)||null)}}let B=(()=>{var i;class n extends z{}return(i=n).\u0275fac=function(){let r;return function(o){return(r||(r=e.n5z(i)))(o||i)}}(),i.\u0275dir=e.lG2({type:i,selectors:[["","matStepLabel",""]],features:[e.qOj]}),n})(),G=(()=>{var i;class n{constructor(){this.changes=new T.x,this.optionalLabel="Optional",this.completedLabel="Completed",this.editableLabel="Editable"}}return(i=n).\u0275fac=function(t){return new(t||i)},i.\u0275prov=e.Yz7({token:i,factory:i.\u0275fac,providedIn:"root"}),n})();const xe={provide:G,deps:[[new e.FiY,new e.tp0,G]],useFactory:function ve(i){return i||new G}},ye=(0,a.pj)(class extends E{constructor(n){super(n)}},"primary");let U=(()=>{var i;class n extends ye{constructor(t,o,d,l){super(d),this._intl=t,this._focusMonitor=o,this._intlSubscription=t.changes.subscribe(()=>l.markForCheck())}ngAfterViewInit(){this._focusMonitor.monitor(this._elementRef,!0)}ngOnDestroy(){this._intlSubscription.unsubscribe(),this._focusMonitor.stopMonitoring(this._elementRef)}focus(t,o){t?this._focusMonitor.focusVia(this._elementRef,t,o):this._elementRef.nativeElement.focus(o)}_stringLabel(){return this.label instanceof B?null:this.label}_templateLabel(){return this.label instanceof B?this.label:null}_getHostElement(){return this._elementRef.nativeElement}_getIconContext(){return{index:this.index,active:this.active,optional:this.optional}}_getDefaultTextForState(t){return"number"==t?`${this.index+1}`:"edit"==t?"create":"error"==t?"warning":t}}return(i=n).\u0275fac=function(t){return new(t||i)(e.Y36(G),e.Y36(x.tE),e.Y36(e.SBq),e.Y36(e.sBO))},i.\u0275cmp=e.Xpm({type:i,selectors:[["mat-step-header"]],hostAttrs:["role","tab",1,"mat-step-header"],inputs:{color:"color",state:"state",label:"label",errorMessage:"errorMessage",iconOverrides:"iconOverrides",index:"index",selected:"selected",active:"active",optional:"optional",disableRipple:"disableRipple"},features:[e.qOj],decls:10,vars:19,consts:[["matRipple","",1,"mat-step-header-ripple","mat-focus-indicator",3,"matRippleTrigger","matRippleDisabled"],[1,"mat-step-icon-content",3,"ngSwitch"],[3,"ngTemplateOutlet","ngTemplateOutletContext",4,"ngSwitchCase"],[3,"ngSwitch",4,"ngSwitchDefault"],[1,"mat-step-label"],["class","mat-step-text-label",4,"ngIf"],["class","mat-step-optional",4,"ngIf"],["class","mat-step-sub-label-error",4,"ngIf"],[3,"ngTemplateOutlet","ngTemplateOutletContext"],[3,"ngSwitch"],["aria-hidden","true",4,"ngSwitchCase"],["class","cdk-visually-hidden",4,"ngIf"],["aria-hidden","true",4,"ngSwitchDefault"],["aria-hidden","true"],[1,"cdk-visually-hidden"],[1,"mat-step-text-label"],[3,"ngTemplateOutlet"],[1,"mat-step-optional"],[1,"mat-step-sub-label-error"]],template:function(t,o){1&t&&(e._UZ(0,"div",0),e.TgZ(1,"div")(2,"div",1),e.YNc(3,S,1,2,"ng-container",2),e.YNc(4,re,5,4,"ng-container",3),e.qZA()(),e.TgZ(5,"div",4),e.YNc(6,ae,2,1,"div",5),e.YNc(7,ne,2,1,"div",5),e.YNc(8,se,2,1,"div",6),e.YNc(9,de,2,1,"div",7),e.qZA()),2&t&&(e.Q6J("matRippleTrigger",o._getHostElement())("matRippleDisabled",o.disableRipple),e.xp6(1),e.Gre("mat-step-icon-state-",o.state," mat-step-icon"),e.ekj("mat-step-icon-selected",o.selected),e.xp6(1),e.Q6J("ngSwitch",!(!o.iconOverrides||!o.iconOverrides[o.state])),e.xp6(1),e.Q6J("ngSwitchCase",!0),e.xp6(2),e.ekj("mat-step-label-active",o.active)("mat-step-label-selected",o.selected)("mat-step-label-error","error"==o.state),e.xp6(1),e.Q6J("ngIf",o._templateLabel()),e.xp6(1),e.Q6J("ngIf",o._stringLabel()),e.xp6(1),e.Q6J("ngIf",o.optional&&"error"!=o.state),e.xp6(1),e.Q6J("ngIf","error"==o.state))},dependencies:[u.O5,u.tP,u.RF,u.n9,u.ED,c.Hw,a.wG],styles:['.mat-step-header{overflow:hidden;outline:none;cursor:pointer;position:relative;box-sizing:content-box;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mat-step-header:focus .mat-focus-indicator::before{content:""}.mat-step-header:hover[aria-disabled=true]{cursor:default}.mat-step-header:hover:not([aria-disabled]),.mat-step-header:hover[aria-disabled=false]{background-color:var(--mat-stepper-header-hover-state-layer-color)}.mat-step-header.cdk-keyboard-focused,.mat-step-header.cdk-program-focused{background-color:var(--mat-stepper-header-focus-state-layer-color)}@media(hover: none){.mat-step-header:hover{background:none}}.cdk-high-contrast-active .mat-step-header{outline:solid 1px}.cdk-high-contrast-active .mat-step-header[aria-selected=true] .mat-step-label{text-decoration:underline}.cdk-high-contrast-active .mat-step-header[aria-disabled=true]{outline-color:GrayText}.cdk-high-contrast-active .mat-step-header[aria-disabled=true] .mat-step-label,.cdk-high-contrast-active .mat-step-header[aria-disabled=true] .mat-step-icon,.cdk-high-contrast-active .mat-step-header[aria-disabled=true] .mat-step-optional{color:GrayText}.mat-step-optional{font-size:12px;color:var(--mat-stepper-header-optional-label-text-color)}.mat-step-sub-label-error{font-size:12px;font-weight:normal}.mat-step-icon{border-radius:50%;height:24px;width:24px;flex-shrink:0;position:relative;color:var(--mat-stepper-header-icon-foreground-color);background-color:var(--mat-stepper-header-icon-background-color)}.mat-step-icon-content{position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);display:flex}.mat-step-icon .mat-icon{font-size:16px;height:16px;width:16px}.mat-step-icon-state-error{background-color:var(--mat-stepper-header-error-state-icon-background-color);color:var(--mat-stepper-header-error-state-icon-foreground-color)}.mat-step-icon-state-error .mat-icon{font-size:24px;height:24px;width:24px}.mat-step-label{display:inline-block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:50px;vertical-align:middle;font-family:var(--mat-stepper-header-label-text-font);font-size:var(--mat-stepper-header-label-text-size);font-weight:var(--mat-stepper-header-label-text-weight);color:var(--mat-stepper-header-label-text-color)}.mat-step-label.mat-step-label-active{color:var(--mat-stepper-header-selected-state-label-text-color)}.mat-step-label.mat-step-label-error{color:var(--mat-stepper-header-error-state-label-text-color);font-size:var(--mat-stepper-header-error-state-label-text-size)}.mat-step-label.mat-step-label-selected{font-size:var(--mat-stepper-header-selected-state-label-text-size);font-weight:var(--mat-stepper-header-selected-state-label-text-weight)}.mat-step-text-label{text-overflow:ellipsis;overflow:hidden}.mat-step-header .mat-step-header-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}.mat-step-icon-selected{background-color:var(--mat-stepper-header-selected-state-icon-background-color);color:var(--mat-stepper-header-selected-state-icon-foreground-color)}.mat-step-icon-state-done{background-color:var(--mat-stepper-header-done-state-icon-background-color);color:var(--mat-stepper-header-done-state-icon-foreground-color)}.mat-step-icon-state-edit{background-color:var(--mat-stepper-header-edit-state-icon-background-color);color:var(--mat-stepper-header-edit-state-icon-foreground-color)}'],encapsulation:2,changeDetection:0}),n})();const V="500ms",j="225ms",$={horizontalStepTransition:(0,_.X$)("horizontalStepTransition",[(0,_.SB)("previous",(0,_.oB)({transform:"translate3d(-100%, 0, 0)",visibility:"hidden"})),(0,_.SB)("current",(0,_.oB)({transform:"none",visibility:"inherit"})),(0,_.SB)("next",(0,_.oB)({transform:"translate3d(100%, 0, 0)",visibility:"hidden"})),(0,_.eR)("* => *",(0,_.ru)([(0,_.jt)("{{animationDuration}} cubic-bezier(0.35, 0, 0.25, 1)"),(0,_.IO)("@*",(0,_.pV)(),{optional:!0})]),{params:{animationDuration:V}})]),verticalStepTransition:(0,_.X$)("verticalStepTransition",[(0,_.SB)("previous",(0,_.oB)({height:"0px",visibility:"hidden"})),(0,_.SB)("next",(0,_.oB)({height:"0px",visibility:"hidden"})),(0,_.SB)("current",(0,_.oB)({height:"*",visibility:"inherit"})),(0,_.eR)("* <=> current",(0,_.ru)([(0,_.jt)("{{animationDuration}} cubic-bezier(0.4, 0.0, 0.2, 1)"),(0,_.IO)("@*",(0,_.pV)(),{optional:!0})]),{params:{animationDuration:j}})])};let ke=(()=>{var i;class n{constructor(t){this.templateRef=t}}return(i=n).\u0275fac=function(t){return new(t||i)(e.Y36(e.Rgc))},i.\u0275dir=e.lG2({type:i,selectors:[["ng-template","matStepperIcon",""]],inputs:{name:["matStepperIcon","name"]}}),n})(),Ie=(()=>{var i;class n{constructor(t){this._template=t}}return(i=n).\u0275fac=function(t){return new(t||i)(e.Y36(e.Rgc))},i.\u0275dir=e.lG2({type:i,selectors:[["ng-template","matStepContent",""]]}),n})(),K=(()=>{var i;class n extends C{constructor(t,o,d,l){super(t,l),this._errorStateMatcher=o,this._viewContainerRef=d,this._isSelected=b.w0.EMPTY,this.stepLabel=void 0}ngAfterContentInit(){this._isSelected=this._stepper.steps.changes.pipe((0,g.w)(()=>this._stepper.selectionChange.pipe((0,O.U)(t=>t.selectedStep===this),(0,k.O)(this._stepper.selected===this)))).subscribe(t=>{t&&this._lazyContent&&!this._portal&&(this._portal=new s.UE(this._lazyContent._template,this._viewContainerRef))})}ngOnDestroy(){this._isSelected.unsubscribe()}isErrorState(t,o){return this._errorStateMatcher.isErrorState(t,o)||!!(t&&t.invalid&&this.interacted)}}return(i=n).\u0275fac=function(t){return new(t||i)(e.Y36((0,e.Gpc)(()=>W)),e.Y36(a.rD,4),e.Y36(e.s_b),e.Y36(A,8))},i.\u0275cmp=e.Xpm({type:i,selectors:[["mat-step"]],contentQueries:function(t,o,d){if(1&t&&(e.Suo(d,B,5),e.Suo(d,Ie,5)),2&t){let l;e.iGM(l=e.CRH())&&(o.stepLabel=l.first),e.iGM(l=e.CRH())&&(o._lazyContent=l.first)}},inputs:{color:"color"},exportAs:["matStep"],features:[e._Bn([{provide:a.rD,useExisting:i},{provide:C,useExisting:i}]),e.qOj],ngContentSelectors:pe,decls:1,vars:0,consts:[[3,"cdkPortalOutlet"]],template:function(t,o){1&t&&(e.F$t(),e.YNc(0,le,2,1,"ng-template"))},dependencies:[s.Pl],encapsulation:2,changeDetection:0}),n})(),W=(()=>{var i;class n extends I{get animationDuration(){return this._animationDuration}set animationDuration(t){this._animationDuration=/^\d+$/.test(t)?t+"ms":t}constructor(t,o,d){super(t,o,d),this._stepHeader=void 0,this._steps=void 0,this.steps=new e.n_E,this.animationDone=new e.vpe,this.labelPosition="end",this.headerPosition="top",this._iconOverrides={},this._animationDone=new T.x,this._animationDuration="";const l=d.nativeElement.nodeName.toLowerCase();this.orientation="mat-vertical-stepper"===l?"vertical":"horizontal"}ngAfterContentInit(){super.ngAfterContentInit(),this._icons.forEach(({name:t,templateRef:o})=>this._iconOverrides[t]=o),this.steps.changes.pipe((0,y.R)(this._destroyed)).subscribe(()=>{this._stateChanged()}),this._animationDone.pipe((0,w.x)((t,o)=>t.fromState===o.fromState&&t.toState===o.toState),(0,y.R)(this._destroyed)).subscribe(t=>{"current"===t.toState&&this.animationDone.emit()})}_stepIsNavigable(t,o){return o.completed||this.selectedIndex===t||!this.linear}_getAnimationDuration(){return this.animationDuration?this.animationDuration:"horizontal"===this.orientation?V:j}}return(i=n).\u0275fac=function(t){return new(t||i)(e.Y36(M.Is,8),e.Y36(e.sBO),e.Y36(e.SBq))},i.\u0275cmp=e.Xpm({type:i,selectors:[["mat-stepper"],["mat-vertical-stepper"],["mat-horizontal-stepper"],["","matStepper",""]],contentQueries:function(t,o,d){if(1&t&&(e.Suo(d,K,5),e.Suo(d,ke,5)),2&t){let l;e.iGM(l=e.CRH())&&(o._steps=l),e.iGM(l=e.CRH())&&(o._icons=l)}},viewQuery:function(t,o){if(1&t&&e.Gf(U,5),2&t){let d;e.iGM(d=e.CRH())&&(o._stepHeader=d)}},hostAttrs:["role","tablist","ngSkipHydration",""],hostVars:11,hostBindings:function(t,o){2&t&&(e.uIk("aria-orientation",o.orientation),e.ekj("mat-stepper-horizontal","horizontal"===o.orientation)("mat-stepper-vertical","vertical"===o.orientation)("mat-stepper-label-position-end","horizontal"===o.orientation&&"end"==o.labelPosition)("mat-stepper-label-position-bottom","horizontal"===o.orientation&&"bottom"==o.labelPosition)("mat-stepper-header-position-bottom","bottom"===o.headerPosition))},inputs:{selectedIndex:"selectedIndex",disableRipple:"disableRipple",color:"color",labelPosition:"labelPosition",headerPosition:"headerPosition",animationDuration:"animationDuration"},outputs:{animationDone:"animationDone"},exportAs:["matStepper","matVerticalStepper","matHorizontalStepper"],features:[e._Bn([{provide:I,useExisting:i}]),e.qOj],decls:5,vars:3,consts:[[3,"ngSwitch"],["class","mat-horizontal-stepper-wrapper",4,"ngSwitchCase"],[4,"ngSwitchCase"],["stepTemplate",""],[1,"mat-horizontal-stepper-wrapper"],[1,"mat-horizontal-stepper-header-container"],[4,"ngFor","ngForOf"],[1,"mat-horizontal-content-container"],["class","mat-horizontal-stepper-content","role","tabpanel",3,"id","mat-horizontal-stepper-content-inactive",4,"ngFor","ngForOf"],[3,"ngTemplateOutlet","ngTemplateOutletContext"],["class","mat-stepper-horizontal-line",4,"ngIf"],[1,"mat-stepper-horizontal-line"],["role","tabpanel",1,"mat-horizontal-stepper-content",3,"id"],[3,"ngTemplateOutlet"],["class","mat-step",4,"ngFor","ngForOf"],[1,"mat-step"],[1,"mat-vertical-content-container"],["role","tabpanel",1,"mat-vertical-stepper-content",3,"id"],[1,"mat-vertical-content"],[3,"tabIndex","id","index","state","label","selected","active","optional","errorMessage","iconOverrides","disableRipple","color","click","keydown"]],template:function(t,o){1&t&&(e.ynx(0,0),e.YNc(1,he,5,2,"div",1),e.YNc(2,fe,2,1,"ng-container",2),e.BQk(),e.YNc(3,ge,1,23,"ng-template",null,3,e.W1O)),2&t&&(e.Q6J("ngSwitch",o.orientation),e.xp6(1),e.Q6J("ngSwitchCase","horizontal"),e.xp6(1),e.Q6J("ngSwitchCase","vertical"))},dependencies:[u.sg,u.O5,u.tP,u.RF,u.n9,U],styles:['.mat-stepper-vertical,.mat-stepper-horizontal{display:block;font-family:var(--mat-stepper-container-text-font);background:var(--mat-stepper-container-color)}.mat-horizontal-stepper-header-container{white-space:nowrap;display:flex;align-items:center}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header-container{align-items:flex-start}.mat-stepper-header-position-bottom .mat-horizontal-stepper-header-container{order:1}.mat-stepper-horizontal-line{border-top-width:1px;border-top-style:solid;flex:auto;height:0;margin:0 -16px;min-width:32px;border-top-color:var(--mat-stepper-line-color)}.mat-stepper-label-position-bottom .mat-stepper-horizontal-line{margin:0;min-width:0;position:relative;top:calc(calc((var(--mat-stepper-header-height) - 24px) / 2) + 12px)}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:first-child)::before,[dir=rtl] .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:last-child)::before,.mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:last-child)::after,[dir=rtl] .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:first-child)::after{border-top-width:1px;border-top-style:solid;content:"";display:inline-block;height:0;position:absolute;width:calc(50% - 20px)}.mat-horizontal-stepper-header{display:flex;height:72px;overflow:hidden;align-items:center;padding:0 24px;height:var(--mat-stepper-header-height)}.mat-horizontal-stepper-header .mat-step-icon{margin-right:8px;flex:none}[dir=rtl] .mat-horizontal-stepper-header .mat-step-icon{margin-right:0;margin-left:8px}.mat-horizontal-stepper-header::before,.mat-horizontal-stepper-header::after{border-top-color:var(--mat-stepper-line-color)}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header{padding:calc((var(--mat-stepper-header-height) - 24px) / 2) 24px}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header::before,.mat-stepper-label-position-bottom .mat-horizontal-stepper-header::after{top:calc(calc((var(--mat-stepper-header-height) - 24px) / 2) + 12px)}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header{box-sizing:border-box;flex-direction:column;height:auto}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:last-child)::after,[dir=rtl] .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:first-child)::after{right:0}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:first-child)::before,[dir=rtl] .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:last-child)::before{left:0}[dir=rtl] .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:last-child::before,[dir=rtl] .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:first-child::after{display:none}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header .mat-step-icon{margin-right:0;margin-left:0}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header .mat-step-label{padding:16px 0 0 0;text-align:center;width:100%}.mat-vertical-stepper-header{display:flex;align-items:center;height:24px;padding:calc((var(--mat-stepper-header-height) - 24px) / 2) 24px}.mat-vertical-stepper-header .mat-step-icon{margin-right:12px}[dir=rtl] .mat-vertical-stepper-header .mat-step-icon{margin-right:0;margin-left:12px}.mat-horizontal-stepper-wrapper{display:flex;flex-direction:column}.mat-horizontal-stepper-content{outline:0}.mat-horizontal-stepper-content.mat-horizontal-stepper-content-inactive{height:0;overflow:hidden}.mat-horizontal-stepper-content:not(.mat-horizontal-stepper-content-inactive){visibility:inherit !important}.mat-horizontal-content-container{overflow:hidden;padding:0 24px 24px 24px}.cdk-high-contrast-active .mat-horizontal-content-container{outline:solid 1px}.mat-stepper-header-position-bottom .mat-horizontal-content-container{padding:24px 24px 0 24px}.mat-vertical-content-container{margin-left:36px;border:0;position:relative}.cdk-high-contrast-active .mat-vertical-content-container{outline:solid 1px}[dir=rtl] .mat-vertical-content-container{margin-left:0;margin-right:36px}.mat-stepper-vertical-line::before{content:"";position:absolute;left:0;border-left-width:1px;border-left-style:solid;border-left-color:var(--mat-stepper-line-color);top:calc(8px - calc((var(--mat-stepper-header-height) - 24px) / 2));bottom:calc(8px - calc((var(--mat-stepper-header-height) - 24px) / 2))}[dir=rtl] .mat-stepper-vertical-line::before{left:auto;right:0}.mat-vertical-stepper-content{overflow:hidden;outline:0}.mat-vertical-stepper-content:not(.mat-vertical-stepper-content-inactive){visibility:inherit !important}.mat-vertical-content{padding:0 24px 24px 24px}.mat-step:last-child .mat-vertical-content-container{border:none}'],encapsulation:2,data:{animation:[$.horizontalStepTransition,$.verticalStepTransition]},changeDetection:0}),n})(),Se=(()=>{var i;class n extends Y{}return(i=n).\u0275fac=function(){let r;return function(o){return(r||(r=e.n5z(i)))(o||i)}}(),i.\u0275dir=e.lG2({type:i,selectors:[["button","matStepperNext",""]],hostAttrs:[1,"mat-stepper-next"],hostVars:1,hostBindings:function(t,o){2&t&&e.Ikx("type",o.type)},inputs:{type:"type"},features:[e.qOj]}),n})(),Me=(()=>{var i;class n extends p{}return(i=n).\u0275fac=function(){let r;return function(o){return(r||(r=e.n5z(i)))(o||i)}}(),i.\u0275dir=e.lG2({type:i,selectors:[["button","matStepperPrevious",""]],hostAttrs:[1,"mat-stepper-previous"],hostVars:1,hostBindings:function(t,o){2&t&&e.Ikx("type",o.type)},inputs:{type:"type"},features:[e.qOj]}),n})(),De=(()=>{var i;class n{}return(i=n).\u0275fac=function(t){return new(t||i)},i.\u0275mod=e.oAB({type:i}),i.\u0275inj=e.cJS({providers:[xe,a.rD],imports:[a.BQ,u.ez,s.eL,h,c.Ps,a.si,a.BQ]}),n})()}}]);