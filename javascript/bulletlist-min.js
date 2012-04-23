var BulletPointObject=function(inputBoxId){this.inputBoxId=inputBoxId;}
BulletPointObject.prototype.exportBulletPointAsText=function(){return"*"+$('#'+this.inputBoxId).val();}
BulletPointObject.prototype.exportBulletPointAsHtml=function(){return"<li>"+$('#'+this.inputBoxId).val()+"</li>";}
var BulletListModel=function(){this.currentUid=-1;this.bulletPoints=[];}
BulletListModel.prototype.addBulletPoint=function(position,bulletPointObject){this.bulletPoints.splice(position,0,bulletPointObject);};BulletListModel.prototype.getBulletPointByIndex=function(position){return this.bulletPoints[position];}
BulletListModel.prototype.getBulletPointIndexByInputBoxId=function(inputBoxId){var bulletPoint=$.grep(this.bulletPoints,function(value,index){return value.inputBoxId==inputBoxId;})[0];return $.inArray(bulletPoint,this.bulletPoints);}
BulletListModel.prototype.removeBulletPoint=function(position){this.bulletPoints.splice(position,1);};BulletListModel.prototype.getNumberOfBulletPointsPresent=function(){return this.bulletPoints.length;}
var JSBulletList={};JSBulletList=function($){var bulletList={};var bulletListModels={};var bulletListSuffix="_BulletList";var bulletSuffix="_Bullet_";var inputSuffix="_Input_";var enterKeyCode=13;var backspaceKeyCode=8;var upArrowKeyCode=38;var downArrowKeyCode=40;bulletList.setupNewBulletList=function(containingDivId){bulletListModels[containingDivId]=new BulletListModel();$('#'+containingDivId).html(newBulletListHtml(containingDivId));addKeyEventHandlersToBulletPoints(containingDivId);}
bulletList.setFocusOnFirstBulletPoint=function(containingDivId){var bulletPoint=bulletListModels[containingDivId].getBulletPointByIndex(0);setFocusOnSpecificBulletPoint(bulletPoint);}
bulletList.exportListAsText=function(containingDivId){var textToExport="";$.each(bulletListModels[containingDivId].bulletPoints,function(key,value){textToExport+=value.exportBulletPointAsText()+"<br/>";});return textToExport;}
bulletList.exportListAsHtml=function(containingDivId){var textToExport="<ul>";$.each(bulletListModels[containingDivId].bulletPoints,function(key,value){textToExport+=value.exportBulletPointAsHtml();});textToExport+="</ul>";return textToExport;}
var newBulletListHtml=function(idPrefix){return"<ul id='"+idPrefix+bulletListSuffix+"' class='jsBulletList'>"+
newBulletPointHtml(idPrefix,0)+"</ul>";}
var newBulletPointHtml=function(idPrefix,position){bulletListModels[idPrefix].currentUid++;var bulletPointNumber=bulletListModels[idPrefix].currentUid;var inputBoxId=idPrefix+inputSuffix+bulletPointNumber;var newPoint=new BulletPointObject(inputBoxId);bulletListModels[idPrefix].addBulletPoint(position,newPoint);return"<li id='"+idPrefix+bulletSuffix+bulletPointNumber+"'>"+"<input type='text' id='"+inputBoxId+"'></input>"+"</li>";}
var addKeyEventHandlersToBulletPoints=function(idPrefix){$('#'+idPrefix+" ul").on("keydown","li input",function(event){if(event.which==enterKeyCode){handleEnterKeyOnBulletPoint(idPrefix,this.id);}
if(event.which==backspaceKeyCode){handleBackspaceKeyOnBulletPoint(event,idPrefix,this.id);}
if(event.which==upArrowKeyCode){navigateBetweenBulletPoints(idPrefix,this.id,-1);}
if(event.which==downArrowKeyCode){navigateBetweenBulletPoints(idPrefix,this.id,1);}});}
var handleEnterKeyOnBulletPoint=function(idPrefix,inputBoxId){var currentListItem=$('#'+inputBoxId).parent();var bulletPointIndex=bulletListModels[idPrefix].getBulletPointIndexByInputBoxId(inputBoxId);var newIndex=bulletPointIndex+1;currentListItem.after(newBulletPointHtml(idPrefix,newIndex));var bulletPointToSwitchTo=bulletListModels[idPrefix].getBulletPointByIndex(newIndex);setFocusOnSpecificBulletPoint(bulletPointToSwitchTo);}
var handleBackspaceKeyOnBulletPoint=function(event,idPrefix,inputBoxId){var inputBoxTextLength=$('#'+inputBoxId).val().length;if(inputBoxTextLength==0&&bulletListModels[idPrefix].getNumberOfBulletPointsPresent()!=1){event.preventDefault();var currentListItem=$('#'+inputBoxId).parent();currentListItem.remove();var bulletPointIndex=bulletListModels[idPrefix].getBulletPointIndexByInputBoxId(inputBoxId);var bulletPointToSwitchTo=bulletListModels[idPrefix].getBulletPointByIndex(bulletPointIndex-1);setFocusOnSpecificBulletPoint(bulletPointToSwitchTo);bulletListModels[idPrefix].removeBulletPoint(bulletPointIndex);};}
var navigateBetweenBulletPoints=function(idPrefix,inputBoxId,increment){var bulletPointIndex=bulletListModels[idPrefix].getBulletPointIndexByInputBoxId(inputBoxId);var bulletPointToSwitchTo=bulletListModels[idPrefix].getBulletPointByIndex(bulletPointIndex+increment);if(bulletPointToSwitchTo!=null){setFocusOnSpecificBulletPoint(bulletPointToSwitchTo);}}
var setFocusOnSpecificBulletPoint=function(bulletPoint){$('#'+bulletPoint.inputBoxId).focus();}
return bulletList;}(jQuery);