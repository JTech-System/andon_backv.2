"use strict";(self.webpackChunkandon_frontend=self.webpackChunkandon_frontend||[]).push([[603],{9603:(Xt,A,l)=>{l.r(A),l.d(A,{NotificationsModule:()=>Kt});var h=l(6814),N=l(3690),J=l(1186),v=l(1303),m=l(5861),Z=function(e){return e.EMAIL="email",e.PUSH="push",e}(Z||{});const Q=Object.values(Z);function y(e){switch(e){case Z.EMAIL:return"Correo electr\xf3nico";case Z.PUSH:return"Notificaci\xf3n push"}return""}var g=function(e){return e.CREATE="create",e.UPDATE="update",e.DELETE="delete",e.EVENT="event",e}(g||{});const Y=Object.values(g);function I(e){switch(e){case g.CREATE:return"Crear";case g.UPDATE:return"Actualizar";case g.DELETE:return"Eliminar";case g.EVENT:return"Evento"}return""}function U(e){return"incident"===e?"Incidente":""}var c=l(6223),S=l(8693),t=l(5879),F=l(4808),O=l(9347),b=l(3680),T=l(5683),q=l(8525),C=l(2296),G=l(2557),E=l(617),_=l(5313);function k(e,a){if(1&e&&(t.TgZ(0,"mat-option",25),t._uU(1),t.qZA()),2&e){const o=a.$implicit;t.Q6J("value",o.id),t.xp6(1),t.hij(" ",o.name," ")}}function D(e,a){1&e&&(t.TgZ(0,"th",26),t._uU(1,"Nombre"),t.qZA())}const $=function(e){return["/","notifications",e]};function R(e,a){if(1&e&&(t.TgZ(0,"td",27)(1,"a",28),t._uU(2),t.qZA()()),2&e){const o=a.$implicit;t.xp6(1),t.Q6J("routerLink",t.VKq(2,$,o.id)),t.xp6(1),t.Oqu(o.name)}}function V(e,a){1&e&&(t.TgZ(0,"th",26),t._uU(1,"Activo"),t.qZA())}function j(e,a){if(1&e&&(t.TgZ(0,"td",27),t._uU(1),t.qZA()),2&e){const o=a.$implicit;t.xp6(1),t.hij(" ",o.active?"Activo":"No activo"," ")}}function M(e,a){1&e&&(t.TgZ(0,"th",26),t._uU(1,"Tipos"),t.qZA())}function L(e,a){if(1&e&&(t.TgZ(0,"span")(1,"mat-chip",30),t._uU(2),t.qZA()()),2&e){const o=a.$implicit,i=t.oxw(2);t.xp6(2),t.Oqu(i.notificationTypeToSpanish(o))}}function P(e,a){if(1&e&&(t.TgZ(0,"td",27),t.YNc(1,L,3,1,"span",29),t.qZA()),2&e){const o=a.$implicit;t.xp6(1),t.Q6J("ngForOf",o.types)}}function B(e,a){1&e&&(t.TgZ(0,"th",26),t._uU(1,"Entidad"),t.qZA())}function H(e,a){if(1&e&&(t.TgZ(0,"td",27),t._uU(1),t.qZA()),2&e){const o=a.$implicit,i=t.oxw();t.xp6(1),t.hij(" ",i.notificationEntityToSpanish(o.entity)," ")}}function z(e,a){1&e&&(t.TgZ(0,"th",26),t._uU(1,"Operaciones"),t.qZA())}function K(e,a){if(1&e&&(t.TgZ(0,"span")(1,"mat-chip",30),t._uU(2),t.qZA()()),2&e){const o=a.$implicit,i=t.oxw(2);t.xp6(2),t.Oqu(i.notificationOperationToSpanish(o))}}function X(e,a){if(1&e&&(t.TgZ(0,"td",27),t.YNc(1,K,3,1,"span",29),t.qZA()),2&e){const o=a.$implicit;t.xp6(1),t.Q6J("ngForOf",o.operations)}}function W(e,a){1&e&&(t.TgZ(0,"th",26),t._uU(1,"Grupos"),t.qZA())}function tt(e,a){if(1&e&&(t.TgZ(0,"span")(1,"mat-chip",30),t._uU(2),t.qZA()()),2&e){const o=a.$implicit;t.xp6(2),t.Oqu(o.name)}}function et(e,a){if(1&e&&(t.TgZ(0,"td",27),t.YNc(1,tt,3,1,"span",29),t.qZA()),2&e){const o=a.$implicit;t.xp6(1),t.Q6J("ngForOf",o.groups)}}function it(e,a){1&e&&t._UZ(0,"th",26)}function ot(e,a){1&e&&(t.TgZ(0,"mat-chip"),t._uU(1,"Programada"),t.qZA())}function nt(e,a){if(1&e&&(t.TgZ(0,"td",27),t.YNc(1,ot,2,0,"mat-chip",31),t.qZA()),2&e){const o=a.$implicit;t.xp6(1),t.Q6J("ngIf",o.cronTime)}}function at(e,a){1&e&&(t.TgZ(0,"th",26),t._uU(1,"Eliminar"),t.qZA())}function rt(e,a){if(1&e){const o=t.EpF();t.TgZ(0,"td",27)(1,"button",32),t.NdJ("click",function(){const r=t.CHM(o).$implicit,s=t.oxw();return t.KtG(s.openDeleteDialog(r.id))}),t.TgZ(2,"mat-icon"),t._uU(3,"close"),t.qZA()()()}}function ct(e,a){1&e&&t._UZ(0,"tr",33)}function st(e,a){1&e&&t._UZ(0,"tr",34)}const lt=function(){return["/","notifications","create"]};let pt=(()=>{var e;class a{constructor(i,n,r,s,u){this.notificationsService=i,this.groupsService=n,this.dialog=r,this.route=s,this.router=u,this.notifications=[],this.groups=[],this.displayedColumns=["name","active","types","entity","operations","groups","cronTime","remove"],this.notificationEntityToSpanish=U,this.notificationTypeToSpanish=y,this.notificationOperationToSpanish=I,this.notificationFiltersForm=new c.cw({groupId:new c.NI("")})}ngOnInit(){var i=this;return(0,m.Z)(function*(){i.groups=yield i.groupsService.findAll(),i.route.queryParams.subscribe(function(){var n=(0,m.Z)(function*(r){const s=r.groupId;i.notifications=yield i.notificationsService.findAll(s)});return function(r){return n.apply(this,arguments)}}()),yield i.getNotifications()})()}getNotifications(){var i=this;return(0,m.Z)(function*(){const n=i.notificationFiltersForm.value;i.router.navigate(["/","notifications"],{queryParams:{groupId:""==n.groupId?void 0:n.groupId}})})()}openDeleteDialog(i){var n=this;this.dialog.open(S.F,{data:{cascade:!1}}).afterClosed().subscribe(function(){var s=(0,m.Z)(function*(u){if(u){yield n.notificationsService.remove(i);const f=n.notificationFiltersForm.value;n.notifications=yield n.notificationsService.findAll(""==f.groupId?void 0:f.groupId)}});return function(u){return s.apply(this,arguments)}}())}}return(e=a).\u0275fac=function(i){return new(i||e)(t.Y36(N.T),t.Y36(F.J),t.Y36(O.uw),t.Y36(v.gz),t.Y36(v.F0))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-notifications"]],decls:45,vars:7,consts:[[1,"flex","flex-row","mb-5","px-2","items-center"],[1,"text-3xl","font-bold"],[1,"flex-auto"],["mat-raised-button","","color","primary",3,"routerLink"],[1,"bg-white","p-3","rounded-md","shadow-md","mb-4"],[1,"flex","flex-row","flex-wrap"],[1,"mx-2","w-full","max-w-xs"],["appearance","outline",1,"w-full"],[3,"formControl","selectionChange"],["value",""],[3,"value",4,"ngFor","ngForOf"],[1,"overflow-y-auto"],["mat-table","",3,"dataSource"],["matColumnDef","name"],["mat-header-cell","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","active"],["matColumnDef","types"],["matColumnDef","entity"],["matColumnDef","operations"],["matColumnDef","groups"],["matColumnDef","cronTime"],["matColumnDef","remove"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],[3,"value"],["mat-header-cell",""],["mat-cell",""],[1,"text-blue-500","cursor-pointer","hover:underline",3,"routerLink"],[4,"ngFor","ngForOf"],[1,"me-2","my-1"],[4,"ngIf"],["mat-icon-button","","color","warn",3,"click"],["mat-header-row",""],["mat-row",""]],template:function(i,n){1&i&&(t.TgZ(0,"div",0)(1,"h1",1),t._uU(2,"Notificaciones"),t.qZA(),t._UZ(3,"div",2),t.TgZ(4,"button",3),t._uU(5," Agregar "),t.qZA()(),t.TgZ(6,"div",4)(7,"form",5)(8,"div",6)(9,"p"),t._uU(10,"Grupo"),t.qZA(),t.TgZ(11,"mat-form-field",7)(12,"mat-select",8),t.NdJ("selectionChange",function(){return n.getNotifications()}),t.TgZ(13,"mat-option",9),t._uU(14,"Todos"),t.qZA(),t.YNc(15,k,2,2,"mat-option",10),t.qZA()()()()(),t.TgZ(16,"div",4)(17,"div",11)(18,"table",12),t.ynx(19,13),t.YNc(20,D,2,0,"th",14),t.YNc(21,R,3,4,"td",15),t.BQk(),t.ynx(22,16),t.YNc(23,V,2,0,"th",14),t.YNc(24,j,2,1,"td",15),t.BQk(),t.ynx(25,17),t.YNc(26,M,2,0,"th",14),t.YNc(27,P,2,1,"td",15),t.BQk(),t.ynx(28,18),t.YNc(29,B,2,0,"th",14),t.YNc(30,H,2,1,"td",15),t.BQk(),t.ynx(31,19),t.YNc(32,z,2,0,"th",14),t.YNc(33,X,2,1,"td",15),t.BQk(),t.ynx(34,20),t.YNc(35,W,2,0,"th",14),t.YNc(36,et,2,1,"td",15),t.BQk(),t.ynx(37,21),t.YNc(38,it,1,0,"th",14),t.YNc(39,nt,2,1,"td",15),t.BQk(),t.ynx(40,22),t.YNc(41,at,2,0,"th",14),t.YNc(42,rt,4,0,"td",15),t.BQk(),t.YNc(43,ct,1,0,"tr",23),t.YNc(44,st,1,0,"tr",24),t.qZA()()()),2&i&&(t.xp6(4),t.Q6J("routerLink",t.DdM(6,lt)),t.xp6(8),t.Q6J("formControl",n.notificationFiltersForm.controls.groupId),t.xp6(3),t.Q6J("ngForOf",n.groups),t.xp6(3),t.Q6J("dataSource",n.notifications),t.xp6(25),t.Q6J("matHeaderRowDef",n.displayedColumns),t.xp6(1),t.Q6J("matRowDefColumns",n.displayedColumns))},dependencies:[v.rH,h.sg,h.O5,b.ey,T.KE,q.gD,C.lW,C.RK,G.HS,E.Hw,_.BZ,_.fO,_.as,_.w1,_.Dz,_.nj,_.ge,_.ev,_.XQ,_.Gk,c._Y,c.JJ,c.JL,c.F,c.oH]}),a})();var ut=l(2186),mt=l(8499),ft=l(2939),dt=l(5986),_t=l(2032),gt=l(3031);function vt(e,a){if(1&e&&(t.TgZ(0,"mat-option",33),t._uU(1),t.qZA()),2&e){const o=a.$implicit,i=t.oxw();t.Q6J("value",o),t.xp6(1),t.Oqu(i.notificationEntityToSpanish(o))}}function ht(e,a){if(1&e&&(t.TgZ(0,"mat-option",33),t._uU(1),t.qZA()),2&e){const o=a.$implicit,i=t.oxw();t.Q6J("value",o),t.xp6(1),t.Oqu(i.notificationTypeToSpanish(o))}}function Zt(e,a){if(1&e&&(t.TgZ(0,"mat-option",33),t._uU(1),t.qZA()),2&e){const o=a.$implicit,i=t.oxw();t.Q6J("value",o),t.xp6(1),t.Oqu(i.notificationOperationToSpanish(o))}}function Tt(e,a){1&e&&(t.TgZ(0,"div",6)(1,"p"),t._uU(2,"Cron time*"),t.qZA(),t.TgZ(3,"mat-form-field",7),t._UZ(4,"input",34),t.TgZ(5,"mat-hint")(6,"a",35),t._uU(7,"M\xe1s informaci\xf3n"),t.qZA()(),t.TgZ(8,"mat-error"),t._uU(9,"Cron time inv\xe1lido"),t.qZA()()())}function xt(e,a){if(1&e&&(t.TgZ(0,"mat-option",33),t._uU(1),t.ALo(2,"fullName"),t.qZA()),2&e){const o=a.$implicit;t.Q6J("value",o.id),t.xp6(1),t.Oqu(t.lcZ(2,2,o))}}function Nt(e,a){if(1&e&&(t.TgZ(0,"mat-option",33),t._uU(1),t.qZA()),2&e){const o=a.$implicit;t.Q6J("value",o.id),t.xp6(1),t.Oqu(o.name)}}function Ct(e,a){if(1&e&&(t.TgZ(0,"mat-option",33),t._uU(1),t.qZA()),2&e){const o=a.$implicit;t.Q6J("value",o.id),t.xp6(1),t.Oqu(o.name)}}function At(e,a){if(1&e&&(t.TgZ(0,"mat-checkbox",36),t._uU(1),t.qZA()),2&e){const o=t.oxw();t.xp6(1),t.hij("Al grupo ",o.recipientGroup.name,"")}}function yt(e,a){if(1&e&&(t.TgZ(0,"mat-checkbox",37),t._uU(1),t.qZA()),2&e){const o=t.oxw();t.xp6(1),t.hij("Al manager del grupo ",o.recipientGroup.name,"")}}function It(e,a){if(1&e&&(t.TgZ(0,"mat-checkbox",38),t._uU(1),t.qZA()),2&e){const o=t.oxw();t.xp6(1),t.hij("A los agentes del grupo ",o.recipientGroup.name,"")}}function Ut(e,a){if(1&e&&(t.TgZ(0,"mat-checkbox",39),t._uU(1),t.qZA()),2&e){const o=t.oxw();t.xp6(1),t.hij("Al usuario de ",o.recipientUser.name,"")}}function Ft(e,a){if(1&e){const o=t.EpF();t.TgZ(0,"mat-checkbox",50),t.NdJ("change",function(){t.CHM(o);const n=t.oxw(2).$implicit,r=t.oxw(2);return t.KtG(r.updateSpecificValueChanged(n))}),t.qZA()}if(2&e){const o=t.oxw(2).$implicit;t.Q6J("formControl",o.specificValue)}}function bt(e,a){if(1&e&&(t.TgZ(0,"td",47)(1,"div",48),t.YNc(2,Ft,1,1,"mat-checkbox",49),t.qZA()()),2&e){const o=t.oxw().$implicit;t.xp6(2),t.Q6J("ngIf",!o.relation)}}function qt(e,a){if(1&e&&(t.TgZ(0,"mat-form-field",7),t._UZ(1,"input",53),t.qZA()),2&e){const o=t.oxw(2).$implicit;t.xp6(1),t.Q6J("formControl",o.value)}}function wt(e,a){if(1&e&&(t.TgZ(0,"mat-option",33),t._uU(1),t.qZA()),2&e){const o=a.$implicit;t.Q6J("value",o),t.xp6(1),t.Oqu(o)}}function Jt(e,a){if(1&e&&(t.TgZ(0,"mat-form-field",7)(1,"mat-select",54),t.YNc(2,wt,2,2,"mat-option",10),t.qZA(),t.TgZ(3,"mat-error"),t._uU(4,"Valor inv\xe1lido"),t.qZA()()),2&e){const o=t.oxw(2).$implicit;t.xp6(1),t.Q6J("formControl",o.value),t.xp6(1),t.Q6J("ngForOf",o.choices)}}function Qt(e,a){if(1&e&&(t.TgZ(0,"td",51),t.YNc(1,qt,2,1,"mat-form-field",52),t.YNc(2,Jt,5,2,"mat-form-field",52),t.qZA()),2&e){const o=t.oxw().$implicit;t.xp6(1),t.Q6J("ngIf",0==o.choices.length),t.xp6(1),t.Q6J("ngIf",o.choices.length>0)}}function Yt(e,a){if(1&e){const o=t.EpF();t.TgZ(0,"tr")(1,"th",43)(2,"mat-checkbox",44),t.NdJ("change",function(){const r=t.CHM(o).$implicit,s=t.oxw(2);return t.KtG(s.updateSelectFieldChanged(r))}),t._uU(3),t.qZA()(),t.YNc(4,bt,3,1,"td",45),t.YNc(5,Qt,3,2,"td",46),t.qZA()}if(2&e){const o=a.$implicit;t.xp6(2),t.Q6J("formControl",o.select),t.xp6(1),t.Oqu(o.name),t.xp6(1),t.Q6J("ngIf",!o.unique),t.xp6(1),t.Q6J("ngIf",!o.unique)}}function St(e,a){if(1&e&&(t.TgZ(0,"div",4)(1,"h2",19),t._uU(2,"Notificar cuando:"),t.qZA(),t.TgZ(3,"div",40)(4,"table")(5,"tr"),t._UZ(6,"td"),t.TgZ(7,"td",41),t._uU(8,"Valor espec\xedfico"),t.qZA(),t._UZ(9,"td"),t.qZA(),t.YNc(10,Yt,6,4,"tr",42),t.qZA()()()),2&e){const o=t.oxw();t.xp6(10),t.Q6J("ngForOf",o.updateFields)}}function Ot(e,a){if(1&e&&(t.TgZ(0,"mat-form-field",7),t._UZ(1,"input",53),t.qZA()),2&e){const o=t.oxw().$implicit;t.xp6(1),t.Q6J("formControl",o.value)}}function Gt(e,a){if(1&e&&(t.TgZ(0,"mat-option",33),t._uU(1),t.qZA()),2&e){const o=a.$implicit;t.Q6J("value",o),t.xp6(1),t.Oqu(o)}}function Et(e,a){if(1&e&&(t.TgZ(0,"mat-form-field",7)(1,"mat-select",54),t.YNc(2,Gt,2,2,"mat-option",10),t.qZA(),t.TgZ(3,"mat-error"),t._uU(4,"Valor inv\xe1lido"),t.qZA()()),2&e){const o=t.oxw().$implicit;t.xp6(1),t.Q6J("formControl",o.value),t.xp6(1),t.Q6J("ngForOf",o.choices)}}function kt(e,a){if(1&e){const o=t.EpF();t.TgZ(0,"tr")(1,"th",43)(2,"mat-checkbox",44),t.NdJ("change",function(){const r=t.CHM(o).$implicit,s=t.oxw(2);return t.KtG(s.stopSelectFieldChanged(r))}),t._uU(3),t.qZA()(),t.TgZ(4,"td",51),t.YNc(5,Ot,2,1,"mat-form-field",52),t.YNc(6,Et,5,2,"mat-form-field",52),t.qZA()()}if(2&e){const o=a.$implicit;t.xp6(2),t.Q6J("formControl",o.select),t.xp6(1),t.Oqu(o.name),t.xp6(2),t.Q6J("ngIf",0==o.choices.length),t.xp6(1),t.Q6J("ngIf",o.choices.length>0)}}function Dt(e,a){if(1&e&&(t.TgZ(0,"div",4)(1,"h2",19),t._uU(2,"Dejar de repetir cuando no sea:"),t.qZA(),t.TgZ(3,"div",40)(4,"table")(5,"tr"),t._UZ(6,"td")(7,"td"),t.qZA(),t.YNc(8,kt,7,4,"tr",42),t.qZA()()()),2&e){const o=t.oxw();t.xp6(8),t.Q6J("ngForOf",o.stopFields)}}function $t(e,a){1&e&&(t.TgZ(0,"button",55),t._uU(1," Agregar "),t.qZA())}function Rt(e,a){1&e&&(t.TgZ(0,"button",55),t._uU(1," Guardar "),t.qZA())}let w=(()=>{var e;class a{constructor(i,n,r,s,u,f,p){this.notificationsService=i,this.usersService=n,this.groupsService=r,this.incidentsService=s,this.snackbar=u,this.route=f,this.router=p,this.entities=["incident"],this.users=[],this.groups=[],this.updateFields=[],this.stopFields=[],this.notificationEntityToSpanish=U,this.notificationTypesArray=Q,this.notificationTypeToSpanish=y,this.notificationOperationsArray=Y,this.notificationOperationToSpanish=I,this.notificationForm=new c.cw({name:new c.NI("",[c.kI.required,c.kI.maxLength(64)]),entity:new c.NI("",[c.kI.required,c.kI.maxLength(64)]),types:new c.NI([],[c.kI.required]),operations:new c.NI({value:[],disabled:!0},[c.kI.required]),subject:new c.NI("",[c.kI.maxLength(128)]),body:new c.NI("",[c.kI.required]),active:new c.NI(!0),recipientsId:new c.NI([]),groupsId:new c.NI([]),managerGroupsId:new c.NI([]),selectRecipientGroup:new c.NI(!1),selectRecipientManagerGroup:new c.NI(!1),selectRecipientAgentsGroup:new c.NI(!1),selectRecipientUser:new c.NI(!1),repeat:new c.NI(!1),cronTime:new c.NI("",[c.kI.pattern(/^(\*|([0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9])|\*\/([0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9])) (\*|([0-9]|1[0-9]|2[0-3])|\*\/([0-9]|1[0-9]|2[0-3])) (\*|([1-9]|1[0-9]|2[0-9]|3[0-1])|\*\/([1-9]|1[0-9]|2[0-9]|3[0-1])) (\*|([1-9]|1[0-2])|\*\/([1-9]|1[0-2])) (\*|([0-6])|\*\/([0-6]))$/)])})}ngOnInit(){var i=this;return(0,m.Z)(function*(){i.users=yield i.usersService.findAll(),i.groups=yield i.groupsService.findAll(),i.route.params.subscribe(function(){var n=(0,m.Z)(function*(r){const s=r.id;if(s)try{i.notification=yield i.notificationsService.findOne(s),yield i.setNotification(i.notification)}catch{i.router.navigate(["/","error","404"])}else i.notification=void 0});return function(r){return n.apply(this,arguments)}}())})()}setNotification(i){var n=this;return(0,m.Z)(function*(){n.notificationForm.setValue({name:i.name,entity:i.entity,types:i.types,operations:i.operations,subject:i.subject??"",body:i.body,active:i.active,cronTime:i.cronTime??"",recipientsId:i.recipients.map(r=>r.id),groupsId:i.groups.map(r=>r.id),selectRecipientGroup:!!i.recipientGroup,selectRecipientManagerGroup:!!i.recipientManagerGroup,selectRecipientAgentsGroup:!!i.recipientAgentsGroup,selectRecipientUser:!!i.recipientUser,managerGroupsId:i.managerGroups.map(r=>r.id),repeat:!!i.cronTime}),yield n.getFields(),i.operations.find(r=>r==g.UPDATE)&&i.updateFields.map(r=>{const s=n.updateFields.find(u=>u.name==r.name);s&&(s.select.setValue(!0),n.updateSelectFieldChanged(s),r.value&&(s.specificValue.setValue(!0),s.value.setValue(r.value),n.updateSpecificValueChanged(s)))}),i.cronTime&&i.stopFields.map(r=>{const s=n.stopFields.find(u=>u.name==r.name);s&&(s.select.setValue(!0),s.value.setValue(r.value),n.stopSelectFieldChanged(s))})})()}showUpdate(){return!!this.notificationForm.controls.operations.value.find(i=>i==g.UPDATE)}getSpecialRecipients(){this.recipientGroup=this.updateFields.find(i=>"group"==i.relation),this.recipientUser=this.updateFields.find(i=>"user"==i.relation)}getFields(){var i=this;return(0,m.Z)(function*(){i.notificationForm.controls.entity.valid?i.notificationForm.controls.operations.enable():(i.notificationForm.controls.operations.disable(),i.notificationForm.controls.operations.reset());let n={};"incident"===i.notificationForm.controls.entity.value&&(n=yield i.incidentsService.getNotificationFields()),i.updateFields=yield Promise.all(Object.keys(n).map(function(){var r=(0,m.Z)(function*(s){let f,u=[],p=!1;const d=n[s];if(!0===n[s])p=!0;else if(1==d.length){switch(d[0]){case"group":u=(yield i.groupsService.findAll()).map(x=>x.name);break;case"user":u=(yield i.usersService.findAll()).map(x=>`${x.firstName} ${x.lastName}`)}f=d[0]}else u=d;return{name:s,choices:u,relation:f,unique:p,select:new c.NI(!1),specificValue:new c.NI({value:!1,disabled:!0}),value:new c.NI({value:"",disabled:!0},[c.kI.maxLength(64),c.kI.required])}});return function(s){return r.apply(this,arguments)}}())),i.stopFields=[];for(const r of Object.keys(n)){let u,s=[],f=!1;const p=n[r];if(!0!==n[r]){if(1==p.length){switch(p[0]){case"group":s=(yield i.groupsService.findAll()).map(d=>d.name);break;case"user":s=(yield i.usersService.findAll()).map(d=>`${d.firstName} ${d.lastName}`)}u=p[0]}else s=p;i.stopFields.push({name:r,choices:s,relation:u,unique:f,select:new c.NI(!1),value:new c.NI({value:"",disabled:!0},[c.kI.maxLength(64),c.kI.required])})}}i.getSpecialRecipients()})()}updateSelectFieldChanged(i){i.select.value?i.relation?i.value.enable():i.specificValue.enable():(i.specificValue.setValue(!1),i.specificValue.disable(),this.updateSpecificValueChanged(i))}updateSpecificValueChanged(i){i.specificValue.value?i.value.enable():(i.value.reset(),i.value.disable())}stopSelectFieldChanged(i){i.select.value?i.value.enable():(i.value.reset(),i.value.disable())}send(i){var n=this;return(0,m.Z)(function*(){if(n.notificationForm.valid){const r=n.notificationForm.value;let s=!0;const u=[];r.operations.find(p=>p==g.UPDATE)&&n.updateFields.map(p=>{if(p.select.value){const d={name:p.name,relation:p.relation};if(p.specificValue.value||p.relation){if(p.value.markAsDirty(),!p.value.valid)return void(s=!1);d.value=p.value.value}u.push(d)}});const f=[];if(r.repeat&&""!=r.cronTime&&n.stopFields.map(p=>{p.select.value&&(p.value.markAsDirty(),p.value.valid?f.push({name:p.name,value:p.value.value,relation:p.relation}):s=!1)}),s){const p={name:r.name,types:r.types,entity:r.entity,operations:r.operations,subject:""==r.subject?void 0:r.subject,body:r.body,active:r.active,recipientsId:r.recipientsId,groupsId:r.groupsId,managerGroupsId:r.managerGroupsId,recipientGroup:r.selectRecipientGroup&&n.recipientGroup?n.recipientGroup.name:void 0,recipientManagerGroup:r.selectRecipientManagerGroup&&n.recipientGroup?n.recipientGroup.name:void 0,recipientAgentsGroup:r.selectRecipientAgentsGroup&&n.recipientGroup?n.recipientGroup.name:void 0,recipientUser:r.selectRecipientUser&&n.recipientUser?n.recipientUser.name:void 0,updateFields:u,stopFields:f,cronTime:f.length>0?r.cronTime:void 0};if("create"==i)return yield n.notificationsService.create(p);if("update"==i)return yield n.notificationsService.update(n.notification.id,p)}else n.snackbar.open("Valores inv\xe1lidos",void 0,{verticalPosition:"bottom",horizontalPosition:"right",duration:2e3})}})()}create(){var i=this;return(0,m.Z)(function*(){const n=yield i.send("create");n&&(i.snackbar.open("Notificaci\xf3n creada",void 0,{verticalPosition:"bottom",horizontalPosition:"right",duration:2e3}),i.router.navigate(["/","notifications",n.id]))})()}update(){var i=this;return(0,m.Z)(function*(){const n=yield i.send("update");n&&(i.snackbar.open("Notificaci\xf3n editada",void 0,{verticalPosition:"bottom",horizontalPosition:"right",duration:2e3}),i.router.navigate(["/","notifications",n.id]))})()}}return(e=a).\u0275fac=function(i){return new(i||e)(t.Y36(N.T),t.Y36(ut.f),t.Y36(F.J),t.Y36(mt.U),t.Y36(ft.ux),t.Y36(v.gz),t.Y36(v.F0))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-notification"]],decls:100,vars:19,consts:[[1,"flex","flex-row","mb-5","px-2","items-center"],[1,"text-3xl","font-bold"],[1,"flex-auto"],[3,"formGroup","submit"],[1,"bg-white","p-3","rounded-md","shadow-md","mb-4"],[1,"flex","flex-row","flex-wrap"],[1,"px-2","flex-auto"],["appearance","outline",1,"w-full"],["matInput","","formControlName","name"],["formControlName","entity",3,"selectionChange"],[3,"value",4,"ngFor","ngForOf"],["multiple","","formControlName","types"],["multiple","","formControlName","operations",3,"selectionChange"],[1,"w-full","px-2"],["matInput","","formControlName","subject"],["matInput","","formControlName","body"],[1,"px-2","flex-auto","flex","flex-col"],["color","primary",3,"formControl"],["class","px-2 flex-auto",4,"ngIf"],[1,"text-xl","font-bold","mb-3"],["multiple","","formControlName","recipientsId"],["multiple","","formControlName","groupsId"],[1,"px-2","basis-1/2","flex-auto"],["multiple","","formControlName","managerGroupsId"],[1,"px-2","basis-1/2","flex-auto",2,"min-width","212px"],[1,"flex","flex-col","items-start","justify-center","h-full"],["formControlName","selectRecipientGroup","color","primary",4,"ngIf"],["formControlName","selectRecipientManagerGroup","color","primary",4,"ngIf"],["formControlName","selectRecipientAgentsGroup","color","primary",4,"ngIf"],["formControlName","selectRecipientUser","color","primary",4,"ngIf"],["class","bg-white p-3 rounded-md shadow-md mb-4",4,"ngIf"],[1,"mb-4","flex","flex-row-reverse"],["type","submit","mat-raised-button","","color","primary",4,"ngIf"],[3,"value"],["matInput","","formControlName","cronTime"],["href","https://en.wikipedia.org/wiki/Cron","target","_blank",1,"text-blue-500","hover:underline"],["formControlName","selectRecipientGroup","color","primary"],["formControlName","selectRecipientManagerGroup","color","primary"],["formControlName","selectRecipientAgentsGroup","color","primary"],["formControlName","selectRecipientUser","color","primary"],[1,"overflow-y-auto"],[1,"whitespace-nowrap","px-2"],[4,"ngFor","ngForOf"],[1,"text-left","px-3","pt-3","pb-8"],["color","primary",3,"formControl","change"],["class","px-3 pt-3 pb-8",4,"ngIf"],["class","w-full",4,"ngIf"],[1,"px-3","pt-3","pb-8"],[1,"w-full","flex","flex-col","items-center"],[3,"formControl","change",4,"ngIf"],[3,"formControl","change"],[1,"w-full"],["appearance","outline","class","w-full",4,"ngIf"],["matInput","",3,"formControl"],[3,"formControl"],["type","submit","mat-raised-button","","color","primary"]],template:function(i,n){1&i&&(t.TgZ(0,"div",0)(1,"h1",1),t._uU(2),t.qZA(),t._UZ(3,"div",2),t.qZA(),t.TgZ(4,"form",3),t.NdJ("submit",function(){return n.notification?n.update():n.create()}),t.TgZ(5,"div",4)(6,"div",5)(7,"div",6)(8,"p"),t._uU(9,"Nombre*"),t.qZA(),t.TgZ(10,"mat-form-field",7),t._UZ(11,"input",8),t.TgZ(12,"mat-error"),t._uU(13,"Nombre inv\xe1lido"),t.qZA()()(),t.TgZ(14,"div",6)(15,"p"),t._uU(16,"Entidad*"),t.qZA(),t.TgZ(17,"mat-form-field",7)(18,"mat-select",9),t.NdJ("selectionChange",function(){return n.getFields()}),t.YNc(19,vt,2,2,"mat-option",10),t.qZA(),t.TgZ(20,"mat-error"),t._uU(21,"Entidad inv\xe1lida"),t.qZA()()()(),t.TgZ(22,"div",5)(23,"div",6)(24,"p"),t._uU(25,"Tipo*"),t.qZA(),t.TgZ(26,"mat-form-field",7)(27,"mat-select",11),t.YNc(28,ht,2,2,"mat-option",10),t.qZA(),t.TgZ(29,"mat-error"),t._uU(30,"Tipo inv\xe1lido"),t.qZA()()(),t.TgZ(31,"div",6)(32,"p"),t._uU(33,"Operaci\xf3n*"),t.qZA(),t.TgZ(34,"mat-form-field",7)(35,"mat-select",12),t.NdJ("selectionChange",function(){return n.getFields()}),t.YNc(36,Zt,2,2,"mat-option",10),t.qZA(),t.TgZ(37,"mat-error"),t._uU(38,"Operaci\xf3n inv\xe1lida"),t.qZA()()()(),t.TgZ(39,"div",13)(40,"p"),t._uU(41,"Asunto"),t.qZA(),t.TgZ(42,"mat-form-field",7),t._UZ(43,"input",14),t.TgZ(44,"mat-error"),t._uU(45,"Asunto inv\xe1lido"),t.qZA()()(),t.TgZ(46,"div",13)(47,"p"),t._uU(48,"Cuerpo*"),t.qZA(),t.TgZ(49,"mat-form-field",7),t._UZ(50,"textarea",15),t.TgZ(51,"mat-error"),t._uU(52,"Cuerpo inv\xe1lido"),t.qZA()()(),t.TgZ(53,"div",5)(54,"div",16)(55,"mat-checkbox",17),t._uU(56,"Repetir"),t.qZA(),t.TgZ(57,"mat-checkbox",17),t._uU(58,"Activo"),t.qZA()(),t.YNc(59,Tt,10,0,"div",18),t.qZA()(),t.TgZ(60,"div",4)(61,"h2",19),t._uU(62,"Destinatarios"),t.qZA(),t.TgZ(63,"div",5)(64,"div",6)(65,"p"),t._uU(66,"Usuarios"),t.qZA(),t.TgZ(67,"mat-form-field",7)(68,"mat-select",20),t.YNc(69,xt,3,4,"mat-option",10),t.qZA(),t.TgZ(70,"mat-error"),t._uU(71,"User inv\xe1lido"),t.qZA()()(),t.TgZ(72,"div",6)(73,"p"),t._uU(74,"Grupos"),t.qZA(),t.TgZ(75,"mat-form-field",7)(76,"mat-select",21),t.YNc(77,Nt,2,2,"mat-option",10),t.qZA(),t.TgZ(78,"mat-error"),t._uU(79,"Operaci\xf3n inv\xe1lida"),t.qZA()()()(),t.TgZ(80,"div",5)(81,"div",22)(82,"p"),t._uU(83,"Managers de grupos"),t.qZA(),t.TgZ(84,"mat-form-field",7)(85,"mat-select",23),t.YNc(86,Ct,2,2,"mat-option",10),t.qZA(),t.TgZ(87,"mat-error"),t._uU(88,"Grupo inv\xe1lido"),t.qZA()()(),t.TgZ(89,"div",24)(90,"div",25),t.YNc(91,At,2,1,"mat-checkbox",26),t.YNc(92,yt,2,1,"mat-checkbox",27),t.YNc(93,It,2,1,"mat-checkbox",28),t.YNc(94,Ut,2,1,"mat-checkbox",29),t.qZA()()()(),t.YNc(95,St,11,1,"div",30),t.YNc(96,Dt,9,1,"div",30),t.TgZ(97,"div",31),t.YNc(98,$t,2,0,"button",32),t.YNc(99,Rt,2,0,"button",32),t.qZA()()),2&i&&(t.xp6(2),t.hij(" ",n.notification?"Notificaci\xf3n":"Agregar notificaci\xf3n"," "),t.xp6(2),t.Q6J("formGroup",n.notificationForm),t.xp6(15),t.Q6J("ngForOf",n.entities),t.xp6(9),t.Q6J("ngForOf",n.notificationTypesArray),t.xp6(8),t.Q6J("ngForOf",n.notificationOperationsArray),t.xp6(19),t.Q6J("formControl",n.notificationForm.controls.repeat),t.xp6(2),t.Q6J("formControl",n.notificationForm.controls.active),t.xp6(2),t.Q6J("ngIf",n.notificationForm.controls.repeat.value),t.xp6(10),t.Q6J("ngForOf",n.users),t.xp6(8),t.Q6J("ngForOf",n.groups),t.xp6(9),t.Q6J("ngForOf",n.groups),t.xp6(5),t.Q6J("ngIf",n.recipientGroup),t.xp6(1),t.Q6J("ngIf",n.recipientGroup),t.xp6(1),t.Q6J("ngIf",n.recipientGroup),t.xp6(1),t.Q6J("ngIf",n.recipientUser),t.xp6(1),t.Q6J("ngIf",n.showUpdate()),t.xp6(1),t.Q6J("ngIf",n.notificationForm.controls.repeat.value&&n.notificationForm.controls.cronTime.valid&&n.notificationForm.controls.cronTime.value),t.xp6(2),t.Q6J("ngIf",!n.notification),t.xp6(1),t.Q6J("ngIf",n.notification))},dependencies:[h.sg,h.O5,b.ey,dt.oG,T.KE,T.bx,T.TO,_t.Nt,q.gD,C.lW,c._Y,c.Fj,c.JJ,c.JL,c.oH,c.sg,c.u,gt.k],styles:["textarea[_ngcontent-%COMP%]{height:80px!important}"]}),a})();const Vt=[{path:"",component:pt},{path:"create",component:w},{path:":id",component:w}];let jt=(()=>{var e;class a{}return(e=a).\u0275fac=function(i){return new(i||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[v.Bz.forChild(Vt),v.Bz]}),a})();var Mt=l(2524),Lt=l(8401),Pt=l(6510),Bt=l(7278);let Ht=(()=>{var e;class a{constructor(i){this.http=i}findAll(){var i=this;return(0,m.Z)(function*(){return yield i.http.get(Pt.S.NOTIFICATIONS.INBOX.BASE_ENDPOINT)})()}}return(e=a).\u0275fac=function(i){return new(i||e)(t.LFG(Bt.v))},e.\u0275prov=t.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"}),a})();var zt=l(6326);let Kt=(()=>{var e;class a{}return(e=a).\u0275fac=function(i){return new(i||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({providers:[N.T,Ht],imports:[jt,h.ez,J.q,c.u5,c.UX,Mt.D,Lt.IncidentsModule,zt.O]}),a})()}}]);