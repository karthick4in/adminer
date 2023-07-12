var server = "1";
var db = "test";
var token = "b4bb7391b8fa7fa64b1f5239c1bdb8e6";
var LangSelectReferencedKey = "Select referenced key";
var LangSelectForeignKey = "Select Foreign Key";
var LangPleaseSelectPrimaryOrUniqueKey = "Please select the primary key or a unique key";
var LangIEnotSupport = "Internet Explorer does not support this function.";
var LangChangeDisplay = "Choose field to display";

var strLang = Array();
strLang["strModifications"] = "Modifications have been saved";
strLang["strRelationDeleted"] = "Relation deleted";
strLang["strForeignKeyRelationAdded"] = "FOREIGN KEY relation added";
strLang["strGeneralRelationFeat:strDisabled"] = "General relation features : Disabled";
strLang["strInternalRelationAdded"] = "Internal relation added";
strLang["strErrorRelationAdded"] = "Error: Relation not added.";
strLang["strErrorRelationExists"] = "Error: relation already exists.";
strLang["strErrorSaveTable"] = "Error saving coordinates for Designer.";

/// table list
// <![CDATA[
var j_tabs = new Array();
// j_tabs['test.test3'] = '0';

// <![CDATA[
var contr = new Array();
contr[0] = new Array();
contr[0][''] = new Array();

renderTabelDom = function () {

    const template = `
        <input name="t_x[test.<%= tbl[0]["TABLE_NAME"] %>]" type="hidden" id="t_x_test.<%= tbl[0]["TABLE_NAME"] %>_" />
        <input name="t_y[test.<%= tbl[0]["TABLE_NAME"] %>]" type="hidden" id="t_y_test.<%= tbl[0]["TABLE_NAME"] %>_" />
        <input name="t_v[test.<%= tbl[0]["TABLE_NAME"] %>]" type="hidden" id="t_v_test.<%= tbl[0]["TABLE_NAME"] %>_" />
        <input name="t_h[test.<%= tbl[0]["TABLE_NAME"] %>]" type="hidden" id="t_h_test.<%= tbl[0]["TABLE_NAME"] %>_" />
        <% 
        function getRandomValue(min, max) {const randomDecimal = Math.random();const randomValue = randomDecimal * (max - min + 1) + min;const result = Math.floor(randomValue);return result;}
        %>
        <table id="test.<%= tbl[0]["TABLE_NAME"] %>" cellpadding="0" cellspacing="0" class="tab" style="position: absolute;
          left: <%=pos["x"] || getRandomValue(180,800) %>px;
          top: <%=pos["y"] || getRandomValue(30,50) %>px;
          visibility: <%= pos["h"]== 1?"visible":"hidden" %>;
         ">
            <thead>
                <tr>
                    <td class="small_tab" onmouseover="this.className='small_tab2';"
                        onmouseout="this.className='small_tab';" id="id_hide_tbody_test.<%= tbl[0]["TABLE_NAME"] %>"
                        onclick="Small_tab('test.<%= tbl[0]["TABLE_NAME"] %>', 1)"><%= pos["v"]== 1?"v":"&gt;" %></td>
                    <td class="small_tab_pref" onmouseover="this.className='small_tab_pref2';"
                        onmouseout="this.className='small_tab_pref';" onclick="Start_tab_upd('table');">
                        <img src="pmd/images/exec_small.png" alt="" />
                    </td>
                    <td nowrap="nowrap" id="id_zag_test.<%= tbl[0]["TABLE_NAME"] %>" class="tab_zag"
                        onmousedown="cur_click=document.getElementById('test.<%= tbl[0]["TABLE_NAME"] %>');"
                        onmouseover="this.className = 'tab_zag_2'" onmouseout="this.className = 'tab_zag'">
                        <span class='owner'>
                            test.</span><%= tbl[0]["TABLE_NAME"] %>
                    </td>
                </tr>
            </thead>
            <tbody id="id_tbody_test.<%= tbl[0]["TABLE_NAME"] %>">
             <% for (let i = 0; i < tbl.length; i++) { %>                
                <tr id="id_tr_<%= tbl[i]["TABLE_NAME"] %>.<%= tbl[i]["COLUMN_NAME"] %>" class="tab_field"
                    onmouseover="old_class = this.className; this.className = 'tab_field_2';"
                    onmouseout="this.className = old_class;" onmousedown="Click_field('<%= tbl[0]["TABLE_NAME"] %>','<%= tbl[i]["COLUMN_NAME"] %>',1)">
                    <td width="10px" colspan="3" id="test.<%= tbl[0]["TABLE_NAME"] %>.<%= tbl[i]["COLUMN_NAME"] %>">
                        <div style="white-space:nowrap">
                            <% if(tbl[i]["COLUMN_KEY"] == "PRI"){ %>
                                <img src="pmd/styles/default/images/FieldKey_small.png" alt="*" /> 
                            <% } else if (tbl[i]["DATA_TYPE"] == "bigint" || tbl[i]["DATA_TYPE"] =="int" ) { %>
                                <img src="pmd/styles/default/images/Field_small_int.png" alt="*" />
                            <% } else if (tbl[i]["DATA_TYPE"] == "datetime" || tbl[i]["DATA_TYPE"] =="date") { %>                              
                                <img src="pmd/styles/default/images/Field_small_date.png" alt="*" />
                            <% } else { %>
                                <img src="pmd/styles/default/images/Field_small_char.png" alt="*" />
                            <% } %>
                            <%= tbl[i]["COLUMN_NAME"] %> :  <%= tbl[i]["COLUMN_TYPE"] %>
                        </div>
                    </td>
                </tr> 
              <% } %> 
            </tbody>
        </table>
`;

    const data = {
        name: 'John',
    };

    let tableJson = {}
    for (tbl of DATA_SOURCE["tables"] || []) {
        tableJson[tbl["TABLE_NAME"]] = tableJson[tbl["TABLE_NAME"]] || []
        tableJson[tbl["TABLE_NAME"]].push(tbl)
    }
    console.log(tableJson);

    let tbl_list_dom = [];
    for (tbl in tableJson) {

        console.log(tableJson[tbl]);
        let renderedHTML = ejs.render(template, { "tbl": tableJson[tbl], "pos": table_postion['test.' + tbl] || {} });
        j_tabs["test." + tbl] = "0"
        tbl_list_dom.push(renderedHTML)
    }
    let renderedHTML = tbl_list_dom.join(" ")


    console.log(renderedHTML);

    return renderedHTML;
}

