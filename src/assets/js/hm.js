
const hm = {

	

	/**
	 * 
	 * @param {Object} data  data数据
	 */
	drawline: function(data) {
		var text = data.title.text ? data.title.text : ''
		var x = data.title.x ? data.title.x : 'center'; //默认为左边
		var option = {
		    title: {
		        text: text,
		        bottom:0,
		       	x: 'center'
		    },
		    tooltip: {
		        trigger: 'axis'
		    },
		    legend: {
		        data:data.Ddata
		    },
		    grid: {
		        left: '3%',
		        right: '4%',
		        bottom: '15%',
		        top:'10%',
		        containLabel: true
		    },
		    toolbox: {
		        feature: {
		            saveAsImage: {
		            	left:0
		            }
		        }
		    },
		    xAxis: {
		        type: 'category',
		        boundaryGap: false,
		        data: data.xData
		    },
		    yAxis: {
		        type: 'value'
		    },
		    series: [
		        {
		            name:data.name,
		            type:'line',
		            stack: '总量',
		            data:data.sData
		        }
		    ]
		}
		
		return option;
	},
	
	drawCol: function(data) {
		var text = data.title.text ? data.title.text : ''
		var x = data.title.x ? data.title.x : 'center'; //默认为左边
		var option = {
			title: {
		        text: text,
		        bottom:0,
		       	x: 'center'
		    },
		    color: ['#3398DB','red'],
		    tooltip : {
		        trigger: 'axis',
		    },
		    toolbox: {
		        feature: {
		            saveAsImage: {}
		        }
		    },
		    grid: {
		        left: '3%',
		        right: '10%',
		        bottom: '19%',
		        top:'10%',
		        containLabel: false
		    },
		    xAxis : [
		        {
		            type : 'category',
		            data : data.xData,
		            axisTick: {
		                alignWithLabel: false
		            }
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value'
		        }
		    ],
		    series : [
		        {
		            name:data.name,
		            type:'bar',
		            barWidth: '35%',
		            data:data.sData
		        }
		    ]
		};
		return option;

	},
	chartResize:function(fun) {
		window.addEventListener("resize", function () {
			if(typeof(fun) == 'function') {
				debugger;
				window.onresize = fun.resize()
			}
			window.onresize = fun.resize();
		});
	},
	getKey:function(obj) {
		var Obj = {};
		for(var key in obj) {
			Obj[key] = obj[key];
		}
		return Obj;
	}
}


export default hm;

