"use strict";(self.webpackChunkandon_frontend=self.webpackChunkandon_frontend||[]).push([[577],{2577:(ve,T,l)=>{l.r(T),l.d(T,{UsersModule:()=>he});var p=l(6814),f=l(1303),g=l(5861),A=l(1476),U=l(3566),a=l(6223),e=l(5879),y=l(9347),C=l(2186),S=l(4808),F=l(9645),R=l(3680),h=l(5683),N=l(2032),D=l(8525),v=l(5195),x=l(2296),w=l(2557),J=l(617),q=l(5940),d=l(5313);function O(o,n){if(1&o&&(e.TgZ(0,"mat-option",19),e._uU(1),e.qZA()),2&o){const s=n.$implicit;e.Q6J("value",s.id),e.xp6(1),e.Oqu(s.name)}}function Y(o,n){if(1&o&&(e.TgZ(0,"mat-option",19),e._uU(1),e.qZA()),2&o){const s=n.$implicit;e.Q6J("value",s.id),e.xp6(1),e.Oqu(s.name)}}function E(o,n){1&o&&e._UZ(0,"mat-spinner")}function P(o,n){1&o&&(e.TgZ(0,"div",43),e._uU(1," Andon's API rate limit has been reached. It will be reset in one minute. "),e.qZA())}function Q(o,n){if(1&o&&(e.TgZ(0,"div",40),e.YNc(1,E,1,0,"mat-spinner",41),e.YNc(2,P,2,0,"div",42),e.qZA()),2&o){const s=e.oxw();e.xp6(1),e.Q6J("ngIf",s.isLoadingResults),e.xp6(1),e.Q6J("ngIf",s.isRateLimitReached)}}function L(o,n){1&o&&(e.TgZ(0,"th",44),e._uU(1," Nombre "),e.qZA())}function G(o,n){if(1&o&&(e.TgZ(0,"td",45)(1,"div",46),e._UZ(2,"img",47),e.TgZ(3,"div",48)(4,"p",49),e._uU(5),e.qZA(),e.TgZ(6,"small",50),e._uU(7),e.qZA()()()()),2&o){const s=n.$implicit;e.xp6(5),e.hij(" ",s.firstName," "),e.xp6(2),e.Oqu(s.lastName)}}function M(o,n){1&o&&(e.TgZ(0,"th",44),e._uU(1," Email "),e.qZA())}function k(o,n){if(1&o&&(e.TgZ(0,"td",51),e._uU(1),e.qZA()),2&o){const s=n.$implicit;e.xp6(1),e.hij(" ",s.email," ")}}function z(o,n){1&o&&(e.TgZ(0,"th",52),e._uU(1," Roles "),e.qZA())}function V(o,n){if(1&o&&(e.TgZ(0,"mat-chip-option",55),e._uU(1),e.qZA()),2&o){const s=n.$implicit;e.xp6(1),e.hij(" ",s.name," ")}}function B(o,n){if(1&o&&(e.TgZ(0,"td",51)(1,"mat-chip-listbox",53),e.YNc(2,V,2,1,"mat-chip-option",54),e.qZA()()),2&o){const s=n.$implicit;e.xp6(2),e.Q6J("ngForOf",s.roles)}}function j(o,n){1&o&&(e.TgZ(0,"th",56),e._uU(1," Creado "),e.qZA())}function $(o,n){if(1&o&&(e.TgZ(0,"td",51),e._uU(1),e.ALo(2,"date"),e.qZA()),2&o){const s=n.$implicit;e.xp6(1),e.hij(" ",e.xi3(2,1,s.createdOn,"fullDate")," ")}}function H(o,n){1&o&&(e.TgZ(0,"th",52),e._uU(1," Acciones "),e.qZA())}const W=function(o){return["/","users",o]};function K(o,n){if(1&o){const s=e.EpF();e.TgZ(0,"td",57)(1,"a",58)(2,"mat-icon",59),e._uU(3,"edit"),e.qZA()(),e.TgZ(4,"a",60),e.NdJ("click",function(){const i=e.CHM(s).$implicit,u=e.oxw();return e.KtG(u.remove(i.id))}),e.TgZ(5,"mat-icon",61),e._uU(6,"delete"),e.qZA()()()}if(2&o){const s=n.$implicit;e.xp6(1),e.Q6J("routerLink",e.VKq(1,W,s.id))}}function X(o,n){1&o&&e._UZ(0,"tr",62)}function ee(o,n){1&o&&e._UZ(0,"tr",63)}const te=function(){return["/","users","create"]},oe=function(){return[5,10,25,100]};let re=(()=>{var o;class n{constructor(t,r,i,u,m){this.dialog=t,this.datePipe=r,this.usersService=i,this.groupsService=u,this.rolesService=m,this.displayedColumns=["firstName","email","roles","createdOn","action"],this.filtersForm=new a.cw({search:new a.NI(""),roleId:new a.NI(""),groupId:new a.NI("")}),this.roles=[],this.groups=[],this.resultsLength=0,this.isLoadingResults=!0,this.isRateLimitReached=!1,this.paginator=Object.create(null),this.sort=Object.create(null)}ngAfterViewInit(){var t=this;return(0,g.Z)(function*(){t.paginator.pageSize=25,yield t.loadUsers(),t.sort.sortChange.subscribe(()=>{t.paginator.pageIndex=0,t.loadUsers()}),t.paginator.page.subscribe(()=>t.loadUsers()),t.groups=yield t.groupsService.findAll(),t.roles=yield t.rolesService.findAll()})()}loadUsers(){var t=this;return(0,g.Z)(function*(){const r=t.paginator.pageIndex*t.paginator.pageSize,i=t.paginator.pageSize,u=t.sort.active,m=t.sort.direction;t.isLoadingResults=!0;const c=t.filtersForm.value,_=yield t.usersService.findAllFilters(r,i,u,m,""==c.search?void 0:c.search,""==c.roleId?void 0:c.roleId,""==c.groupId?void 0:c.groupId);t.paginator.length=_.row_count,t.users=_.rows,t.resultsLength=_.row_count,t.isLoadingResults=!1,t.isRateLimitReached=!1})()}applyFilter(){this.loadUsers()}remove(t){var r=this;return(0,g.Z)(function*(){yield r.usersService.delete(t),r.users=r.users.filter(i=>i.id!==t)})()}}return(o=n).\u0275fac=function(t){return new(t||o)(e.Y36(y.uw),e.Y36(p.uU),e.Y36(C.f),e.Y36(S.J),e.Y36(F.f))},o.\u0275cmp=e.Xpm({type:o,selectors:[["app-incident"]],viewQuery:function(t,r){if(1&t&&(e.Gf(A.NW,7),e.Gf(U.YE,5)),2&t){let i;e.iGM(i=e.CRH())&&(r.paginator=i.first),e.iGM(i=e.CRH())&&(r.sort=i.first)}},decls:56,vars:13,consts:[[1,"bg-light-primary","rounded","p-y-7","p-x-24","m-b-20","overflow-hidden"],[1,"row"],[1,"col-sm-12"],["aria-label","breadcrumb",1,"m-5"],[1,"breadcrumb","mb-0"],[1,"breadcrumb-item","page-title","m-0","f-s-14","p-t-4","f-w-600","m-b-5"],[1,"breadcrumb-item","active","m-0","f-s-14","p-t-4","f-w-600","m-b-5"],[1,"col-4","justify-content-end","img-bg-users-icon"],[1,"cardWithShadow"],[1,"p-24"],[1,"flex","flex-row"],[1,"text-2xl","font-bold"],[1,"flex-auto"],["mat-raised-button","","color","primary",3,"routerLink"],[1,"flex","flex-row","flex-wrap","mt-2",3,"formGroup"],["appearance","outline",1,"form-field","hide-hint","px-2","basis-1/3"],["matInput","","placeholder","Buscar por ID de Usuario","formControlName","search"],["mat-icon-button","","matSuffix","",3,"click"],["formControlName","groupId",3,"selectionChange"],[3,"value"],[3,"value",4,"ngFor","ngForOf"],["formControlName","roleId",3,"selectionChange"],[1,"example-container","m-t-30"],["class","example-loading-shade",4,"ngIf"],[1,"example-table-container","responsive-table","overflow-auto"],["mat-table","","matSort","","matSortActive","firstName","matSortDisableClear","","matSortDirection","asc",1,"example-table",3,"dataSource"],["matColumnDef","firstName"],["mat-header-cell","","mat-sort-header","","class","f-s-16 f-w-600",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","email"],["mat-cell","","class","f-s-14",4,"matCellDef"],["matColumnDef","roles"],["mat-header-cell","","class","f-s-16 f-w-600",4,"matHeaderCellDef"],["matColumnDef","createdOn"],["mat-header-cell","","mat-sort-header","","disableClear","","class","f-s-16 f-w-600",4,"matHeaderCellDef"],["matColumnDef","action"],["mat-cell","","class","action-link",4,"matCellDef"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],["showFirstLastButtons","",3,"pageSizeOptions"],[1,"example-loading-shade"],[4,"ngIf"],["class","example-rate-limit-reached",4,"ngIf"],[1,"example-rate-limit-reached"],["mat-header-cell","","mat-sort-header","",1,"f-s-16","f-w-600"],["mat-cell",""],[1,"d-flex","align-items-center"],["src","","width","40",1,"rounded-circle"],[1,"m-l-16"],[1,"f-w-600","mat-subtitle-1","f-s-16","m-t-0"],[1,"mat-body-1","f-s-14"],["mat-cell","",1,"f-s-14"],["mat-header-cell","",1,"f-s-16","f-w-600"],["aria-label","Fish selection"],["class","f-s-14","color","",4,"ngFor","ngForOf"],["color","",1,"f-s-14"],["mat-header-cell","","mat-sort-header","","disableClear","",1,"f-s-16","f-w-600"],["mat-cell","",1,"action-link"],[1,"m-r-10","cursor-pointer",3,"routerLink"],["name","edit"],[1,"cursor-pointer",3,"click"],["name","trash"],["mat-header-row",""],["mat-row",""]],template:function(t,r){1&t&&(e.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"nav",3)(4,"ol",4)(5,"li",5),e._uU(6," Usuarios "),e.qZA(),e.TgZ(7,"li",6),e._uU(8," Usuarios "),e.qZA()()()()(),e._UZ(9,"i",7),e.qZA(),e.TgZ(10,"mat-card",8)(11,"mat-card-content",9)(12,"div",10)(13,"h1",11),e._uU(14,"Usuarios"),e.qZA(),e._UZ(15,"div",12),e.TgZ(16,"button",13),e._uU(17," Crear Usuario "),e.qZA()(),e.TgZ(18,"form",14)(19,"mat-form-field",15),e._UZ(20,"input",16),e.TgZ(21,"button",17),e.NdJ("click",function(){return r.applyFilter()}),e.TgZ(22,"mat-icon"),e._uU(23,"search"),e.qZA()()(),e.TgZ(24,"mat-form-field",15)(25,"mat-select",18),e.NdJ("selectionChange",function(){return r.applyFilter()}),e.TgZ(26,"mat-option",19),e._uU(27,"-- Todos los grupos --"),e.qZA(),e.YNc(28,O,2,2,"mat-option",20),e.qZA()(),e.TgZ(29,"mat-form-field",15)(30,"mat-select",21),e.NdJ("selectionChange",function(){return r.applyFilter()}),e.TgZ(31,"mat-option",19),e._uU(32,"-- Todos los roles --"),e.qZA(),e.YNc(33,Y,2,2,"mat-option",20),e.qZA()()(),e.TgZ(34,"div",22),e.YNc(35,Q,3,2,"div",23),e.TgZ(36,"div",24)(37,"table",25),e.ynx(38,26),e.YNc(39,L,2,0,"th",27),e.YNc(40,G,8,2,"td",28),e.BQk(),e.ynx(41,29),e.YNc(42,M,2,0,"th",27),e.YNc(43,k,2,1,"td",30),e.BQk(),e.ynx(44,31),e.YNc(45,z,2,0,"th",32),e.YNc(46,B,3,1,"td",30),e.BQk(),e.ynx(47,33),e.YNc(48,j,2,0,"th",34),e.YNc(49,$,3,4,"td",30),e.BQk(),e.ynx(50,35),e.YNc(51,H,2,0,"th",32),e.YNc(52,K,7,3,"td",36),e.BQk(),e.YNc(53,X,1,0,"tr",37),e.YNc(54,ee,1,0,"tr",38),e.qZA()(),e._UZ(55,"mat-paginator",39),e.qZA()()()),2&t&&(e.xp6(16),e.Q6J("routerLink",e.DdM(11,te)),e.xp6(2),e.Q6J("formGroup",r.filtersForm),e.xp6(8),e.Q6J("value",""),e.xp6(2),e.Q6J("ngForOf",r.groups),e.xp6(3),e.Q6J("value",""),e.xp6(2),e.Q6J("ngForOf",r.roles),e.xp6(2),e.Q6J("ngIf",r.isLoadingResults||r.isRateLimitReached),e.xp6(2),e.Q6J("dataSource",r.users),e.xp6(16),e.Q6J("matHeaderRowDef",r.displayedColumns),e.xp6(1),e.Q6J("matRowDefColumns",r.displayedColumns),e.xp6(1),e.Q6J("pageSizeOptions",e.DdM(12,oe)))},dependencies:[p.sg,p.O5,f.rH,R.ey,h.KE,h.R9,N.Nt,D.gD,v.a8,v.dn,x.lW,x.RK,w.z2,w.iO,J.Hw,q.Ou,A.NW,U.YE,U.nU,d.BZ,d.fO,d.as,d.w1,d.Dz,d.nj,d.ge,d.ev,d.XQ,d.Gk,a._Y,a.Fj,a.JJ,a.JL,a.sg,a.u,p.uU],styles:[".img-bg-users-icon[_ngcontent-%COMP%]{background-image:url(employee01.4b7a127a270e309d.png);background-size:100px;background-repeat:no-repeat;background-position:right;right:5%;top:65px;position:absolute;min-height:100px;z-index:1000}@media (min-width: 1350px){.img-bg-users-icon[_ngcontent-%COMP%]{right:0}}.responsive-table[_ngcontent-%COMP%]   *[_ngcontent-%COMP%]{max-width:100vw!important;overflow:visible!important}.form-field[_ngcontent-%COMP%]{min-width:200px}"]}),n})();var Z=l(6510),ae=l(2939),se=l(5986),I=l(4104),ne=l(300);function ie(o,n){if(1&o){const s=e.EpF();e.TgZ(0,"mat-tab",28)(1,"mat-card-content")(2,"div",29)(3,"div",30)(4,"app-m2m",31),e.NdJ("relationshipChanged",function(r){e.CHM(s);const i=e.oxw();return e.KtG(i.onChanges(r))}),e.qZA()()()()()}if(2&o){const s=e.oxw();e.xp6(4),e.Q6J("m2mData",s.m2mRoles)}}function le(o,n){if(1&o){const s=e.EpF();e.TgZ(0,"mat-tab",32)(1,"mat-card-content")(2,"div",29)(3,"div",30)(4,"app-m2m",31),e.NdJ("relationshipChanged",function(r){e.CHM(s);const i=e.oxw();return e.KtG(i.onChanges(r))}),e.qZA()()()()()}if(2&o){const s=e.oxw();e.xp6(4),e.Q6J("m2mData",s.m2mGroups)}}let b=(()=>{var o;class n{constructor(t,r,i,u){this.usersService=t,this.route=r,this.router=i,this.snackBar=u,this.userForm=new a.cw({username:new a.NI("",[a.kI.required,a.kI.maxLength(128),a.kI.pattern(/^[a-z.]+$/)]),email:new a.NI("",[a.kI.email,a.kI.maxLength(128)]),firstName:new a.NI("",[a.kI.required,a.kI.maxLength(128)]),lastName:new a.NI("",[a.kI.required,a.kI.maxLength(128)]),phone:new a.NI("",[a.kI.pattern(/^(?:\+\d{2})?\d{10}$/),a.kI.maxLength(13)]),isActive:new a.NI(!0),password:new a.NI("",a.kI.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\W_]{8,}$/)),repeatPassword:new a.NI("",a.kI.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\W_]{8,}$/)),roles:new a.NI([])})}ngOnInit(){var t=this;return(0,g.Z)(function*(){t.userForm.controls.password.removeValidators(a.kI.required),t.userForm.controls.repeatPassword.removeValidators(a.kI.required);const r=t.route.snapshot.params.id;r?(t.user=yield t.usersService.getUserById(r),t.user&&(t.userForm.setValue({username:t.user.username,email:t.user.email?t.user.email:"",firstName:t.user.firstName,lastName:t.user.lastName,phone:t.user.phone?t.user.phone:"",isActive:t.user.isActive,password:"",repeatPassword:"",roles:t.user.roles}),t.setM2MData())):(t.userForm.controls.password.setValidators(a.kI.required),t.userForm.controls.repeatPassword.setValidators(a.kI.required)),t.userForm.controls.password.updateValueAndValidity(),t.userForm.controls.repeatPassword.updateValueAndValidity()})()}onUserSubmit(){var t=this;return(0,g.Z)(function*(){const r=t.userForm.value,i=t.userForm.controls;if(t.user&&(i.password.removeValidators(a.kI.required),i.repeatPassword.removeValidators(a.kI.required),(r.password||r.repeatPassword)&&(i.password.setValidators(a.kI.required),i.repeatPassword.setValidators(a.kI.required)),i.password.updateValueAndValidity(),i.repeatPassword.updateValueAndValidity()),r.password!=r.repeatPassword&&i.repeatPassword.setErrors({error:!0}),t.userForm.valid){const u={username:r.username,email:""==r.email?void 0:r.email,firstName:r.firstName,lastName:r.lastName,phone:""==r.phone?void 0:r.phone,isActive:r.isActive,password:""==r.password?void 0:r.password,roles:r.roles};if(t.user)try{yield t.usersService.updateUser(t.user.id,u),t.snackBar.open("Usuario guardado correctamente",void 0,{horizontalPosition:"end",verticalPosition:"bottom",duration:2e3})}catch(m){if(m.status&&401==m.status)t.snackBar.open("Contrase\xf1a incorrecta",void 0,{verticalPosition:"bottom",horizontalPosition:"end",duration:2e3});else{if(!m.status||400!=m.status)throw new Error(m);t.snackBar.open("Usuario o correo electr\xf3nico ya registrado",void 0,{verticalPosition:"bottom",horizontalPosition:"end",duration:2e3})}}else{const m=yield t.usersService.create(u);t.router.navigate(["/","users",m.id])}}})()}setM2MData(){if(this.user){const t=this.user.groups.map(i=>({parent:this.user.id,relation:i.name,relation_id:i.id}));this.m2mGroups={title:"Grupo",titleSingle:"Grupo",parent:this.user.id,parent_table:"user",relation:"groups",rel_primary_col:"name",relation_endpoint:Z.S.GROUPS.BASE_ENDPOINT,display_cols:["name","action"],updateRelationEndpoint:Z.S.USERS.UPDATE_USER_GROUPS,data:t};const r=this.user.roles.map(i=>({parent:this.user.id,relation:i.name,relation_id:i.id}));this.m2mRoles={title:"Roles",titleSingle:"Rol",parent:this.user.id,parent_table:"user",relation:"roles",rel_primary_col:"name",relation_endpoint:Z.S.ROLES.BASE_ENDPOINT,display_cols:["name","action"],updateRelationEndpoint:Z.S.USERS.UPDATE_USER_ROLES,data:r}}}onChanges(t){}}return(o=n).\u0275fac=function(t){return new(t||o)(e.Y36(C.f),e.Y36(f.gz),e.Y36(f.F0),e.Y36(ae.ux))},o.\u0275cmp=e.Xpm({type:o,selectors:[["app-users"]],decls:77,vars:4,consts:[[1,"cardWithShadow","theme-card"],[1,"flex","flex-row","mb-5","px-2","items-center"],[1,"text-3xl","font-semibold"],[1,"flex-auto"],["src","/assets/images/bg/engineer01.png","height","80px","width","80px"],[1,"b-t-1"],[3,"formGroup","submit"],[1,"p-3","rounded-md","mb-4"],[1,"text-xl","font-bold","mb-3"],[1,"flex","flex-row","flex-wrap"],[1,"px-2","flex-auto"],["appearance","outline",1,"w-full"],["matInput","","formControlName","username"],["matInput","","formControlName","email"],["matInput","","formControlName","firstName"],["matInput","","formControlName","lastName"],[1,"px-2","basis-1/2","flex-auto"],["matInput","","formControlName","phone"],[1,"px-2","basis-1/2","flex-auto",2,"min-width","212px"],[1,"flex","flex-col","items-start","justify-center","h-full"],["formControlName","isActive","color","primary"],["matInput","","type","password","formControlName","password"],["matInput","","type","password","formControlName","repeatPassword"],["mat-stretch-tabs","false","mat-align-tabs","start","animationDuration","0ms"],["label","Roles",4,"ngIf"],["label","Grupos",4,"ngIf"],[1,"mb-4","flex","flex-row-reverse"],["type","submit","mat-raised-button","","color","primary"],["label","Roles"],[1,"row"],[1,"col-12"],[3,"m2mData","relationshipChanged"],["label","Grupos"]],template:function(t,r){1&t&&(e.TgZ(0,"mat-card",0)(1,"div",1)(2,"h1",2),e._uU(3),e.qZA(),e._UZ(4,"div",3)(5,"img",4),e.qZA(),e.TgZ(6,"mat-card-content",5)(7,"form",6),e.NdJ("submit",function(){return r.onUserSubmit()}),e.TgZ(8,"div",7)(9,"h2",8),e._uU(10,"Datos generales"),e.qZA(),e.TgZ(11,"div",9)(12,"div",10)(13,"p"),e._uU(14,"ID de usuario"),e.qZA(),e.TgZ(15,"mat-form-field",11),e._UZ(16,"input",12),e.TgZ(17,"mat-error"),e._uU(18,"ID de usuario inv\xe1lido"),e.qZA()()(),e.TgZ(19,"div",10)(20,"p"),e._uU(21,"Correo electr\xf3nico"),e.qZA(),e.TgZ(22,"mat-form-field",11),e._UZ(23,"input",13),e.TgZ(24,"mat-error"),e._uU(25,"Correo electr\xf3nico inv\xe1lido"),e.qZA()()()(),e.TgZ(26,"div",9)(27,"div",10)(28,"p"),e._uU(29,"Nombre(s)"),e.qZA(),e.TgZ(30,"mat-form-field",11),e._UZ(31,"input",14),e.TgZ(32,"mat-error"),e._uU(33,"Nombre inv\xe1lido"),e.qZA()()(),e.TgZ(34,"div",10)(35,"p"),e._uU(36,"Apellido(s)"),e.qZA(),e.TgZ(37,"mat-form-field",11),e._UZ(38,"input",15),e.TgZ(39,"mat-error"),e._uU(40,"Apellido inv\xe1lido"),e.qZA()()()(),e.TgZ(41,"div",9)(42,"div",16)(43,"p"),e._uU(44,"Tel\xe9fono"),e.qZA(),e.TgZ(45,"mat-form-field",11),e._UZ(46,"input",17),e.TgZ(47,"mat-error"),e._uU(48,"Tel\xe9fono"),e.qZA()()(),e.TgZ(49,"div",18)(50,"div",19)(51,"mat-checkbox",20),e._uU(52,"Activo"),e.qZA()()()()(),e.TgZ(53,"div",7)(54,"h2",8),e._uU(55,"Contrase\xf1a"),e.qZA(),e.TgZ(56,"div",9)(57,"div",10)(58,"p"),e._uU(59,"Contrase\xf1a"),e.qZA(),e.TgZ(60,"mat-form-field",11),e._UZ(61,"input",21),e.TgZ(62,"mat-error"),e._uU(63,"Contrase\xf1a inv\xe1lida"),e.qZA()()(),e.TgZ(64,"div",10)(65,"p"),e._uU(66,"Repetir contrase\xf1a"),e.qZA(),e.TgZ(67,"mat-form-field",11),e._UZ(68,"input",22),e.TgZ(69,"mat-error"),e._uU(70,"Contrase\xf1a inv\xe1lida"),e.qZA()()()()(),e.TgZ(71,"mat-tab-group",23),e.YNc(72,ie,5,1,"mat-tab",24),e.YNc(73,le,5,1,"mat-tab",25),e.qZA(),e.TgZ(74,"div",26)(75,"button",27),e._uU(76,"Guardar"),e.qZA()()()()()),2&t&&(e.xp6(3),e.hij(" ",r.user?r.user.firstName+" "+r.user.lastName:"Crear Nuevo"," "),e.xp6(4),e.Q6J("formGroup",r.userForm),e.xp6(65),e.Q6J("ngIf",r.m2mRoles),e.xp6(1),e.Q6J("ngIf",r.m2mGroups))},dependencies:[p.O5,se.oG,h.KE,h.TO,N.Nt,v.a8,v.dn,I.uX,I.SP,x.lW,a._Y,a.Fj,a.JJ,a.JL,a.sg,a.u,ne.I]}),n})();const me=[{path:"",component:re},{path:"create",component:b},{path:":id",component:b}];let de=(()=>{var o;class n{}return(o=n).\u0275fac=function(t){return new(t||o)},o.\u0275mod=e.oAB({type:o}),o.\u0275inj=e.cJS({imports:[f.Bz.forChild(me),f.Bz]}),n})();var ue=l(1186),pe=l(2524),ce=l(6208),fe=l(4140),ge=l(9427);let he=(()=>{var o;class n{}return(o=n).\u0275fac=function(t){return new(t||o)},o.\u0275mod=e.oAB({type:o}),o.\u0275inj=e.cJS({providers:[C.f,p.uU],imports:[p.ez,de,ue.q,a.u5,a.UX,pe.D,ce.m,fe.GroupsModule,ge.RolesModule]}),n})()}}]);