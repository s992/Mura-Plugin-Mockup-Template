/* This file is part of Mura CMS. 

	Mura CMS is free software: you can redistribute it and/or modify 
	it under the terms of the GNU General Public License as published by 
	the Free Software Foundation, Version 2 of the License. 

	Mura CMS is distributed in the hope that it will be useful, 
	but WITHOUT ANY WARRANTY; without even the implied warranty of 
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the 
	GNU General Public License for more details. 

	You should have received a copy of the GNU General Public License 
	along with Mura CMS.  If not, see <http://www.gnu.org/licenses/>. 

	Linking Mura CMS statically or dynamically with other modules constitutes the preparation of a derivative work based on 
	Mura CMS. Thus, the terms and conditions of the GNU General Public License version 2 ("GPL") cover the entire combined work.
	
	However, as a special exception, the copyright holders of Mura CMS grant you permission to combine Mura CMS with programs
	or libraries that are released under the GNU Lesser General Public License version 2.1.
	
	In addition, as a special exception, the copyright holders of Mura CMS grant you permission to combine Mura CMS with 
	independent software modules (plugins, themes and bundles), and to distribute these plugins, themes and bundles without 
	Mura CMS under the license of your choice, provided that you follow these specific guidelines: 
	
	Your custom code 
	
	• Must not alter any default objects in the Mura CMS database and
	• May not alter the default display of the Mura CMS logo within Mura CMS and
	• Must not alter any files in the following directories.
	
	 /admin/
	 /tasks/
	 /config/
	 /requirements/mura/
	 /Application.cfc
	 /index.cfm
	 /MuraProxy.cfc
	
	You may copy and distribute Mura CMS with a plug-in, theme or bundle that meets the above guidelines as a combined work 
	under the terms of GPL for Mura CMS, provided that you include the source code of that other code when and as the GNU GPL 
	requires distribution of source code.
	
	For clarity, if you create a modified version of Mura CMS, you are not obligated to grant this special exception for your 
	modified version; it is your choice whether to do so, or to make such modified version available under the GNU General Public License 
	version 2 without this exception.  You may, if you choose, apply this exception to your own modified versions of Mura CMS. */

function loadObject(url,target,message) {
    // branch for native XMLHttpRequest object
	var req;
	var tg=target;

   processReqChange=function() {
   		
		if (req.readyState == 4) {
			// only if "OK"
			if (req.status == 200) {
		  document.getElementById(tg).innerHTML=req.responseText;
			}
		}
	}
	
	document.getElementById(tg).innerHTML=message;
	 
    if (window.XMLHttpRequest) {
        req = new XMLHttpRequest();
        req.onreadystatechange = processReqChange;
        req.open("GET", url, true);
        req.send(null);
    // branch for IE/Windows ActiveX version
    } else if (window.ActiveXObject) {
        req = new ActiveXObject("Microsoft.XMLHTTP");
        if (req) {
            req.onreadystatechange = processReqChange;
            req.open("GET", url, true);
            req.send();
        }
    }
}

//content scheduling
var dtCh= "/";
var minYear=1900;
var maxYear=2100;
var dtFormat =[0,1,2];
var dtExample ="12/31/2014";

function isInteger(s){
	var i;
    for (i = 0; i < s.length; i++){   
        // Check that current character is number.
        var c = s.charAt(i);
        if (((c < "0") || (c > "9"))) return false;
    }
    // All characters are numbers.
    return true;
}

function stripCharsInBag(s, bag){
	var i;
    var returnString = "";
    // Search through string's characters one by one.
    // If character is not in bag, append to returnString.
    for (i = 0; i < s.length; i++){   
        var c = s.charAt(i);
        if (bag.indexOf(c) == -1) returnString += c;
    }
    return returnString;
}

function daysInFebruary (year){
	// February has 29 days in any year evenly divisible by four,
    // EXCEPT for centurial years which are not also divisible by 400.
    return (((year % 4 == 0) && ( (!(year % 100 == 0)) || (year % 400 == 0))) ? 29 : 28 );
}
function DaysArray(n) {
	for (var i = 1; i <= n; i++) {
		this[i] = 31
		if (i==4 || i==6 || i==9 || i==11) {this[i] = 30}
		if (i==2) {this[i] = 29}
   } 
   return this
}

