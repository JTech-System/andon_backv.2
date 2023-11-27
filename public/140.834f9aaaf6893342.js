"use strict";(self.webpackChunkandon_frontend=self.webpackChunkandon_frontend||[]).push([[140],{4140:(ct,x,i)=>{i.r(x),i.d(x,{GroupsModule:()=>pt});var g=i(1303),h=i(5861),m=i(6223),b=i(6510),t=i(5879),v=i(4808),R=i(2186),D=i(2939),p=i(6814),w=i(3680),I=i(5986),Z=i(8034),c=i(5683),A=i(2032),J=i(8525),d=i(5195),T=i(4104),G=i(2296),L=i(300),y=i(3031);function M(e,n){1&e&&(t.TgZ(0,"div",30),t._uU(1," Name is required. "),t.qZA())}function Q(e,n){if(1&e&&(t.TgZ(0,"mat-hint",28),t.YNc(1,M,2,0,"div",29),t.qZA()),2&e){const r=t.oxw();t.xp6(1),t.Q6J("ngIf",r.f.name.errors&&r.f.name.errors.required)}}function k(e,n){if(1&e&&(t.TgZ(0,"mat-option",19),t._uU(1),t.ALo(2,"fullName"),t.qZA()),2&e){const r=n.$implicit;t.Q6J("value",r.id),t.xp6(1),t.hij(" ",t.lcZ(2,2,r),"")}}function O(e,n){if(1&e){const r=t.EpF();t.TgZ(0,"mat-card",0)(1,"mat-tab-group",31)(2,"mat-tab",32)(3,"mat-card-content")(4,"div",33)(5,"div",34)(6,"app-m2m",35),t.NdJ("relationshipChanged",function(a){t.CHM(r);const s=t.oxw();return t.KtG(s.onChanged(a))}),t.qZA()()()()()()()}if(2&e){const r=t.oxw();t.xp6(6),t.Q6J("m2mData",r.m2mRoles)}}let U=(()=>{var e;class n{constructor(o,a,s,l,f){this.groupsService=o,this.route=a,this.router=s,this.usersService=l,this.matSnackbar=f,this.groupForm=new m.cw({name:new m.NI("",[m.kI.required,m.kI.minLength(2)]),manager:new m.NI(""),isActive:new m.NI(!0),description:new m.NI("")}),this.groupUsers=[],this.failed=!1,this.createdOn=new Date}setM2MData(){const o=this.group.roles.map(a=>({parent:this.group.id,relation:a.name,relation_id:a.id}));this.m2mRoles={title:"Roles",titleSingle:"Rol",parent:this.group.id,parent_table:"group",relation:"roles",rel_primary_col:"name",relation_endpoint:b.S.ROLES.BASE_ENDPOINT,display_cols:["name"],updateRelationEndpoint:b.S.GROUPS.UPDATE_ROLES,data:o}}ngOnInit(){var o=this;return(0,h.Z)(function*(){const a=o.route.snapshot.paramMap.get("id");if(a)try{o.group=yield o.groupsService.findOne(a);const s=yield o.usersService.findAll();o.groupUsers=s.filter(l=>l.groups.find(f=>f.id==o.group.id)),o.setM2MData(),o.groupForm.setValue({name:o.group.name,description:o.group.description,isActive:o.group.isActive,manager:o.group.manager?o.group.manager.id:""})}catch{o.router.navigate(["/","error","404"])}})()}get f(){return this.groupForm.controls}onSubmit(){var o=this;return(0,h.Z)(function*(){if(o.groupForm.valid){const a=o.groupForm.value;try{if(o.group)yield o.groupsService.updateGroup(o.group.id,{name:a.name,description:a.description,isActive:a.isActive,manager:a.manager?a.manager:void 0}),o.matSnackbar.open("Grupo guardado correctamente",void 0,{horizontalPosition:"end",verticalPosition:"bottom",duration:2e3});else{const s=yield o.groupsService.create({name:a.name,description:a.description,isActive:a.isActive,manager:a.manager?a.manager:void 0});o.router.navigate(["","groups",s.id])}}catch(s){s.status&&409==s.status&&(o.failed=!0)}}})()}onChanged(o){}}return(e=n).\u0275fac=function(o){return new(o||e)(t.Y36(v.J),t.Y36(g.gz),t.Y36(g.F0),t.Y36(R.f),t.Y36(D.ux))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-group"]],decls:47,vars:12,consts:[[1,"cardWithShadow","theme-card"],[1,"w-100","row","justify-content-end"],[1,"col-8"],[1,"m-10"],[1,"col-4","justify-content-end"],[1,"col-4","justify-content-end","img-bg-group-icon"],[1,"b-t-1"],[3,"formGroup"],[1,"row","m-t-20","justify-content-start","m-l-20"],[1,"col-sm-5"],[1,"mat-subtitle-2","f-w-600","m-b-8","d-block"],["appearance","outline","color","primary",1,"w-100"],["matInput","","type","text","placeholder","IT","formControlName","name"],["class","m-b-16 error-msg",4,"ngIf"],["appearance","outline",1,"w-100"],["matInput","","placeholder","MM/DD/AAAA","disabled","",3,"matDatepicker","value"],["matIconSuffix","",3,"for"],["picker",""],["formControlName","manager"],[3,"value"],[3,"value",4,"ngFor","ngForOf"],[1,"mat-subtitle-2","f-w-600","m-b-8","d-block","m-t-12"],["color","primary","checked","","formControlName","isActive"],[1,"col-sm-10"],["matInput","","rows","5","formControlName","description","placeholder","A group for IT Support"],["class","cardWithShadow theme-card",4,"ngIf"],[1,"m-t-12","text-right"],["type","submit","mat-flat-button","","color","primary",1,"m-2",3,"click"],[1,"m-b-16","error-msg"],["class","text-error",4,"ngIf"],[1,"text-error"],["mat-stretch-tabs","false","mat-align-tabs","start","animationDuration","0ms"],["label","Roles"],[1,"row"],[1,"col-12"],[3,"m2mData","relationshipChanged"]],template:function(o,a){if(1&o&&(t.TgZ(0,"mat-card",0)(1,"mat-card-header",1)(2,"div",2)(3,"mat-card-title",3),t._uU(4),t.qZA()(),t._UZ(5,"div",4),t.qZA(),t._UZ(6,"div",5),t.TgZ(7,"mat-card-content",6)(8,"form",7)(9,"div",8)(10,"div",9)(11,"mat-label",10),t._uU(12,"Nombre"),t.TgZ(13,"span"),t._uU(14,"*"),t.qZA()(),t.TgZ(15,"mat-form-field",11),t._UZ(16,"input",12),t.YNc(17,Q,2,1,"mat-hint",13),t.qZA()(),t.TgZ(18,"div",9)(19,"mat-label",10),t._uU(20,"Creado"),t.qZA(),t.TgZ(21,"mat-form-field",14),t._UZ(22,"input",15)(23,"mat-datepicker-toggle",16)(24,"mat-datepicker",null,17),t.qZA()(),t.TgZ(26,"div",9)(27,"mat-label"),t._uU(28,"L\xedder de Grupo"),t.qZA(),t.TgZ(29,"mat-form-field",14)(30,"mat-select",18)(31,"mat-option",19),t._uU(32,"-- Nadie --"),t.qZA(),t.YNc(33,k,3,4,"mat-option",20),t.qZA()()(),t.TgZ(34,"div",9)(35,"mat-label",21),t._uU(36," Activo "),t.qZA(),t._UZ(37,"mat-checkbox",22),t.qZA(),t.TgZ(38,"div",23)(39,"mat-label",10),t._uU(40,"Descripci\xf3n"),t.qZA(),t.TgZ(41,"mat-form-field",11),t._UZ(42,"textarea",24),t.qZA()()(),t.YNc(43,O,7,1,"mat-card",25),t.TgZ(44,"div",26)(45,"button",27),t.NdJ("click",function(){return a.onSubmit()}),t._uU(46),t.qZA()()()()()),2&o){const s=t.MAs(25);let l;t.xp6(4),t.Oqu(a.group?a.group.name:"Crear Nuevo"),t.xp6(4),t.Q6J("formGroup",a.groupForm),t.xp6(5),t.ekj("text-error",null==(l=a.groupForm.get("name"))?null:l.hasError("required")),t.xp6(4),t.Q6J("ngIf",a.f.name.touched&&a.f.name.invalid||a.failed),t.xp6(5),t.Q6J("matDatepicker",s)("value",a.createdOn),t.xp6(1),t.Q6J("for",s),t.xp6(8),t.Q6J("value",""),t.xp6(2),t.Q6J("ngForOf",a.groupUsers),t.xp6(10),t.Q6J("ngIf",a.m2mRoles),t.xp6(3),t.hij(" ",a.group?"Guardar":"Crear"," ")}},dependencies:[p.sg,p.O5,w.ey,I.oG,Z.Mq,Z.hl,Z.nW,c.KE,c.hX,c.bx,c.R9,A.Nt,J.gD,d.a8,d.dn,d.dk,d.n5,T.uX,T.SP,G.lW,m._Y,m.Fj,m.JJ,m.JL,m.sg,m.u,L.I,y.k],styles:[".img-bg-group-icon[_ngcontent-%COMP%]{background-image:url(engineers-working-02.1861c7f3cc7b8f44.png);background-size:80px;background-repeat:no-repeat;background-position:right;right:20px;top:-20px;position:absolute;min-height:100px}"]}),n})();var _=i(1476),C=i(3566),Y=i(617),F=i(5940),u=i(5313);function q(e,n){1&e&&t._UZ(0,"mat-spinner")}function j(e,n){1&e&&(t.TgZ(0,"div",41),t._uU(1," Andon's API rate limit has been reached. It will be reset in one minute. "),t.qZA())}function z(e,n){if(1&e&&(t.TgZ(0,"div",38),t.YNc(1,q,1,0,"mat-spinner",39),t.YNc(2,j,2,0,"div",40),t.qZA()),2&e){const r=t.oxw();t.xp6(1),t.Q6J("ngIf",r.isLoadingResults),t.xp6(1),t.Q6J("ngIf",r.isRateLimitReached)}}function E(e,n){1&e&&(t.TgZ(0,"th",42),t._uU(1," Nombre "),t.qZA())}function H(e,n){if(1&e&&(t.TgZ(0,"td",43),t._uU(1),t.qZA()),2&e){const r=n.$implicit;t.xp6(1),t.hij(" ",r.name.slice(0,50)," ")}}function P(e,n){1&e&&(t.TgZ(0,"th",44),t._uU(1," Manager "),t.qZA())}const B=function(){return["/users/user"]},N=function(e){return{id:e}};function W(e,n){if(1&e&&(t.TgZ(0,"td",43)(1,"a",45),t._uU(2),t.ALo(3,"fullName"),t.qZA()()),2&e){const r=n.$implicit;t.xp6(1),t.Q6J("routerLink",t.DdM(5,B))("queryParams",t.VKq(6,N,r.manager?r.manager.id:"#")),t.xp6(1),t.hij(" ",r.manager?t.lcZ(3,3,r.manager):""," ")}}function K(e,n){1&e&&(t.TgZ(0,"th",46),t._uU(1," Created "),t.qZA())}function V(e,n){if(1&e&&(t.TgZ(0,"td",47)(1,"div",48)(2,"mat-icon",49),t._uU(3,"calendar_today"),t.qZA(),t._uU(4),t.ALo(5,"date"),t.qZA()()),2&e){const r=n.$implicit;t.xp6(4),t.hij(" ",t.lcZ(5,1,r.createdOn)," ")}}function X(e,n){1&e&&(t.TgZ(0,"th",50),t._uU(1," Action "),t.qZA())}const $=function(e){return["/","groups",e]};function tt(e,n){if(1&e){const r=t.EpF();t.TgZ(0,"td",51)(1,"a",45)(2,"mat-icon"),t._uU(3,"edit"),t.qZA()(),t.TgZ(4,"a",52),t.NdJ("click",function(){const s=t.CHM(r).$implicit,l=t.oxw();return t.KtG(l.remove(s.id))}),t.TgZ(5,"mat-icon"),t._uU(6,"delete"),t.qZA()()()}if(2&e){const r=n.$implicit;t.xp6(1),t.Q6J("routerLink",t.VKq(2,$,r.id))("queryParams",t.VKq(4,N,r.id))}}function et(e,n){1&e&&t._UZ(0,"tr",53)}function ot(e,n){1&e&&t._UZ(0,"tr",54)}const at=function(){return["/","groups","create"]},rt=function(){return[10,25,50,100]},nt=[{path:"",component:(()=>{var e;class n{constructor(o){this.groupsService=o,this.displayedColumns=["createdOn","name","manager","action"],this.groups=[],this.resultsLength=0,this.isLoadingResults=!0,this.isRateLimitReached=!1,this.paginator=Object.create(null),this.sort=Object.create(null)}ngAfterViewInit(){var o=this;return(0,h.Z)(function*(){o.loadGroups(),o.sort.sortChange.subscribe(()=>{o.paginator.pageIndex=0,o.loadGroups()}),o.paginator.page.subscribe(()=>o.loadGroups())})()}loadGroups(o=""){const a=this.paginator.pageIndex*this.paginator.pageSize,s=this.paginator.pageSize,l=this.sort.active,f=this.sort.direction;this.isLoadingResults=!0,this.groupsService.findAllFilters(a,s,l,f,o).then(S=>{this.groups=S.rows,this.resultsLength=S.row_count,this.isLoadingResults=!1,this.isRateLimitReached=!1}).catch(()=>{this.isLoadingResults=!1,this.isRateLimitReached=!0,this.groups=[]})}applyFilter(o){this.loadGroups(o.target.value)}remove(o){var a=this;return(0,h.Z)(function*(){yield a.groupsService.delete(o),a.groups=a.groups.filter(s=>s.id!==o)})()}}return(e=n).\u0275fac=function(o){return new(o||e)(t.Y36(v.J))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-groups"]],viewQuery:function(o,a){if(1&o&&(t.Gf(_.NW,5),t.Gf(C.YE,5)),2&o){let s;t.iGM(s=t.CRH())&&(a.paginator=s.first),t.iGM(s=t.CRH())&&(a.sort=s.first)}},decls:44,vars:10,consts:[[1,"bg-light-primary","rounded","p-y-7","p-x-24","m-b-20","overflow-hidden"],[1,"row"],[1,"col-sm-12"],["aria-label","breadcrumb",1,"m-5"],[1,"breadcrumb","mb-0"],[1,"breadcrumb-item","page-title","m-0","f-s-14","p-t-4","f-w-600","m-b-5"],[1,"breadcrumb-item","active","m-0","f-s-14","p-t-4","f-w-600","m-b-5"],[1,"col-4","justify-content-end","img-bg-groups-icon"],[1,"cardWithShadow"],[1,"p-24"],[1,"row","justify-content-between"],[1,"col-lg-4"],[1,"text-2xl","font-bold"],["appearance","outline",1,"w-100","hide-hint"],["matInput","","placeholder","Buscar Roles",3,"keyup"],["matSuffix",""],["name","search",1,"icon-20"],[1,"col-lg-4","justify-content-end"],[1,"row","justify-content-end","m-b-6"],["mat-raised-button","","color","primary",3,"routerLink"],[1,"example-container","m-t-30"],["class","example-loading-shade",4,"ngIf"],[1,"example-table-container","responsive-table"],["mat-table","","matSort","","matSortActive","createdOn","matSortDisableClear","","matSortDirection","desc",1,"example-table",3,"dataSource"],["matColumnDef","name"],["mat-header-cell","","mat-sort-header","","class","f-w-600 mat-subtitle-1 f-s-16",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","manager"],["mat-header-cell","","class","f-w-600 mat-subtitle-1 f-s-16",4,"matHeaderCellDef"],["matColumnDef","createdOn"],["mat-header-cell","","mat-sort-header","","disableClear","","class","f-w-600 mat-subtitle-1 f-s-16 p-l-0",4,"matHeaderCellDef"],["mat-cell","","class","p-l-0",4,"matCellDef"],["matColumnDef","action"],["mat-header-cell","","class","f-s-16 f-w-600",4,"matHeaderCellDef"],["mat-cell","","class","action-link",4,"matCellDef"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],[3,"length","pageSize","pageSizeOptions"],[1,"example-loading-shade"],[4,"ngIf"],["class","example-rate-limit-reached",4,"ngIf"],[1,"example-rate-limit-reached"],["mat-header-cell","","mat-sort-header","",1,"f-w-600","mat-subtitle-1","f-s-16"],["mat-cell",""],["mat-header-cell","",1,"f-w-600","mat-subtitle-1","f-s-16"],[1,"m-r-10","cursor-pointer",3,"routerLink","queryParams"],["mat-header-cell","","mat-sort-header","","disableClear","",1,"f-w-600","mat-subtitle-1","f-s-16","p-l-0"],["mat-cell","",1,"p-l-0"],[1,"d-flex","align-items-center","gap-8"],[1,"text-sm"],["mat-header-cell","",1,"f-s-16","f-w-600"],["mat-cell","",1,"action-link"],[1,"m-r-10","cursor-pointer",3,"click"],["mat-header-row",""],["mat-row",""]],template:function(o,a){1&o&&(t.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"nav",3)(4,"ol",4)(5,"li",5),t._uU(6," Usuarios "),t.qZA(),t.TgZ(7,"li",6),t._uU(8," Grupos "),t.qZA()()()()(),t._UZ(9,"i",7),t.qZA(),t.TgZ(10,"mat-card",8)(11,"mat-card-content",9)(12,"div",10)(13,"div",11)(14,"h1",12),t._uU(15,"Grupos"),t.qZA(),t.TgZ(16,"mat-form-field",13)(17,"input",14),t.NdJ("keyup",function(l){return a.applyFilter(l)}),t.qZA(),t.TgZ(18,"mat-icon",15)(19,"mat-icon",16),t._uU(20,"search"),t.qZA()()()(),t.TgZ(21,"div",17)(22,"div",18)(23,"button",19),t._uU(24," Crear Grupo "),t.qZA()()()(),t.TgZ(25,"div",20),t.YNc(26,z,3,2,"div",21),t.TgZ(27,"div",22)(28,"table",23),t.ynx(29,24),t.YNc(30,E,2,0,"th",25),t.YNc(31,H,2,1,"td",26),t.BQk(),t.ynx(32,27),t.YNc(33,P,2,0,"th",28),t.YNc(34,W,4,8,"td",26),t.BQk(),t.ynx(35,29),t.YNc(36,K,2,0,"th",30),t.YNc(37,V,6,3,"td",31),t.BQk(),t.ynx(38,32),t.YNc(39,X,2,0,"th",33),t.YNc(40,tt,7,6,"td",34),t.BQk(),t.YNc(41,et,1,0,"tr",35),t.YNc(42,ot,1,0,"tr",36),t.qZA()(),t._UZ(43,"mat-paginator",37),t.qZA()()()),2&o&&(t.xp6(23),t.Q6J("routerLink",t.DdM(8,at)),t.xp6(3),t.Q6J("ngIf",a.isLoadingResults||a.isRateLimitReached),t.xp6(2),t.Q6J("dataSource",a.groups),t.xp6(13),t.Q6J("matHeaderRowDef",a.displayedColumns),t.xp6(1),t.Q6J("matRowDefColumns",a.displayedColumns),t.xp6(1),t.Q6J("length",a.resultsLength)("pageSize",10)("pageSizeOptions",t.DdM(9,rt)))},dependencies:[p.O5,g.rH,c.KE,c.R9,A.Nt,d.a8,d.dn,G.lW,Y.Hw,F.Ou,_.NW,C.YE,C.nU,u.BZ,u.fO,u.as,u.w1,u.Dz,u.nj,u.ge,u.ev,u.XQ,u.Gk,p.uU,y.k],styles:[".img-bg-groups-icon[_ngcontent-%COMP%]{background-image:url(employee01.4b7a127a270e309d.png);background-size:100px;background-repeat:no-repeat;background-position:right;right:30px;top:55px;position:absolute;min-height:100px}"]}),n})()},{path:"create",component:U},{path:":id",component:U}];let it=(()=>{var e;class n{}return(e=n).\u0275fac=function(o){return new(o||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[g.Bz.forChild(nt),g.Bz]}),n})();var st=i(1186),mt=i(6208),lt=i(2577),ut=i(2524);let pt=(()=>{var e;class n{}return(e=n).\u0275fac=function(o){return new(o||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({providers:[v.J,p.uU],imports:[p.ez,it,st.q,m.u5,m.UX,mt.m,lt.UsersModule,ut.D]}),n})()}}]);