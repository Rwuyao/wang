	
(function (){
var $table = $('#roletable');
$(document).ready(function(){
	   
		$("#addrole").bind("click",function(){
	    	$table.bootstrapTable('insertRow', {
		        index: 0,
		        row: {
			      rolename:'',
			      description:'',			     
			      createtime:''
		        }
		      })
	    });
	        
	    $("#rolesearch").bind("click",function(){
	    	$table.bootstrapTable('refresh');
	    });
	});



	var cloums=[
		{
	       checkbox: true,
	       visible: true                  //是否显示复选框
	  	},
	  	{
	        field: 'no',
	        title: '序号',
	        width: 40,
	        formatter: function (value, row, index) {
	        	 return index + 1;
	        }
	    },
		{
	        field: 'rolename',
	        title: 'RoLENAME'
	    }, {
	        field: 'description',
	        title: 'DESCRIPTION'
	    },{	     
	        field: 'createtime',
	        title: 'CREATETIME'
	    },{
	    	field: 'operate',
	        title: '操作',
	        align: 'center',
	        valign: 'middle',
	        width: '10%',
	    	formatter: function (value, row, index) {	    
		      	var str='<div class="table-data-feature">' +		        			       				      	     
		      			'<button class="item" data-toggle="tooltip" data-placement="top" title="Save">' + 
				            '<i class="fa fa-floppy-o"></i>' + 
				        '</button>' +  
				        '<button class="item" data-toggle="tooltip" data-placement="top" title="Delete">' + 
				            '<i class="zmdi zmdi-delete"></i>' + 
				        '</button>' + 
				        '<button class="item" data-toggle="tooltip" data-placement="top" title="More">' + 
				            '<i class="zmdi zmdi-more"></i>' + 
				        '</button>' + 
				    	'</div>';
		        return str;
	    	},
	       events: {
		      'click button[title=Delete]': function (e, value, row, index) {
		          if(confirm('此操作不可逆，请确认是否删除？')){
		        	  ajaxDelete(row);
		          }
		      },
		      'click button[title=Save]': function (e, value, row, index) {
		          ajaxEdit(row);
		      }		      
	      }
	    }
	    ];
	

	  function ajaxRequest(params) {
			$.ajax({
			    type: "get",
			    url: '/admin/getroles'  ,
			//  data: "para="+para,  此处data可以为 a=1&b=2类型的字符串 或 json数据。
			    data: $.param(params.data),
			    cache: false,
			    async : false,
			    dataType: "json",		    
			    success: function (data ,textStatus, jqXHR)
			    {
			    	if(data.code==200){			    		
			    		 params.success({
			    			rows : data.rows,
		                    total : data.total
		                }); 		                
			    	}else{
			    		 params.error(); 
			    	}
			        
			    },
			    error:function (XMLHttpRequest, textStatus, errorThrown) {      
			    	 params.error(); 
			    }
			 });
	  }
	
	
	
	  $table.bootstrapTable({
	   
		ajax :ajaxRequest,
		// url: '/admin/getusers',        // 表格数据来源
	    columns: cloums ,
	    toolbar:'#roletoolbar',//工具栏
      toolbarAlign:'left',//工具栏的位置
      clickEdit: true,
      striped: true,                      //是否显示行间隔色
      cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
      pagination: true,                   //是否显示分页（*）
      sortable: true,                     //是否启用排序
      sortOrder: "asc",                   //排序方式
      sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
      pageNumber: 1,                      //初始化加载第一页，默认第一页,并记录
      pageSize: 10,                     //每页的记录行数（*）
      pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）          
      showRefresh: true,                  //是否显示刷新按钮
      clickToSelect: false,                //是否启用点击选中行
      //height: 800,                      //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
      uniqueId: "rolename",               //每一行的唯一标识，一般为主键列
      /**
       * @param {点击列的 field 名称} field
       * @param {点击列的 value 值} value
       * @param {点击列的整行数据} row
       * @param {td 元素} $element
       */
      onClickCell: function(field, value, row, $element) {
      	if((field=='rolename'&& value!='') || field=="operate") return;
      	$element.attr('contenteditable', true);//设置属性为可编辑
      	$element.unbind("blur");
      	$element.blur(function(){
      		  let index = $element.parent().data('index');
                let tdValue = $element.html();
                saveData(index, field, tdValue);
      	});
      }, 
     //得到查询的参数
       queryParams : function (params) {
           //这里的键的名字和控制器的变量名必须一致，这边改动，控制器也需要改成一样的
           var temp = {   
               limit: params.limit,                         //页面大小
               page: (params.offset / params.limit) + 1,   //页码
               sort: params.sort,      //排序列名  
               sortOrder: params.order //排位命令（desc，asc） 
           };
           //获取时间，如果不为空则添加进temp
           if($("#rolename").val()!=""){
          	 temp.rolename= $("#rolename").val();
           }
           return temp;
       },           
	});
	
	
		 function ajaxDelete(data) {
			 $.ajax({
				    type: "delete",
				    url: '/admin/deleterole/'+ data.rolename ,
				//  data: "para="+para,  此处data可以为 a=1&b=2类型的字符串 或 json数据。
				    data: JSON.stringify(data),
				    cache: false,
				    async : false,
				    dataType: "json",
				    contentType:"application/json",
				    success: function (data ,textStatus, jqXHR)
				    {
				    	if(data.code==200){
				    		$table.bootstrapTable('refresh');
				    	}else{
				    		alert(data.msg);
				    	}			        
				    },
				    error:function (XMLHttpRequest, textStatus, errorThrown) {      
				    	//errorTips("error-tip",data.msg);
				    }
				 });
		 }
		
		 function ajaxEdit(data) {
			 $.ajax({
				    type: "put",
				    url: '/admin/editrole'  ,
				    data: JSON.stringify(data),
				    cache: false,
				    async : false,
				    dataType: "json",
				    contentType:"application/json",
				    success: function (data ,textStatus, jqXHR)
				    {
				    	if(data.code==200){
				    		$table.bootstrapTable('refresh');
				    	}else{
				    		alert(data.msg);
				    	}			        
				    },
				    error:function (XMLHttpRequest, textStatus, errorThrown) {      
				    	//errorTips("error-tip",data.msg);
				    }
				 });
		 }
		 
		 function saveData(index, field, value) {
		        $table.bootstrapTable('updateCell', {
		            index: index,       //行索引
		            field: field,       //列名
		            value: value        //cell值
		        })
		    }		 			 
})()