function isDate(dtStr,fldName){
	var daysInMonth = DaysArray(12);
	var dtArray= dtStr.split(dtCh);
	
	if (dtArray.length != 3){
		//alert("The date format for the "+fldName+" field should be : short")
		return false
	}
	var strMonth=dtArray[dtFormat[0]];
	var strDay=dtArray[dtFormat[1]];
	var strYear=dtArray[dtFormat[2]];
	
	/*
	if(strYear.length == 2){
		strYear="20" + strYear;
	}
	*/
	
	strYr=strYear;
	
	if (strDay.charAt(0)=="0" && strDay.length>1) strDay=strDay.substring(1)
	if (strMonth.charAt(0)=="0" && strMonth.length>1) strMonth=strMonth.substring(1)
	for (var i = 1; i <= 3; i++) {
		if (strYr.charAt(0)=="0" && strYr.length>1) strYr=strYr.substring(1)
	}
	
	month=parseInt(strMonth)
	day=parseInt(strDay)
	year=parseInt(strYr)
		
	if (month<1 || month>12){
		//alert("Please enter a valid month in the "+fldName+" field")
		return false
	}
	if (day<1 || day>31 || (month==2 && day>daysInFebruary(year)) || day > daysInMonth[month]){
		//alert("Please enter a valid day  in the "+fldName+" field")
		return false
	}
	if (strYear.length != 4 || year==0 || year<minYear || year>maxYear){
		//alert("Please enter a valid 4 digit year between "+minYear+" and "+maxYear +" in the "+fldName+" field")
		return false
	}
	if (isInteger(stripCharsInBag(dtStr, dtCh))==false){
		//alert("Please enter a valid date in the "+fldName+" field")
		return false
	}
return true;
}

function isEmail(cur){
			var string1=cur
			if (string1.indexOf("@") == -1 || string1.indexOf(".") == -1)
			{alert(cur)
			return false;
			}else{
			return true;}

}

function stripe(theclass) {
  jQuery('table.' + theclass + ' tr').each(
		function(index) {
			if(index % 2){
				jQuery(this).addClass('alt');	
			} else {
				jQuery(this).removeClass('alt');
			}
		}
	);
   jQuery('div.mura-grid.' + theclass + ' dl').each(
		function(index) {
			if(index % 2){
				jQuery(this).addClass('alt');	
			} else {
				jQuery(this).removeClass('alt');
			}
		}
	);
}



// PopUp Windows for Specific Functionality
newWindow = null

function toggleDisplay(id,expand,close){
	
	
	
		if(document.getElementById(id).style.display== 'none'){
			
			 document.getElementById(id).style.display='';
			 if( document.getElementById(id + 'Link')){
			  var theLink = document.getElementById(id + 'Link'); 
			  theLink.innerHTML='[' + close + ']';
			  }
			
		} 
		else 
		{
			 document.getElementById(id).style.display='none';
			 if( document.getElementById(id + 'Link')){
			  var theLink = document.getElementById(id + 'Link'); 
			   theLink.innerHTML='[' + expand + ']';
		  		}
				
		}	  
}

function openDisplay(id,close){
		
	if(document.getElementById(id).style.display== 'none'){
		
		 jQuery("#" + id).slideDown();
		 if( document.getElementById(id + 'Link')){
		  var theLink = document.getElementById(id + 'Link'); 
		  theLink.innerHTML='[' + close + ']';
		  }
		 document.getElementById(id).style.display="";
	} 

}

function toggleDisplay2(id,display){
          document.getElementById(id).style.display = (display== true)?'':'none';
}


function intuserselect(groupid,route,s2,siteid)		{
	newWindow = window.open("view/vPrivateUsers/index.cfm?groupid="+groupid+"&route="+route+"&s2="+s2+"&siteid="+siteid, "newWin", "toolbar=no,location=no,scrollbars=yes,resize=yes,width=322,height=302,left=200,top=200")
	newWindow.focus();
}


