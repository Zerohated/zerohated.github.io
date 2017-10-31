    window.onload = function () {
      var activityUsers = new Array();
      var count = 0;
      $.get("http://groupbuy.imnumerique.com/v1/instance/1/activity_users/",function(data){
        activityUsers = data.activityUsers;
        count = data.count;
        $('#count').append(count);
        $('#table').bootstrapTable({
          data: activityUsers,
          pagination:true,
          pageSize:15,
          pageList:[10, 15, 50, 100],
          search:true,
          columns: [{
            field: 'Id',
            title: '用户编号'
          }, {
            field: 'Mobile',
            title: '手机号'
          }, {
            field: 'Name',
            title: '姓名'
          }, {
            field: 'IsStarter',
            title: '是否是发起者'
          }, {
            field: 'Created',
            title: '参与时间'
          },]
        });
      });
    }