"use strict";(self.webpackChunkandon_frontend=self.webpackChunkandon_frontend||[]).push([[545],{2545:(pe,R,a)=>{a.r(R),a.d(R,{ResourcesModule:()=>de});var h=a(6814),g=a(1303),Z=a(5861),l=a(6223),C=a(5375),e=a(5879),v=a(2962),U=a(3680),q=a(5986),_=a(8034),p=a(5683),A=a(2032),N=a(8525),f=a(5195),b=a(2296);function w(t,r){1&t&&(e.TgZ(0,"div",32),e._uU(1," Name is required. "),e.qZA())}function Y(t,r){if(1&t&&(e.TgZ(0,"mat-hint",30),e.YNc(1,w,2,0,"div",31),e.qZA()),2&t){const n=e.oxw();e.xp6(1),e.Q6J("ngIf",n.f.name.errors&&n.f.name.errors.required)}}function D(t,r){if(1&t&&(e.TgZ(0,"mat-option",33),e._uU(1),e.qZA()),2&t){const n=r.$implicit;e.Q6J("value",n),e.xp6(1),e.hij(" ",n," ")}}function I(t,r){1&t&&(e.TgZ(0,"div",32),e._uU(1," Type is required. "),e.qZA())}function Q(t,r){if(1&t&&(e.TgZ(0,"mat-hint",30),e.YNc(1,I,2,0,"div",31),e.qZA()),2&t){const n=e.oxw();e.xp6(1),e.Q6J("ngIf",n.f.type.errors&&n.f.type.errors.required)}}function J(t,r){if(1&t&&(e.TgZ(0,"mat-option",33),e._uU(1),e.qZA()),2&t){const n=r.$implicit;e.Q6J("value",n),e.xp6(1),e.hij(" ",n," ")}}function S(t,r){1&t&&(e.TgZ(0,"div",32),e._uU(1," Table is required. "),e.qZA())}function F(t,r){if(1&t&&(e.TgZ(0,"mat-hint",30),e.YNc(1,S,2,0,"div",31),e.qZA()),2&t){const n=e.oxw();e.xp6(1),e.Q6J("ngIf",n.f.table.errors&&n.f.table.errors.required)}}let j=(()=>{var t;class r{constructor(o,i,s,m){var c=this;this._formBuilder=o,this.resourcesService=i,this.route=s,this.router=m,this.resources=[],this.createdOn=new Date,this.resource_id="",this.newRecord=!0,this.failed=!1,this.resourceTypes=C.IH,this.tables=C.gy,this.resourceForm=this._formBuilder.group({name:["",[l.kI.required,l.kI.minLength(1)]],type:["",[l.kI.required]],table:["",[l.kI.required]],isActive:[!0],description:[""]}),this.route.queryParams.subscribe(function(){var d=(0,Z.Z)(function*(y){c.resource_id=y.id,c.resource_id&&(c.resource=yield c.resourcesService.findOne(c.resource_id),c.resource&&(c.createdOn=new Date(c.resource.createdOn),c.resourceForm.patchValue(c.resource),c.newRecord=!1))});return function(y){return d.apply(this,arguments)}}())}ngOnInit(){return(0,Z.Z)(function*(){})()}get f(){return this.resourceForm.controls}onSubmit(){var o=this;return(0,Z.Z)(function*(){o.resourceForm.invalid?o.failed=!0:(o.resource=o.resource_id&&!o.newRecord?yield o.resourcesService.updateResource(o.resource.id,o.resourceForm.value):yield o.resourcesService.create(o.resourceForm.value),o.resource&&(o.failed=!1,o.router.navigate(["/resources"])))})()}onChanged(o){}}return(t=r).\u0275fac=function(o){return new(o||t)(e.Y36(l.qu),e.Y36(v.z),e.Y36(g.gz),e.Y36(g.F0))},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-resource"]],decls:63,vars:16,consts:[[1,"cardWithShadow","theme-card"],[1,"w-100","row","justify-content-end"],[1,"col-8"],[1,"m-10"],[1,"col-4","justify-content-end"],[1,"col-4","justify-content-end","img-bg-group-icon"],[1,"b-t-1"],[3,"formGroup"],[1,"row","m-t-20","justify-content-start","m-l-20"],[1,"col-sm-5"],[1,"mat-subtitle-2","f-w-600","m-b-8","d-block"],["appearance","outline","color","primary",1,"w-100"],["matInput","","type","text","placeholder","/incidents","formControlName","name"],["class","m-b-16 error-msg",4,"ngIf"],["appearance","outline",1,"w-100"],["matInput","","placeholder","MM/DD/AAAA","disabled","",3,"matDatepicker","value"],["matIconSuffix","",3,"for"],["picker",""],["appearance","outline",1,"w-100","hide-hint"],["formControlName","type"],["value","","selected",""],["selected","",3,"value",4,"ngFor","ngForOf"],["formControlName","table"],[1,"mat-subtitle-2","f-w-600","m-b-8","d-block","m-t-12"],["color","primary","checked","","formControlName","isActive"],[1,"col-sm-10"],["matInput","","rows","5","formControlName","description","placeholder","Grant access to Incidents route /incidents"],[1,"m-t-12","text-right"],["mat-flat-button","","color","accent",1,"m-2"],["type","submit","mat-flat-button","","color","primary",1,"m-2",3,"click"],[1,"m-b-16","error-msg"],["class","text-error",4,"ngIf"],[1,"text-error"],["selected","",3,"value"]],template:function(o,i){if(1&o&&(e.TgZ(0,"mat-card",0)(1,"mat-card-header",1)(2,"div",2)(3,"mat-card-title",3),e._uU(4),e.qZA()(),e._UZ(5,"div",4),e.qZA(),e._UZ(6,"div",5),e.TgZ(7,"mat-card-content",6)(8,"form",7)(9,"div",8)(10,"div",9)(11,"mat-label",10),e._uU(12,"Nombre"),e.TgZ(13,"span"),e._uU(14,"*"),e.qZA()(),e.TgZ(15,"mat-form-field",11),e._UZ(16,"input",12),e.YNc(17,Y,2,1,"mat-hint",13),e.qZA()(),e.TgZ(18,"div",9)(19,"mat-label",10),e._uU(20,"Creado"),e.qZA(),e.TgZ(21,"mat-form-field",14),e._UZ(22,"input",15)(23,"mat-datepicker-toggle",16)(24,"mat-datepicker",null,17),e.qZA()(),e.TgZ(26,"div",9)(27,"mat-label"),e._uU(28,"Tipo"),e.TgZ(29,"span"),e._uU(30,"*"),e.qZA()(),e.TgZ(31,"mat-form-field",18)(32,"mat-select",19)(33,"mat-option",20),e._uU(34,"-- None -- "),e.qZA(),e.YNc(35,D,2,2,"mat-option",21),e.qZA(),e.YNc(36,Q,2,1,"mat-hint",13),e.qZA()(),e.TgZ(37,"div",9)(38,"mat-label"),e._uU(39,"Tabla"),e.TgZ(40,"span"),e._uU(41,"*"),e.qZA()(),e.TgZ(42,"mat-form-field",18)(43,"mat-select",22)(44,"mat-option",20),e._uU(45,"-- None -- "),e.qZA(),e.YNc(46,J,2,2,"mat-option",21),e.qZA(),e.YNc(47,F,2,1,"mat-hint",13),e.qZA()(),e._UZ(48,"div",9),e.TgZ(49,"div",9)(50,"mat-label",23),e._uU(51," Activo "),e.qZA(),e._UZ(52,"mat-checkbox",24),e.qZA(),e.TgZ(53,"div",25)(54,"mat-label",10),e._uU(55,"Descripcion"),e.qZA(),e.TgZ(56,"mat-form-field",11),e._UZ(57,"textarea",26),e.qZA()()(),e.TgZ(58,"div",27)(59,"button",28),e._uU(60,"Cancel"),e.qZA(),e.TgZ(61,"button",29),e.NdJ("click",function(){return i.onSubmit()}),e._uU(62," Submit "),e.qZA()()()()()),2&o){const s=e.MAs(25);let m,c,d;e.xp6(4),e.Oqu(i.newRecord?"Crear Nuevo":i.resource.name),e.xp6(4),e.Q6J("formGroup",i.resourceForm),e.xp6(5),e.ekj("text-error",null==(m=i.resourceForm.get("name"))?null:m.hasError("required")),e.xp6(4),e.Q6J("ngIf",i.f.name.touched&&i.f.name.invalid||i.failed),e.xp6(5),e.Q6J("matDatepicker",s)("value",i.createdOn),e.xp6(1),e.Q6J("for",s),e.xp6(6),e.ekj("text-error",null==(c=i.resourceForm.get("name"))?null:c.hasError("required")),e.xp6(6),e.Q6J("ngForOf",i.resourceTypes),e.xp6(1),e.Q6J("ngIf",i.f.type.touched&&i.f.type.invalid||i.failed),e.xp6(4),e.ekj("text-error",null==(d=i.resourceForm.get("table"))?null:d.hasError("required")),e.xp6(6),e.Q6J("ngForOf",i.tables),e.xp6(1),e.Q6J("ngIf",i.f.table.touched&&i.f.table.invalid||i.failed)}},dependencies:[h.sg,h.O5,U.ey,q.oG,_.Mq,_.hl,_.nW,p.KE,p.hX,p.bx,p.R9,A.Nt,N.gD,f.a8,f.dn,f.dk,f.n5,b.lW,l._Y,l.Fj,l.JJ,l.JL,l.sg,l.u]}),r})();var x=a(1476),T=a(3566),k=a(617),O=a(5940),u=a(5313);function L(t,r){1&t&&e._UZ(0,"mat-spinner")}function M(t,r){1&t&&(e.TgZ(0,"div",42),e._uU(1," Andon's API rate limit has been reached. It will be reset in one minute. "),e.qZA())}function z(t,r){if(1&t&&(e.TgZ(0,"div",39),e.YNc(1,L,1,0,"mat-spinner",40),e.YNc(2,M,2,0,"div",41),e.qZA()),2&t){const n=e.oxw();e.xp6(1),e.Q6J("ngIf",n.isLoadingResults),e.xp6(1),e.Q6J("ngIf",n.isRateLimitReached)}}function B(t,r){1&t&&(e.TgZ(0,"th",43),e._uU(1," Nombre "),e.qZA())}function G(t,r){if(1&t&&(e.TgZ(0,"td",44),e._uU(1),e.qZA()),2&t){const n=r.$implicit;e.xp6(1),e.hij(" ",n.name.slice(0,50)," ")}}function H(t,r){1&t&&(e.TgZ(0,"th",43),e._uU(1," Tipo "),e.qZA())}function $(t,r){if(1&t&&(e.TgZ(0,"td",44),e._uU(1),e.qZA()),2&t){const n=r.$implicit;e.xp6(1),e.hij(" ",n.type," ")}}function E(t,r){1&t&&(e.TgZ(0,"th",43),e._uU(1," Tabla "),e.qZA())}function W(t,r){if(1&t&&(e.TgZ(0,"td",44),e._uU(1),e.qZA()),2&t){const n=r.$implicit;e.xp6(1),e.hij(" ",n.table," ")}}function X(t,r){1&t&&(e.TgZ(0,"th",43),e._uU(1," Activo "),e.qZA())}function K(t,r){if(1&t&&(e.TgZ(0,"td",44),e._uU(1),e.qZA()),2&t){const n=r.$implicit;e.xp6(1),e.hij(" ",n.isActive," ")}}function P(t,r){1&t&&(e.TgZ(0,"th",45),e._uU(1," Created "),e.qZA())}function V(t,r){if(1&t&&(e.TgZ(0,"td",46)(1,"div",47)(2,"mat-icon",48),e._uU(3,"calendar_today"),e.qZA(),e._uU(4),e.ALo(5,"date"),e.qZA()()),2&t){const n=r.$implicit;e.xp6(4),e.hij(" ",e.lcZ(5,1,n.createdOn)," ")}}function ee(t,r){1&t&&(e.TgZ(0,"th",49),e._uU(1," Action "),e.qZA())}const te=function(){return["/resources/resource"]},oe=function(t){return{id:t}};function re(t,r){if(1&t){const n=e.EpF();e.TgZ(0,"td",50)(1,"a",51)(2,"mat-icon"),e._uU(3,"edit"),e.qZA()(),e.TgZ(4,"a",52),e.NdJ("click",function(){const s=e.CHM(n).$implicit,m=e.oxw();return e.KtG(m.remove(s.id))}),e.TgZ(5,"mat-icon"),e._uU(6,"delete"),e.qZA()()()}if(2&t){const n=r.$implicit;e.xp6(1),e.Q6J("routerLink",e.DdM(2,te))("queryParams",e.VKq(3,oe,n.id))}}function ne(t,r){1&t&&e._UZ(0,"tr",53)}function ie(t,r){1&t&&e._UZ(0,"tr",54)}const ae=function(){return["/","resources","resource"]},se=function(){return[10,25,50,100]},ce=[{path:"",component:(()=>{var t;class r{constructor(o){this.resourcesService=o,this.displayedColumns=["createdOn","name","type","table","isActive","action"],this.resources=[],this.resultsLength=0,this.isLoadingResults=!0,this.isRateLimitReached=!1,this.paginator=Object.create(null),this.sort=Object.create(null)}ngAfterViewInit(){var o=this;return(0,Z.Z)(function*(){o.loadResources(),o.sort.sortChange.subscribe(()=>{o.paginator.pageIndex=0,o.loadResources()}),o.paginator.page.subscribe(()=>o.loadResources())})()}loadResources(o=""){const i=this.paginator.pageIndex*this.paginator.pageSize,s=this.paginator.pageSize,m=this.sort.active,c=this.sort.direction;this.isLoadingResults=!0,this.resourcesService.findAllFilters(i,s,m,c,o).then(d=>{this.resources=d.rows,this.resultsLength=d.row_count,this.isLoadingResults=!1,this.isRateLimitReached=!1}).catch(()=>{this.isLoadingResults=!1,this.isRateLimitReached=!0,this.resources=[]})}applyFilter(o){this.loadResources(o.target.value)}remove(o){var i=this;return(0,Z.Z)(function*(){yield i.resourcesService.delete(o),i.resources=i.resources.filter(s=>s.id!==o)})()}}return(t=r).\u0275fac=function(o){return new(o||t)(e.Y36(v.z))},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-resources"]],viewQuery:function(o,i){if(1&o&&(e.Gf(x.NW,5),e.Gf(T.YE,5)),2&o){let s;e.iGM(s=e.CRH())&&(i.paginator=s.first),e.iGM(s=e.CRH())&&(i.sort=s.first)}},decls:50,vars:10,consts:[[1,"bg-light-primary","rounded","p-y-7","p-x-24","m-b-20","overflow-hidden"],[1,"row"],[1,"col-sm-12"],["aria-label","breadcrumb",1,"m-5"],[1,"breadcrumb","mb-0"],[1,"breadcrumb-item","page-title","m-0","f-s-14","p-t-4","f-w-600","m-b-5"],[1,"breadcrumb-item","active","m-0","f-s-14","p-t-4","f-w-600","m-b-5"],[1,"col-4","justify-content-end","img-bg-resources-icon"],[1,"cardWithShadow"],[1,"p-24"],[1,"row","justify-content-between"],[1,"col-lg-4"],[1,"text-2xl","font-bold"],["appearance","outline",1,"w-100","hide-hint"],["matInput","","placeholder","Buscar",3,"keyup"],["matSuffix",""],["name","search",1,"icon-20"],[1,"col-lg-4","justify-content-end"],[1,"row","justify-content-end","m-b-6"],["mat-raised-button","","color","primary",3,"routerLink"],[1,"example-container","m-t-30"],["class","example-loading-shade",4,"ngIf"],[1,"example-table-container","responsive-table"],["mat-table","","matSort","","matSortActive","createdOn","matSortDisableClear","","matSortDirection","desc",1,"example-table",3,"dataSource"],["matColumnDef","name"],["mat-header-cell","","mat-sort-header","","class","f-w-600 mat-subtitle-1 f-s-16",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","type"],["matColumnDef","table"],["matColumnDef","isActive"],["matColumnDef","createdOn"],["mat-header-cell","","mat-sort-header","","disableClear","","class","f-w-600 mat-subtitle-1 f-s-16 p-l-0",4,"matHeaderCellDef"],["mat-cell","","class","p-l-0",4,"matCellDef"],["matColumnDef","action"],["mat-header-cell","","class","f-s-16 f-w-600",4,"matHeaderCellDef"],["mat-cell","","class","action-link",4,"matCellDef"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],[3,"length","pageSize","pageSizeOptions"],[1,"example-loading-shade"],[4,"ngIf"],["class","example-rate-limit-reached",4,"ngIf"],[1,"example-rate-limit-reached"],["mat-header-cell","","mat-sort-header","",1,"f-w-600","mat-subtitle-1","f-s-16"],["mat-cell",""],["mat-header-cell","","mat-sort-header","","disableClear","",1,"f-w-600","mat-subtitle-1","f-s-16","p-l-0"],["mat-cell","",1,"p-l-0"],[1,"d-flex","align-items-center","gap-8"],[1,"text-sm"],["mat-header-cell","",1,"f-s-16","f-w-600"],["mat-cell","",1,"action-link"],[1,"m-r-10","cursor-pointer",3,"routerLink","queryParams"],[1,"m-r-10","cursor-pointer",3,"click"],["mat-header-row",""],["mat-row",""]],template:function(o,i){1&o&&(e.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"nav",3)(4,"ol",4)(5,"li",5),e._uU(6," Seguridad "),e.qZA(),e.TgZ(7,"li",6),e._uU(8," Recursos "),e.qZA()()()()(),e._UZ(9,"i",7),e.qZA(),e.TgZ(10,"mat-card",8)(11,"mat-card-content",9)(12,"div",10)(13,"div",11)(14,"h1",12),e._uU(15,"Recursos"),e.qZA(),e.TgZ(16,"mat-form-field",13)(17,"input",14),e.NdJ("keyup",function(m){return i.applyFilter(m)}),e.qZA(),e.TgZ(18,"mat-icon",15)(19,"mat-icon",16),e._uU(20,"search"),e.qZA()()()(),e.TgZ(21,"div",17)(22,"div",18)(23,"button",19),e._uU(24," Crear Recurso "),e.qZA()()()(),e.TgZ(25,"div",20),e.YNc(26,z,3,2,"div",21),e.TgZ(27,"div",22)(28,"table",23),e.ynx(29,24),e.YNc(30,B,2,0,"th",25),e.YNc(31,G,2,1,"td",26),e.BQk(),e.ynx(32,27),e.YNc(33,H,2,0,"th",25),e.YNc(34,$,2,1,"td",26),e.BQk(),e.ynx(35,28),e.YNc(36,E,2,0,"th",25),e.YNc(37,W,2,1,"td",26),e.BQk(),e.ynx(38,29),e.YNc(39,X,2,0,"th",25),e.YNc(40,K,2,1,"td",26),e.BQk(),e.ynx(41,30),e.YNc(42,P,2,0,"th",31),e.YNc(43,V,6,3,"td",32),e.BQk(),e.ynx(44,33),e.YNc(45,ee,2,0,"th",34),e.YNc(46,re,7,5,"td",35),e.BQk(),e.YNc(47,ne,1,0,"tr",36),e.YNc(48,ie,1,0,"tr",37),e.qZA()(),e._UZ(49,"mat-paginator",38),e.qZA()()()),2&o&&(e.xp6(23),e.Q6J("routerLink",e.DdM(8,ae)),e.xp6(3),e.Q6J("ngIf",i.isLoadingResults||i.isRateLimitReached),e.xp6(2),e.Q6J("dataSource",i.resources),e.xp6(19),e.Q6J("matHeaderRowDef",i.displayedColumns),e.xp6(1),e.Q6J("matRowDefColumns",i.displayedColumns),e.xp6(1),e.Q6J("length",i.resultsLength)("pageSize",10)("pageSizeOptions",e.DdM(9,se)))},dependencies:[h.O5,g.rH,p.KE,p.R9,A.Nt,f.a8,f.dn,b.lW,k.Hw,O.Ou,x.NW,T.YE,T.nU,u.BZ,u.fO,u.as,u.w1,u.Dz,u.nj,u.ge,u.ev,u.XQ,u.Gk,h.uU]}),r})()},{path:"resource",component:j}];let le=(()=>{var t;class r{}return(t=r).\u0275fac=function(o){return new(o||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[g.Bz.forChild(ce),g.Bz]}),r})();var ue=a(6208),me=a(1186);let de=(()=>{var t;class r{}return(t=r).\u0275fac=function(o){return new(o||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({providers:[v.z],imports:[h.ez,le,me.q,l.u5,l.UX,ue.m]}),r})()}}]);