function extuserselect(groupid,route,s2,siteid)		{
	newWindow = window.open("view/vPublicUsers/index.cfm?groupid="+groupid+"&route="+route+"&s2="+s2+"&siteid="+siteid, "newWin", "toolbar=no,location=no,scrollbars=yes,resize=yes,width=400,height=400,left=200,top=200")
	newWindow.focus();
}


function validate(theForm) {
	return validateForm(theForm);
}

function getValidationFieldName(theField){
	if(theField.getAttribute('data-label')!=undefined){
		return theField.getAttribute('data-label');
	}else if(theField.getAttribute('label')!=undefined){
		return theField.getAttribute('label');
	}else{
		return theField.getAttribute('name');
	}
}

function getValidationIsRequired(theField){
	if(theField.getAttribute('data-required')!=undefined){
		return (theField.getAttribute('data-required').toLowerCase() =='true');
	}else if(theField.getAttribute('required')!=undefined){
		return (theField.getAttribute('required').toLowerCase() =='true');
	}else{
		return false;
	}
}

function getValidationMessage(theField, defaultMessage){
	if(theField.getAttribute('data-message') != undefined){
		return theField.getAttribute('data-message') + '\n';
	} else if(theField.getAttribute('message') != undefined){
		return theField.getAttribute('message') + '\n';
	} else {
		return getValidationFieldName(theField).toUpperCase() + defaultMessage + '\n';
	}	
}

function getValidationType(theField){
	if(theField.getAttribute('data-validate')!=undefined){
		return theField.getAttribute('data-validate').toUpperCase();
	}else if(theField.getAttribute('validate')!=undefined){
		return theField.getAttribute('validate').toUpperCase();
	}else{
		return '';
	}
}

function hasValidationMatchField(theField){
	if(theField.getAttribute('data-matchfield')!=undefined && theField.getAttribute('data-matchfield') != ''){
		return true;
	}else if(theField.getAttribute('matchfield')!=undefined && theField.getAttribute('matchfield') != ''){
		return true;
	}else{
		return false;
	}
}

function getValidationMatchField(theField){
	if(theField.getAttribute('data-matchfield')!=undefined){
		return theField.getAttribute('data-matchfield');
	}else if(theField.getAttribute('matchfield')!=undefined){
		return theField.getAttribute('matchfield');
	}else{
		return '';
	}
}

function hasValidationRegex(theField){
	if(theField.value != undefined){
		if(theField.getAttribute('data-regex')!=undefined && theField.getAttribute('data-regex') != ''){
			return true;
		}else if(theField.getAttribute('regex')!=undefined && theField.getAttribute('regex') != ''){
			return true;
		}
	}else{
		return false;
	}
}

function getValidationRegex(theField){
	if(theField.getAttribute('data-regex')!=undefined){
		return theField.getAttribute('data-regex');
	}else if(theField.getAttribute('regex')!=undefined){
		return theField.getAttribute('regex');
	}else{
		return '';
	}
}

