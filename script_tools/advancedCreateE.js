"use strict";
(function()
{
  if(window.script_tools === undefined)
  {
    window.script_tools = {};
  }
  else
  {
    if(window.script_tools.advancedCreateE !== undefined)
    {
      console.warn("script_tools.advancedCreateE has already been declared");
      return;
    }
  }
  
  function fn (data)
  {
    var e = document.createElement(data.name);

    if( data.text !== undefined)
    e.innerText = data.text;

    if( data.attrs !== undefined)
    {
      if(typeof data.attrs === "string")
      {
        var s = data.attrs.slice();
        var re = /[a-zA-Z$_0-9\-]*\s*=/g;
        var re2 = /=\s*"[^\"]*"/g;

        var a = s.match(re);
        var v = s.match(re2);

        for (var i = 0; i < a.length; i++)
        {
          var pName = a[i].replace(/\s*/g, "");
          pName = pName.substring( 0 , pName.length - 1 );
          var pValue = v[i].match(/"[^"]*"/)[0];
          pValue = pValue.substring( 1, pValue.length - 1);

          e.setAttribute(pName, pValue);
        }
      }
      else if(typeof data.attrs === "object" )
      {
        var attrs = Object.keys(data.attrs);

        for (var i = 0; i < attrs.length; i++)
        {
          e.setAttribute( attrs[i] , data.attrs[attrs[i]]);
        }
      }
      else
        console.warn("Omitting attrs in add$, they are not formated as string nor object");
    }

    if( data.props !== undefined )
    {
      if(typeof data.props === "object")
      {
        for (var i = 0; i < data.props.length; i++)
        {
          e[data.props[i]] = true;
        }
      }
      else
        console.warn("Omitting props in add$, they are not formated as an array");
    }

    if(Array.isArray(data.childs) )
    for(var i = 0; i < data.childs.length ; i++)
    {
      if(data.childs[i] !== null)
      e.appendChild( data.childs[i] );
    }

    if(Array.isArray(data.events) )
    for(var i = 0; i < data.events.length ; i++)
    {
      var useCapture = data.events[i].useCapture ? true : false;
      e.addEventListener( data.events[i].name, data.events[i].action, useCapture );
    }

    return e;
  };

  window.script_tools.advancedCreateE = fn;
  window.add$ = fn;
}) ();