var WsmanStackCreateService=function(e,s,r,a,o,t){var p={};function l(e){if(!e)return"";var s,r=" ";for(s in e)e.hasOwnProperty(s)&&0===s.indexOf("@")&&(r+=s.substring(1)+'="'+e[s]+'" ');return r}function w(e){if(!e)return"";if("string"==typeof e)return e;if(e.InstanceID)return'<w:SelectorSet><w:Selector Name="InstanceID">'+e.InstanceID+"</w:Selector></w:SelectorSet>";var s,r="<w:SelectorSet>";for(s in e)if(e.hasOwnProperty(s)){if(r+='<w:Selector Name="'+s+'">',e[s].ReferenceParameters){r+="<a:EndpointReference>",r+="<a:Address>"+e[s].Address+"</a:Address><a:ReferenceParameters><w:ResourceURI>"+e[s].ReferenceParameters.ResourceURI+"</w:ResourceURI><w:SelectorSet>";var a=e[s].ReferenceParameters.SelectorSet.Selector;if(Array.isArray(a))for(var o=0;o<a.length;o++)r+="<w:Selector"+l(a[o])+">"+a[o].Value+"</w:Selector>";else r+="<w:Selector"+l(a)+">"+a.Value+"</w:Selector>";r+="</w:SelectorSet></a:ReferenceParameters></a:EndpointReference>"}else r+=e[s];r+="</w:Selector>"}return r+="</w:SelectorSet>"}return p.NextMessageId=1,p.Address="/wsman",p.comm=CreateWsmanComm(e,s,r,a,o,t),p.PerformAjax=function(e,o,s,r,a){null==a&&(a=""),p.comm.PerformAjax('<?xml version=\"1.0\" encoding=\"utf-8\"?><Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:a="http://schemas.xmlsoap.org/ws/2004/08/addressing" xmlns:w="http://schemas.dmtf.org/wbem/wsman/1/wsman.xsd" xmlns="http://www.w3.org/2003/05/soap-envelope" '+a+"><Header><a:Action>"+e,function(e,s,r){var a;200==s?(a=p.ParseWsman(e))&&null!=a?o(p,a.Header.ResourceURI,a,200,r):o(p,null,{Header:{HttpError:s}},601,r):o(p,null,{Header:{HttpError:s}},s,r)},s,r)},p.CancelAllQueries=function(e){p.comm.CancelAllQueries(e)},p.GetNameFromUrl=function(e){var s=e.lastIndexOf("/");return-1==s?e:e.substring(s+1)},p.ExecSubscribe=function(e,s,r,a,o,t,n,l,d,c){var m="",i="";null!=d&&null!=c&&(m="<t:IssuedTokens><t:RequestSecurityTokenResponse><t:TokenType>http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#UsernameToken</t:TokenType><t:RequestedSecurityToken><se:UsernameToken><se:Username>"+d+'</se:Username><se:Password Type="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd#PasswordText">'+c+"</se:Password></se:UsernameToken></t:RequestedSecurityToken></t:RequestSecurityTokenResponse></t:IssuedTokens>",i='<Auth Profile="http://schemas.xmlsoap.org/ws/2004/08/eventing/DeliveryModes/secprofile/http/digest"/>');var u="http://schemas.xmlsoap.org/ws/2004/08/eventing/Subscribe</a:Action><a:To>"+p.Address+"</a:To><w:ResourceURI>"+e+"</w:ResourceURI><a:MessageID>"+p.NextMessageId+++"</a:MessageID><a:ReplyTo><a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address></a:ReplyTo>"+w(n)+m+'</Header><Body><e:Subscribe><e:Delivery Mode="http://schemas.dmtf.org/wbem/wsman/1/wsman/'+s+'"><e:NotifyTo><a:Address>'+r+"</a:Address></e:NotifyTo>"+i+"</e:Delivery><e:Expires>PT0.000000S</e:Expires></e:Subscribe>";p.PerformAjax(u+"</Body></Envelope>",a,o,t,'xmlns:e="http://schemas.xmlsoap.org/ws/2004/08/eventing" xmlns:t="http://schemas.xmlsoap.org/ws/2005/02/trust" xmlns:se="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:m="http://x.com"')},p.ExecUnSubscribe=function(e,s,r,a,o){var t="http://schemas.xmlsoap.org/ws/2004/08/eventing/Unsubscribe</a:Action><a:To>"+p.Address+"</a:To><w:ResourceURI>"+e+"</w:ResourceURI><a:MessageID>"+p.NextMessageId+++"</a:MessageID><a:ReplyTo><a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address></a:ReplyTo>"+w(o)+"</Header><Body><e:Unsubscribe/>";p.PerformAjax(t+"</Body></Envelope>",s,r,a,'xmlns:e="http://schemas.xmlsoap.org/ws/2004/08/eventing"')},p.ExecPut=function(e,s,r,a,o,t){var n="http://schemas.xmlsoap.org/ws/2004/09/transfer/Put</a:Action><a:To>"+p.Address+"</a:To><w:ResourceURI>"+e+"</w:ResourceURI><a:MessageID>"+p.NextMessageId+++"</a:MessageID><a:ReplyTo><a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address></a:ReplyTo><w:OperationTimeout>PT60.000S</w:OperationTimeout>"+w(t)+"</Header><Body>"+function(e,s){if(!e||null==s)return"";var r,a=p.GetNameFromUrl(e),o="<r:"+a+' xmlns:r="'+e+'">';for(r in s)if(s.hasOwnProperty(r)&&0!==r.indexOf("__")&&0!==r.indexOf("@")&&void 0!==s[r]&&null!==s[r]&&"function"!=typeof s[r])if("object"==typeof s[r]&&s[r].ReferenceParameters){o+="<r:"+r+"><a:Address>"+s[r].Address+"</a:Address><a:ReferenceParameters><w:ResourceURI>"+s[r].ReferenceParameters.ResourceURI+"</w:ResourceURI><w:SelectorSet>";var t=s[r].ReferenceParameters.SelectorSet.Selector;if(Array.isArray(t))for(var n=0;n<t.length;n++)o+="<w:Selector"+l(t[n])+">"+t[n].Value+"</w:Selector>";else o+="<w:Selector"+l(t)+">"+t.Value+"</w:Selector>";o+="</w:SelectorSet></a:ReferenceParameters></r:"+r+">"}else if(Array.isArray(s[r]))for(n=0;n<s[r].length;n++)o+="<r:"+r+">"+s[r][n].toString()+"</r:"+r+">";else o+="<r:"+r+">"+s[r].toString()+"</r:"+r+">";return o+="</r:"+a+">"}(e,s);p.PerformAjax(n+"</Body></Envelope>",r,a,o)},p.ExecCreate=function(e,s,r,a,o,t){var n,l=p.GetNameFromUrl(e),d="http://schemas.xmlsoap.org/ws/2004/09/transfer/Create</a:Action><a:To>"+p.Address+"</a:To><w:ResourceURI>"+e+"</w:ResourceURI><a:MessageID>"+p.NextMessageId+++"</a:MessageID><a:ReplyTo><a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address></a:ReplyTo><w:OperationTimeout>PT60S</w:OperationTimeout>"+w(t)+"</Header><Body><g:"+l+' xmlns:g="'+e+'">';for(n in s)d+="<g:"+n+">"+s[n]+"</g:"+n+">";p.PerformAjax(d+"</g:"+l+"></Body></Envelope>",r,a,o)},p.ExecCreateXml=function(e,s,r,a,o){var t=p.GetNameFromUrl(e);p.PerformAjax("http://schemas.xmlsoap.org/ws/2004/09/transfer/Create</a:Action><a:To>"+p.Address+"</a:To><w:ResourceURI>"+e+"</w:ResourceURI><a:MessageID>"+p.NextMessageId+++"</a:MessageID><a:ReplyTo><a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address></a:ReplyTo><w:OperationTimeout>PT60.000S</w:OperationTimeout></Header><Body><r:"+t+' xmlns:r="'+e+'">'+s+"</r:"+t+"></Body></Envelope>",r,a,o)},p.ExecDelete=function(e,s,r,a,o){var t="http://schemas.xmlsoap.org/ws/2004/09/transfer/Delete</a:Action><a:To>"+p.Address+"</a:To><w:ResourceURI>"+e+"</w:ResourceURI><a:MessageID>"+p.NextMessageId+++"</a:MessageID><a:ReplyTo><a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address></a:ReplyTo><w:OperationTimeout>PT60S</w:OperationTimeout>"+w(s)+"</Header><Body /></Envelope>";p.PerformAjax(t,r,a,o)},p.ExecGet=function(e,s,r,a){p.PerformAjax("http://schemas.xmlsoap.org/ws/2004/09/transfer/Get</a:Action><a:To>"+p.Address+"</a:To><w:ResourceURI>"+e+"</w:ResourceURI><a:MessageID>"+p.NextMessageId+++"</a:MessageID><a:ReplyTo><a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address></a:ReplyTo><w:OperationTimeout>PT60S</w:OperationTimeout></Header><Body /></Envelope>",s,r,a)},p.ExecMethod=function(e,s,r,a,o,t,n){var l,d="";for(l in r)if(null!=r[l])if(Array.isArray(r[l]))for(var c in r[l])d+="<r:"+l+">"+r[l][c]+"</r:"+l+">";else d+="<r:"+l+">"+r[l]+"</r:"+l+">";p.ExecMethodXml(e,s,d,a,o,t,n)},p.ExecMethodXml=function(e,s,r,a,o,t,n){p.PerformAjax(e+"/"+s+"</a:Action><a:To>"+p.Address+"</a:To><w:ResourceURI>"+e+"</w:ResourceURI><a:MessageID>"+p.NextMessageId+++"</a:MessageID><a:ReplyTo><a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address></a:ReplyTo><w:OperationTimeout>PT60S</w:OperationTimeout>"+w(n)+"</Header><Body><r:"+s+'_INPUT xmlns:r="'+e+'">'+r+"</r:"+s+"_INPUT></Body></Envelope>",a,o,t)},p.ExecEnum=function(e,s,r,a){p.PerformAjax("http://schemas.xmlsoap.org/ws/2004/09/enumeration/Enumerate</a:Action><a:To>"+p.Address+"</a:To><w:ResourceURI>"+e+"</w:ResourceURI><a:MessageID>"+p.NextMessageId+++'</a:MessageID><a:ReplyTo><a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address></a:ReplyTo><w:OperationTimeout>PT60S</w:OperationTimeout></Header><Body><Enumerate xmlns="http://schemas.xmlsoap.org/ws/2004/09/enumeration" /></Body></Envelope>',s,r,a)},p.ExecPull=function(e,s,r,a,o){p.PerformAjax("http://schemas.xmlsoap.org/ws/2004/09/enumeration/Pull</a:Action><a:To>"+p.Address+"</a:To><w:ResourceURI>"+e+"</w:ResourceURI><a:MessageID>"+p.NextMessageId+++'</a:MessageID><a:ReplyTo><a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address></a:ReplyTo><w:OperationTimeout>PT60S</w:OperationTimeout></Header><Body><Pull xmlns="http://schemas.xmlsoap.org/ws/2004/09/enumeration"><EnumerationContext>'+s+"</EnumerationContext><MaxElements>999</MaxElements><MaxCharacters>99999</MaxCharacters></Pull></Body></Envelope>",r,a,o)},p.ParseWsman=function(s){try{s.childNodes||(s=function(e){{if(window.DOMParser)return(new DOMParser).parseFromString(e,"text/xml");var s=new ActiveXObject("Microsoft.XMLDOM");return s.async=!1,s.loadXML(e),s}}(s));var e,r={Header:{}},a=s.getElementsByTagName("Header")[0];if(!(a=a||s.getElementsByTagName("a:Header")[0]))return null;for(var o=0;o<a.childNodes.length;o++){var t=a.childNodes[o];r.Header[t.localName]=t.textContent}var n=s.getElementsByTagName("Body")[0];return(n=n||s.getElementsByTagName("a:Body")[0])?(0<n.childNodes.length&&((e=n.childNodes[0].localName).indexOf("_OUTPUT")==e.length-7&&(e=e.substring(0,e.length-7)),r.Header.Method=e,r.Body=function e(s){var r,a={};for(var o=0;o<s.childNodes.length;o++){var t=s.childNodes[o];"true"==(r=0==t.childElementCount?t.textContent:e(t))&&(r=!0),"false"==r&&(r=!1);var n=r;if(0<t.attributes.length){n={Value:r};for(var l=0;l<t.attributes.length;l++)n["@"+t.attributes[l].name]=t.attributes[l].value}a[t.localName]instanceof Array?a[t.localName].push(n):null==a[t.localName]?a[t.localName]=n:a[t.localName]=[a[t.localName],n]}return a}(n.childNodes[0])),r):null}catch(e){return console.log("Unable to parse XML: "+s),null}},p}