function validateForm(theForm) {
		var errors="";
		var setFocus=0;
		var started=false;
		var startAt;
		var firstErrorNode;
		var validationType='';
		var frmInputs = theForm.getElementsByTagName("input");	
		for (f=0; f < frmInputs.length; f++) {
		 theField=frmInputs[f];
		 validationType=getValidationType(theField);
		 
			if(theField.style.display==""){
				if(getValidationIsRequired(theField) && theField.value == "" )
					{	
						if (!started) {
						started=true;
						startAt=f;
						firstErrorNode="input";
						}
						
						errors += getValidationMessage(theField,' is required.');
						 			
					}
				else if(validationType != ''){
						
					if(validationType=='EMAIL' && theField.value != '' && !isEmail(theField.value))
					{	
						if (!started) {
						started=true;
						startAt=f;
						firstErrorNode="input";
						}
						
						errors += getValidationMessage(theField,' must be a valid email address.');
								
					}
	
					else if(validationType=='NUMERIC' && theField.value != '' && isNaN(theField.value))
					{	
						if(!isNaN(theField.value.replace(/\$|\,|\%/g,'')))
						{
							theField.value=theField.value.replace(/\$|\,|\%/g,'');
	
						} else {
							if (!started) {
							started=true;
							startAt=f;
							firstErrorNode="input";
							}
						
							 errors += getValidationMessage(theField,' must be numeric.');
						}					
					}
					else if(validationType=='COLOR' && theField.value !='')
					{	
						var re = new RegExp("^#?([a-f]|[A-F]|[0-9]){3}(([a-f]|[A-F]|[0-9]){3})?$");
						if(!theField.value.match(re))
						{
							if (!started) {
							started=true;
							startAt=f;
							firstErrorNode="input";
							}
						
							 errors += getValidationMessage(theField,' is not a valid color.');
						}					
					}
					
					else if(validationType=='REGEX' && theField.value !='' && hasValidationRegex(theField))
					{	
						var re = new RegExp(getValidationRegex(theField));
						if(!theField.value.match(re))
						{
							if (!started) {
							started=true;
							startAt=f;
							firstErrorNode="input";
							}
						
							 errors += getValidationMessage(theField,' is not valid.');
						}					
					}
					else if(validationType=='MATCH' 
							&& hasValidationMatchField(theField) && theField.value != theForm[getValidationMatchField(theField)].value)
					{	
						if (!started) {
						started=true;
						startAt=f;
						firstErrorNode="input";
						}
						
						errors += getValidationMessage(theField, ' must match' + getValidationMatchField(theField) + '.' );
									
					}
					else if(validationType=='DATE' && theField.value != '' && !isDate(theField.value))
					{
						if (!started) {
						started=true;
						startAt=f;
						firstErrorNode="input";
						}
						
						errors += getValidationMessage(theField, ' must be a valid date [MM/DD/YYYY].' );
						 
					}
				}
					
			}
		}
		var frmTextareas = theForm.getElementsByTagName("textarea");	
		for (f=0; f < frmTextareas.length; f++) {
		
			
				theField=frmTextareas[f];
				validationType=getValidationType(theField);
				 
				if(theField.style.display=="" && getValidationIsRequired(theField) && theField.value == "" )
				{	
					if (!started) {
					started=true;
					startAt=f;
					firstErrorNode="textarea";
					}
					
					errors += getValidationMessage(theField, ' is required.' );		
				}	
				else if(validationType != ''){
					if(validationType=='REGEX' && theField.value !='' && hasValidationRegex(theField))
					{	
						var re = new RegExp(getValidationRegex(theField));
						if(!theField.value.match(re))
						{
							if (!started) {
							started=true;
							startAt=f;
							firstErrorNode="input";
							}
						
							errors += getValidationMessage(theField, ' is not valid.' );
						}					
					}
				}
		}
		
		var frmSelects = theForm.getElementsByTagName("select");	
		for (f=0; f < frmSelects.length; f++) {
				theField=frmSelects[f];
				validationType=getValidationType(theField);
				if(theField.style.display=="" && getValidationIsRequired(theField) && theField.options[theField.selectedIndex].value == "")
				{	
					if (!started) {
					started=true;
					startAt=f;
					firstErrorNode="select";
					}
					
					errors += getValidationMessage(theField, ' is required.' );	
				}	
		}
		
		if(errors != ""){
			
			if(firstErrorNode=="input"){
				frmInputs[startAt].focus();
			}
			else if (firstErrorNode=="textarea"){
				frmTextareas[startAt].focus();
			}
			else if (firstErrorNode=="select"){
				frmSelects[startAt].focus();
			}
			
			jQuery("#alertDialogMessage").html(errors);
			jQuery("#alertDialog").dialog({
				resizable: false,
				modal: true,
				position: getDialogPosition(),
				buttons: {
					Ok: function() {
						jQuery(this).dialog('close');
						if(firstErrorNode=="input"){
							frmInputs[startAt].focus();
						}
						else if (firstErrorNode=="textarea"){
							frmTextareas[startAt].focus();
						}
						else if (firstErrorNode=="select"){
							frmSelects[startAt].focus();
						}
					}
				}
			});
			
			return false;
		}
		else
		{
			return true;
		}

}


