var url=rootPath+"/scm/order",gridQryUrl=url+"/rpt1List.json";
var model = avalon.define({$id:'view',user:SYSTEM.user,
    query :{start_date:SYSTEM.beginDate,type:type,end_date:SYSTEM.endDate,f:f,m:"",t:0,tax:"",customer_id:'',customer_name:'',product_id:'',product_name:'',head_id:"",head_name:""},
    list:[],amount_total:0,amt_total:0,ml_total:0,cost_total:0,nprint:true,
    productList:[],pdctComboV:false,type_:type,
	chooseProduct:function(e){
    	model.query.product_id=e.id;
    	model.query.product_name=e.name;
    	model.pdctComboV=false;
    },
    qryProduct:function(v){//自动完成查询商品
    	model.pdctComboV=true;
    	model.query.product_id='';
    	Public.ajaxPost(rootPath+"/scm/product/dataGrid.json",{keyword:v,_sortField:"name",_sort:"asc"},function(json){
    		model.productList=json.data.list;
    	});
    },
    customerList:[],custComboV:false,
	chooseCust:function(e){
    	model.query.customer_id=e.id;
    	model.query.customer_name=e.name;
    	model.custComboV=false;
    },
    qryCustomer:function(v){//自动完成查询客户
    	model.custComboV=true;
    	model.query.customer_id='';
    	Public.ajaxPost(rootPath+"/crm/customer/dataGrid.json",{keyword:v,type:type==1?0:'',_sortField:"name",_sort:"asc"},function(json){
    		model.customerList=json.data.list;
    	});
    },
    userList:[],userComboV:false,
    chooseUser:function(e){
    	model.query.head_id=e.id;
    	model.query.head_name=e.realname;
    	model.userComboV=false;
    },
    qryUser:function(v){//自动完成查询用户
    	model.userComboV=true;
    	model.query.head_id='';
    	Public.ajaxPost(rootPath+"/sso/user/dataGrid.json",{keyword:v,_sortField:"realname",rows:9999,_sort:"asc"},function(json){
    		model.userList=json.data.list;
    	});
    },
    mCheck:function(){
    	if(model.query.m==1){
    		model.query.m=0;
    	}else{
    		model.query.m=1;
    	}
    },
    taxCheck:function(){
    	if(model.query.tax==1){
    		model.query.tax=0;
    	}else{
    		model.query.tax=1;
    	}
    },
    tCheck:function(){
    	if(model.query.t==1){
    		model.query.t=0;
    	}else{
    		model.query.t=1;
    	}
    },
	init:function(){
		$(".ui-datepicker-input").datepicker();
//		model.loadData();
	},
	loadData:function(){
		Public.ajaxPost(gridQryUrl,model.query.$model, function(json){
			if(json.status==200){
				model.list=json.data;
				model.amount_total=0;
				model.amt_total=0;
				model.ml_total=0;
				model.cost_total=0;
				if(model.list.length>0){
					for(var i=0;i<model.list.length;i++){
						var a=model.list[i];
						model.amount_total+=a.amount;
						model.amt_total+=a.amt;
						model.ml_total+=a.ml;
						model.cost_total+=a.cost;
					}
				}
			}
		});
	},
	printRpt:function(){
		model.nprint=false;
		window.print();
		model.nprint=true;
	}
});
model.init();
avalon.filters.ordertype=function(v){
	var ordertype=["采购订单","采购退货","销售订单","销售退货"];
	return ordertype[v];
}
avalon.filters.csttype=function(v){
	return csttype[v];
}