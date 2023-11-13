"use strict";(self.webpackChunkandon_frontend=self.webpackChunkandon_frontend||[]).push([[952],{7952:(ie,S,s)=>{s.r(S),s.d(S,{RolesModule:()=>ne});var g=s(6814),v=s(1303),u=s(5861),y=s(1476),_=s(3566),e=s(5879),p=s(6510),I=s(7278);let b=(()=>{var t;class i{constructor(o){this.http=o}create(o){var n=this;return(0,u.Z)(function*(){return yield n.http.post(p.S.ROLES.BASE_ENDPOINT,o)})()}delete(o){var n=this;return(0,u.Z)(function*(){yield n.http.delete(p.S.ROLES.BY_ID(o))})()}findAll(){var o=this;return(0,u.Z)(function*(){return yield o.http.get(p.S.ROLES.BASE_ENDPOINT)})()}findAllFilters(o,n,a,m,l){var f=this;return(0,u.Z)(function*(){const Z=p.S.ROLES.FILTERS(o,n,a,m,l);return yield f.http.get(Z)})()}findOne(o){var n=this;return(0,u.Z)(function*(){const a=p.S.ROLES.BY_ID(o);return yield n.http.get(a)})()}updateRole(o,n){var a=this;return(0,u.Z)(function*(){return yield a.http.put(p.S.ROLES.BY_ID(o),n)})()}}return(t=i).\u0275fac=function(o){return new(o||t)(e.LFG(I.v))},t.\u0275prov=e.Yz7({token:t,factory:t.\u0275fac}),i})();var R=s(5683),T=s(2032),h=s(5195),A=s(2296),O=s(617),D=s(5940),d=s(5313);function U(t,i){1&t&&e._UZ(0,"mat-spinner")}function M(t,i){1&t&&(e.TgZ(0,"div",39),e._uU(1," Andon's API rate limit has been reached. It will be reset in one minute. "),e.qZA())}function N(t,i){if(1&t&&(e.TgZ(0,"div",36),e.YNc(1,U,1,0,"mat-spinner",37),e.YNc(2,M,2,0,"div",38),e.qZA()),2&t){const r=e.oxw();e.xp6(1),e.Q6J("ngIf",r.isLoadingResults),e.xp6(1),e.Q6J("ngIf",r.isRateLimitReached)}}function L(t,i){1&t&&(e.TgZ(0,"th",40),e._uU(1," Nombre "),e.qZA())}function P(t,i){if(1&t&&(e.TgZ(0,"td",41),e._uU(1),e.qZA()),2&t){const r=i.$implicit;e.xp6(1),e.hij(" ",r.name.slice(0,50)," ")}}function E(t,i){1&t&&(e.TgZ(0,"th",42),e._uU(1," Created "),e.qZA())}function F(t,i){if(1&t&&(e.TgZ(0,"td",43)(1,"div",44)(2,"mat-icon",45),e._uU(3,"calendar_today"),e.qZA(),e._uU(4),e.ALo(5,"date"),e.qZA()()),2&t){const r=i.$implicit;e.xp6(4),e.hij(" ",e.lcZ(5,1,r.createdOn)," ")}}function J(t,i){1&t&&(e.TgZ(0,"th",46),e._uU(1," Action "),e.qZA())}const Y=function(){return["/roles/role"]},Q=function(t){return{id:t}};function k(t,i){if(1&t){const r=e.EpF();e.TgZ(0,"td",47)(1,"a",48)(2,"mat-icon"),e._uU(3,"edit"),e.qZA()(),e.TgZ(4,"a",49),e.NdJ("click",function(){const a=e.CHM(r).$implicit,m=e.oxw();return e.KtG(m.remove(a.id))}),e.TgZ(5,"mat-icon"),e._uU(6,"delete"),e.qZA()()()}if(2&t){const r=i.$implicit;e.xp6(1),e.Q6J("routerLink",e.DdM(2,Y))("queryParams",e.VKq(3,Q,r.id))}}function q(t,i){1&t&&e._UZ(0,"tr",50)}function j(t,i){1&t&&e._UZ(0,"tr",51)}const B=function(){return["/","roles","role"]},z=function(){return[10,25,50,100]};let G=(()=>{var t;class i{constructor(o){this.rolesService=o,this.displayedColumns=["createdOn","name","action"],this.data=[],this.resultsLength=0,this.isLoadingResults=!0,this.isRateLimitReached=!1,this.paginator=Object.create(null),this.sort=Object.create(null)}ngAfterViewInit(){this.loadRoles(),this.sort.sortChange.subscribe(()=>{this.paginator.pageIndex=0,this.loadRoles()}),this.paginator.page.subscribe(()=>this.loadRoles())}loadRoles(o=""){const n=this.paginator.pageIndex*this.paginator.pageSize,a=this.paginator.pageSize,m=this.sort.active,l=this.sort.direction;this.isLoadingResults=!0,this.rolesService.findAllFilters(n,a,m,l,o).then(f=>{this.data=f.rows,this.resultsLength=f.row_count,this.isLoadingResults=!1,this.isRateLimitReached=!1}).catch(()=>{this.isLoadingResults=!1,this.isRateLimitReached=!0,this.data=[]})}applyFilter(o){this.loadRoles(o.target.value)}remove(o){var n=this;return(0,u.Z)(function*(){yield n.rolesService.delete(o),n.data=n.data.filter(a=>a.id!==o)})()}}return(t=i).\u0275fac=function(o){return new(o||t)(e.Y36(b))},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-roles"]],viewQuery:function(o,n){if(1&o&&(e.Gf(y.NW,5),e.Gf(_.YE,5)),2&o){let a;e.iGM(a=e.CRH())&&(n.paginator=a.first),e.iGM(a=e.CRH())&&(n.sort=a.first)}},decls:41,vars:10,consts:[[1,"bg-light-primary","rounded","p-y-7","p-x-24","m-b-20","overflow-hidden"],[1,"row"],[1,"col-sm-12"],["aria-label","breadcrumb",1,"m-5"],[1,"breadcrumb","mb-0"],[1,"breadcrumb-item","page-title","m-0","f-s-14","p-t-4","f-w-600","m-b-5"],[1,"breadcrumb-item","active","m-0","f-s-14","p-t-4","f-w-600","m-b-5"],[1,"col-4","justify-content-end","img-bg-roles-icon"],[1,"cardWithShadow"],[1,"p-24"],[1,"row","justify-content-between"],[1,"col-lg-4"],[1,"text-2xl","font-bold"],["appearance","outline",1,"w-100","hide-hint"],["matInput","","placeholder","Buscar Roles",3,"keyup"],["matSuffix",""],["name","search",1,"icon-20"],[1,"col-lg-4","justify-content-end"],[1,"row","justify-content-end","m-b-6"],["mat-raised-button","","color","primary",3,"routerLink"],[1,"example-container","m-t-30"],["class","example-loading-shade",4,"ngIf"],[1,"example-table-container","responsive-table"],["mat-table","","matSort","","matSortActive","createdOn","matSortDisableClear","","matSortDirection","desc",1,"example-table",3,"dataSource"],["matColumnDef","name"],["mat-header-cell","","mat-sort-header","","class","f-w-600 mat-subtitle-1 f-s-16",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","createdOn"],["mat-header-cell","","mat-sort-header","","disableClear","","class","f-w-600 mat-subtitle-1 f-s-16 p-l-0",4,"matHeaderCellDef"],["mat-cell","","class","p-l-0",4,"matCellDef"],["matColumnDef","action"],["mat-header-cell","","class","f-s-16 f-w-600",4,"matHeaderCellDef"],["mat-cell","","class","action-link",4,"matCellDef"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],[3,"length","pageSize","pageSizeOptions"],[1,"example-loading-shade"],[4,"ngIf"],["class","example-rate-limit-reached",4,"ngIf"],[1,"example-rate-limit-reached"],["mat-header-cell","","mat-sort-header","",1,"f-w-600","mat-subtitle-1","f-s-16"],["mat-cell",""],["mat-header-cell","","mat-sort-header","","disableClear","",1,"f-w-600","mat-subtitle-1","f-s-16","p-l-0"],["mat-cell","",1,"p-l-0"],[1,"d-flex","align-items-center","gap-8"],[1,"text-sm"],["mat-header-cell","",1,"f-s-16","f-w-600"],["mat-cell","",1,"action-link"],[1,"m-r-10","cursor-pointer",3,"routerLink","queryParams"],[1,"m-r-10","cursor-pointer",3,"click"],["mat-header-row",""],["mat-row",""]],template:function(o,n){1&o&&(e.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"nav",3)(4,"ol",4)(5,"li",5),e._uU(6," Seguridad "),e.qZA(),e.TgZ(7,"li",6),e._uU(8," Roles "),e.qZA()()()()(),e._UZ(9,"i",7),e.qZA(),e.TgZ(10,"mat-card",8)(11,"mat-card-content",9)(12,"div",10)(13,"div",11)(14,"h1",12),e._uU(15,"Roles"),e.qZA(),e.TgZ(16,"mat-form-field",13)(17,"input",14),e.NdJ("keyup",function(m){return n.applyFilter(m)}),e.qZA(),e.TgZ(18,"mat-icon",15)(19,"mat-icon",16),e._uU(20,"search"),e.qZA()()()(),e.TgZ(21,"div",17)(22,"div",18)(23,"button",19),e._uU(24," Crear Role "),e.qZA()()()(),e.TgZ(25,"div",20),e.YNc(26,N,3,2,"div",21),e.TgZ(27,"div",22)(28,"table",23),e.ynx(29,24),e.YNc(30,L,2,0,"th",25),e.YNc(31,P,2,1,"td",26),e.BQk(),e.ynx(32,27),e.YNc(33,E,2,0,"th",28),e.YNc(34,F,6,3,"td",29),e.BQk(),e.ynx(35,30),e.YNc(36,J,2,0,"th",31),e.YNc(37,k,7,5,"td",32),e.BQk(),e.YNc(38,q,1,0,"tr",33),e.YNc(39,j,1,0,"tr",34),e.qZA()(),e._UZ(40,"mat-paginator",35),e.qZA()()()),2&o&&(e.xp6(23),e.Q6J("routerLink",e.DdM(8,B)),e.xp6(3),e.Q6J("ngIf",n.isLoadingResults||n.isRateLimitReached),e.xp6(2),e.Q6J("dataSource",n.data),e.xp6(10),e.Q6J("matHeaderRowDef",n.displayedColumns),e.xp6(1),e.Q6J("matRowDefColumns",n.displayedColumns),e.xp6(1),e.Q6J("length",n.resultsLength)("pageSize",10)("pageSizeOptions",e.DdM(9,z)))},dependencies:[g.O5,v.rH,R.KE,R.R9,T.Nt,h.a8,h.dn,A.lW,O.Hw,D.Ou,y.NW,_.YE,_.nU,d.BZ,d.fO,d.as,d.w1,d.Dz,d.nj,d.ge,d.ev,d.XQ,d.Gk,g.uU],styles:[".example-container[_ngcontent-%COMP%]{position:relative;min-height:200px}.example-table-container[_ngcontent-%COMP%]{position:relative;max-height:400px;overflow:auto}.example-loading-shade[_ngcontent-%COMP%]{position:absolute;inset:0 0 56px;background:rgba(0,0,0,.15);z-index:1;display:flex;align-items:center;justify-content:center}.example-rate-limit-reached[_ngcontent-%COMP%]{color:#980000;max-width:360px;text-align:center}.mat-column-number[_ngcontent-%COMP%], .mat-column-state[_ngcontent-%COMP%]{max-width:64px}.mat-column-created[_ngcontent-%COMP%]{max-width:124px}.img-bg-roles-icon[_ngcontent-%COMP%]{background-image:url(robot01-removebg-preview.f742b791a0cf9a26.png);background-size:75px;background-repeat:no-repeat;background-position:right;right:30px;top:55px;position:absolute;min-height:100px}"]}),i})();var c=s(6223),x=s(8034),w=s(4104),H=s(300);function W(t,i){1&t&&(e.TgZ(0,"div",22),e._uU(1," Name is required. "),e.qZA())}function V(t,i){if(1&t){const r=e.EpF();e.TgZ(0,"mat-card",0)(1,"mat-tab-group",23)(2,"mat-tab",24)(3,"mat-card-content")(4,"div",25)(5,"div",26)(6,"app-m2m",27),e.NdJ("relationshipChanged",function(n){e.CHM(r);const a=e.oxw();return e.KtG(a.onPermissionsChanged(n))}),e.qZA()()()()()()()}if(2&t){const r=e.oxw();e.xp6(6),e.Q6J("m2mData",r.m2mPermissions)}}const K=[{path:"",component:G},{path:"role",component:(()=>{var t;class i{constructor(o,n,a,m){var l=this;this._formBuilder=o,this.rolesService=n,this.route=a,this.router=m,this.groups=[],this.users=[],this.permissionsIds=[],this.groupsIds=[],this.usersIds=[],this.createdOn=new Date,this.role_id="",this.newRecord=!0,this.roleForm=this._formBuilder.group({name:["",[c.kI.required,c.kI.minLength(4)]]}),this.route.queryParams.subscribe(function(){var f=(0,u.Z)(function*(Z){l.role_id=Z.id,l.role_id&&(l.role=yield l.rolesService.findOne(l.role_id),l.role&&(l.createdOn=new Date(l.role.createdOn),l.roleForm.controls.name.setValue(l.role.name),l.permissionsIds=l.role.permissions.map(C=>C.id),l.permissions=l.role.permissions.map(C=>({parent:l.role.id,relation:C.name,relation_id:C.id})),l.setM2MData(),l.newRecord=!1))});return function(Z){return f.apply(this,arguments)}}())}setM2MData(){this.m2mPermissions={title:"Permissions",titleSingle:"Permission",parent:this.role.id,parent_table:"role",relation:"permissions",rel_primary_col:"name",relation_endpoint:p.S.PERMISSIONS.BASE_ENDPOINT,display_cols:["name"],updateRelationEndpoint:p.S.ROLES.UPDATE_PERMISSIONS,data:this.permissions}}ngOnInit(){}onSubmit(){var o=this;return(0,u.Z)(function*(){o.role=o.role_id&&!o.newRecord?yield o.rolesService.updateRole(o.role.id,o.roleForm.value):yield o.rolesService.create(o.roleForm.value),o.role&&o.router.navigate(["/roles"])})()}onPermissionsChanged(o){this.permissionsIds=o,this.roleForm.get("permissions")?.patchValue(this.permissionsIds)}onUsersChanged(o){this.usersIds=o}onGroupsChanged(o){this.groupsIds=o}onRolesChanged(o){}}return(t=i).\u0275fac=function(o){return new(o||t)(e.Y36(c.qu),e.Y36(b),e.Y36(v.gz),e.Y36(v.F0))},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-roles"]],decls:32,vars:9,consts:[[1,"cardWithShadow","theme-card"],[1,"w-100","row","justify-content-end"],[1,"col-8"],[1,"m-10"],[1,"col-4","justify-content-end"],[1,"col-4","justify-content-end","img-bg-role-icon"],[1,"b-t-1"],[3,"formGroup","ngSubmit"],[1,"row","m-t-20"],[1,"col-sm-6"],[1,"mat-subtitle-2","f-w-600","m-b-8","d-block"],["appearance","outline","color","primary",1,"w-100"],["matInput","","type","text","placeholder","Manager IT","formControlName","name"],["class","text-error m-b-20",4,"ngIf"],["appearance","outline",1,"w-100"],["matInput","","placeholder","MM/DD/AAAA","disabled","",3,"matDatepicker","value"],["matIconSuffix","",3,"for"],["picker",""],["class","cardWithShadow theme-card",4,"ngIf"],[1,"m-t-12","text-right"],["mat-flat-button","","color","accent",1,"m-2"],["type","submit","mat-flat-button","","color","primary",1,"m-2",3,"disabled"],[1,"text-error","m-b-20"],["mat-stretch-tabs","false","mat-align-tabs","start","animationDuration","0ms"],["label","Permisos"],[1,"row"],[1,"col-12"],[3,"m2mData","relationshipChanged"]],template:function(o,n){if(1&o&&(e.TgZ(0,"mat-card",0)(1,"mat-card-header",1)(2,"div",2)(3,"mat-card-title",3),e._uU(4,"Crear Nuevo"),e.qZA()(),e._UZ(5,"div",4),e.qZA(),e._UZ(6,"div",5),e.TgZ(7,"mat-card-content",6)(8,"form",7),e.NdJ("ngSubmit",function(){return n.onSubmit()}),e.TgZ(9,"div",8)(10,"div",9)(11,"mat-label",10),e._uU(12,"Nombre"),e.TgZ(13,"span"),e._uU(14,"*"),e.qZA()(),e.TgZ(15,"mat-form-field",11),e._UZ(16,"input",12),e.qZA(),e.YNc(17,W,2,0,"div",13),e.qZA(),e.TgZ(18,"div",9)(19,"mat-label",10),e._uU(20,"Created"),e.qZA(),e.TgZ(21,"mat-form-field",14),e._UZ(22,"input",15)(23,"mat-datepicker-toggle",16)(24,"mat-datepicker",null,17),e.qZA()()(),e.YNc(26,V,7,1,"mat-card",18),e.TgZ(27,"div",19)(28,"button",20),e._uU(29,"Cancel"),e.qZA(),e.TgZ(30,"button",21),e._uU(31," Submit "),e.qZA()()()()()),2&o){const a=e.MAs(25);let m,l;e.xp6(8),e.Q6J("formGroup",n.roleForm),e.xp6(5),e.ekj("text-error",null==(m=n.roleForm.get("name"))?null:m.hasError("required")),e.xp6(4),e.Q6J("ngIf",null==(l=n.roleForm.get("name"))?null:l.hasError("required")),e.xp6(5),e.Q6J("matDatepicker",a)("value",n.createdOn),e.xp6(1),e.Q6J("for",a),e.xp6(3),e.Q6J("ngIf",!n.newRecord),e.xp6(4),e.Q6J("disabled",n.roleForm.invalid)}},dependencies:[g.O5,x.Mq,x.hl,x.nW,R.KE,R.hX,R.R9,T.Nt,h.a8,h.dn,h.dk,h.n5,w.uX,w.SP,A.lW,c._Y,c.Fj,c.JJ,c.JL,c.sg,c.u,H.I],styles:[".img-bg-role-icon[_ngcontent-%COMP%]{background-image:url(icon_engineering_roles-removebg-preview.dd6f744c15e506b7.png);background-size:80px;background-repeat:no-repeat;background-position:right;right:20px;top:-20px;position:absolute;min-height:100px}"]}),i})()}];let $=(()=>{var t;class i{}return(t=i).\u0275fac=function(o){return new(o||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[v.Bz.forChild(K),v.Bz]}),i})();var ee=s(1186),te=s(6208),oe=s(2524);let ne=(()=>{var t;class i{}return(t=i).\u0275fac=function(o){return new(o||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({providers:[b,g.uU],imports:[g.ez,$,ee.q,c.u5,c.UX,oe.D,te.m]}),i})()}}]);