function submitForm(frm,action,msg){
	var message=msg;
	var currentFrm=frm;
	if(validateForm(frm)){
		
		if(typeof(action) != 'undefined' && action!='delete'){
			var frmInputs = frm.getElementsByTagName("input");	
			for (f=0; f < frmInputs.length; f++){
				if(frmInputs[f].getAttribute('name')=='action'){
				frmInputs[f].setAttribute('value',action);
				}
			}
			
		
		} else if (action=='delete'){
			jQuery("#alertDialogMessage").html(message);
			jQuery("#alertDialog").dialog({
					modal: true,
					position: getDialogPosition(),
					buttons: {
						'YES': function() {
							jQuery(this).dialog('close');
							var frmInputs = currentFrm.getElementsByTagName("input");	
							for (f=0; f < frmInputs.length; f++){
								if(frmInputs[f].getAttribute('name')=='action'){
								frmInputs[f].setAttribute('value',action);
								}
							}
							currentFrm.submit();
							},
						'NO': function() {
							jQuery(this).dialog('close');
						}
					}
				});
			
			return false;
		}

		if(typeof(htmlEditorType) != "undefined"){
		if( htmlEditorType!='fckeditor'){
			 for(var name in CKEDITOR.instances){
				 CKEDITOR.instances[name].updateElement();
                 };

		}
		}
		
		jQuery('#actionIndicator').each(function(){
			jQuery(this).show();	
			});

		jQuery('#actionButtons').each(function(){
			jQuery(this).hide();	
			});
		
		frm.submit();
		formSubmitted = true;
	
	}	
	return false;
}

// Son of Suckerfish Dropdowns
sfHover = function() {
	if(document.getElementById("navUtility") != null){
		var sfEls = document.getElementById("navUtility").getElementsByTagName("LI");
		for (var i=0; i<sfEls.length; i++) {
			sfEls[i].onmouseover=function() {
				this.className+=" sfhover";
			}
			sfEls[i].onmouseout=function() {
				this.className=this.className.replace(new RegExp(" sfhover\\b"), "");
			}
		}
	}
}
if (window.attachEvent) window.attachEvent("onload", sfHover);
	
function checkKeyPressed(evt, form)
{
  evt = (evt) ? evt : (window.event) ? event : null;
  if (evt)
  {
    var charCode = (evt.charCode) ? evt.charCode :
                   ((evt.keyCode) ? evt.keyCode :
                   ((evt.which) ? evt.which : 0));
    if (charCode == 13) document.getElementById(form).submit();
  }    
}


function preview(url,targetParams){
	
	if(targetParams==''){
	newWindow=window.open(url,'previewWin'); 
	}
	else{
		newWindow=window.open(url,'previewWin',targetParams); 
	}
	newWindow.focus();
	void(0);
	return false;
}

function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return unescape(c.substring(nameEQ.length,c.length));
	}
	return "";
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}

function setHTMLEditors() {
	var allPageTags = document.getElementsByTagName("textarea");
	var editors = new Array();
	for (i = 0; i < allPageTags.length; i++) {
		if (allPageTags[i].className == "htmlEditor") {
			if (htmlEditorType=='fckeditor') {
				var oFCKeditor = new FCKeditor(allPageTags[i].id);
				oFCKeditor.ToolbarSet			= "Summary";
				oFCKeditor.Config.EditorAreaCSS	= themepath + '/css/editor.css';
				oFCKeditor.Config.StylesXmlPath = themepath + '/css/fckstyles.xml';
				oFCKeditor.BasePath = context + '/wysiwyg/';
				oFCKeditor.Height = "200";
				oFCKeditor.ReplaceTextarea();
				editors.push(oFCKeditor);
			} else {
				
				var instance=CKEDITOR.instances[allPageTags[i].id];
				if (instance) {
					CKEDITOR.remove(instance);
				} 
				
				if(jQuery(document.getElementById(allPageTags[i].id)).val() == ''){
					jQuery(document.getElementById(allPageTags[i].id)).val("<p></p>")
				}
				
				jQuery(document.getElementById(allPageTags[i].id)).ckeditor( { toolbar: 'Default',customConfig : 'config.js.cfm' },htmlEditorOnComplete);
				
			}
		}
	}
}

