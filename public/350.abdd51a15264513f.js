"use strict";(self.webpackChunkandon_frontend=self.webpackChunkandon_frontend||[]).push([[350],{1350:(Pt,C,p)=>{p.r(C),p.d(C,{NotificationsModule:()=>Vt});var h=p(6814),x=p(3690),w=p(1186),v=p(1303),m=p(5861),Z=function(i){return i.EMAIL="email",i.PUSH="push",i}(Z||{});const J=Object.values(Z);function A(i){switch(i){case Z.EMAIL:return"Correo electr\xf3nico";case Z.PUSH:return"Notificaci\xf3n push"}return""}var _=function(i){return i.CREATE="create",i.UPDATE="update",i.DELETE="delete",i.EVENT="event",i}(_||{});const Q=Object.values(_);function y(i){switch(i){case _.CREATE:return"Crear";case _.UPDATE:return"Actualizar";case _.DELETE:return"Eliminar";case _.EVENT:return"Evento"}return""}function F(i){return"incident"===i?"Incidente":""}var c=p(6223),Y=p(8693),t=p(5879),I=p(4808),O=p(9347),q=p(3680),T=p(5683),U=p(8525),N=p(2296),E=p(2557),S=p(617),d=p(5313);function G(i,a){if(1&i&&(t.TgZ(0,"mat-option",24),t._uU(1),t.qZA()),2&i){const o=a.$implicit;t.Q6J("value",o.id),t.xp6(1),t.hij(" ",o.name," ")}}function k(i,a){1&i&&(t.TgZ(0,"th",25),t._uU(1,"Nombre"),t.qZA())}const D=function(i){return["/","notifications",i]};function $(i,a){if(1&i&&(t.TgZ(0,"td",26)(1,"a",27),t._uU(2),t.qZA()()),2&i){const o=a.$implicit;t.xp6(1),t.Q6J("routerLink",t.VKq(2,D,o.id)),t.xp6(1),t.Oqu(o.name)}}function M(i,a){1&i&&(t.TgZ(0,"th",25),t._uU(1,"Tipos"),t.qZA())}function R(i,a){if(1&i&&(t.TgZ(0,"span")(1,"mat-chip",29),t._uU(2),t.qZA()()),2&i){const o=a.$implicit,e=t.oxw(2);t.xp6(2),t.Oqu(e.notificationTypeToSpanish(o))}}function V(i,a){if(1&i&&(t.TgZ(0,"td",26),t.YNc(1,R,3,1,"span",28),t.qZA()),2&i){const o=a.$implicit;t.xp6(1),t.Q6J("ngForOf",o.types)}}function j(i,a){1&i&&(t.TgZ(0,"th",25),t._uU(1,"Entidad"),t.qZA())}function P(i,a){if(1&i&&(t.TgZ(0,"td",26),t._uU(1),t.qZA()),2&i){const o=a.$implicit,e=t.oxw();t.xp6(1),t.hij(" ",e.notificationEntityToSpanish(o.entity)," ")}}function L(i,a){1&i&&(t.TgZ(0,"th",25),t._uU(1,"Operaciones"),t.qZA())}function H(i,a){if(1&i&&(t.TgZ(0,"span")(1,"mat-chip",29),t._uU(2),t.qZA()()),2&i){const o=a.$implicit,e=t.oxw(2);t.xp6(2),t.Oqu(e.notificationOperationToSpanish(o))}}function B(i,a){if(1&i&&(t.TgZ(0,"td",26),t.YNc(1,H,3,1,"span",28),t.qZA()),2&i){const o=a.$implicit;t.xp6(1),t.Q6J("ngForOf",o.operations)}}function z(i,a){1&i&&(t.TgZ(0,"th",25),t._uU(1,"Grupos"),t.qZA())}function K(i,a){if(1&i&&(t.TgZ(0,"span")(1,"mat-chip",29),t._uU(2),t.qZA()()),2&i){const o=a.$implicit;t.xp6(2),t.Oqu(o.name)}}function X(i,a){if(1&i&&(t.TgZ(0,"td",26),t.YNc(1,K,3,1,"span",28),t.qZA()),2&i){const o=a.$implicit;t.xp6(1),t.Q6J("ngForOf",o.groups)}}function W(i,a){1&i&&t._UZ(0,"th",25)}function tt(i,a){1&i&&(t.TgZ(0,"mat-chip"),t._uU(1,"Programada"),t.qZA())}function it(i,a){if(1&i&&(t.TgZ(0,"td",26),t.YNc(1,tt,2,0,"mat-chip",30),t.qZA()),2&i){const o=a.$implicit;t.xp6(1),t.Q6J("ngIf",o.cronTime)}}function et(i,a){1&i&&(t.TgZ(0,"th",25),t._uU(1,"Eliminar"),t.qZA())}function ot(i,a){if(1&i){const o=t.EpF();t.TgZ(0,"td",26)(1,"button",31),t.NdJ("click",function(){const r=t.CHM(o).$implicit,s=t.oxw();return t.KtG(s.openDeleteDialog(r.id))}),t.TgZ(2,"mat-icon"),t._uU(3,"close"),t.qZA()()()}}function nt(i,a){1&i&&t._UZ(0,"tr",32)}function at(i,a){1&i&&t._UZ(0,"tr",33)}const rt=function(){return["/","notifications","create"]};let ct=(()=>{var i;class a{constructor(e,n,r,s,u){this.notificationsService=e,this.groupsService=n,this.dialog=r,this.route=s,this.router=u,this.notifications=[],this.groups=[],this.displayedColumns=["name","types","entity","operations","groups","cronTime","remove"],this.notificationEntityToSpanish=F,this.notificationTypeToSpanish=A,this.notificationOperationToSpanish=y,this.notificationFiltersForm=new c.cw({groupId:new c.NI("")})}ngOnInit(){var e=this;return(0,m.Z)(function*(){e.groups=yield e.groupsService.findAll(),e.route.queryParams.subscribe(function(){var n=(0,m.Z)(function*(r){const s=r.groupId;e.notifications=yield e.notificationsService.findAll(s)});return function(r){return n.apply(this,arguments)}}()),yield e.getNotifications()})()}getNotifications(){var e=this;return(0,m.Z)(function*(){const n=e.notificationFiltersForm.value;e.router.navigate(["/","notifications"],{queryParams:{groupId:""==n.groupId?void 0:n.groupId}})})()}openDeleteDialog(e){var n=this;this.dialog.open(Y.F,{data:{cascade:!1}}).afterClosed().subscribe(function(){var s=(0,m.Z)(function*(u){if(u){yield n.notificationsService.remove(e);const f=n.notificationFiltersForm.value;n.notifications=yield n.notificationsService.findAll(""==f.groupId?void 0:f.groupId)}});return function(u){return s.apply(this,arguments)}}())}}return(i=a).\u0275fac=function(e){return new(e||i)(t.Y36(x.T),t.Y36(I.J),t.Y36(O.uw),t.Y36(v.gz),t.Y36(v.F0))},i.\u0275cmp=t.Xpm({type:i,selectors:[["app-notifications"]],decls:42,vars:7,consts:[[1,"flex","flex-row","mb-5","px-2","items-center"],[1,"text-3xl","font-bold"],[1,"flex-auto"],["mat-raised-button","","color","primary",3,"routerLink"],[1,"bg-white","p-3","rounded-md","shadow-md","mb-4"],[1,"flex","flex-row","flex-wrap"],[1,"mx-2","w-full","max-w-xs"],["appearance","outline",1,"w-full"],[3,"formControl","selectionChange"],["value",""],[3,"value",4,"ngFor","ngForOf"],[1,"overflow-y-auto"],["mat-table","",3,"dataSource"],["matColumnDef","name"],["mat-header-cell","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","types"],["matColumnDef","entity"],["matColumnDef","operations"],["matColumnDef","groups"],["matColumnDef","cronTime"],["matColumnDef","remove"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],[3,"value"],["mat-header-cell",""],["mat-cell",""],[1,"text-blue-500","cursor-pointer","hover:underline",3,"routerLink"],[4,"ngFor","ngForOf"],[1,"me-2","my-1"],[4,"ngIf"],["mat-icon-button","","color","warn",3,"click"],["mat-header-row",""],["mat-row",""]],template:function(e,n){1&e&&(t.TgZ(0,"div",0)(1,"h1",1),t._uU(2,"Notificaciones"),t.qZA(),t._UZ(3,"div",2),t.TgZ(4,"button",3),t._uU(5," Agregar "),t.qZA()(),t.TgZ(6,"div",4)(7,"form",5)(8,"div",6)(9,"p"),t._uU(10,"Grupo"),t.qZA(),t.TgZ(11,"mat-form-field",7)(12,"mat-select",8),t.NdJ("selectionChange",function(){return n.getNotifications()}),t.TgZ(13,"mat-option",9),t._uU(14,"Todos"),t.qZA(),t.YNc(15,G,2,2,"mat-option",10),t.qZA()()()()(),t.TgZ(16,"div",4)(17,"div",11)(18,"table",12),t.ynx(19,13),t.YNc(20,k,2,0,"th",14),t.YNc(21,$,3,4,"td",15),t.BQk(),t.ynx(22,16),t.YNc(23,M,2,0,"th",14),t.YNc(24,V,2,1,"td",15),t.BQk(),t.ynx(25,17),t.YNc(26,j,2,0,"th",14),t.YNc(27,P,2,1,"td",15),t.BQk(),t.ynx(28,18),t.YNc(29,L,2,0,"th",14),t.YNc(30,B,2,1,"td",15),t.BQk(),t.ynx(31,19),t.YNc(32,z,2,0,"th",14),t.YNc(33,X,2,1,"td",15),t.BQk(),t.ynx(34,20),t.YNc(35,W,1,0,"th",14),t.YNc(36,it,2,1,"td",15),t.BQk(),t.ynx(37,21),t.YNc(38,et,2,0,"th",14),t.YNc(39,ot,4,0,"td",15),t.BQk(),t.YNc(40,nt,1,0,"tr",22),t.YNc(41,at,1,0,"tr",23),t.qZA()()()),2&e&&(t.xp6(4),t.Q6J("routerLink",t.DdM(6,rt)),t.xp6(8),t.Q6J("formControl",n.notificationFiltersForm.controls.groupId),t.xp6(3),t.Q6J("ngForOf",n.groups),t.xp6(3),t.Q6J("dataSource",n.notifications),t.xp6(22),t.Q6J("matHeaderRowDef",n.displayedColumns),t.xp6(1),t.Q6J("matRowDefColumns",n.displayedColumns))},dependencies:[v.rH,h.sg,h.O5,q.ey,T.KE,U.gD,N.lW,N.RK,E.HS,S.Hw,d.BZ,d.fO,d.as,d.w1,d.Dz,d.nj,d.ge,d.ev,d.XQ,d.Gk,c._Y,c.JJ,c.JL,c.F,c.oH]}),a})();var st=p(2186),lt=p(8499),pt=p(2939),ut=p(5986),ft=p(2032),mt=p(3031);function dt(i,a){if(1&i&&(t.TgZ(0,"mat-option",30),t._uU(1),t.qZA()),2&i){const o=a.$implicit,e=t.oxw();t.Q6J("value",o),t.xp6(1),t.Oqu(e.notificationEntityToSpanish(o))}}function _t(i,a){if(1&i&&(t.TgZ(0,"mat-option",30),t._uU(1),t.qZA()),2&i){const o=a.$implicit,e=t.oxw();t.Q6J("value",o),t.xp6(1),t.Oqu(e.notificationTypeToSpanish(o))}}function gt(i,a){if(1&i&&(t.TgZ(0,"mat-option",30),t._uU(1),t.qZA()),2&i){const o=a.$implicit,e=t.oxw();t.Q6J("value",o),t.xp6(1),t.Oqu(e.notificationOperationToSpanish(o))}}function vt(i,a){1&i&&(t.TgZ(0,"div",6)(1,"p"),t._uU(2,"Cron time*"),t.qZA(),t.TgZ(3,"mat-form-field",7),t._UZ(4,"input",31),t.TgZ(5,"mat-hint")(6,"a",32),t._uU(7,"M\xe1s informaci\xf3n"),t.qZA()(),t.TgZ(8,"mat-error"),t._uU(9,"Cron time inv\xe1lido"),t.qZA()()())}function ht(i,a){if(1&i&&(t.TgZ(0,"mat-option",30),t._uU(1),t.ALo(2,"fullName"),t.qZA()),2&i){const o=a.$implicit;t.Q6J("value",o.id),t.xp6(1),t.Oqu(t.lcZ(2,2,o))}}function Zt(i,a){if(1&i&&(t.TgZ(0,"mat-option",30),t._uU(1),t.qZA()),2&i){const o=a.$implicit;t.Q6J("value",o.id),t.xp6(1),t.Oqu(o.name)}}function Tt(i,a){if(1&i&&(t.TgZ(0,"mat-option",30),t._uU(1),t.qZA()),2&i){const o=a.$implicit;t.Q6J("value",o.id),t.xp6(1),t.Oqu(o.name)}}function xt(i,a){if(1&i&&(t.TgZ(0,"mat-checkbox",33),t._uU(1),t.qZA()),2&i){const o=t.oxw();t.xp6(1),t.hij("Al grupo ",o.recipientGroup.name,"")}}function Nt(i,a){if(1&i&&(t.TgZ(0,"mat-checkbox",34),t._uU(1),t.qZA()),2&i){const o=t.oxw();t.xp6(1),t.hij("Al manager del grupo ",o.recipientGroup.name,"")}}function Ct(i,a){if(1&i){const o=t.EpF();t.TgZ(0,"mat-checkbox",45),t.NdJ("change",function(){t.CHM(o);const n=t.oxw(2).$implicit,r=t.oxw(2);return t.KtG(r.updateSpecificValueChanged(n))}),t.qZA()}if(2&i){const o=t.oxw(2).$implicit;t.Q6J("formControl",o.specificValue)}}function At(i,a){if(1&i&&(t.TgZ(0,"td",42)(1,"div",43),t.YNc(2,Ct,1,1,"mat-checkbox",44),t.qZA()()),2&i){const o=t.oxw().$implicit;t.xp6(2),t.Q6J("ngIf",!o.relation)}}function yt(i,a){if(1&i&&(t.TgZ(0,"mat-form-field",7),t._UZ(1,"input",48),t.qZA()),2&i){const o=t.oxw(2).$implicit;t.xp6(1),t.Q6J("formControl",o.value)}}function Ft(i,a){if(1&i&&(t.TgZ(0,"mat-option",30),t._uU(1),t.qZA()),2&i){const o=a.$implicit;t.Q6J("value",o),t.xp6(1),t.Oqu(o)}}function It(i,a){if(1&i&&(t.TgZ(0,"mat-form-field",7)(1,"mat-select",49),t.YNc(2,Ft,2,2,"mat-option",10),t.qZA(),t.TgZ(3,"mat-error"),t._uU(4,"Valor inv\xe1lido"),t.qZA()()),2&i){const o=t.oxw(2).$implicit;t.xp6(1),t.Q6J("formControl",o.value),t.xp6(1),t.Q6J("ngForOf",o.choices)}}function qt(i,a){if(1&i&&(t.TgZ(0,"td",46),t.YNc(1,yt,2,1,"mat-form-field",47),t.YNc(2,It,5,2,"mat-form-field",47),t.qZA()),2&i){const o=t.oxw().$implicit;t.xp6(1),t.Q6J("ngIf",0==o.choices.length),t.xp6(1),t.Q6J("ngIf",o.choices.length>0)}}function Ut(i,a){if(1&i){const o=t.EpF();t.TgZ(0,"tr")(1,"th",38)(2,"mat-checkbox",39),t.NdJ("change",function(){const r=t.CHM(o).$implicit,s=t.oxw(2);return t.KtG(s.updateSelectFieldChanged(r))}),t._uU(3),t.qZA()(),t.YNc(4,At,3,1,"td",40),t.YNc(5,qt,3,2,"td",41),t.qZA()}if(2&i){const o=a.$implicit;t.xp6(2),t.Q6J("formControl",o.select),t.xp6(1),t.Oqu(o.name),t.xp6(1),t.Q6J("ngIf",!o.unique),t.xp6(1),t.Q6J("ngIf",!o.unique)}}function bt(i,a){if(1&i&&(t.TgZ(0,"div",4)(1,"h2",18),t._uU(2,"Notificar cuando:"),t.qZA(),t.TgZ(3,"div",35)(4,"table")(5,"tr"),t._UZ(6,"td"),t.TgZ(7,"td",36),t._uU(8,"Valor espec\xedfico"),t.qZA(),t._UZ(9,"td"),t.qZA(),t.YNc(10,Ut,6,4,"tr",37),t.qZA()()()),2&i){const o=t.oxw();t.xp6(10),t.Q6J("ngForOf",o.updateFields)}}function wt(i,a){if(1&i&&(t.TgZ(0,"mat-form-field",7),t._UZ(1,"input",48),t.qZA()),2&i){const o=t.oxw().$implicit;t.xp6(1),t.Q6J("formControl",o.value)}}function Jt(i,a){if(1&i&&(t.TgZ(0,"mat-option",30),t._uU(1),t.qZA()),2&i){const o=a.$implicit;t.Q6J("value",o),t.xp6(1),t.Oqu(o)}}function Qt(i,a){if(1&i&&(t.TgZ(0,"mat-form-field",7)(1,"mat-select",49),t.YNc(2,Jt,2,2,"mat-option",10),t.qZA(),t.TgZ(3,"mat-error"),t._uU(4,"Valor inv\xe1lido"),t.qZA()()),2&i){const o=t.oxw().$implicit;t.xp6(1),t.Q6J("formControl",o.value),t.xp6(1),t.Q6J("ngForOf",o.choices)}}function Yt(i,a){if(1&i){const o=t.EpF();t.TgZ(0,"tr")(1,"th",38)(2,"mat-checkbox",39),t.NdJ("change",function(){const r=t.CHM(o).$implicit,s=t.oxw(2);return t.KtG(s.stopSelectFieldChanged(r))}),t._uU(3),t.qZA()(),t.TgZ(4,"td",46),t.YNc(5,wt,2,1,"mat-form-field",47),t.YNc(6,Qt,5,2,"mat-form-field",47),t.qZA()()}if(2&i){const o=a.$implicit;t.xp6(2),t.Q6J("formControl",o.select),t.xp6(1),t.Oqu(o.name),t.xp6(2),t.Q6J("ngIf",0==o.choices.length),t.xp6(1),t.Q6J("ngIf",o.choices.length>0)}}function Ot(i,a){if(1&i&&(t.TgZ(0,"div",4)(1,"h2",18),t._uU(2,"Dejar de repetir cuando no sea:"),t.qZA(),t.TgZ(3,"div",35)(4,"table")(5,"tr"),t._UZ(6,"td")(7,"td"),t.qZA(),t.YNc(8,Yt,7,4,"tr",37),t.qZA()()()),2&i){const o=t.oxw();t.xp6(8),t.Q6J("ngForOf",o.stopFields)}}function Et(i,a){1&i&&(t.TgZ(0,"button",50),t._uU(1," Agregar "),t.qZA())}function St(i,a){1&i&&(t.TgZ(0,"button",50),t._uU(1," Guardar "),t.qZA())}let b=(()=>{var i;class a{constructor(e,n,r,s,u,f,l){this.notificationsService=e,this.usersService=n,this.groupsService=r,this.incidentsService=s,this.snackbar=u,this.route=f,this.router=l,this.entities=["incident"],this.users=[],this.groups=[],this.updateFields=[],this.stopFields=[],this.notificationEntityToSpanish=F,this.notificationTypesArray=J,this.notificationTypeToSpanish=A,this.notificationOperationsArray=Q,this.notificationOperationToSpanish=y,this.notificationForm=new c.cw({name:new c.NI("",[c.kI.required,c.kI.maxLength(64)]),entity:new c.NI("",[c.kI.required,c.kI.maxLength(64)]),types:new c.NI([],[c.kI.required]),operations:new c.NI({value:[],disabled:!0},[c.kI.required]),subject:new c.NI("",[c.kI.maxLength(128)]),body:new c.NI("",[c.kI.required]),recipientsId:new c.NI([]),groupsId:new c.NI([]),managerGroupsId:new c.NI([]),selectRecipientGroup:new c.NI(!1),selectRecipientManagerGroup:new c.NI(!1),repeat:new c.NI(!1),cronTime:new c.NI("",[c.kI.pattern(/^((((\d+,)+\d+|(\d+(\/|-)\d+)|\d+|\*) ?){5,7})$/)])})}ngOnInit(){var e=this;return(0,m.Z)(function*(){e.users=yield e.usersService.findAll(),e.groups=yield e.groupsService.findAll(),e.route.params.subscribe(function(){var n=(0,m.Z)(function*(r){const s=r.id;if(s)try{e.notification=yield e.notificationsService.findOne(s),yield e.setNotification(e.notification)}catch{e.router.navigate(["/","error","404"])}else e.notification=void 0});return function(r){return n.apply(this,arguments)}}())})()}setNotification(e){var n=this;return(0,m.Z)(function*(){n.notificationForm.setValue({name:e.name,entity:e.entity,types:e.types,operations:e.operations,subject:e.subject??"",body:e.body,cronTime:e.cronTime??"",recipientsId:e.recipients.map(r=>r.id),groupsId:e.groups.map(r=>r.id),selectRecipientGroup:!!e.recipientGroup,selectRecipientManagerGroup:!!e.recipientManagerGroup,managerGroupsId:e.managerGroups.map(r=>r.id),repeat:!!e.cronTime}),yield n.getFields(),e.operations.find(r=>r==_.UPDATE)&&e.updateFields.map(r=>{const s=n.updateFields.find(u=>u.name==r.name);s&&(s.select.setValue(!0),n.updateSelectFieldChanged(s),r.value&&(s.specificValue.setValue(!0),s.value.setValue(r.value),n.updateSpecificValueChanged(s)))}),e.cronTime&&e.stopFields.map(r=>{const s=n.stopFields.find(u=>u.name==r.name);s&&(s.select.setValue(!0),s.value.setValue(r.value),n.stopSelectFieldChanged(s))})})()}showUpdate(){return!!this.notificationForm.controls.operations.value.find(e=>e==_.UPDATE)}getRecipientGroup(){this.recipientGroup=this.updateFields.find(e=>"group"==e.relation)}getFields(){var e=this;return(0,m.Z)(function*(){e.notificationForm.controls.entity.valid?e.notificationForm.controls.operations.enable():(e.notificationForm.controls.operations.disable(),e.notificationForm.controls.operations.reset());let n={};"incident"===e.notificationForm.controls.entity.value&&(n=yield e.incidentsService.getNotificationFields()),e.updateFields=yield Promise.all(Object.keys(n).map(function(){var r=(0,m.Z)(function*(s){let f,u=[],l=!1;const g=n[s];return!0===n[s]?l=!0:1==g.length?("group"===g[0]&&(u=(yield e.groupsService.findAll()).map(jt=>jt.name)),f=g[0]):u=g,{name:s,choices:u,relation:f,unique:l,select:new c.NI(!1),specificValue:new c.NI({value:!1,disabled:!0}),value:new c.NI({value:"",disabled:!0},[c.kI.maxLength(64),c.kI.required])}});return function(s){return r.apply(this,arguments)}}())),e.stopFields=[];for(const r of Object.keys(n)){let u,s=[],f=!1;const l=n[r];!0!==n[r]&&(1==l.length?("group"===l[0]&&(s=(yield e.groupsService.findAll()).map(g=>g.name)),u=l[0]):s=l,e.stopFields.push({name:r,choices:s,relation:u,unique:f,select:new c.NI(!1),value:new c.NI({value:"",disabled:!0},[c.kI.maxLength(64),c.kI.required])}))}e.getRecipientGroup()})()}updateSelectFieldChanged(e){e.select.value?e.relation?e.value.enable():e.specificValue.enable():(e.specificValue.setValue(!1),e.specificValue.disable(),this.updateSpecificValueChanged(e))}updateSpecificValueChanged(e){e.specificValue.value?e.value.enable():(e.value.reset(),e.value.disable())}stopSelectFieldChanged(e){e.select.value?e.value.enable():(e.value.reset(),e.value.disable())}send(e){var n=this;return(0,m.Z)(function*(){if(n.notificationForm.valid){const r=n.notificationForm.value;let s=!0;const u=[];r.operations.find(l=>l==_.UPDATE)&&n.updateFields.map(l=>{if(l.select.value){const g={name:l.name,relation:l.relation};if(l.specificValue.value||l.relation){if(l.value.markAsDirty(),!l.value.valid)return void(s=!1);g.value=l.value.value}u.push(g)}});const f=[];if(r.repeat&&""!=r.cronTime&&n.stopFields.map(l=>{l.select.value&&(l.value.markAsDirty(),l.value.valid?f.push({name:l.name,value:l.value.value,relation:l.relation}):s=!1)}),s){const l={name:r.name,types:r.types,entity:r.entity,operations:r.operations,subject:""==r.subject?void 0:r.subject,body:r.body,recipientsId:r.recipientsId,groupsId:r.groupsId,managerGroupsId:r.managerGroupsId,recipientGroup:r.selectRecipientGroup&&n.recipientGroup?n.recipientGroup.name:void 0,recipientManagerGroup:r.selectRecipientManagerGroup&&n.recipientGroup?n.recipientGroup.name:void 0,updateFields:u,stopFields:f,cronTime:f.length>0?r.cronTime:void 0};if("create"==e)return yield n.notificationsService.create(l);if("update"==e)return yield n.notificationsService.update(n.notification.id,l)}else n.snackbar.open("Valores inv\xe1lidos",void 0,{verticalPosition:"bottom",horizontalPosition:"right",duration:2e3})}})()}create(){var e=this;return(0,m.Z)(function*(){const n=yield e.send("create");n&&(e.snackbar.open("Notificaci\xf3n creada",void 0,{verticalPosition:"bottom",horizontalPosition:"right",duration:2e3}),e.router.navigate(["/","notifications",n.id]))})()}update(){var e=this;return(0,m.Z)(function*(){const n=yield e.send("update");n&&(e.snackbar.open("Notificaci\xf3n editada",void 0,{verticalPosition:"bottom",horizontalPosition:"right",duration:2e3}),e.router.navigate(["/","notifications",n.id]))})()}}return(i=a).\u0275fac=function(e){return new(e||i)(t.Y36(x.T),t.Y36(st.f),t.Y36(I.J),t.Y36(lt.U),t.Y36(pt.ux),t.Y36(v.gz),t.Y36(v.F0))},i.\u0275cmp=t.Xpm({type:i,selectors:[["app-notification"]],decls:96,vars:16,consts:[[1,"flex","flex-row","mb-5","px-2","items-center"],[1,"text-3xl","font-bold"],[1,"flex-auto"],[3,"formGroup","submit"],[1,"bg-white","p-3","rounded-md","shadow-md","mb-4"],[1,"flex","flex-row","flex-wrap"],[1,"px-2","flex-auto"],["appearance","outline",1,"w-full"],["matInput","","formControlName","name"],["formControlName","entity",3,"selectionChange"],[3,"value",4,"ngFor","ngForOf"],["multiple","","formControlName","types"],["multiple","","formControlName","operations",3,"selectionChange"],[1,"w-full","px-2"],["matInput","","formControlName","subject"],["matInput","","formControlName","body"],["color","primary",3,"formControl"],["class","px-2 flex-auto",4,"ngIf"],[1,"text-xl","font-bold","mb-3"],["multiple","","formControlName","recipientsId"],["multiple","","formControlName","groupsId"],[1,"px-2","basis-1/2","flex-auto"],["multiple","","formControlName","managerGroupsId"],[1,"px-2","basis-1/2","flex-auto",2,"min-width","212px"],[1,"flex","flex-col","items-start","justify-center","h-full"],["formControlName","selectRecipientGroup","color","primary",4,"ngIf"],["formControlName","selectRecipientManagerGroup","color","primary",4,"ngIf"],["class","bg-white p-3 rounded-md shadow-md mb-4",4,"ngIf"],[1,"mb-4","flex","flex-row-reverse"],["type","submit","mat-raised-button","","color","primary",4,"ngIf"],[3,"value"],["matInput","","formControlName","cronTime"],["href","https://en.wikipedia.org/wiki/Cron","target","_blank",1,"text-blue-500","hover:underline"],["formControlName","selectRecipientGroup","color","primary"],["formControlName","selectRecipientManagerGroup","color","primary"],[1,"overflow-y-auto"],[1,"whitespace-nowrap","px-2"],[4,"ngFor","ngForOf"],[1,"text-left","px-3","pt-3","pb-8"],["color","primary",3,"formControl","change"],["class","px-3 pt-3 pb-8",4,"ngIf"],["class","w-full",4,"ngIf"],[1,"px-3","pt-3","pb-8"],[1,"w-full","flex","flex-col","items-center"],[3,"formControl","change",4,"ngIf"],[3,"formControl","change"],[1,"w-full"],["appearance","outline","class","w-full",4,"ngIf"],["matInput","",3,"formControl"],[3,"formControl"],["type","submit","mat-raised-button","","color","primary"]],template:function(e,n){1&e&&(t.TgZ(0,"div",0)(1,"h1",1),t._uU(2),t.qZA(),t._UZ(3,"div",2),t.qZA(),t.TgZ(4,"form",3),t.NdJ("submit",function(){return n.notification?n.update():n.create()}),t.TgZ(5,"div",4)(6,"div",5)(7,"div",6)(8,"p"),t._uU(9,"Nombre*"),t.qZA(),t.TgZ(10,"mat-form-field",7),t._UZ(11,"input",8),t.TgZ(12,"mat-error"),t._uU(13,"Nombre inv\xe1lido"),t.qZA()()(),t.TgZ(14,"div",6)(15,"p"),t._uU(16,"Entidad*"),t.qZA(),t.TgZ(17,"mat-form-field",7)(18,"mat-select",9),t.NdJ("selectionChange",function(){return n.getFields()}),t.YNc(19,dt,2,2,"mat-option",10),t.qZA(),t.TgZ(20,"mat-error"),t._uU(21,"Entidad inv\xe1lida"),t.qZA()()()(),t.TgZ(22,"div",5)(23,"div",6)(24,"p"),t._uU(25,"Tipo*"),t.qZA(),t.TgZ(26,"mat-form-field",7)(27,"mat-select",11),t.YNc(28,_t,2,2,"mat-option",10),t.qZA(),t.TgZ(29,"mat-error"),t._uU(30,"Tipo inv\xe1lido"),t.qZA()()(),t.TgZ(31,"div",6)(32,"p"),t._uU(33,"Operaci\xf3n*"),t.qZA(),t.TgZ(34,"mat-form-field",7)(35,"mat-select",12),t.NdJ("selectionChange",function(){return n.getFields()}),t.YNc(36,gt,2,2,"mat-option",10),t.qZA(),t.TgZ(37,"mat-error"),t._uU(38,"Operaci\xf3n inv\xe1lida"),t.qZA()()()(),t.TgZ(39,"div",13)(40,"p"),t._uU(41,"Asunto"),t.qZA(),t.TgZ(42,"mat-form-field",7),t._UZ(43,"input",14),t.TgZ(44,"mat-error"),t._uU(45,"Asunto inv\xe1lido"),t.qZA()()(),t.TgZ(46,"div",13)(47,"p"),t._uU(48,"Cuerpo*"),t.qZA(),t.TgZ(49,"mat-form-field",7),t._UZ(50,"textarea",15),t.TgZ(51,"mat-error"),t._uU(52,"Cuerpo inv\xe1lido"),t.qZA()()(),t.TgZ(53,"div",5)(54,"div",6)(55,"mat-checkbox",16),t._uU(56,"Repetir"),t.qZA()(),t.YNc(57,vt,10,0,"div",17),t.qZA()(),t.TgZ(58,"div",4)(59,"h2",18),t._uU(60,"Destinatarios"),t.qZA(),t.TgZ(61,"div",5)(62,"div",6)(63,"p"),t._uU(64,"Usuarios"),t.qZA(),t.TgZ(65,"mat-form-field",7)(66,"mat-select",19),t.YNc(67,ht,3,4,"mat-option",10),t.qZA(),t.TgZ(68,"mat-error"),t._uU(69,"User inv\xe1lido"),t.qZA()()(),t.TgZ(70,"div",6)(71,"p"),t._uU(72,"Grupos"),t.qZA(),t.TgZ(73,"mat-form-field",7)(74,"mat-select",20),t.YNc(75,Zt,2,2,"mat-option",10),t.qZA(),t.TgZ(76,"mat-error"),t._uU(77,"Operaci\xf3n inv\xe1lida"),t.qZA()()()(),t.TgZ(78,"div",5)(79,"div",21)(80,"p"),t._uU(81,"Managers de grupos"),t.qZA(),t.TgZ(82,"mat-form-field",7)(83,"mat-select",22),t.YNc(84,Tt,2,2,"mat-option",10),t.qZA(),t.TgZ(85,"mat-error"),t._uU(86,"Grupo inv\xe1lido"),t.qZA()()(),t.TgZ(87,"div",23)(88,"div",24),t.YNc(89,xt,2,1,"mat-checkbox",25),t.YNc(90,Nt,2,1,"mat-checkbox",26),t.qZA()()()(),t.YNc(91,bt,11,1,"div",27),t.YNc(92,Ot,9,1,"div",27),t.TgZ(93,"div",28),t.YNc(94,Et,2,0,"button",29),t.YNc(95,St,2,0,"button",29),t.qZA()()),2&e&&(t.xp6(2),t.hij(" ",n.notification?"Notificaci\xf3n":"Agregar notificaci\xf3n"," "),t.xp6(2),t.Q6J("formGroup",n.notificationForm),t.xp6(15),t.Q6J("ngForOf",n.entities),t.xp6(9),t.Q6J("ngForOf",n.notificationTypesArray),t.xp6(8),t.Q6J("ngForOf",n.notificationOperationsArray),t.xp6(19),t.Q6J("formControl",n.notificationForm.controls.repeat),t.xp6(2),t.Q6J("ngIf",n.notificationForm.controls.repeat.value),t.xp6(10),t.Q6J("ngForOf",n.users),t.xp6(8),t.Q6J("ngForOf",n.groups),t.xp6(9),t.Q6J("ngForOf",n.groups),t.xp6(5),t.Q6J("ngIf",n.recipientGroup),t.xp6(1),t.Q6J("ngIf",n.recipientGroup),t.xp6(1),t.Q6J("ngIf",n.showUpdate()),t.xp6(1),t.Q6J("ngIf",n.notificationForm.controls.repeat.value&&n.notificationForm.controls.cronTime.valid&&n.notificationForm.controls.cronTime.value),t.xp6(2),t.Q6J("ngIf",!n.notification),t.xp6(1),t.Q6J("ngIf",n.notification))},dependencies:[h.sg,h.O5,q.ey,ut.oG,T.KE,T.bx,T.TO,ft.Nt,U.gD,N.lW,c._Y,c.Fj,c.JJ,c.JL,c.oH,c.sg,c.u,mt.k],styles:["textarea[_ngcontent-%COMP%]{height:80px!important}"]}),a})();const Gt=[{path:"",component:ct},{path:"create",component:b},{path:":id",component:b}];let kt=(()=>{var i;class a{}return(i=a).\u0275fac=function(e){return new(e||i)},i.\u0275mod=t.oAB({type:i}),i.\u0275inj=t.cJS({imports:[v.Bz.forChild(Gt),v.Bz]}),a})();var Dt=p(2524),$t=p(5323),Mt=p(2577),Rt=p(5650);let Vt=(()=>{var i;class a{}return(i=a).\u0275fac=function(e){return new(e||i)},i.\u0275mod=t.oAB({type:i}),i.\u0275inj=t.cJS({providers:[x.T,Rt.C],imports:[kt,h.ez,w.q,c.u5,c.UX,Dt.D,$t.IncidentsModule,Mt.UsersModule]}),a})()}}]);