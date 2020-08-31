"use strict";
(function( parent)
{ 
  switch (undefined) {
    case parent.ScrTools: parent.ScrTools = {};
    case parent.ScrTools.htmlize: parent.ScrTools.htmlize = (function htmlize(data){
      var htmlElem = document.createElement(data.name);
  
      if( data.text !== undefined)
        htmlElem.appendChild( document.createTextNode(data.text));
  
      if( data.attrs !== undefined)
      {
        if(typeof data.attrs === "object" )
        {
          var attrs = Object.keys(data.attrs);
  
          for (var i = 0; i < attrs.length; i++)
          {
            htmlElem.setAttribute( attrs[i] , data.attrs[attrs[i]]);
          }
        }
        else
          console.warn("Omitting attrs in htmlize, they are not formated as an object");
      }
  
      if( data.props !== undefined )
      {
        if( Array.isArray( data.props))
        {
          for (var i = 0; i < data.props.length; i++)
          {
            htmlElem[data.props[i]] = true;
          }
        }
        else
          console.warn("Omitting props in htmlize, they are not formated as an array");
      }
  
      if( Array.isArray(data.childs))
      for(var i = 0; i < data.childs.length; i++)
      {
        if(data.childs[i] !== null)
          htmlElem.appendChild( data.childs[i]);
      }
  
      if( Array.isArray(data.events))
      for(var i = 0; i < data.events.length; i++)
      {
        var useCapture = data.events[i].useCapture ? true : false;
        htmlElem.addEventListener( data.events[i].name, data.events[i].action, useCapture);
      }
  
      return htmlElem;
    } ); break;
    default: console.warn("SrcTools.htmlize is already declared!");
  }
})( window);