var HTMLEditorLoadCount=0;

function htmlEditorOnComplete( editorInstance ) { 	
	
	if( htmlEditorType=='fckeditor'){
		editorInstance.ResetIsDirty();
		var totalIntances=FCKeditorAPI.Instances;
	}else{
		var instance=jQuery(editorInstance).ckeditorGet();
		instance.resetDirty();
		var totalIntances=CKEDITOR.instances;
		CKFinder.setupCKEditor( 
			instance, 
			{ basePath : context + '/tasks/widgets/ckfinder/', 
			rememberLastFolder : false
			} ) ;
	}
	
	HTMLEditorLoadCount++;
    
    var count = 0;

    for (k in totalIntances){ count++ }
  
    try{
	    if (HTMLEditorLoadCount >= count ) {
	    	document.getElementById("actionButtons").style.display="block";	
	    } else {
	    	document.getElementById("actionButtons").style.display="none";
	   	}
    } catch(err) {}
   
 
}

function setDatePickers(target,locale,delim){
	
	if(jQuery.datepicker.regional[locale]==undefined){
		var _locale=locale.substring(0, 2);
	}else{
		var _locale=locale;
	}

	if(jQuery.datepicker.regional[_locale]!=undefined){
		jQuery(target).each(
			function(index) {			
				jQuery(this).datepicker(jQuery.datepicker.regional[_locale])
				.datepicker( "option", "changeYear", true )
				.datepicker( "option", "changeMonth", true );
			}
		);
	} else {
		jQuery(target).each(
			function(index) {
				jQuery(this).datepicker(jQuery.datepicker.regional[''])
				.datepicker( "option", "changeYear", true )
				.datepicker( "option", "changeMonth", true );
			}
		);
	}
}

function setColorPickers(target){	
	jQuery(target).each(
		function(index){		
				jQuery(this).miniColors({
					letterCase: 'uppercase'
					}
				);
		}
	);	
}

function setTabs(target,activetab){
	jQuery(target).each(
		function(index) {			
			jQuery(this).tabs().fadeIn()
			.find(".ui-corner-all")
			.each(
			 function(index){
				 jQuery(this).removeClass("ui-corner-all");
			 	}
			)
		}
	);
	
	jQuery(".ui-tabs .ui-tabs .ui-tabs-nav li").each(
			function(index) {			
				jQuery(this).removeClass("ui-corner-top").addClass("ui-corner-all");
			}
		);
	
	jQuery(".initActiveTab").each(
			function(index) {			
				jQuery(this).tabs("select",activetab);
			}
		);
	
	jQuery(".tabPreloader").each(
			function(index) {			
				jQuery(this).hide();
			}
		);
	
	jQuery(".tooltip").each(
			function(index) {			
				jQuery(this).attr("onclick","return false;");
			}
		);
}

function setAccordions(target,activepanel){
	jQuery(target).each(
			function(index) {
				if(activepanel != null){
					jQuery(this).accordion({ active: activepanel })	
				} else {
					jQuery(this).accordion();
				}
			}
	);
}	

function setCheckboxTrees(){
	jQuery('.checkboxTree').each(
		function(){
			jQuery(this).collapsibleCheckboxTree({
			checkParents : false, 
			checkChildren : false, 
			uncheckChildren : true, 
			initialState : 'default'
			}
		);
	});
}

function alertDialog(message) {
jQuery("#alertDialogMessage").html(message);
jQuery("#alertDialog").dialog({
	resizable: false,
	modal: true,
	position: getDialogPosition(),
	buttons: {
		Ok: function() {
			jQuery(this).dialog('close');
		}
	}
});

return false;
}
 
