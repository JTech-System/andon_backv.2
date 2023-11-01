"use strict";(self.webpackChunkandon_frontend=self.webpackChunkandon_frontend||[]).push([[518],{2518:(Ze,A,s)=>{s.r(A),s.d(A,{ResourcesModule:()=>ve});var g=s(6814),v=s(1303),m=s(5861),u=s(6223),y=function(t){return t.ROUTE="route",t.FIELD="field",t.ACTION="action",t.FILE="file",t}(y||{});const N=Object.values(y);var x=function(t){return t.INCIDENTS="incidents",t.USERS="users",t.ROLES="roles",t.PERMISSIONS="permissions",t.NOTIFICATIONS="notifications",t.GROUPS="groups",t}(x||{});const q=Object.values(x);var e=s(5879),Z=s(6510),I=s(7278);let R=(()=>{var t;class n{constructor(r){this.http=r}create(r){var o=this;return(0,m.Z)(function*(){return yield o.http.post(Z.S.RESOURCES.BASE_ENDPOINT,r)})()}findAllFilters(r,o,a,l,c){var p=this;return(0,m.Z)(function*(){const _=Z.S.RESOURCES.FILTERS(r,o,a,l,c);return yield p.http.get(_)})()}delete(r){var o=this;return(0,m.Z)(function*(){yield o.http.delete(Z.S.RESOURCES.BY_ID(r))})()}findOne(r){var o=this;return(0,m.Z)(function*(){const a=Z.S.RESOURCES.BY_ID(r);return yield o.http.get(a)})()}updateResource(r,o){var a=this;return(0,m.Z)(function*(){return yield a.http.put(Z.S.RESOURCES.BY_ID(r),o)})()}}return(t=n).\u0275fac=function(r){return new(r||t)(e.LFG(I.v))},t.\u0275prov=e.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),n})();var w=s(3680),O=s(5986),T=s(8034),f=s(5683),b=s(2032),D=s(8525),h=s(5195),U=s(2296);function Y(t,n){1&t&&(e.TgZ(0,"div",32),e._uU(1," Name is required. "),e.qZA())}function F(t,n){if(1&t&&(e.TgZ(0,"mat-hint",30),e.YNc(1,Y,2,0,"div",31),e.qZA()),2&t){const i=e.oxw();e.xp6(1),e.Q6J("ngIf",i.f.name.errors&&i.f.name.errors.required)}}function Q(t,n){if(1&t&&(e.TgZ(0,"mat-option",33),e._uU(1),e.qZA()),2&t){const i=n.$implicit;e.Q6J("value",i),e.xp6(1),e.hij(" ",i," ")}}function J(t,n){1&t&&(e.TgZ(0,"div",32),e._uU(1," Type is required. "),e.qZA())}function E(t,n){if(1&t&&(e.TgZ(0,"mat-hint",30),e.YNc(1,J,2,0,"div",31),e.qZA()),2&t){const i=e.oxw();e.xp6(1),e.Q6J("ngIf",i.f.type.errors&&i.f.type.errors.required)}}function L(t,n){if(1&t&&(e.TgZ(0,"mat-option",33),e._uU(1),e.qZA()),2&t){const i=n.$implicit;e.Q6J("value",i),e.xp6(1),e.hij(" ",i," ")}}function j(t,n){1&t&&(e.TgZ(0,"div",32),e._uU(1," Table is required. "),e.qZA())}function k(t,n){if(1&t&&(e.TgZ(0,"mat-hint",30),e.YNc(1,j,2,0,"div",31),e.qZA()),2&t){const i=e.oxw();e.xp6(1),e.Q6J("ngIf",i.f.table.errors&&i.f.table.errors.required)}}let B=(()=>{var t;class n{constructor(r,o,a,l){var c=this;this._formBuilder=r,this.resourcesService=o,this.route=a,this.router=l,this.resources=[],this.createdOn=new Date,this.resource_id="",this.newRecord=!0,this.failed=!1,this.resourceTypes=N,this.tables=q,this.resourceForm=this._formBuilder.group({name:["",[u.kI.required,u.kI.minLength(4)]],type:["",[u.kI.required]],table:["",[u.kI.required]],isActive:[!0],description:[""]}),this.route.queryParams.subscribe(function(){var p=(0,m.Z)(function*(_){c.resource_id=_.id,c.resource_id&&(c.resource=yield c.resourcesService.findOne(c.resource_id),c.resource&&(c.createdOn=new Date(c.resource.createdOn),c.resourceForm.patchValue(c.resource),c.newRecord=!1))});return function(_){return p.apply(this,arguments)}}())}ngOnInit(){return(0,m.Z)(function*(){})()}get f(){return this.resourceForm.controls}onSubmit(){var r=this;return(0,m.Z)(function*(){r.resourceForm.invalid?r.failed=!0:(r.resource=r.resource_id&&!r.newRecord?yield r.resourcesService.updateResource(r.resource.id,r.resourceForm.value):yield r.resourcesService.create(r.resourceForm.value),r.resource&&(r.failed=!1,r.router.navigate(["/resources"])))})()}onChanged(r){}}return(t=n).\u0275fac=function(r){return new(r||t)(e.Y36(u.qu),e.Y36(R),e.Y36(v.gz),e.Y36(v.F0))},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-resource"]],decls:63,vars:16,consts:[[1,"cardWithShadow","theme-card"],[1,"w-100","row","justify-content-end"],[1,"col-8"],[1,"m-10"],[1,"col-4","justify-content-end"],[1,"col-4","justify-content-end","img-bg-group-icon"],[1,"b-t-1"],[3,"formGroup"],[1,"row","m-t-20","justify-content-start","m-l-20"],[1,"col-sm-5"],[1,"mat-subtitle-2","f-w-600","m-b-8","d-block"],["appearance","outline","color","primary",1,"w-100"],["matInput","","type","text","placeholder","/incidents","formControlName","name"],["class","m-b-16 error-msg",4,"ngIf"],["appearance","outline",1,"w-100"],["matInput","","placeholder","MM/DD/AAAA","disabled","",3,"matDatepicker","value"],["matIconSuffix","",3,"for"],["picker",""],["appearance","outline",1,"w-100","hide-hint"],["formControlName","type"],["value","","selected",""],["selected","",3,"value",4,"ngFor","ngForOf"],["formControlName","table"],[1,"mat-subtitle-2","f-w-600","m-b-8","d-block","m-t-12"],["color","primary","checked","","formControlName","isActive"],[1,"col-sm-10"],["matInput","","rows","5","formControlName","description","placeholder","Grat access to Incidents route /incidents"],[1,"m-t-12","text-right"],["mat-flat-button","","color","accent",1,"m-2"],["type","submit","mat-flat-button","","color","primary",1,"m-2",3,"click"],[1,"m-b-16","error-msg"],["class","text-error",4,"ngIf"],[1,"text-error"],["selected","",3,"value"]],template:function(r,o){if(1&r&&(e.TgZ(0,"mat-card",0)(1,"mat-card-header",1)(2,"div",2)(3,"mat-card-title",3),e._uU(4),e.qZA()(),e._UZ(5,"div",4),e.qZA(),e._UZ(6,"div",5),e.TgZ(7,"mat-card-content",6)(8,"form",7)(9,"div",8)(10,"div",9)(11,"mat-label",10),e._uU(12,"Nombre"),e.TgZ(13,"span"),e._uU(14,"*"),e.qZA()(),e.TgZ(15,"mat-form-field",11),e._UZ(16,"input",12),e.YNc(17,F,2,1,"mat-hint",13),e.qZA()(),e.TgZ(18,"div",9)(19,"mat-label",10),e._uU(20,"Creado"),e.qZA(),e.TgZ(21,"mat-form-field",14),e._UZ(22,"input",15)(23,"mat-datepicker-toggle",16)(24,"mat-datepicker",null,17),e.qZA()(),e.TgZ(26,"div",9)(27,"mat-label"),e._uU(28,"Tipo"),e.TgZ(29,"span"),e._uU(30,"*"),e.qZA()(),e.TgZ(31,"mat-form-field",18)(32,"mat-select",19)(33,"mat-option",20),e._uU(34,"-- None -- "),e.qZA(),e.YNc(35,Q,2,2,"mat-option",21),e.qZA(),e.YNc(36,E,2,1,"mat-hint",13),e.qZA()(),e.TgZ(37,"div",9)(38,"mat-label"),e._uU(39,"Tabla"),e.TgZ(40,"span"),e._uU(41,"*"),e.qZA()(),e.TgZ(42,"mat-form-field",18)(43,"mat-select",22)(44,"mat-option",20),e._uU(45,"-- None -- "),e.qZA(),e.YNc(46,L,2,2,"mat-option",21),e.qZA(),e.YNc(47,k,2,1,"mat-hint",13),e.qZA()(),e._UZ(48,"div",9),e.TgZ(49,"div",9)(50,"mat-label",23),e._uU(51," Activo "),e.qZA(),e._UZ(52,"mat-checkbox",24),e.qZA(),e.TgZ(53,"div",25)(54,"mat-label",10),e._uU(55,"Descripcion"),e.qZA(),e.TgZ(56,"mat-form-field",11),e._UZ(57,"textarea",26),e.qZA()()(),e.TgZ(58,"div",27)(59,"button",28),e._uU(60,"Cancel"),e.qZA(),e.TgZ(61,"button",29),e.NdJ("click",function(){return o.onSubmit()}),e._uU(62," Submit "),e.qZA()()()()()),2&r){const a=e.MAs(25);let l,c,p;e.xp6(4),e.Oqu(o.newRecord?"Crear Nuevo":o.resource.name),e.xp6(4),e.Q6J("formGroup",o.resourceForm),e.xp6(5),e.ekj("text-error",null==(l=o.resourceForm.get("name"))?null:l.hasError("required")),e.xp6(4),e.Q6J("ngIf",o.f.name.touched&&o.f.name.invalid||o.failed),e.xp6(5),e.Q6J("matDatepicker",a)("value",o.createdOn),e.xp6(1),e.Q6J("for",a),e.xp6(6),e.ekj("text-error",null==(c=o.resourceForm.get("name"))?null:c.hasError("required")),e.xp6(6),e.Q6J("ngForOf",o.resourceTypes),e.xp6(1),e.Q6J("ngIf",o.f.type.touched&&o.f.type.invalid||o.failed),e.xp6(4),e.ekj("text-error",null==(p=o.resourceForm.get("name"))?null:p.hasError("required")),e.xp6(6),e.Q6J("ngForOf",o.tables),e.xp6(1),e.Q6J("ngIf",o.f.table.touched&&o.f.table.invalid||o.failed)}},dependencies:[g.sg,g.O5,w.ey,O.oG,T.Mq,T.hl,T.nW,f.KE,f.hX,f.bx,f.R9,b.Nt,D.gD,h.a8,h.dn,h.dk,h.n5,U.lW,u._Y,u.Fj,u.JJ,u.JL,u.sg,u.u]}),n})();var S=s(1476),C=s(3566),M=s(617),G=s(5940),d=s(5313);function z(t,n){1&t&&e._UZ(0,"mat-spinner")}function H(t,n){1&t&&(e.TgZ(0,"div",42),e._uU(1," Andon's API rate limit has been reached. It will be reset in one minute. "),e.qZA())}function $(t,n){if(1&t&&(e.TgZ(0,"div",39),e.YNc(1,z,1,0,"mat-spinner",40),e.YNc(2,H,2,0,"div",41),e.qZA()),2&t){const i=e.oxw();e.xp6(1),e.Q6J("ngIf",i.isLoadingResults),e.xp6(1),e.Q6J("ngIf",i.isRateLimitReached)}}function P(t,n){1&t&&(e.TgZ(0,"th",43),e._uU(1," Nombre "),e.qZA())}function W(t,n){if(1&t&&(e.TgZ(0,"td",44),e._uU(1),e.qZA()),2&t){const i=n.$implicit;e.xp6(1),e.hij(" ",i.name.slice(0,50)," ")}}function X(t,n){1&t&&(e.TgZ(0,"th",43),e._uU(1," Tipo "),e.qZA())}function K(t,n){if(1&t&&(e.TgZ(0,"td",44),e._uU(1),e.qZA()),2&t){const i=n.$implicit;e.xp6(1),e.hij(" ",i.type," ")}}function V(t,n){1&t&&(e.TgZ(0,"th",43),e._uU(1," Tabla "),e.qZA())}function ee(t,n){if(1&t&&(e.TgZ(0,"td",44),e._uU(1),e.qZA()),2&t){const i=n.$implicit;e.xp6(1),e.hij(" ",i.table," ")}}function te(t,n){1&t&&(e.TgZ(0,"th",43),e._uU(1," Activo "),e.qZA())}function re(t,n){if(1&t&&(e.TgZ(0,"td",44),e._uU(1),e.qZA()),2&t){const i=n.$implicit;e.xp6(1),e.hij(" ",i.isActive," ")}}function oe(t,n){1&t&&(e.TgZ(0,"th",45),e._uU(1," Created "),e.qZA())}function ne(t,n){if(1&t&&(e.TgZ(0,"td",46)(1,"div",47)(2,"mat-icon",48),e._uU(3,"calendar_today"),e.qZA(),e._uU(4),e.ALo(5,"date"),e.qZA()()),2&t){const i=n.$implicit;e.xp6(4),e.hij(" ",e.lcZ(5,1,i.createdOn)," ")}}function ie(t,n){1&t&&(e.TgZ(0,"th",49),e._uU(1," Action "),e.qZA())}const se=function(){return["/resources/resource"]},ae=function(t){return{id:t}};function ce(t,n){if(1&t){const i=e.EpF();e.TgZ(0,"td",50)(1,"a",51)(2,"mat-icon"),e._uU(3,"edit"),e.qZA()(),e.TgZ(4,"a",52),e.NdJ("click",function(){const a=e.CHM(i).$implicit,l=e.oxw();return e.KtG(l.remove(a.id))}),e.TgZ(5,"mat-icon"),e._uU(6,"delete"),e.qZA()()()}if(2&t){const i=n.$implicit;e.xp6(1),e.Q6J("routerLink",e.DdM(2,se))("queryParams",e.VKq(3,ae,i.id))}}function ue(t,n){1&t&&e._UZ(0,"tr",53)}function le(t,n){1&t&&e._UZ(0,"tr",54)}const me=function(){return["/","resources","resource"]},de=function(){return[10,25,50,100]},pe=[{path:"",component:(()=>{var t;class n{constructor(r){this.resourcesService=r,this.displayedColumns=["createdOn","name","type","table","isActive","action"],this.resources=[],this.resultsLength=0,this.isLoadingResults=!0,this.isRateLimitReached=!1,this.paginator=Object.create(null),this.sort=Object.create(null)}ngAfterViewInit(){var r=this;return(0,m.Z)(function*(){r.loadResources(),r.sort.sortChange.subscribe(()=>{r.paginator.pageIndex=0,r.loadResources()}),r.paginator.page.subscribe(()=>r.loadResources())})()}loadResources(r=""){const o=this.paginator.pageIndex*this.paginator.pageSize,a=this.paginator.pageSize,l=this.sort.active,c=this.sort.direction;this.isLoadingResults=!0,this.resourcesService.findAllFilters(o,a,l,c,r).then(p=>{this.resources=p.rows,this.resultsLength=p.row_count,this.isLoadingResults=!1,this.isRateLimitReached=!1}).catch(()=>{this.isLoadingResults=!1,this.isRateLimitReached=!0,this.resources=[]})}applyFilter(r){this.loadResources(r.target.value)}remove(r){var o=this;return(0,m.Z)(function*(){yield o.resourcesService.delete(r),o.resources=o.resources.filter(a=>a.id!==r)})()}}return(t=n).\u0275fac=function(r){return new(r||t)(e.Y36(R))},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-resources"]],viewQuery:function(r,o){if(1&r&&(e.Gf(S.NW,5),e.Gf(C.YE,5)),2&r){let a;e.iGM(a=e.CRH())&&(o.paginator=a.first),e.iGM(a=e.CRH())&&(o.sort=a.first)}},decls:50,vars:10,consts:[[1,"bg-light-primary","rounded","p-y-7","p-x-24","m-b-20","overflow-hidden"],[1,"row"],[1,"col-sm-12"],["aria-label","breadcrumb",1,"m-5"],[1,"breadcrumb","mb-0"],[1,"breadcrumb-item","page-title","m-0","f-s-14","p-t-4","f-w-600","m-b-5"],[1,"breadcrumb-item","active","m-0","f-s-14","p-t-4","f-w-600","m-b-5"],[1,"col-4","justify-content-end","img-bg-resources-icon"],[1,"cardWithShadow"],[1,"p-24"],[1,"row","justify-content-between"],[1,"col-lg-4"],[1,"text-2xl","font-bold"],["appearance","outline",1,"w-100","hide-hint"],["matInput","","placeholder","Buscar",3,"keyup"],["matSuffix",""],["name","search",1,"icon-20"],[1,"col-lg-4","justify-content-end"],[1,"row","justify-content-end","m-b-6"],["mat-raised-button","","color","primary",3,"routerLink"],[1,"example-container","m-t-30"],["class","example-loading-shade",4,"ngIf"],[1,"example-table-container","responsive-table"],["mat-table","","matSort","","matSortActive","createdOn","matSortDisableClear","","matSortDirection","desc",1,"example-table",3,"dataSource"],["matColumnDef","name"],["mat-header-cell","","mat-sort-header","","class","f-w-600 mat-subtitle-1 f-s-16",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","type"],["matColumnDef","table"],["matColumnDef","isActive"],["matColumnDef","createdOn"],["mat-header-cell","","mat-sort-header","","disableClear","","class","f-w-600 mat-subtitle-1 f-s-16 p-l-0",4,"matHeaderCellDef"],["mat-cell","","class","p-l-0",4,"matCellDef"],["matColumnDef","action"],["mat-header-cell","","class","f-s-16 f-w-600",4,"matHeaderCellDef"],["mat-cell","","class","action-link",4,"matCellDef"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],[3,"length","pageSize","pageSizeOptions"],[1,"example-loading-shade"],[4,"ngIf"],["class","example-rate-limit-reached",4,"ngIf"],[1,"example-rate-limit-reached"],["mat-header-cell","","mat-sort-header","",1,"f-w-600","mat-subtitle-1","f-s-16"],["mat-cell",""],["mat-header-cell","","mat-sort-header","","disableClear","",1,"f-w-600","mat-subtitle-1","f-s-16","p-l-0"],["mat-cell","",1,"p-l-0"],[1,"d-flex","align-items-center","gap-8"],[1,"text-sm"],["mat-header-cell","",1,"f-s-16","f-w-600"],["mat-cell","",1,"action-link"],[1,"m-r-10","cursor-pointer",3,"routerLink","queryParams"],[1,"m-r-10","cursor-pointer",3,"click"],["mat-header-row",""],["mat-row",""]],template:function(r,o){1&r&&(e.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"nav",3)(4,"ol",4)(5,"li",5),e._uU(6," Seguridad "),e.qZA(),e.TgZ(7,"li",6),e._uU(8," Recursos "),e.qZA()()()()(),e._UZ(9,"i",7),e.qZA(),e.TgZ(10,"mat-card",8)(11,"mat-card-content",9)(12,"div",10)(13,"div",11)(14,"h1",12),e._uU(15,"Recursos"),e.qZA(),e.TgZ(16,"mat-form-field",13)(17,"input",14),e.NdJ("keyup",function(l){return o.applyFilter(l)}),e.qZA(),e.TgZ(18,"mat-icon",15)(19,"mat-icon",16),e._uU(20,"search"),e.qZA()()()(),e.TgZ(21,"div",17)(22,"div",18)(23,"button",19),e._uU(24," Crear Recurso "),e.qZA()()()(),e.TgZ(25,"div",20),e.YNc(26,$,3,2,"div",21),e.TgZ(27,"div",22)(28,"table",23),e.ynx(29,24),e.YNc(30,P,2,0,"th",25),e.YNc(31,W,2,1,"td",26),e.BQk(),e.ynx(32,27),e.YNc(33,X,2,0,"th",25),e.YNc(34,K,2,1,"td",26),e.BQk(),e.ynx(35,28),e.YNc(36,V,2,0,"th",25),e.YNc(37,ee,2,1,"td",26),e.BQk(),e.ynx(38,29),e.YNc(39,te,2,0,"th",25),e.YNc(40,re,2,1,"td",26),e.BQk(),e.ynx(41,30),e.YNc(42,oe,2,0,"th",31),e.YNc(43,ne,6,3,"td",32),e.BQk(),e.ynx(44,33),e.YNc(45,ie,2,0,"th",34),e.YNc(46,ce,7,5,"td",35),e.BQk(),e.YNc(47,ue,1,0,"tr",36),e.YNc(48,le,1,0,"tr",37),e.qZA()(),e._UZ(49,"mat-paginator",38),e.qZA()()()),2&r&&(e.xp6(23),e.Q6J("routerLink",e.DdM(8,me)),e.xp6(3),e.Q6J("ngIf",o.isLoadingResults||o.isRateLimitReached),e.xp6(2),e.Q6J("dataSource",o.resources),e.xp6(19),e.Q6J("matHeaderRowDef",o.displayedColumns),e.xp6(1),e.Q6J("matRowDefColumns",o.displayedColumns),e.xp6(1),e.Q6J("length",o.resultsLength)("pageSize",10)("pageSizeOptions",e.DdM(9,de)))},dependencies:[g.O5,v.rH,f.KE,f.R9,b.Nt,h.a8,h.dn,U.lW,M.Hw,G.Ou,S.NW,C.YE,C.nU,d.BZ,d.fO,d.as,d.w1,d.Dz,d.nj,d.ge,d.ev,d.XQ,d.Gk,g.uU]}),n})()},{path:"resource",component:B}];let fe=(()=>{var t;class n{}return(t=n).\u0275fac=function(r){return new(r||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[v.Bz.forChild(pe),v.Bz]}),n})();var he=s(6208),ge=s(1186);let ve=(()=>{var t;class n{}return(t=n).\u0275fac=function(r){return new(r||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({providers:[R],imports:[g.ez,fe,ge.q,u.u5,u.UX,he.m]}),n})()}}]);