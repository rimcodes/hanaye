"use strict";(self.webpackChunkrcadmin=self.webpackChunkrcadmin||[]).push([[803],{3803:(R,Z,i)=>{i.r(Z),i.d(Z,{StoresModule:()=>D});var m=i(6814),a=i(6223),h=i(9025),f=i(1896),t=i(5879),A=i(3139),g=i(2296),u=i(1919),C=i(617);const x=function(e){return["","stores","form",e]};function U(e,r){if(1&e&&(t.TgZ(0,"mat-list-item",4),t._UZ(1,"img",5),t.TgZ(2,"div",6),t._uU(3),t.qZA(),t.TgZ(4,"div",7),t._uU(5),t.ALo(6,"date"),t.qZA(),t.TgZ(7,"div",8),t._uU(8),t.qZA(),t.TgZ(9,"button",9)(10,"mat-icon"),t._uU(11,"info"),t.qZA()(),t.TgZ(12,"button",10)(13,"mat-icon"),t._uU(14,"delete"),t.qZA()()()),2&e){const o=r.$implicit;t.xp6(1),t.Q6J("src",o.image,t.LSH),t.xp6(2),t.Oqu(o.name),t.xp6(2),t.Oqu(t.lcZ(6,5,o.updatedAt)),t.xp6(3),t.hij(" ",o.details," "),t.xp6(1),t.Q6J("routerLink",t.VKq(7,x,o.id))}}const k=function(){return["","stores","form"]};let J=(()=>{class e{constructor(o){this.storesService=o}ngOnInit(){this.loadStores()}loadStores(){this.stores$=this.storesService.getAllStores()}}return e.\u0275fac=function(o){return new(o||e)(t.Y36(A._))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-stores"]],decls:10,vars:5,consts:[[1,"flex","justify-between","items-center"],[1,"text-lg","font-bold","px-3","my-3"],["mat-fab","","color","primary",3,"routerLink"],["class","border-b-2",4,"ngFor","ngForOf"],[1,"border-b-2"],["matListItemAvatar","",3,"src"],["matListItemTitle",""],["matListItemLine",""],["matListItemMeta",""],["mat-icon-button","","matListItemMeta","",3,"routerLink"],["mat-icon-button","","matListItemMeta",""]],template:function(o,n){1&o&&(t.TgZ(0,"mat-list")(1,"div",0)(2,"div",1),t._uU(3," \u0627\u0644\u0645\u062a\u0627\u062c\u0631 "),t.qZA(),t.TgZ(4,"mat-action-list")(5,"button",2)(6,"mat-icon"),t._uU(7,"add"),t.qZA()()()(),t.YNc(8,U,15,9,"mat-list-item",3),t.ALo(9,"async"),t.qZA()),2&o&&(t.xp6(5),t.Q6J("routerLink",t.DdM(4,k)),t.xp6(3),t.Q6J("ngForOf",t.lcZ(9,2,n.stores$)))},dependencies:[m.sg,f.rH,g.RK,g.cs,u.i$,u.lT,u.Tg,u.D1,u.WW,u.sL,u.ni,C.Hw,m.Ov,m.uU]}),e})();var M=i(6346),p=i(5195),v=i(4170),F=i(2032),T=i(2599),c=i(3305),y=i(1824),b=i(3680),I=i(7398),N=i(6306),O=i(2096),E=i(553),S=i(9862);function Q(e,r){if(1&e){const o=t.EpF();t.ynx(0),t.TgZ(1,"google-map",1),t.NdJ("mapClick",function(s){t.CHM(o);const l=t.oxw();return t.KtG(l.addMarker(s))}),t._UZ(2,"map-marker",2,3),t.qZA(),t.BQk()}if(2&e){const o=t.oxw();t.xp6(1),t.Q6J("options",o.options),t.xp6(1),t.Q6J("position",o.markerPosition)}}let V=(()=>{class e{constructor(o){this.http=o,this.newCordsEvent=new t.vpe,this.options={center:{lat:18.077819265626548,lng:-15.96880064486457},zoom:15}}ngOnInit(){this.apiLoaded=this.http.jsonp(`https://maps.googleapis.com/maps/api/js?key=${E.N.mapApiKey}`,"callback").pipe((0,I.U)(o=>(console.log(o),this.location=this.location.replace("(","").replace(")",""),this.cordsArray=this.location.split(", "),this.cordsArray&&(this.markerPosition=new google.maps.LatLng(+this.cordsArray[0],+this.cordsArray[1])),!0)),(0,N.K)(()=>(console.log("Something in location picker did not load"),(0,O.of)(!1))))}addMarker(o){o.latLng&&(this.markerPosition=o.latLng),console.log(o.latLng?.toString()),this.newCordsEvent.emit(o.latLng?.toString())}}return e.\u0275fac=function(o){return new(o||e)(t.Y36(S.eN))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-location-picker"]],inputs:{location:"location"},outputs:{newCordsEvent:"newCordsEvent"},decls:2,vars:3,consts:[[4,"ngIf"],["height","400","width","100%",3,"options","mapClick"],["icon","assets/holders/profile-marker.png",3,"position"],["marker","mapMarker"]],template:function(o,n){1&o&&(t.YNc(0,Q,4,2,"ng-container",0),t.ALo(1,"async")),2&o&&t.Q6J("ngIf",t.lcZ(1,1,n.apiLoaded))},dependencies:[m.O5,h.b6,h.O_,m.Ov]}),e})();function j(e,r){if(1&e&&(t.TgZ(0,"mat-option",17),t._uU(1),t.qZA()),2&e){const o=r.$implicit;t.Q6J("value",o.id),t.xp6(1),t.hij(" ",o.name," ")}}let L=(()=>{class e{constructor(o,n,s,l){this.formBuilder=o,this.route=n,this.usersService=s,this.storesService=l,this.isSubmitted=!1,this.editMode=!1}ngOnInit(){this.initForm(),this.checkEditMode(),this.loadClients()}loadClients(){this.clients$=this.usersService.getWorkers()}onSubmit(){this.isSubmitted=!0;const o=new FormData;Object.keys(this.storeForm).map(n=>{o.append(n,this.storeForm[n].value)}),this.editMode?this.updateStore(o):this.createStore(o)}addCords(o){this.storeForm.location.setValue(o),console.log(o,"User form page")}createStore(o){this.storesService.createStore(o).subscribe({next:n=>{this.isSubmitted=!1,console.log(n)},error:n=>{this.isSubmitted=!1,console.log(n)}})}updateStore(o){this.storesService.updateStore(o).subscribe({next:n=>{console.log(n)},error:n=>{console.log(n)}})}checkEditMode(){this.route.params.subscribe(o=>{o.id&&(this.editMode=!0,this.storesService.getStore(o.id).subscribe(n=>{this.storeForm.id.setValue(n.id),this.storeForm.worker.setValue(n.worker),this.storeForm.name.setValue(n.name),this.storeForm.details.setValue(n.details),this.storeForm.active.setValue(n.active),this.storeForm.location.setValue(n.location),this.storeForm.image.setValue(n.image)}))})}onImageUpload(o){const n=o.files[0];if(n){this.form.patchValue({image:n}),this.form.get("image")?.updateValueAndValidity();const s=new FileReader;s.onload=()=>{this.imageDisplay=s.result},s.readAsDataURL(n)}}initForm(){this.form=this.formBuilder.group({id:[""],worker:["",a.kI.required],name:["",a.kI.required],details:[""],active:[!0],location:[""],image:[""]})}get storeForm(){return this.form.controls}}return e.\u0275fac=function(o){return new(o||e)(t.Y36(a.qu),t.Y36(f.gz),t.Y36(M.f),t.Y36(A._))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-store-form"]],decls:42,vars:8,consts:[[1,"mx-5","my-8","p-5"],[1,"flex","flex-wrap","justify-around",3,"formGroup"],[1,"w-1/2","p-3"],["matInput","","type","text","formControlName","name"],["formControlName","worker"],[3,"value",4,"ngFor","ngForOf"],["matInput","","type","text","formControlName","details"],["color","primary","formControlName","active"],["type","button","mat-raised-button","",3,"click"],["hidden","","type","file",3,"change"],["fileInput",""],[1,"w-full","overflow-auto","p-3"],[1,"self-start","w-4/5","mx-auto"],[3,"opened","closed"],[3,"location","newCordsEvent"],[3,"align"],["mat-raised-button","","color","primary",3,"disabled","click"],[3,"value"]],template:function(o,n){if(1&o){const s=t.EpF();t.TgZ(0,"mat-card",0)(1,"mat-card-title"),t._uU(2,"\u0625\u0646\u0634\u0627\u0621 \u0645\u062a\u062c\u0631 \u062c\u062f\u064a\u062f"),t.qZA(),t.TgZ(3,"mat-card-content")(4,"form",1)(5,"div",2)(6,"mat-form-field")(7,"mat-label"),t._uU(8,"\u0627\u0644\u0627\u0633\u0645"),t.qZA(),t._UZ(9,"input",3),t.qZA()(),t.TgZ(10,"div",2)(11,"mat-form-field")(12,"mat-label"),t._uU(13," \u0645\u0642\u062f\u0645 \u0627\u0644\u0645\u0646\u062a\u062c "),t.qZA(),t.TgZ(14,"mat-select",4),t.YNc(15,j,2,2,"mat-option",5),t.ALo(16,"async"),t.qZA()()(),t.TgZ(17,"div",2)(18,"mat-form-field")(19,"mat-label"),t._uU(20,"\u0627\u0644\u062a\u0641\u0627\u0635\u064a\u0644"),t.qZA(),t._UZ(21,"input",6),t.qZA()(),t.TgZ(22,"div",2)(23,"mat-slide-toggle",7),t._uU(24," \u0645\u0641\u0639\u0644 "),t.qZA()(),t.TgZ(25,"div",2)(26,"button",8),t.NdJ("click",function(){t.CHM(s);const d=t.MAs(29);return t.KtG(d.click())}),t._uU(27," Choose File "),t.qZA(),t.TgZ(28,"input",9,10),t.NdJ("change",function(){t.CHM(s);const d=t.MAs(29);return t.KtG(n.onImageUpload(d))}),t.qZA()(),t.TgZ(30,"div",11)(31,"mat-accordion",12)(32,"mat-expansion-panel",13),t.NdJ("opened",function(){return n.panelOpenState=!0})("closed",function(){return n.panelOpenState=!1}),t.TgZ(33,"mat-expansion-panel-header")(34,"mat-panel-title"),t._uU(35," \u0627\u0644\u062e\u0631\u064a\u0637\u0629 "),t.qZA(),t._UZ(36,"mat-panel-description"),t.qZA(),t.TgZ(37,"div")(38,"app-location-picker",14),t.NdJ("newCordsEvent",function(d){return n.addCords(d)}),t.qZA()()()()()()(),t.TgZ(39,"mat-card-actions",15)(40,"button",16),t.NdJ("click",function(){return n.onSubmit()}),t._uU(41),t.qZA()()()}if(2&o){let s;t.xp6(4),t.Q6J("formGroup",n.form),t.xp6(11),t.Q6J("ngForOf",t.lcZ(16,6,n.clients$)),t.xp6(23),t.Q6J("location",null!==(s=n.location)&&void 0!==s?s:"0, 0"),t.xp6(1),t.Q6J("align","end"),t.xp6(1),t.Q6J("disabled",n.isSubmitted),t.xp6(1),t.hij(" ",n.editMode?"\u062a\u0639\u062f\u064a\u0644":"\u0625\u0646\u0634\u0627\u0621"," ")}},dependencies:[m.sg,a._Y,a.Fj,a.JJ,a.JL,a.sg,a.u,g.lW,p.a8,p.hq,p.dn,p.n5,v.KE,v.hX,F.Nt,T.Rr,c.pp,c.ib,c.yz,c.yK,c.u4,y.gD,b.ey,V,m.Ov]}),e})();const P=[{path:"",component:J},{path:"form",component:L},{path:"form/:id",component:L}];let Y=(()=>{class e{}return e.\u0275fac=function(o){return new(o||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[f.Bz.forChild(P),f.Bz]}),e})();var K=i(3176);let D=(()=>{class e{}return e.\u0275fac=function(o){return new(o||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[m.ez,a.u5,a.UX,Y,S.Ed,S.JF,h.Y4,g.ot,u.ie,C.Ps,p.QW,K.N6,v.lN,F.c,T.rP,c.To,y.LD]}),e})()}}]);