function confirmDialog(message,yesAction,noAction){
	_yesAction=yesAction;
	_noAction=noAction;
	
	jQuery("#alertDialogMessage").html(message);
	jQuery("#alertDialog").dialog({
			resizable: false,
			modal: true,
			position: getDialogPosition(),
			buttons: {
				'YES': function() {
					jQuery(this).dialog('close');
					if(typeof(_yesAction)=='function'){
						_yesAction();
					} else {
						location.href=_yesAction;
					}
					
					},
				'NO': function() {
					jQuery(this).dialog('close');
					if (typeof(_noAction) != 'undefined') {
						if (typeof(_noAction) == 'function') {
							_noAction();
						}
						else {
							location.href = _noAction;
						}
					}
				}
			}
		});

	return false;	
}

var start=new Date();
start=Date.parse(start)/1000;
var sessionTimeout=10800;
function CountDown(){
	var now=new Date();
	now=Date.parse(now)/1000;
	var x=parseInt(sessionTimeout-(now-start),10);
	var hours = Math.floor(x/3600); 
	var minutes = Math.floor((x-(hours*3600))/60); 
	var seconds = x-((hours*3600)+(minutes*60));
	minutes=(minutes <= 9)?'0' + minutes:minutes;
	seconds=(seconds <= 9)?'0' + seconds:seconds;
	
	if(document.getElementById('clock').innerHTML != undefined ){document.getElementById('clock').innerHTML = hours  + ':' + minutes + ':' + seconds ;}

	if(x>0){
		timerID=setTimeout("CountDown()", 100)
	}else{
	
		if(document.getElementById('clock').innerHTML != undefined ){document.getElementById('clock').innerHTML = 0  + ':' + 0 + ':' + 0 ;}
		//location.href=context + "/admin/index.cfm?fuseaction=cLogin.logout"
		
	}
}

function fileManagerPopUp(){
	var finder = new CKFinder();
	finder.basePath = context + '/tasks/widgets/ckfinder/';
	finder.resourceType = '[Advanced] Mura Root';
	finder.popup();
	return false;
}

function fileManagerCreate(){
	var finder = new CKFinder();
	finder.basePath = context + '/tasks/widgets/ckfinder/';
	finder.create();
	return false;
}

function loadjscssfile(filename, filetype){
	if (filetype=="js"){ //if filename is a external JavaScript file
		var fileref=document.createElement('script')
	 	fileref.setAttribute("type","text/javascript")
	 	fileref.setAttribute("src", filename)
	}
	else if (filetype=="css"){ //if filename is an external CSS file
		var fileref=document.createElement("link")
		fileref.setAttribute("rel", "stylesheet")
		fileref.setAttribute("type", "text/css")
		fileref.setAttribute("href", filename)
	}
	if (typeof fileref!="undefined")
		document.getElementsByTagName("head")[0].appendChild(fileref)
}

function getDialogPosition(){
	if(top.location != self.location) {
		try {
			var windowHeight = jQuery(window.parent).height();
			var dialogHeight = jQuery("#configuratorContainer").height();
			var scrollTop = jQuery(window.parent).scrollTop();
			var editorTop = jQuery("#frontEndToolsModalBody", window.parent.document).position().top;
			var t = Math.floor((windowHeight - dialogHeight) / 2) + scrollTop - editorTop;
			return ["center", t];
		} 
		catch(err){
			return ["center", 0];
		}
	} else{
		return "center";
	}
}

function openPreviewDialog(previewURL){
	if (previewURL.indexOf("?") == -1){
		previewURL=previewURL + '?muraadminpreview';
	} else {
		previewURL=previewURL + '&muraadminpreview';
	}

	var $dialog = jQuery('<div></div>')
	    .html('<iframe style="border: 0px; " src="' + previewURL + '" width="1100" height="600"></iframe>')
	    .dialog({
	        width: 1100,
	        height: 600,     
	        modal: true,
	        title: 'Preview'
	    });

	   return false;
}
