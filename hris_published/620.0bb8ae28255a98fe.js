"use strict";(self.webpackChunkhris_admin=self.webpackChunkhris_admin||[]).push([[620],{2620:(xt,u,r)=>{r.r(u),r.d(u,{MfoModule:()=>Tt});var _=r(6814),l=r(6223),g=r(2787),t=r(5879);let C=(()=>{var n;class s{constructor(){}}return(n=s).\u0275fac=function(a){return new(a||n)},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-mfo"]],decls:1,vars:0,template:function(a,e){1&a&&t._UZ(0,"router-outlet")},dependencies:[g.lC],encapsulation:2}),s})();var b=r(8408),p=r(4847),M=r(6513);let v=(()=>{var n;class s{constructor(){this.setIsCommon=new t.vpe}SetIsCommon(a){this.setIsCommon.emit(a)}}return(n=s).\u0275fac=function(a){return new(a||n)},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-toggle-mfo"]],inputs:{mfoType:"mfoType"},outputs:{setIsCommon:"setIsCommon"},decls:7,vars:2,consts:[["role","group","aria-label","Basic radio toggle button group",1,"btn-group"],["type","radio","name","btnradio","id","btnradio1","autocomplete","off",1,"btn-check",3,"checked","click"],["for","btnradio1",1,"btn","btn-outline-primary"],["type","radio","name","btnradio","id","btnradio2","autocomplete","off",1,"btn-check",3,"checked","click"],["for","btnradio2",1,"btn","btn-outline-primary"]],template:function(a,e){1&a&&(t.TgZ(0,"div",0)(1,"input",1),t.NdJ("click",function(){return e.SetIsCommon(0)}),t.qZA(),t.TgZ(2,"label",2),t._uU(3,"OFFICE MFO"),t.qZA(),t.TgZ(4,"input",3),t.NdJ("click",function(){return e.SetIsCommon(1)}),t.qZA(),t.TgZ(5,"label",4),t._uU(6,"COMMON MFO"),t.qZA()()),2&a&&(t.xp6(1),t.Q6J("checked",0===e.mfoType),t.xp6(3),t.Q6J("checked",1===e.mfoType))},encapsulation:2}),s})();var d=r(6825),h=r(2268);let T=(()=>{var n;class s{}return(n=s).\u0275fac=function(a){return new(a||n)},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-spinner"]],decls:3,vars:0,consts:[["role","status",1,"spinner-border","spinner-border-lg","text-primary"],[1,"visually-hidden"]],template:function(a,e){1&a&&(t.TgZ(0,"div",0)(1,"span",1),t._uU(2,"Loading..."),t.qZA()())},encapsulation:2}),s})();function x(n,s){1&n&&(t.TgZ(0,"th",2),t._uU(1," Actions "),t.qZA()),2&n&&t.Q6J("width",10)}function Z(n,s){1&n&&(t.ynx(0),t.TgZ(1,"tbody")(2,"tr")(3,"td",7),t._UZ(4,"app-spinner"),t.qZA()()(),t.BQk())}function I(n,s){1&n&&t._UZ(0,"i",17)}const m=function(){return{margin:"0px"}};function S(n,s){1&n&&t._UZ(0,"ngx-skeleton-loader",18),2&n&&t.Q6J("theme",t.DdM(1,m))}function y(n,s){if(1&n&&(t.TgZ(0,"div"),t._uU(1),t.qZA()),2&n){const o=t.oxw().index;t.xp6(1),t.hij(" ",o+1," ")}}function A(n,s){1&n&&t._UZ(0,"ngx-skeleton-loader",18),2&n&&t.Q6J("theme",t.DdM(1,m))}function w(n,s){if(1&n){const o=t.EpF();t.TgZ(0,"button",23),t.NdJ("click",function(){t.CHM(o);const e=t.oxw(3).$implicit,i=t.oxw();return i.SetMfoData(e),i.ClearSIData(),t.KtG(i.IsAdd(!0))}),t._uU(1," Create success indicator "),t.qZA()}}function q(n,s){if(1&n&&(t.TgZ(0,"div"),t.YNc(1,w,2,0,"button",22),t.qZA()),2&n){const o=t.oxw(3);t.xp6(1),t.Q6J("ngIf",!o.mfoService.isCommon()||o.mfoService.isCommon()&&o.hrFocal===o.officeId)}}function O(n,s){if(1&n&&(t.TgZ(0,"small",24),t._uU(1),t.qZA()),2&n){const o=t.oxw(2).$implicit,a=t.oxw();t.Q6J("ngClass","1"==o.categoryId?"bg-label-success":"2"==o.categoryId?"bg-label-primary":"3"==o.categoryId?"bg-label-warning":"bg-label-secondary"),t.xp6(1),t.hij(" ",a.displayCatergory(o.categoryId)," ")}}function J(n,s){if(1&n){const o=t.EpF();t.TgZ(0,"li")(1,"a",25),t.NdJ("click",function(){t.CHM(o);const e=t.oxw(2).$implicit;return t.oxw().PutCMFOCategory(e.mfoId,1),t.KtG(e.categoryId=1)}),t._uU(2,"STRATEGIC"),t.qZA()()}}function D(n,s){if(1&n){const o=t.EpF();t.TgZ(0,"li")(1,"a",25),t.NdJ("click",function(){t.CHM(o);const e=t.oxw(2).$implicit;return t.oxw().PutCMFOCategory(e.mfoId,2),t.KtG(e.categoryId=2)}),t._uU(2,"CORE "),t.qZA()()}}function F(n,s){if(1&n){const o=t.EpF();t.TgZ(0,"li")(1,"a",25),t.NdJ("click",function(){t.CHM(o);const e=t.oxw(2).$implicit;return t.oxw().PutCMFOCategory(e.mfoId,3),t.KtG(e.categoryId=3)}),t._uU(2,"SUPPORT "),t.qZA()()}}function k(n,s){if(1&n&&(t.TgZ(0,"div")(1,"div",19)(2,"div"),t._uU(3),t.qZA(),t.TgZ(4,"div",19),t.YNc(5,q,2,1,"div",4),t.YNc(6,O,2,2,"small",20),t.TgZ(7,"ul",21),t.YNc(8,J,3,0,"li",4),t.YNc(9,D,3,0,"li",4),t.YNc(10,F,3,0,"li",4),t.qZA()()()()),2&n){const o=t.oxw().$implicit,a=t.oxw();t.xp6(3),t.Oqu(o.mfo),t.xp6(2),t.Q6J("ngIf",0===o.si.length),t.xp6(1),t.Q6J("ngIf",a.mfoService.isCommon()),t.xp6(2),t.Q6J("ngIf",1!==o.categoryId),t.xp6(1),t.Q6J("ngIf",2!==o.categoryId),t.xp6(1),t.Q6J("ngIf",3!==o.categoryId)}}function N(n,s){1&n&&t._UZ(0,"ngx-skeleton-loader",18),2&n&&t.Q6J("theme",t.DdM(1,m))}function U(n,s){if(1&n){const o=t.EpF();t.TgZ(0,"div",28)(1,"button",29),t._UZ(2,"i",30),t.qZA(),t.TgZ(3,"div",31)(4,"a",32),t.NdJ("click",function(){t.CHM(o);const e=t.oxw(2).$implicit,i=t.oxw();return i.SetMfoData(e),i.ClearSIData(),t.KtG(i.IsAdd(!0))}),t._UZ(5,"i",33),t._uU(6," Create"),t.qZA(),t.TgZ(7,"a",34),t.NdJ("click",function(){t.CHM(o);const e=t.oxw(2).$implicit,i=t.oxw();return i.SetMfoData(e),t.KtG(i.IsAdd(!1))}),t._UZ(8,"i",35),t._uU(9," Edit"),t.qZA(),t.TgZ(10,"a",36),t.NdJ("click",function(){t.CHM(o);const e=t.oxw(2).$implicit,i=t.oxw();return t.KtG(i.DeleteMFO(e.mfoId))}),t._UZ(11,"i",37),t._uU(12," Delete"),t.qZA()()()}}function Q(n,s){1&n&&t._UZ(0,"ngx-skeleton-loader",38),2&n&&t.Q6J("theme",t.DdM(1,m))}function E(n,s){if(1&n&&(t.TgZ(0,"td"),t.YNc(1,U,13,0,"div",26),t.YNc(2,Q,1,2,"ng-template",null,27,t.W1O),t.qZA()),2&n){const o=t.MAs(3),a=t.oxw(2);t.xp6(1),t.Q6J("ngIf",!a.mfo.isLoading)("ngIfElse",o)}}function R(n,s){if(1&n){const o=t.EpF();t.TgZ(0,"div",47)(1,"div",48)(2,"button",49),t.NdJ("click",function(){t.CHM(o);const e=t.oxw().$implicit,i=t.oxw(2).$implicit,c=t.oxw();return c.SetSIData(i,e),t.KtG(c.IsAdd(!1))}),t._UZ(3,"i",50),t._uU(4," EDIT "),t.qZA(),t._uU(5," \xa0 "),t.TgZ(6,"button",51),t.NdJ("click",function(){t.CHM(o);const e=t.oxw().$implicit,i=t.oxw(3);return t.KtG(i.DeleteSI(e.indicatorId))}),t._UZ(7,"i",52),t.qZA()()()}}function Y(n,s){if(1&n&&(t.TgZ(0,"span"),t._uU(1),t.qZA()),2&n){const o=t.oxw(2).$implicit;t.xp6(1),t.Oqu(o.standard.qlty5)}}function L(n,s){if(1&n&&(t.TgZ(0,"span"),t._uU(1),t.qZA()),2&n){const o=t.oxw(2).$implicit;t.xp6(1),t.Oqu(o.standard.timely5)}}function G(n,s){if(1&n&&(t.TgZ(0,"span"),t._uU(1),t.qZA()),2&n){const o=t.oxw(2).$implicit;t.xp6(1),t.Oqu(o.standard.qlty4)}}function H(n,s){if(1&n&&(t.TgZ(0,"span"),t._uU(1),t.qZA()),2&n){const o=t.oxw(2).$implicit;t.xp6(1),t.Oqu(o.standard.timely4)}}function $(n,s){if(1&n&&(t.TgZ(0,"span"),t._uU(1),t.qZA()),2&n){const o=t.oxw(2).$implicit;t.xp6(1),t.Oqu(o.standard.qlty3)}}function K(n,s){if(1&n&&(t.TgZ(0,"span"),t._uU(1),t.qZA()),2&n){const o=t.oxw(2).$implicit;t.xp6(1),t.Oqu(o.standard.timely3)}}function P(n,s){if(1&n&&(t.TgZ(0,"span"),t._uU(1),t.qZA()),2&n){const o=t.oxw(2).$implicit;t.xp6(1),t.Oqu(o.standard.qlty2)}}function j(n,s){if(1&n&&(t.TgZ(0,"span"),t._uU(1),t.qZA()),2&n){const o=t.oxw(2).$implicit;t.xp6(1),t.Oqu(o.standard.timely2)}}function B(n,s){if(1&n&&(t.TgZ(0,"span"),t._uU(1),t.qZA()),2&n){const o=t.oxw(2).$implicit;t.xp6(1),t.Oqu(o.standard.qlty1)}}function W(n,s){if(1&n&&(t.TgZ(0,"span"),t._uU(1),t.qZA()),2&n){const o=t.oxw(2).$implicit;t.xp6(1),t.Oqu(o.standard.timely1)}}function X(n,s){if(1&n&&(t.ynx(0),t.TgZ(1,"div",53)(2,"div",54)(3,"div",55)(4,"table",56)(5,"thead")(6,"th",2),t._uU(7,"Rating"),t.qZA(),t.TgZ(8,"th",57),t._uU(9,"Quality"),t.qZA(),t.TgZ(10,"th",57),t._uU(11,"Timeliness"),t.qZA()(),t.TgZ(12,"tbody")(13,"tr")(14,"td"),t._uU(15,"5"),t.qZA(),t.TgZ(16,"td"),t.YNc(17,Y,2,1,"span",4),t.qZA(),t.TgZ(18,"td"),t.YNc(19,L,2,1,"span",4),t.qZA()(),t.TgZ(20,"tr")(21,"td"),t._uU(22,"4"),t.qZA(),t.TgZ(23,"td"),t.YNc(24,G,2,1,"span",4),t.qZA(),t.TgZ(25,"td"),t.YNc(26,H,2,1,"span",4),t.qZA()(),t.TgZ(27,"tr")(28,"td"),t._uU(29,"3"),t.qZA(),t.TgZ(30,"td"),t.YNc(31,$,2,1,"span",4),t.qZA(),t.TgZ(32,"td"),t.YNc(33,K,2,1,"span",4),t.qZA()(),t.TgZ(34,"tr")(35,"td"),t._uU(36,"2"),t.qZA(),t.TgZ(37,"td"),t.YNc(38,P,2,1,"span",4),t.qZA(),t.TgZ(39,"td"),t.YNc(40,j,2,1,"span",4),t.qZA()(),t.TgZ(41,"tr")(42,"td"),t._uU(43,"1"),t.qZA(),t.TgZ(44,"td"),t.YNc(45,B,2,1,"span",4),t.qZA(),t.TgZ(46,"td"),t.YNc(47,W,2,1,"span",4),t.qZA()()()()()()(),t.BQk()),2&n){const o=t.oxw().$implicit;t.xp6(6),t.Q6J("width",1),t.xp6(11),t.Q6J("ngIf",o.standard),t.xp6(2),t.Q6J("ngIf",o.standard),t.xp6(5),t.Q6J("ngIf",o.standard),t.xp6(2),t.Q6J("ngIf",o.standard),t.xp6(5),t.Q6J("ngIf",o.standard),t.xp6(2),t.Q6J("ngIf",o.standard),t.xp6(5),t.Q6J("ngIf",o.standard),t.xp6(2),t.Q6J("ngIf",o.standard),t.xp6(5),t.Q6J("ngIf",o.standard),t.xp6(2),t.Q6J("ngIf",o.standard)}}function z(n,s){if(1&n){const o=t.EpF();t.TgZ(0,"tr",40)(1,"td",41)(2,"div")(3,"div",42)(4,"div",43),t.NdJ("click",function(){const i=t.CHM(o).index,c=t.oxw(3);return t.KtG(c.expandedRowChild=c.expandedRowChild==i?null:i)}),t.TgZ(5,"div",44),t._UZ(6,"i",45),t._uU(7),t.qZA()(),t.YNc(8,R,8,0,"div",46),t.qZA(),t.YNc(9,X,48,11,"ng-container",4),t.qZA()()()}if(2&n){const o=s.$implicit,a=s.index,e=t.oxw(3);t.xp6(7),t.hij(" ",o.indicator," "),t.xp6(1),t.Q6J("ngIf",!e.mfoService.isCommon()||e.mfoService.isCommon()&&e.hrFocal===e.officeId),t.xp6(1),t.Q6J("ngIf",e.expandedRowChild==a)}}function V(n,s){if(1&n&&(t.ynx(0),t.YNc(1,z,10,3,"tr",39),t.BQk()),2&n){const o=t.oxw().$implicit;t.xp6(1),t.Q6J("ngForOf",o.si)}}function tt(n,s){if(1&n){const o=t.EpF();t.ynx(0),t.TgZ(1,"tr",8)(2,"td",9),t.NdJ("click",function(){const i=t.CHM(o).index,c=t.oxw();return t.KtG(c.expandedRow=c.expandedRow==i?null:i)}),t.YNc(3,I,1,0,"i",10),t.YNc(4,S,1,2,"ng-template",null,11,t.W1O),t.qZA(),t.TgZ(6,"td",12),t.NdJ("click",function(){const i=t.CHM(o).index,c=t.oxw();return t.KtG(c.expandedRow=c.expandedRow==i?null:i)}),t.YNc(7,y,2,1,"div",13),t.YNc(8,A,1,2,"ng-template",null,14,t.W1O),t.qZA(),t.TgZ(10,"td",15),t.NdJ("click",function(){const i=t.CHM(o).index,c=t.oxw();return t.KtG(c.expandedRow=c.expandedRow==i?null:i)}),t.YNc(11,k,11,6,"div",13),t.YNc(12,N,1,2,"ng-template",null,16,t.W1O),t.qZA(),t.YNc(14,E,4,2,"td",4),t.qZA(),t.YNc(15,V,2,1,"ng-container",4),t.BQk()}if(2&n){const o=s.$implicit,a=s.index,e=t.MAs(5),i=t.MAs(9),c=t.MAs(13),f=t.oxw();t.xp6(1),t.Q6J("ngClass",0===o.si.length?"bg-custom-gray":"")("@rowState",o),t.xp6(2),t.Q6J("ngIf",!f.mfo.isLoading)("ngIfElse",e),t.xp6(4),t.Q6J("ngIf",!f.mfo.isLoading)("ngIfElse",i),t.xp6(4),t.Q6J("ngIf",!f.mfo.isLoading)("ngIfElse",c),t.xp6(3),t.Q6J("ngIf",!f.mfoService.isCommon()||f.mfoService.isCommon()&&f.hrFocal===f.officeId),t.xp6(1),t.Q6J("ngIf",f.expandedRow==a)}}function nt(n,s){1&n&&(t.ynx(0),t.TgZ(1,"tbody")(2,"tr")(3,"td",7)(4,"p"),t._uU(5,"No data . . ."),t.qZA()()()(),t.BQk())}let et=(()=>{var n;class s{constructor(){this.mfoService=(0,t.f3M)(p.X),this.setIsCommon=new t.vpe,this.setMfoData=new t.vpe,this.setSIData=new t.vpe,this.deleteMfo=new t.vpe,this.deleteSI=new t.vpe,this.isAdd=new t.vpe,this.clearSIData=new t.vpe,this.hrFocal="OFFPHRMONZ3WT7D",this.officeId=localStorage.getItem("officeId"),this.isCommon=this.mfoService.isCommon()}SetMfoData(a){this.setMfoData.emit(a)}SetSIData(a,e){this.setSIData.emit({mfo:a,si:e})}DeleteSI(a){this.deleteSI.emit(a)}DeleteMFO(a){this.deleteMfo.emit(a)}IsAdd(a){this.isAdd.emit(a)}ClearSIData(){this.clearSIData.emit("Clear SI data")}PutCMFOCategory(a,e){this.mfoService.EditMfoCategory(a,e)}displayCatergory(a){let e="";switch(a){case 1:e="STRATEGIC";break;case 2:e="CORE";break;case 3:e="SUPPORT"}return e?e+"":"NO FUNCTION"}}return(n=s).\u0275fac=function(a){return new(a||n)},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-table-mfo"]],inputs:{mfo:"mfo"},outputs:{setIsCommon:"setIsCommon",setMfoData:"setMfoData",setSIData:"setSIData",deleteMfo:"deleteMfo",deleteSI:"deleteSI",isAdd:"isAdd",clearSIData:"clearSIData"},decls:14,vars:6,consts:[[1,"table-responsive","text-nowrap","w-100"],[1,"table","table-hover","mt-5"],[3,"width"],[3,"width",4,"ngIf"],[4,"ngIf"],[1,"table-border-bottom-0"],[4,"ngFor","ngForOf"],["colspan","4",1,"text-center"],[3,"ngClass"],[2,"max-width","5px",3,"click"],["class","bx bx-chevron-right cursor-pointer",4,"ngIf","ngIfElse"],["LoadingIcon",""],[1,"cursor-pointer",2,"max-width","5px",3,"click"],[4,"ngIf","ngIfElse"],["LoadingIndex",""],[1,"cursor-pointer",2,"max-width","800px","min-width","800px",3,"click"],["LoadingMfo",""],[1,"bx","bx-chevron-right","cursor-pointer"],["count","1","animation","pulse","appearance","line",3,"theme"],[1,"x-space-between"],["class","badge rounded-pill float-end","data-bs-toggle","dropdown","aria-expanded","false",3,"ngClass",4,"ngIf"],[1,"dropdown-menu","dropdown-menu-end","pointer"],["data-bs-toggle","offcanvas","data-bs-target","#offcanvasSI","class","btn btn-primary",3,"click",4,"ngIf"],["data-bs-toggle","offcanvas","data-bs-target","#offcanvasSI",1,"btn","btn-primary",3,"click"],["data-bs-toggle","dropdown","aria-expanded","false",1,"badge","rounded-pill","float-end",3,"ngClass"],[1,"dropdown-item",3,"click"],["class","dropdown position-static",4,"ngIf","ngIfElse"],["LoadingActions",""],[1,"dropdown","position-static"],["type","button","data-bs-toggle","dropdown",1,"btn","p-0","dropdown-toggle","hide-arrow"],[1,"bx","bx-dots-vertical-rounded"],[1,"dropdown-menu"],["data-bs-toggle","tooltip","matTooltip","Success Indicator","matTooltipPosition","left","data-bs-toggle","offcanvas","data-bs-target","#offcanvasSI","aria-controls","offcanvasSI",1,"dropdown-item","cursor-pointer",3,"click"],[1,"bx","bx-plus","me-1"],["data-bs-toggle","tooltip","matTooltip","MFO","matTooltipPosition","left","data-bs-toggle","offcanvas","data-bs-target","#offcanvasScroll","aria-controls","offcanvasScroll",1,"dropdown-item","cursor-pointer",3,"click"],[1,"bx","bx-edit-alt","me-1"],[1,"dropdown-item","cursor-pointer",3,"click"],[1,"bx","bx-trash","me-1"],["count","1","animation","pulse","appearance","circle",3,"theme"],["class","bg-lightest",4,"ngFor","ngForOf"],[1,"bg-lightest"],["colspan","4",1,"p-custom","bg-lightest"],[1,"row","justify-content-between","w-100","mb-2"],[1,"col-6","cursor-pointer",3,"click"],[1,"form-text","text-gray"],[1,"bx","bx-chevron-right"],["class","col-6",4,"ngIf"],[1,"col-6"],[1,"float-end"],["data-bs-toggle","offcanvas","data-bs-target","#offcanvasSI","aria-controls","offcanvasSI",1,"btn","btn-secondary",3,"click"],[1,"bx","bx-edit-alt"],[1,"btn","btn-danger",3,"click"],[1,"bx","bx-trash","text-white"],[1,"card"],[1,"card-body"],[1,"table-responsive","text-nowrap"],[1,"table","table-bordered"],[1,"text-center"]],template:function(a,e){1&a&&(t.TgZ(0,"div",0)(1,"table",1)(2,"thead")(3,"tr"),t._UZ(4,"td",2),t.TgZ(5,"th",2),t._uU(6,"#"),t.qZA(),t.TgZ(7,"th"),t._uU(8,"MFO"),t.qZA(),t.YNc(9,x,2,1,"th",3),t.qZA()(),t.YNc(10,Z,5,0,"ng-container",4),t.TgZ(11,"tbody",5),t.YNc(12,tt,16,10,"ng-container",6),t.qZA(),t.YNc(13,nt,6,0,"ng-container",4),t.qZA()()),2&a&&(t.xp6(4),t.Q6J("width",10),t.xp6(1),t.Q6J("width",10),t.xp6(4),t.Q6J("ngIf",!e.mfoService.isCommon()||e.mfoService.isCommon()&&e.hrFocal===e.officeId),t.xp6(1),t.Q6J("ngIf",e.mfo.isLoading&&0===e.mfo.data.length),t.xp6(2),t.Q6J("ngForOf",e.mfo.data),t.xp6(1),t.Q6J("ngIf",!e.mfo.isLoading&&0==e.mfo.data.length))},dependencies:[_.mk,_.sg,_.O5,h.xr,T],encapsulation:2,data:{animation:[(0,d.X$)("rowState",[(0,d.SB)("void",(0,d.oB)({opacity:0})),(0,d.eR)(":enter",[(0,d.jt)("0.5s",(0,d.oB)({opacity:1}))]),(0,d.eR)(":leave",[(0,d.jt)("0.1s",(0,d.oB)({opacity:0}))])])]}}),s})();const ot=["closebuttonMFO"];function at(n,s){if(1&n){const o=t.EpF();t.TgZ(0,"div",15)(1,"input",16),t.NdJ("change",function(e){t.CHM(o);const i=t.oxw();return t.KtG(i.handleIsIpcrShow(e))}),t.qZA(),t.TgZ(2,"label",17),t._uU(3," Specify if MFO is directly displayed in the IPCR "),t.qZA()()}if(2&n){const o=t.oxw();t.xp6(1),t.Q6J("checked",o.mfoData.isIpcrShow)}}function it(n,s){1&n&&(t.TgZ(0,"div",18)(1,"span",19),t._uU(2,"Loading..."),t.qZA()())}function st(n,s){if(1&n&&t._uU(0),2&n){const o=t.oxw();t.hij(" ",o.isAdd?"Submit":"Save changes"," ")}}let ct=(()=>{var n;class s{constructor(){this.submit=new t.vpe,this.onChange=new t.vpe,this.mfoService=(0,t.f3M)(p.X)}Submit(){this.submit.emit("Add or Edit"),this.handleStatus()}handleIsIpcrShow(a){this.mfoData.isIpcrShow=a.target.checked?1:0}OnChange(){this.onChange.emit("")}handleStatus(){setTimeout(()=>{this.error||this.closebuttonMFO.nativeElement.click()},500)}}return(n=s).\u0275fac=function(a){return new(a||n)},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-canvas-mfo"]],viewQuery:function(a,e){if(1&a&&t.Gf(ot,5),2&a){let i;t.iGM(i=t.CRH())&&(e.closebuttonMFO=i.first)}},inputs:{isLoading:"isLoading",mfoData:"mfoData",isAdd:"isAdd",error:"error"},outputs:{submit:"submit",onChange:"onChange"},decls:20,vars:6,consts:[[1,"col-lg-4","col-md-6"],[1,"mt-3"],["data-bs-scroll","true","data-bs-backdrop","false","tabindex","-1","id","offcanvasScroll","aria-labelledby","offcanvasScrollLabel",1,"offcanvas","offcanvas-end"],[1,"offcanvas-header"],["id","offcanvasScrollLabel",1,"offcanvas-title"],["type","button","data-bs-dismiss","offcanvas","aria-label","Close",1,"btn-close","text-reset"],["closebuttonMFO",""],[1,"offcanvas-body","my-auto","mx-0","flex-grow-0"],["for","nameWithTitle",1,"form-label"],["type","text","id","nameWithTitle","placeholder","Enter MFO",1,"form-control",3,"ngModel","ngModelChange"],["class","form-check mt-1 mb-3",4,"ngIf"],["type","button",1,"btn","btn-primary","mb-2","d-grid","w-100","justify-content-center",3,"disabled","click"],["class","spinner-border spinner-border-sm text-white","role","status",4,"ngIf","ngIfElse"],["showSubmitLabel",""],["type","button","data-bs-dismiss","offcanvas",1,"btn","btn-outline-secondary","d-grid","w-100"],[1,"form-check","mt-1","mb-3"],["type","checkbox","id","defaultCheck1",1,"form-check-input",3,"checked","change"],["for","defaultCheck1",1,"form-check-label"],["role","status",1,"spinner-border","spinner-border-sm","text-white"],[1,"visually-hidden"]],template:function(a,e){if(1&a&&(t.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"h5",4),t._uU(5),t.qZA(),t._UZ(6,"button",5,6),t.qZA(),t.TgZ(8,"div",7)(9,"label",8),t._uU(10,"MFO"),t.qZA(),t.TgZ(11,"input",9),t.NdJ("ngModelChange",function(c){return e.mfoData.mfo=c})("ngModelChange",function(){return e.OnChange()}),t.qZA(),t._UZ(12,"br"),t.YNc(13,at,4,1,"div",10),t.TgZ(14,"button",11),t.NdJ("click",function(){return e.Submit()}),t.YNc(15,it,3,0,"div",12),t.YNc(16,st,1,1,"ng-template",null,13,t.W1O),t.qZA(),t.TgZ(18,"button",14),t._uU(19," Cancel "),t.qZA()()()()()),2&a){const i=t.MAs(17);t.xp6(5),t.hij(" ",e.isAdd?"CREATE":"UPDATE"," MFO "),t.xp6(6),t.Q6J("ngModel",e.mfoData.mfo),t.xp6(2),t.Q6J("ngIf",e.mfoService.isCommon()),t.xp6(1),t.Q6J("disabled",e.isLoading),t.xp6(1),t.Q6J("ngIf",e.isLoading)("ngIfElse",i)}},dependencies:[_.O5,l.Fj,l.JJ,l.On],encapsulation:2}),s})();const rt=["closebuttonSI"];function lt(n,s){if(1&n){const o=t.EpF();t.TgZ(0,"div",30)(1,"div",31)(2,"input",32),t.NdJ("ngModelChange",function(e){t.CHM(o);const i=t.oxw();return t.KtG(i.siData.qtyUnit=e)}),t.qZA(),t.TgZ(3,"label",33),t._uU(4," Numeric "),t.qZA()(),t.TgZ(5,"div",31)(6,"input",34),t.NdJ("ngModelChange",function(e){t.CHM(o);const i=t.oxw();return t.KtG(i.siData.qtyUnit=e)}),t.qZA(),t.TgZ(7,"label",35),t._uU(8," Percentage "),t.qZA()()()}if(2&n){const o=t.oxw();t.xp6(2),t.Q6J("ngModel",o.siData.qtyUnit),t.xp6(4),t.Q6J("ngModel",o.siData.qtyUnit)}}function dt(n,s){1&n&&(t.TgZ(0,"div",36)(1,"span",37),t._uU(2,"Loading..."),t.qZA()())}function _t(n,s){if(1&n&&t._uU(0),2&n){const o=t.oxw();t.hij(" ",o.isAdd?"Submit":"Save changes"," ")}}let ft=(()=>{var n;class s{constructor(){this.mfoService=(0,t.f3M)(p.X),this.submit=new t.vpe}Submit(){this.submit.emit("Add or Edit"),this.handleStatus()}handleIsFiveStandard(a){this.siData.isFiveStndrd=a.target.checked?1:0}handleIsIpcrShow(a){this.siData.isIpcrShow=a.target.checked?1:0}EditIsFiveStandard(){this.mfoService.EditIsFiveStandard(this.siData)}handleStatus(){setTimeout(()=>{this.error||this.closebuttonSI.nativeElement.click()},500)}}return(n=s).\u0275fac=function(a){return new(a||n)},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-canvas-si"]],viewQuery:function(a,e){if(1&a&&t.Gf(rt,5),2&a){let i;t.iGM(i=t.CRH())&&(e.closebuttonSI=i.first)}},inputs:{isLoading:"isLoading",mfoData:"mfoData",siData:"siData",standard:"standard",isAdd:"isAdd",error:"error"},outputs:{submit:"submit"},decls:43,vars:18,consts:[[1,"col-lg-4","col-md-6"],[1,"mt-3"],["data-bs-scroll","true","data-bs-backdrop","false","tabindex","-1","id","offcanvasSI","aria-labelledby","offcanvasSI",1,"offcanvas","offcanvas-end"],[1,"offcanvas-header"],["id","offcanvasSI",1,"offcanvas-title"],["type","button","data-bs-dismiss","offcanvas","aria-label","Close",1,"btn-close","text-reset"],["closebuttonSI",""],[1,"offcanvas-body","my-auto","mx-0","flex-grow-0"],["for","nameWithTitle",1,"form-label"],["type","text","id","nameWithTitle","disabled","",1,"form-control",3,"ngModel","ngModelChange"],["type","text","id","nameWithTitle","placeholder","Enter Success Indicator",1,"form-control",3,"ngModel","ngModelChange"],[1,"form-check","mt-3"],["type","checkbox","id","defaultCheck1",1,"form-check-input",3,"checked","change"],["for","defaultCheck1",1,"form-check-label"],["class"," my-1",4,"ngIf"],["type","text","id","qlty5","placeholder","Rating 5",1,"form-control","mb-2",3,"ngModel","ngModelChange"],["type","text","id","qlty4","placeholder","Rating 4",1,"form-control","mb-2",3,"ngModel","ngModelChange"],["type","text","id","qlty3","placeholder","Rating 3",1,"form-control","mb-2",3,"ngModel","ngModelChange"],["type","text","id","qlty2","placeholder","Rating 2",1,"form-control","mb-2",3,"ngModel","ngModelChange"],["type","text","id","qlty1","placeholder","Rating 1",1,"form-control","mb-2",3,"ngModel","ngModelChange"],["type","text","id","timely5","placeholder","Rating 5",1,"form-control","mb-2",3,"ngModel","ngModelChange"],["type","text","id","timely4","placeholder","Rating 4",1,"form-control","mb-2",3,"ngModel","ngModelChange"],["type","text","id","timely3","placeholder","Rating 3",1,"form-control","mb-2",3,"ngModel","ngModelChange"],["type","text","id","timely2","placeholder","Rating 2",1,"form-control","mb-2",3,"ngModel","ngModelChange"],["type","text","id","timely1","placeholder","Rating 1",1,"form-control","mb-2",3,"ngModel","ngModelChange"],[2,"background-color","#f8f9fa","position","sticky","bottom","0"],["type","button",1,"btn","btn-primary","mb-2","d-grid","w-100","justify-content-center",3,"disabled","click"],["class","spinner-border spinner-border-sm text-white","role","status",4,"ngIf","ngIfElse"],["showSubmitLabel",""],["type","button","data-bs-dismiss","offcanvas",1,"btn","btn-outline-secondary","d-grid","w-100"],[1,"my-1"],[1,"form-check"],["name","default-radio-1","type","radio","value","0","id","defaultRadio1",1,"form-check-input",3,"ngModel","ngModelChange"],["for","defaultRadio1",1,"form-check-label"],["name","default-radio-1","type","radio","value","1","id","defaultRadio2",1,"form-check-input",3,"ngModel","ngModelChange"],["for","defaultRadio2",1,"form-check-label"],["role","status",1,"spinner-border","spinner-border-sm","text-white"],[1,"visually-hidden"]],template:function(a,e){if(1&a&&(t.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"h5",4),t._uU(5),t.qZA(),t._UZ(6,"button",5,6),t.qZA(),t.TgZ(8,"div",7)(9,"label",8),t._uU(10,"MFO"),t.qZA(),t.TgZ(11,"input",9),t.NdJ("ngModelChange",function(c){return e.mfoData.mfo=c}),t.qZA(),t._UZ(12,"br"),t.TgZ(13,"label",8),t._uU(14,"Success Indicator"),t.qZA(),t.TgZ(15,"textarea",10),t.NdJ("ngModelChange",function(c){return e.siData.indicator=c}),t.qZA(),t.TgZ(16,"div",11)(17,"input",12),t.NdJ("change",function(c){return e.handleIsFiveStandard(c)}),t.qZA(),t.TgZ(18,"label",13),t._uU(19," Set standard to five rating "),t.qZA()(),t._UZ(20,"br"),t.YNc(21,lt,9,2,"div",14),t.TgZ(22,"label",8),t._uU(23,"QUALITY"),t.qZA(),t.TgZ(24,"input",15),t.NdJ("ngModelChange",function(c){return e.standard.qlty5=c}),t.qZA(),t.TgZ(25,"input",16),t.NdJ("ngModelChange",function(c){return e.standard.qlty4=c}),t.qZA(),t.TgZ(26,"input",17),t.NdJ("ngModelChange",function(c){return e.standard.qlty3=c}),t.qZA(),t.TgZ(27,"input",18),t.NdJ("ngModelChange",function(c){return e.standard.qlty2=c}),t.qZA(),t.TgZ(28,"input",19),t.NdJ("ngModelChange",function(c){return e.standard.qlty1=c}),t.qZA(),t.TgZ(29,"label",8),t._uU(30,"TIMELINESS"),t.qZA(),t.TgZ(31,"input",20),t.NdJ("ngModelChange",function(c){return e.standard.timely5=c}),t.qZA(),t.TgZ(32,"input",21),t.NdJ("ngModelChange",function(c){return e.standard.timely4=c}),t.qZA(),t.TgZ(33,"input",22),t.NdJ("ngModelChange",function(c){return e.standard.timely3=c}),t.qZA(),t.TgZ(34,"input",23),t.NdJ("ngModelChange",function(c){return e.standard.timely2=c}),t.qZA(),t.TgZ(35,"input",24),t.NdJ("ngModelChange",function(c){return e.standard.timely1=c}),t.qZA(),t.TgZ(36,"div",25)(37,"button",26),t.NdJ("click",function(){return e.Submit()}),t.YNc(38,dt,3,0,"div",27),t.YNc(39,_t,1,1,"ng-template",null,28,t.W1O),t.qZA(),t.TgZ(41,"button",29),t._uU(42," Cancel "),t.qZA()()()()()()),2&a){const i=t.MAs(40);t.xp6(5),t.hij(" ",e.isAdd?"CREATE":"UPDATE"," SUCCESS INDICATOR "),t.xp6(6),t.Q6J("ngModel",e.mfoData.mfo),t.xp6(4),t.Q6J("ngModel",e.siData.indicator),t.xp6(2),t.Q6J("checked",e.siData.isFiveStndrd),t.xp6(4),t.Q6J("ngIf",e.mfoService.isCommon()),t.xp6(3),t.Q6J("ngModel",e.standard.qlty5),t.xp6(1),t.Q6J("ngModel",e.standard.qlty4),t.xp6(1),t.Q6J("ngModel",e.standard.qlty3),t.xp6(1),t.Q6J("ngModel",e.standard.qlty2),t.xp6(1),t.Q6J("ngModel",e.standard.qlty1),t.xp6(3),t.Q6J("ngModel",e.standard.timely5),t.xp6(1),t.Q6J("ngModel",e.standard.timely4),t.xp6(1),t.Q6J("ngModel",e.standard.timely3),t.xp6(1),t.Q6J("ngModel",e.standard.timely2),t.xp6(1),t.Q6J("ngModel",e.standard.timely1),t.xp6(2),t.Q6J("disabled",e.isLoading),t.xp6(1),t.Q6J("ngIf",e.isLoading)("ngIfElse",i)}},dependencies:[_.O5,l.Fj,l._,l.JJ,l.On],encapsulation:2}),s})();function pt(n,s){1&n&&(t.TgZ(0,"div",5)(1,"span",6),t._uU(2,"Loading..."),t.qZA()())}function mt(n,s){1&n&&t._UZ(0,"i",7)}let gt=(()=>{var n;class s{constructor(){this.onSearchMFO=new t.vpe}SearchMFO(){this.onSearchMFO.emit("Search MFO")}}return(n=s).\u0275fac=function(a){return new(a||n)},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-search-mfo"]],inputs:{search:"search",isSearchLoading:"isSearchLoading",siData:"siData",standard:"standard",isAdd:"isAdd",error:"error"},outputs:{onSearchMFO:"onSearchMFO"},decls:6,vars:3,consts:[[1,"input-group"],[1,"input-group-text"],["class","spinner-border spinner-border-sm text-primary","role","status",4,"ngIf","ngIfElse"],["showIcon",""],["type","text","placeholder","Search...",1,"form-control",3,"ngModel","ngModelChange"],["role","status",1,"spinner-border","spinner-border-sm","text-primary"],[1,"visually-hidden"],[1,"tf-icons","bx","bx-search"]],template:function(a,e){if(1&a&&(t.TgZ(0,"div",0)(1,"span",1),t.YNc(2,pt,3,0,"div",2),t.YNc(3,mt,1,0,"ng-template",null,3,t.W1O),t.qZA(),t.TgZ(5,"input",4),t.NdJ("ngModelChange",function(c){return e.search.MFO=c})("ngModelChange",function(){return e.SearchMFO()}),t.qZA()()),2&a){const i=t.MAs(4);t.xp6(2),t.Q6J("ngIf",e.isSearchLoading)("ngIfElse",i),t.xp6(3),t.Q6J("ngModel",e.search.MFO)}},dependencies:[_.O5,l.Fj,l.JJ,l.On],encapsulation:2}),s})();const ut=["closebuttonMFO"],ht=["closebuttonSI"];function Ct(n,s){if(1&n){const o=t.EpF();t.TgZ(0,"button",13),t.NdJ("click",function(){t.CHM(o);const e=t.oxw(2);return e.isAdd=!0,t.KtG(e.mfoData={})}),t._UZ(1,"i",14),t._uU(2,"MFO "),t.qZA()}}function bt(n,s){if(1&n){const o=t.EpF();t.TgZ(0,"div",3)(1,"div",4)(2,"h5",5)(3,"app-toggle-mfo",6),t.NdJ("setIsCommon",function(e){t.CHM(o);const i=t.oxw();return t.KtG(i.setIsCommon(e))}),t.qZA()(),t.TgZ(4,"div",7)(5,"div",8)(6,"div",9)(7,"app-search-mfo",10),t.NdJ("onSearchMFO",function(){t.CHM(o);const e=t.oxw();return t.KtG(e.searchMfoOffice())}),t.qZA()(),t.TgZ(8,"div",9),t.YNc(9,Ct,3,0,"button",11),t.qZA()(),t.TgZ(10,"app-table-mfo",12),t.NdJ("setMfoData",function(e){t.CHM(o);const i=t.oxw();return t.KtG(i.mfoData=e)})("setSIData",function(e){t.CHM(o);const i=t.oxw();return t.KtG(i.setSiData(e))})("isAdd",function(e){t.CHM(o);const i=t.oxw();return t.KtG(i.isAdd=e)})("clearSIData",function(){t.CHM(o);const e=t.oxw();return e.siData={},t.KtG(e.standard={})})("deleteMfo",function(e){t.CHM(o);const i=t.oxw();return t.KtG(i.DeleteMfo(e))})("deleteSI",function(e){t.CHM(o);const i=t.oxw();return t.KtG(i.DeleteSI(e))}),t.qZA()()()()}if(2&n){const o=t.oxw();t.xp6(3),t.Q6J("mfoType",o.isCommon()),t.xp6(4),t.Q6J("search",o.search)("isSearchLoading",o.isSearchLoading()),t.xp6(2),t.Q6J("ngIf",!o.isCommon()||o.isCommon()&&o.hrFocal===o.officeId),t.xp6(1),t.Q6J("mfo",o.mfo())}}const Mt=[{path:"",component:C,children:[{path:"office",component:(()=>{var n;class s{constructor(){this.mfoService=(0,t.f3M)(p.X),this.errorService=(0,t.f3M)(b.T),this.alertService=(0,t.f3M)(M.c),this.mfo=this.mfoService.mfo,this.isSearchLoading=this.mfoService.isSearchLoading,this.isCommon=this.mfoService.isCommon,this.error=this.errorService.error,this.officeId=localStorage.getItem("officeId"),this.hrFocal="OFFPHRMONZ3WT7D",this.mfoData={},this.siData={},this.standard={},this.search={},this.isExistMfo=!1,this.isAdd=!0}ngOnInit(){this.mfoService.GetMFOes()}AddMfo(){(void 0!==this.mfoData.MFO||""!==this.mfoData.MFO)&&this.mfoService.AddMfo(this.mfoData)}EditMfo(){(void 0!==this.mfoData.mfo||""!==this.mfoData.mfo)&&this.mfoService.EditMfo(this.mfoData)}DeleteMfo(a){this.mfoService.isAddOfficeMfo.set(!0),this.mfoService.DeleteMfo(a)}AddSI(){this.mfoService.isAddOfficeMfo.set(!0),this.siData.mfoId=this.mfoData.mfoId,(void 0!==this.siData.inidicator||""!==this.siData.inidicator)&&this.mfoService.AddSI(this.siData,this.standard)}EditSI(){this.siData.mfoId=this.mfoData.mfoId,(void 0!==this.siData.inidicator||""!==this.siData.inidicator)&&(this.mfoService.EditSI(this.siData),this.standard.indicatorId=this.siData.indicatorId,this.mfoService.EditStandard(this.standard))}DeleteSI(a){this.mfoService.isAddOfficeMfo.set(!0),this.mfoService.DeleteSI(a)}setSiData(a){this.mfoData=a.mfo,this.siData=a.si,null!==a.si.standard&&(this.standard=a.si.standard)}CheckMfoIfExist(){this.mfoService.CheckMfoIfExist(this.mfoData).subscribe(a=>{})}searchMfoOffice(){this.mfoService.SearchMfoOffice(this.search)}setIsCommon(a){this.mfoService.isCommon.set(a),this.mfoService.GetMFOes()}}return(n=s).\u0275fac=function(a){return new(a||n)},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-office"]],viewQuery:function(a,e){if(1&a&&(t.Gf(ut,5),t.Gf(ht,5)),2&a){let i;t.iGM(i=t.CRH())&&(e.closebuttonMFO=i.first),t.iGM(i=t.CRH())&&(e.closebuttonSI=i.first)}},decls:3,vars:9,consts:[["class","card",4,"ngIf"],[3,"mfoData","isLoading","error","onChange","submit"],[3,"mfoData","siData","standard","isLoading","isAdd","submit"],[1,"card"],[1,"row","justify-content-between"],[1,"card-header"],[3,"mfoType","setIsCommon"],[1,""],[1,"row","px-4"],[1,"col-6"],[3,"search","isSearchLoading","onSearchMFO"],["type","button","class","btn btn-primary float-end","data-bs-toggle","offcanvas","data-bs-target","#offcanvasScroll","aria-controls","offcanvasScroll",3,"click",4,"ngIf"],[3,"mfo","setMfoData","setSIData","isAdd","clearSIData","deleteMfo","deleteSI"],["type","button","data-bs-toggle","offcanvas","data-bs-target","#offcanvasScroll","aria-controls","offcanvasScroll",1,"btn","btn-primary","float-end",3,"click"],[1,"bx","bx-plus"]],template:function(a,e){1&a&&(t.YNc(0,bt,11,5,"div",0),t.TgZ(1,"app-canvas-mfo",1),t.NdJ("onChange",function(){return e.CheckMfoIfExist})("submit",function(){return e.isAdd?e.AddMfo():e.EditMfo()}),t.qZA(),t.TgZ(2,"app-canvas-si",2),t.NdJ("submit",function(){return e.isAdd?e.AddSI():e.EditSI()}),t.qZA()),2&a&&(t.Q6J("ngIf",!e.error().error),t.xp6(1),t.Q6J("mfoData",e.mfoData)("isLoading",e.mfo().isLoadingSave)("error",e.mfo().error),t.xp6(1),t.Q6J("mfoData",e.mfoData)("siData",e.siData)("standard",e.standard)("isLoading",e.mfo().isLoadingSave)("isAdd",e.isAdd))},dependencies:[_.O5,v,et,ct,ft,gt],styles:[".example-form[_ngcontent-%COMP%]{min-width:150px;max-width:500px;width:100%}.example-full-width[_ngcontent-%COMP%]{width:100%}.p-custom[_ngcontent-%COMP%]{padding-left:120px}.loading-overlay[_ngcontent-%COMP%]{position:relative;top:0;left:0;width:100%;height:100%;background-color:#00000080;display:flex;justify-content:center;align-items:center;z-index:9999}"]}),s})()}]}];let vt=(()=>{var n;class s{}return(n=s).\u0275fac=function(a){return new(a||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[g.Bz.forChild(Mt),g.Bz]}),s})(),Tt=(()=>{var n;class s{}return(n=s).\u0275fac=function(a){return new(a||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[_.ez,l.u5,vt,h.hx]}),s})()}}]);