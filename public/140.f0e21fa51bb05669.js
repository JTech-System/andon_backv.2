"use strict";(self.webpackChunkandon_frontend=self.webpackChunkandon_frontend||[]).push([[140],{4140:(L,A,a)=>{a.r(A),a.d(A,{GroupsModule:()=>dt});var p=a(1303),d=a(5861),u=a(6223),x=a(6510),y=a(7921),h=a(7398),t=a(5879),G=a(4808),m=a(2186),c=a(6814),v=a(4630),U=a(3680),S=a(5986),T=a(8034),_=a(5683),D=a(2032),Z=a(5195),O=a(4104),I=a(2296),J=a(300);function F(e,i){1&e&&(t.TgZ(0,"div",32),t._uU(1," Name is required. "),t.qZA())}function E(e,i){if(1&e&&(t.TgZ(0,"mat-hint",30),t.YNc(1,F,2,0,"div",31),t.qZA()),2&e){const n=t.oxw();t.xp6(1),t.Q6J("ngIf",n.f.name.errors&&n.f.name.errors.required)}}function Y(e,i){if(1&e){const n=t.EpF();t.TgZ(0,"mat-option",20),t.NdJ("click",function(){const s=t.CHM(n).$implicit,g=t.oxw();return t.KtG(g.manager_id=s.id||"")}),t._uU(1),t.qZA()}if(2&e){const n=i.$implicit;t.Q6J("value",n.name),t.xp6(1),t.hij(" ",n.name," ")}}function P(e,i){if(1&e){const n=t.EpF();t.TgZ(0,"mat-card",0)(1,"mat-tab-group",33)(2,"mat-tab",34)(3,"mat-card-content")(4,"div",35)(5,"div",36)(6,"app-m2m",37),t.NdJ("relationshipChanged",function(r){t.CHM(n);const s=t.oxw();return t.KtG(s.onChanged(r))}),t.qZA()()()()()()()}if(2&e){const n=t.oxw();t.xp6(6),t.Q6J("m2mData",n.m2mRoles)}}let Q=(()=>{var e;class i{constructor(o,r,s,g,C){var l=this;this._formBuilder=o,this.groupsService=r,this.route=s,this.router=g,this.usersService=C,this.groups=[],this.rolesIds=[],this.createdOn=new Date,this.group_id="",this.newRecord=!0,this.filterControl=new u.NI(""),this.usersFilter=[],this.manager_id="",this.failed=!1,this.groupForm=this._formBuilder.group({name:["",[u.kI.required,u.kI.minLength(4)]],manager:new u.NI(""),isActive:[!0],description:new u.NI("")}),this.route.queryParams.subscribe(function(){var gt=(0,d.Z)(function*(M){l.group_id=M.id,l.group_id&&(l.group=yield l.groupsService.findOne(l.group_id),l.group&&(l.createdOn=new Date(l.group.createdOn),l.groupForm.patchValue(l.group),l.groupForm.controls.manager.patchValue(l.group.manager?l.group.manager.name:""),l.rolesIds=l.group.roles.map(b=>b.id),l.roles=l.group.roles.map(b=>({parent:l.group.id,relation:b.name,relation_id:b.id})),l.setM2MData(),l.newRecord=!1))});return function(M){return gt.apply(this,arguments)}}())}setM2MData(){this.m2mRoles={title:"Roles",titleSingle:"Rol",parent:this.group.id,parent_table:"group",relation:"roles",rel_primary_col:"name",relation_endpoint:x.S.ROLES.BASE_ENDPOINT,display_cols:["name"],updateRelationEndpoint:x.S.GROUPS.UPDATE_ROLES,data:this.roles}}ngOnInit(){var o=this;return(0,d.Z)(function*(){const r=yield o.usersService.findAll();r&&(o.usersFilter=r),o.searchfilteredOptions=o.filterControl.valueChanges.pipe((0,y.O)(""),(0,h.U)(s=>o._searchfilter(s||"")))})()}get f(){return this.groupForm.controls}onSubmit(){var o=this;return(0,d.Z)(function*(){o.groupForm.invalid?o.failed=!0:(""!=o.groupForm.get("manager")?.value&&o.groupForm.get("manager")?.patchValue(o.manager_id),o.group=o.group_id&&!o.newRecord?yield o.groupsService.updateGroup(o.group.id,o.groupForm.value):yield o.groupsService.create(o.groupForm.value),o.group&&(o.failed=!1,o.router.navigate(["/groups"])))})()}onChanged(o){}_searchfilter(o){const r=o.toLowerCase();return this.usersFilter.filter(s=>s.name.toString().toLowerCase().includes(r))}}return(e=i).\u0275fac=function(o){return new(o||e)(t.Y36(u.qu),t.Y36(G.J),t.Y36(p.gz),t.Y36(p.F0),t.Y36(m.f))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-group"]],decls:52,vars:13,consts:[[1,"cardWithShadow","theme-card"],[1,"w-100","row","justify-content-end"],[1,"col-8"],[1,"m-10"],[1,"col-4","justify-content-end"],[1,"col-4","justify-content-end","img-bg-group-icon"],[1,"b-t-1"],[3,"formGroup"],[1,"row","m-t-20","justify-content-start","m-l-20"],[1,"col-sm-5"],[1,"mat-subtitle-2","f-w-600","m-b-8","d-block"],["appearance","outline","color","primary",1,"w-100"],["matInput","","type","text","placeholder","IT","formControlName","name"],["class","m-b-16 error-msg",4,"ngIf"],["appearance","outline",1,"w-100"],["matInput","","placeholder","MM/DD/AAAA","disabled","",3,"matDatepicker","value"],["matIconSuffix","",3,"for"],["picker",""],["type","text","placeholder","-- None --","aria-label","Manager","matInput","","formControlName","manager",3,"matAutocomplete"],["auto","matAutocomplete"],[3,"value","click"],[3,"value","click",4,"ngFor","ngForOf"],[1,"mat-subtitle-2","f-w-600","m-b-8","d-block","m-t-12"],["color","primary","checked","","formControlName","isActive"],[1,"col-sm-10"],["matInput","","rows","5","formControlName","description","placeholder","A group for IT Support"],["class","cardWithShadow theme-card",4,"ngIf"],[1,"m-t-12","text-right"],["mat-flat-button","","color","accent",1,"m-2"],["type","submit","mat-flat-button","","color","primary",1,"m-2",3,"click"],[1,"m-b-16","error-msg"],["class","text-error",4,"ngIf"],[1,"text-error"],["mat-stretch-tabs","false","mat-align-tabs","start","animationDuration","0ms"],["label","Roles"],[1,"row"],[1,"col-12"],[3,"m2mData","relationshipChanged"]],template:function(o,r){if(1&o&&(t.TgZ(0,"mat-card",0)(1,"mat-card-header",1)(2,"div",2)(3,"mat-card-title",3),t._uU(4),t.qZA()(),t._UZ(5,"div",4),t.qZA(),t._UZ(6,"div",5),t.TgZ(7,"mat-card-content",6)(8,"form",7)(9,"div",8)(10,"div",9)(11,"mat-label",10),t._uU(12,"Nombre"),t.TgZ(13,"span"),t._uU(14,"*"),t.qZA()(),t.TgZ(15,"mat-form-field",11),t._UZ(16,"input",12),t.YNc(17,E,2,1,"mat-hint",13),t.qZA()(),t.TgZ(18,"div",9)(19,"mat-label",10),t._uU(20,"Creado"),t.qZA(),t.TgZ(21,"mat-form-field",14),t._UZ(22,"input",15)(23,"mat-datepicker-toggle",16)(24,"mat-datepicker",null,17),t.qZA()(),t.TgZ(26,"div",9)(27,"mat-label"),t._uU(28,"Lider de Grupo"),t.qZA(),t.TgZ(29,"mat-form-field",14),t._UZ(30,"input",18),t.TgZ(31,"mat-autocomplete",null,19)(33,"mat-option",20),t.NdJ("click",function(){return r.manager_id=""}),t._uU(34," -- None -- "),t.qZA(),t.YNc(35,Y,2,2,"mat-option",21),t.ALo(36,"async"),t.qZA()()(),t.TgZ(37,"div",9)(38,"mat-label",22),t._uU(39," Activo "),t.qZA(),t._UZ(40,"mat-checkbox",23),t.qZA(),t.TgZ(41,"div",24)(42,"mat-label",10),t._uU(43,"Descripcion"),t.qZA(),t.TgZ(44,"mat-form-field",11),t._UZ(45,"textarea",25),t.qZA()()(),t.YNc(46,P,7,1,"mat-card",26),t.TgZ(47,"div",27)(48,"button",28),t._uU(49,"Cancel"),t.qZA(),t.TgZ(50,"button",29),t.NdJ("click",function(){return r.onSubmit()}),t._uU(51," Submit "),t.qZA()()()()()),2&o){const s=t.MAs(25),g=t.MAs(32);let C;t.xp6(4),t.Oqu(r.newRecord?"Crear Nuevo":r.group.name),t.xp6(4),t.Q6J("formGroup",r.groupForm),t.xp6(5),t.ekj("text-error",null==(C=r.groupForm.get("name"))?null:C.hasError("required")),t.xp6(4),t.Q6J("ngIf",r.f.name.touched&&r.f.name.invalid||r.failed),t.xp6(5),t.Q6J("matDatepicker",s)("value",r.createdOn),t.xp6(1),t.Q6J("for",s),t.xp6(7),t.Q6J("matAutocomplete",g),t.xp6(5),t.Q6J("ngForOf",t.lcZ(36,11,r.searchfilteredOptions)),t.xp6(11),t.Q6J("ngIf",!r.newRecord)}},dependencies:[c.sg,c.O5,v.XC,U.ey,v.ZL,S.oG,T.Mq,T.hl,T.nW,_.KE,_.hX,_.bx,_.R9,D.Nt,Z.a8,Z.dn,Z.dk,Z.n5,O.uX,O.SP,I.lW,u._Y,u.Fj,u.JJ,u.JL,u.sg,u.u,J.I,c.Ov],styles:[".img-bg-group-icon[_ngcontent-%COMP%]{background-image:url(engineers-working-02.1861c7f3cc7b8f44.png);background-size:80px;background-repeat:no-repeat;background-position:right;right:20px;top:-20px;position:absolute;min-height:100px}"]}),i})();var N=a(1476),R=a(3566),k=a(617),B=a(5940),f=a(5313);function q(e,i){1&e&&t._UZ(0,"mat-spinner")}function j(e,i){1&e&&(t.TgZ(0,"div",40),t._uU(1," Andon's API rate limit has been reached. It will be reset in one minute. "),t.qZA())}function z(e,i){if(1&e&&(t.TgZ(0,"div",37),t.YNc(1,q,1,0,"mat-spinner",38),t.YNc(2,j,2,0,"div",39),t.qZA()),2&e){const n=t.oxw();t.xp6(1),t.Q6J("ngIf",n.isLoadingResults),t.xp6(1),t.Q6J("ngIf",n.isRateLimitReached)}}function H(e,i){1&e&&(t.TgZ(0,"th",41),t._uU(1," Nombre "),t.qZA())}function W(e,i){if(1&e&&(t.TgZ(0,"td",42),t._uU(1),t.qZA()),2&e){const n=i.$implicit;t.xp6(1),t.hij(" ",n.name.slice(0,50)," ")}}function K(e,i){1&e&&(t.TgZ(0,"th",41),t._uU(1," Manager "),t.qZA())}const V=function(){return["/users/user"]},w=function(e){return{id:e}};function X(e,i){if(1&e&&(t.TgZ(0,"td",42)(1,"a",43),t._uU(2),t.qZA()()),2&e){const n=i.$implicit;t.xp6(1),t.Q6J("routerLink",t.DdM(3,V))("queryParams",t.VKq(4,w,n.manager?n.manager.id:"#")),t.xp6(1),t.hij(" ",n.manager?n.manager.name:""," ")}}function $(e,i){1&e&&(t.TgZ(0,"th",44),t._uU(1," Created "),t.qZA())}function tt(e,i){if(1&e&&(t.TgZ(0,"td",45)(1,"div",46)(2,"mat-icon",47),t._uU(3,"calendar_today"),t.qZA(),t._uU(4),t.ALo(5,"date"),t.qZA()()),2&e){const n=i.$implicit;t.xp6(4),t.hij(" ",t.lcZ(5,1,n.createdOn)," ")}}function et(e,i){1&e&&(t.TgZ(0,"th",48),t._uU(1," Action "),t.qZA())}const ot=function(){return["/groups/group"]};function rt(e,i){if(1&e){const n=t.EpF();t.TgZ(0,"td",49)(1,"a",43)(2,"mat-icon"),t._uU(3,"edit"),t.qZA()(),t.TgZ(4,"a",50),t.NdJ("click",function(){const s=t.CHM(n).$implicit,g=t.oxw();return t.KtG(g.remove(s.id))}),t.TgZ(5,"mat-icon"),t._uU(6,"delete"),t.qZA()()()}if(2&e){const n=i.$implicit;t.xp6(1),t.Q6J("routerLink",t.DdM(2,ot))("queryParams",t.VKq(3,w,n.id))}}function nt(e,i){1&e&&t._UZ(0,"tr",51)}function at(e,i){1&e&&t._UZ(0,"tr",52)}const it=function(){return["/","groups","group"]},st=function(){return[10,25,50,100]},lt=[{path:"",component:(()=>{var e;class i{constructor(o){this.groupsService=o,this.displayedColumns=["createdOn","name","manager","action"],this.groups=[],this.resultsLength=0,this.isLoadingResults=!0,this.isRateLimitReached=!1,this.paginator=Object.create(null),this.sort=Object.create(null)}ngAfterViewInit(){var o=this;return(0,d.Z)(function*(){o.loadGroups(),o.sort.sortChange.subscribe(()=>{o.paginator.pageIndex=0,o.loadGroups()}),o.paginator.page.subscribe(()=>o.loadGroups())})()}loadGroups(o=""){const r=this.paginator.pageIndex*this.paginator.pageSize,s=this.paginator.pageSize,g=this.sort.active,C=this.sort.direction;this.isLoadingResults=!0,this.groupsService.findAllFilters(r,s,g,C,o).then(l=>{this.groups=l.rows,this.resultsLength=l.row_count,this.isLoadingResults=!1,this.isRateLimitReached=!1}).catch(()=>{this.isLoadingResults=!1,this.isRateLimitReached=!0,this.groups=[]})}applyFilter(o){this.loadGroups(o.target.value)}remove(o){var r=this;return(0,d.Z)(function*(){yield r.groupsService.delete(o),r.groups=r.groups.filter(s=>s.id!==o)})()}}return(e=i).\u0275fac=function(o){return new(o||e)(t.Y36(G.J))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-groups"]],viewQuery:function(o,r){if(1&o&&(t.Gf(N.NW,5),t.Gf(R.YE,5)),2&o){let s;t.iGM(s=t.CRH())&&(r.paginator=s.first),t.iGM(s=t.CRH())&&(r.sort=s.first)}},decls:44,vars:10,consts:[[1,"bg-light-primary","rounded","p-y-7","p-x-24","m-b-20","overflow-hidden"],[1,"row"],[1,"col-sm-12"],["aria-label","breadcrumb",1,"m-5"],[1,"breadcrumb","mb-0"],[1,"breadcrumb-item","page-title","m-0","f-s-14","p-t-4","f-w-600","m-b-5"],[1,"breadcrumb-item","active","m-0","f-s-14","p-t-4","f-w-600","m-b-5"],[1,"col-4","justify-content-end","img-bg-groups-icon"],[1,"cardWithShadow"],[1,"p-24"],[1,"row","justify-content-between"],[1,"col-lg-4"],[1,"text-2xl","font-bold"],["appearance","outline",1,"w-100","hide-hint"],["matInput","","placeholder","Buscar Roles",3,"keyup"],["matSuffix",""],["name","search",1,"icon-20"],[1,"col-lg-4","justify-content-end"],[1,"row","justify-content-end","m-b-6"],["mat-raised-button","","color","primary",3,"routerLink"],[1,"example-container","m-t-30"],["class","example-loading-shade",4,"ngIf"],[1,"example-table-container","responsive-table"],["mat-table","","matSort","","matSortActive","createdOn","matSortDisableClear","","matSortDirection","desc",1,"example-table",3,"dataSource"],["matColumnDef","name"],["mat-header-cell","","mat-sort-header","","class","f-w-600 mat-subtitle-1 f-s-16",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","manager"],["matColumnDef","createdOn"],["mat-header-cell","","mat-sort-header","","disableClear","","class","f-w-600 mat-subtitle-1 f-s-16 p-l-0",4,"matHeaderCellDef"],["mat-cell","","class","p-l-0",4,"matCellDef"],["matColumnDef","action"],["mat-header-cell","","class","f-s-16 f-w-600",4,"matHeaderCellDef"],["mat-cell","","class","action-link",4,"matCellDef"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],[3,"length","pageSize","pageSizeOptions"],[1,"example-loading-shade"],[4,"ngIf"],["class","example-rate-limit-reached",4,"ngIf"],[1,"example-rate-limit-reached"],["mat-header-cell","","mat-sort-header","",1,"f-w-600","mat-subtitle-1","f-s-16"],["mat-cell",""],[1,"m-r-10","cursor-pointer",3,"routerLink","queryParams"],["mat-header-cell","","mat-sort-header","","disableClear","",1,"f-w-600","mat-subtitle-1","f-s-16","p-l-0"],["mat-cell","",1,"p-l-0"],[1,"d-flex","align-items-center","gap-8"],[1,"text-sm"],["mat-header-cell","",1,"f-s-16","f-w-600"],["mat-cell","",1,"action-link"],[1,"m-r-10","cursor-pointer",3,"click"],["mat-header-row",""],["mat-row",""]],template:function(o,r){1&o&&(t.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"nav",3)(4,"ol",4)(5,"li",5),t._uU(6," Usuarios "),t.qZA(),t.TgZ(7,"li",6),t._uU(8," Grupos "),t.qZA()()()()(),t._UZ(9,"i",7),t.qZA(),t.TgZ(10,"mat-card",8)(11,"mat-card-content",9)(12,"div",10)(13,"div",11)(14,"h1",12),t._uU(15,"Grupos"),t.qZA(),t.TgZ(16,"mat-form-field",13)(17,"input",14),t.NdJ("keyup",function(g){return r.applyFilter(g)}),t.qZA(),t.TgZ(18,"mat-icon",15)(19,"mat-icon",16),t._uU(20,"search"),t.qZA()()()(),t.TgZ(21,"div",17)(22,"div",18)(23,"button",19),t._uU(24," Crear Grupo "),t.qZA()()()(),t.TgZ(25,"div",20),t.YNc(26,z,3,2,"div",21),t.TgZ(27,"div",22)(28,"table",23),t.ynx(29,24),t.YNc(30,H,2,0,"th",25),t.YNc(31,W,2,1,"td",26),t.BQk(),t.ynx(32,27),t.YNc(33,K,2,0,"th",25),t.YNc(34,X,3,6,"td",26),t.BQk(),t.ynx(35,28),t.YNc(36,$,2,0,"th",29),t.YNc(37,tt,6,3,"td",30),t.BQk(),t.ynx(38,31),t.YNc(39,et,2,0,"th",32),t.YNc(40,rt,7,5,"td",33),t.BQk(),t.YNc(41,nt,1,0,"tr",34),t.YNc(42,at,1,0,"tr",35),t.qZA()(),t._UZ(43,"mat-paginator",36),t.qZA()()()),2&o&&(t.xp6(23),t.Q6J("routerLink",t.DdM(8,it)),t.xp6(3),t.Q6J("ngIf",r.isLoadingResults||r.isRateLimitReached),t.xp6(2),t.Q6J("dataSource",r.groups),t.xp6(13),t.Q6J("matHeaderRowDef",r.displayedColumns),t.xp6(1),t.Q6J("matRowDefColumns",r.displayedColumns),t.xp6(1),t.Q6J("length",r.resultsLength)("pageSize",10)("pageSizeOptions",t.DdM(9,st)))},dependencies:[c.O5,p.rH,_.KE,_.R9,D.Nt,Z.a8,Z.dn,I.lW,k.Hw,B.Ou,N.NW,R.YE,R.nU,f.BZ,f.fO,f.as,f.w1,f.Dz,f.nj,f.ge,f.ev,f.XQ,f.Gk,c.uU],styles:[".img-bg-groups-icon[_ngcontent-%COMP%]{background-image:url(employee01.4b7a127a270e309d.png);background-size:100px;background-repeat:no-repeat;background-position:right;right:30px;top:55px;position:absolute;min-height:100px}"]}),i})()},{path:"group",component:Q}];let ut=(()=>{var e;class i{}return(e=i).\u0275fac=function(o){return new(o||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[p.Bz.forChild(lt),p.Bz]}),i})();var mt=a(1186),ct=a(6208),pt=a(2577);let dt=(()=>{var e;class i{}return(e=i).\u0275fac=function(o){return new(o||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({providers:[G.J,c.uU],imports:[c.ez,ut,mt.q,u.u5,u.UX,ct.m,pt.UsersModule]}),i})()},4808:(L,A,a)=>{a.d(A,{J:()=>y});var p=a(5861),d=a(6510),u=a(5879),x=a(7278);let y=(()=>{var h;class t{constructor(m){this.http=m}create(m){var c=this;return(0,p.Z)(function*(){return yield c.http.post(d.S.GROUPS.BASE_ENDPOINT,m)})()}findAllFilters(m,c,v,U,S){var T=this;return(0,p.Z)(function*(){const _=d.S.GROUPS.FILTERS(m,c,v,U,S);return yield T.http.get(_)})()}delete(m){var c=this;return(0,p.Z)(function*(){yield c.http.delete(d.S.GROUPS.BY_ID(m))})()}findOne(m){var c=this;return(0,p.Z)(function*(){const v=d.S.GROUPS.BY_ID(m);return yield c.http.get(v)})()}updateGroup(m,c){var v=this;return(0,p.Z)(function*(){return yield v.http.put(d.S.GROUPS.BY_ID(m),c)})()}findAll(){var m=this;return(0,p.Z)(function*(){return yield m.http.get(d.S.GROUPS.BASE_ENDPOINT)})()}}return(h=t).\u0275fac=function(m){return new(m||h)(u.LFG(x.v))},h.\u0275prov=u.Yz7({token:h,factory:h.\u0275fac,providedIn:"root"}),t})()}}]);