relationLinks = function () {
    for (rel of DATA_SOURCE.relation) {
        console.log(rel)
        var db_tbl_name = 'test.' + rel["foreign_table"];
        var foreign_field = rel["foreign_field"];
        contr[0][''][db_tbl_name] = new Array();
        contr[0][''][db_tbl_name][foreign_field] = new Array();
        contr[0][''][db_tbl_name][foreign_field][0] = 'test.' + rel["master_table"];
        contr[0][''][db_tbl_name][foreign_field][1] = rel["master_field"];
    }
}

scrollBarDomStr = function () {
    var template = `
   <% if(1) { var i =0; %> 
    <tr>
        <td title="Structure" width="1px" onmouseover="this.className='L_butt2_2'"
            onmouseout="this.className='L_butt2_1'">
            <img onclick="Start_tab_upd('<%= tbl[i]["TABLE_NAME"] %>');" src="pmd/images/exec.png" alt="" />
        </td>
        <td width="1px">
            <input onclick="VisibleTab(this,'test.<%= tbl[i]["TABLE_NAME"] %>')" title="Hide" id="check_vis_test.<%= tbl[i]["TABLE_NAME"] %>"
                style="margin:0px;" type="checkbox" value="test.<%= tbl[i]["TABLE_NAME"] %>" <%= pos["h"]==1?'checked="checked"':''  %>  />
        </td>
        <td class="Tabs" onmouseover="this.className='Tabs2'" onmouseout="this.className='Tabs'"
            onclick="Select_tab('test.<%= tbl[i]["TABLE_NAME"] %>');">
            test.<%= tbl[i]["TABLE_NAME"] %></td>
        </tr>
    <% } %>
    `;
    let tableJson = {}
    for (tbl of DATA_SOURCE["tables"] || []) {
        tableJson[tbl["TABLE_NAME"]] = tableJson[tbl["TABLE_NAME"]] || []
        tableJson[tbl["TABLE_NAME"]].push(tbl)
    }
    console.log(tableJson);

    let tbl_list_dom = [];
    for (tbl in tableJson) {

        console.log(tableJson[tbl]);
        let renderedHTML = ejs.render(template, { "tbl": tableJson[tbl],"pos": table_postion['test.' + tbl] || {} });
        j_tabs["test." + tbl] = "0"
        tbl_list_dom.push(renderedHTML)
    }
    let renderedHTML = tbl_list_dom.join(" ")


    return renderedHTML;
}

Main_init = function () {
    loadPostion ()
    let tableDomStr = renderTabelDom();
    let tableScrollDomStr = scrollBarDomStr();
    relationLinks();
    ele = document.getElementById("mainContainer");
    ele.innerHTML = `
    <!-- Table and structe view part -->
    <form action="" method="post" name="form1">
        <div id="layer_menu">
            <div align="center" style="padding-top:5px;">
                <a href="javascript:Hide_tab_all(document.getElementById('key_HS_all'));" onmousedown="return false;"
                    class="M_butt" target="_self">
                    <img title="Hide/Show all" alt="v" src="pmd/images/downarrow1.png" id='key_HS_all' /></a>
                <a href="javascript:No_have_constr(document.getElementById('key_HS'));" onmousedown="return false;"
                    class="M_butt" target="_self">
                    <img title="Hide/Show Tables with no relation" alt="v" src="pmd/images/downarrow2.png"
                        id='key_HS' /></a>
            </div>

            <div id="id_scroll_tab" class="scroll_tab">
            <table width="100%" style="padding-left: 3px;">
                  
                `+ tableScrollDomStr + `
                </table>
            </div>

            <div align="center">
                Number of tables: 2
            </div>
            <div align="right">
                <div id="layer_menu_sizer" onmousedown="layer_menu_cur_click=1">
                </div>
            </div>
        </div>


         
        ` + tableDomStr + `        
    </form>`;
   
    Main();
    Angular_direct();
}

function capturePageAsImage() {
    html2canvas(document.body).then(canvas => {
        // Convert canvas to blob
        canvas.toBlob(blob => {
            // Save the blob as a file
            saveAs(blob, 'fullpage.png');
        });
    });
}


function getRandomValue(min, max) {
    // Generate a random decimal between 0 and 1
    const randomDecimal = Math.random();

    // Scale the random decimal to fit within the desired range
    const randomValue = randomDecimal * (max - min + 1) + min;

    // Convert the scaled value to an integer (if needed)
    const result = Math.floor(randomValue);

    return result;
}

// Usage
const minValue = 1;
const maxValue = 100;

const randomNum = getRandomValue(minValue, maxValue);
console.log(randomNum);
