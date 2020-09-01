"use strict";
(function( parent)
{
  switch (undefined) {
    case parent.ScrTools: parent.ScrTools = {};
    case parent.ScrTools.tablize:
      var htmlize = ScrTools.htmlize;
      var HookTypeId = { before: 0, after: 1 };
      var executeHooks = (function( hookTypeId, hookName, htmlElement, tablableData, currentItem)
      {
        var hookType = tablableData.hooks[hookName];
        if( hookType === undefined || hooksObj === null)
          return;
        if( Array.isArray( hookType) === false)
        {
          console.warn("Ignoring hook "+ hookName+ " because it is not an array");
          return;
        }
        if( Array.isArray( hookType[hookTypeId]))
          for( var i = 0; i < hookType[hookTypeId].length; i++)
          {
            try
            {
              hookType[hookTypeId][i].call( htmlElement, htmlElement, tablableData, currentItem);
            }
            catch( e)
            {
              console.error( "Error while executing hook "+ hookName+ " (hookTypeId "+ hookTypeId+ ",  index"+ i+")");
              console.error( e);
            }
          }
      } );
      var makeHeader = (function( tblD, thereAreHooks)
      {
        var theader = htmlize({ name: "thead"});
        if( thereAreHooks)
          executeHooks( HookTypeId.before, "onHeader", theader, tblD, null);
    
        var ths = [];
    
        for (var i = 0; i < tblD.columns.length; i++)
        {
          var column = tblD.columns[i];
          var tHeaderCell;
          if(column.titleText)
            tHeaderCell = htmlize({ name: "th", text: column.titleText});
          else if( column.titleHtml)
            tHeaderCell = htmlize({ name: "th", childs: column.titleHtml});
          else
            tHeaderCell = htmlize( {name: "th", text: ""});
          
          if(column.onTitle)
          {
            column.onTitle.call( tHeaderCell, tHeaderCell, tblD, column);
          }
          ths.push( tHeaderCell);
        }
          
        var headerRow = htmlize( {name: "tr", childs: ths});
        theader.appendChild(headerRow);
    
        if( thereAreHooks)
          executeHooks( HookTypeId.after, "onHeader", theader, tblD, null);
        
        return theader;
      } );
      var makeBody = (function( tblD, thereAreHooks)
      {
        var tbody = htmlize({ name:"tbody"});
        if( thereAreHooks)
          executeHooks( HookTypeId.before, "onBody", tbody, tblD, null);

        var trs = [];

        for(var i = 0; i < tblD.data.length; i++)
        {
          var item = tblD.data[i];

          var tr = htmlize({ name:"tr"});
          if( thereAreHooks)
            executeHooks( HookTypeId.before, "onBodyRow", tr, tblD, item);

          for(var j = 0; j < tblD.columns.length; j++)
          {
            var column = tblD.columns[j];
            
            if( column.directRelation)
            {
              tr.appendChild( htmlize({ name: "td", text: item[column.directRelation] ? item[column.directRelation] : ""}));
            }
            else if( column.stringFunction)
            {
              var td = htmlize({ name: "td"});
              td.appendChild( document.createTextNode( column.stringFunction.call( td, td, tblD, item)));
              tr.appendChild( td);
            }
            else if( column.htmlFunction)
            {
              var td = htmlize({ name: "td"});
              td.appendChild( column.htmlFunction.call( td, td, tblD, item));
              tr.appendChild( td);
            }
            else
            {
              tr.appendChild( htmlize({ name: "td"}));
            }
          }
          if( thereAreHooks)
            executeHooks( HookTypeId.after, "onBodyRow", tr, tblD, item);

          tbody.appendChild(tr);
        }
        
        if( thereAreHooks)
          executeHooks( HookTypeId.after, "onBody", tbody, tblD, null);

        return tbody;
      } );
      var makeFooter = (function( tblD, thereAreHooks)
      {
        var tfooter = htmlize({ name:"tfooter"});
        
        if( thereAreHooks)
          executeHooks( HookTypeId.before, "onFooter", tfooter, tblD, null);

        var tr = htmlize({ name:"tr"});
        for(var i = 0; i < tblD.columns.length; i++)
        {
          var column = tblD.columns[i];
          if( column.footerStringFunction)
            {
              var td = htmlize({ name: "td"});
              td.appendChild( document.createTextNode( column.footerStringFunction.call( td, td, tblD, item)));
              tr.appendChild( td);
            }
            else if( column.footerHtmlFunction)
            {
              var td = htmlize({ name: "td"});
              td.appendChild( column.footerHtmlFunction.call( td, td, tblD, item));
              tr.appendChild( td);
            }
            else
            {
              tr.appendChild( htmlize({ name: "td"}));
            }
        }
        
        tfooter.appendChild(tr);
        if( thereAreHooks)
          executeHooks( HookTypeId.after, "onFooter", tfooter, tblD, null);
        
        return tfooter;
      } );
      parent.ScrTools.tablize = (function tablize(tablableData)
      {
        var tblD = tablableData;
        var thereAreHooks = tblD.hooks ? true : false;

        var table = htmlize({name : "table", attrs : {class: "tabled-data"}} );
        if( thereAreHooks)
          executeHooks( HookTypeId.before, "onTable", table, tblD, null);
        
        var isThereAnyfooter = false;
        if( tblD.columns)
        {
          for (var i = 0; (i < tblD.columns.length) && !isThereAnyfooter; i++)
          {
            if(
              tblD.columns[i].footerStringFunction ||
              tblD.columns[i].footerHtmlFunction)
              isThereAnyfooter = true;
          }
        }
        else
        {
          tblD.columns = [];
          if(tblD.data && tblD.data.length > 0)
          {
            var sampleObj = tblD.data[i];
            Object.keys( sampleObj).forEach( function( key)
            {
              if(
                typeof sampleObj[key] === "number" ||
                typeof sampleObj[key] === "bigint" ||
                typeof sampleObj[key] === "string" ||
                typeof sampleObj[key] === "boolean")
              {
                tblD.columns.push({titleText: key, directRelation: key});
              }
            } );
          }
          else
          {
            tblD.data = [];
            console.warn("There was no definition of columns and no data to make a table of");
          }
        }

        if( !tblD.sharedStorage)
          tblD.sharedStorage = {};

        table.appendChild( makeHeader( tblD, thereAreHooks));
        table.appendChild( makeBody( tblD, thereAreHooks));
        if( isThereAnyfooter)
          table.appendChild( makeFooter( tblD, thereAreHooks));
        
        if( thereAreHooks)
          executeHooks( HookTypeId.after, "onTable", table, tblD, null);
        return table;
      } );
      parent.ScrTools.tablize.prototype = {
        //
      }
      break;
    default: console.warn("SrcTools.tablize is already declared!");
  }
})( window);