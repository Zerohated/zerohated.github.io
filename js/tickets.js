var ticketsInfo = function(data){
  console.log("ticketsInfo");
  $('#table').bootstrapTable({
    data: data.tickets,
    clickToSelect:true,
    sortName:"state",
    columns: [{checkbox:true},
      {
        field: 'code',
        title: '卡券号'
      }, {
        field: 'state',
        title: '状态'
      },{
        field: 'ticketModel.description',
        title: '描述'
      },{
        field: 'ticketModel.id',
        title: '卡券编组'
      },{
        field: 'ticketModel.type',
        title: '卡券类型'
      },{
        field: 'ticketModel.condition',
        title: '使用条件(满)'
      },{
        field: 'ticketModel.value',
        title: '价值'
      },]
    });
    
  }
  var search = function(){
    var key = $("#searchMobile").val();
    if(key==""){
      alert("请输入手机号");
    }else{
      var url ="http://groupbuy.imnumerique.com/v1/instance/1/activity_user/" + key;
      $.get(url,function(data){
        console.log(data)
        console.log(data.tickets)
        var error = data.error
        if (error!=undefined){
          console.log(error);
          $("#userInfo").html("用户不存在");
          $("#burn").addClass("disabled");
          $(".bootstrap-table").html("");
        }else{
          console.log("else");
          var activityUser = data.activityUser;
          var list = Array(activityUser);
          $("#burn").attr("onclick","perpare();");
          $("#burn").removeClass("disabled");   
          $("#userInfo").html("<table id='userTable'></table>");
          $(".test").html("<table id='table'></table>")
          $('#userTable').bootstrapTable({
            data: list,
            columns: [{
              field: 'openId',
              title: '用户编号'
            }, {
              field: 'mobile',
              title: '手机号'
            }, {
              field: 'name',
              title: '姓名'
            }, {
              field: 'isStarter',
              title: '是否是发起者'
            }, {
              field: 'created',
              title: '参与时间'
            },]
          });
          console.log("tables");
          // START userInfo
          // !function userInfo(){
          //   let clean = new Promise(function(resolve){$("#userInfo").html("<table id='userTable'></table>");console.log("clean");resolve();})
          //   clean.then(function(){
          //     $('#userTable').bootstrapTable({
          //       data: list,
          //       columns: [{
          //         field: 'openId',
          //         title: '用户编号'
          //       }, {
          //         field: 'mobile',
          //         title: '手机号'
          //       }, {
          //         field: 'name',
          //         title: '姓名'
          //       }, {
          //         field: 'isStarter',
          //         title: '是否是发起者'
          //       }, {
          //         field: 'created',
          //         title: '参与时间'
          //       },]
          //     });
          //     console.log("tables");
          //   });
          // }();
          // END userInfo
          // START bootstrap table
          ticketsInfo(data);
          // END bootstrap table
        }
      });
    }
    
  }
  
  var perpare = function(){
    $(".alert-warning").css("visibility","visible");
    $("#burn").text("确认");
    $("#burn").attr("onclick","burn();");
  }
  
  var burn = function(){
    $(".alert-warning").css("visibility","hidden");
    $("#burn").text("核销选中卡券");
    $("#burn").attr("onclick","perpare();");
    var list = new Array();
    var checkedList = $("#table").bootstrapTable("getSelections");
    console.log(checkedList);
    if (checkedList.length==0){
      var info = "未选中卡券";
      console.log(info);
      alert(info);
    }else{
      var info = "";
      for  (let i=0;i<checkedList.length;i++){
        let url = "http://groupbuy.imnumerique.com/v1/instance/"+checkedList[i]["code"]+"/ticket_destruction/underline"
        $.ajax({
          type:"DELETE",
          url:url,
          dataType:"json",
          async:false,
          contentType:"application/json",
          success:function(data){
            console.log(data);
            if (data.state=="succeed"){
              list.push(checkedList[i]["code"]);
              info += "核销成功：";
              info += checkedList[i]["code"];
              info += "\n";
            }else{
                info += "核销失败：";
                info += checkedList[i]["code"];
                info += "\n";
            }
          },
          error:function(){console.log("Error")},
        });
        console.log(list);
      }
      search();
      alert(info);
      $("#burn").addClass("disabled");
    }
    
  }