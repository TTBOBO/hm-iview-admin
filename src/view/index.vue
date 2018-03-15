<style>
	.row_padd{
		padding: 20px 0px;
	}
	.charetH{
		height: 100% !important;
	}
</style>
<template>
	<div style="height: 100%;">
		<Row type="flex" justify="space-around" class="row_padd">
	        <Col span="5" v-for="i in card" key = i>
	        	<Card :style="{background: i.bgcolor,color:i.color}" style="cursor: pointer; border-radius: 5px;">
	        		<Row>
	        			<Col span="4"><Icon :type="i.icon" size="30"></Icon></Col>
	        			<Col span="18" style="text-align: right;">
	        				<h3>{{i.title}}</h3>
	        				<br/>
	        				<h4>{{i.num}}&nbsp{{i.type}}</h4></Col>
	        		</Row>
			    </Card>
	        </Col>
	        <Col span="24">
	        	 <Form  :model="pageInfo"  :label-width="120">
	        	 	 <FormItem label="选择时间范围：">
			            <Row>
			                <Col span="7">
			                    <FormItem prop="time">
			                       <DatePicker type="daterange" confirm  format="yyyy-MM-dd" :options="pageInfo.timeVa" v-model="pageInfo.time" placeholder="选择日期范围" style="width: 250px"></DatePicker>
			                    </FormItem>
			                </Col>
			                <Col span="2" style="text-align: center">
			                	<FormItem>
			                	 	<Button type="primary" @click="search()">查询</Button>
			                	</FormItem>
			                </Col>
			            </Row>
		        	</FormItem>
	        	 </Form>
	        </Col>
	        <Col span="11" style="background: chartreuse;" :class="{charetH:echarts}" :style="{height:height}" id="orderColumn"></Col>
	    	<Col span="11" style="background: chartreuse;" :class="{charetH:echarts}" :style="{height:height}" id="articleColumn"></Col>
	    </Row>
	</div>
</template>

<script>
	import echarts from 'echarts'
	import { mapState, mapGetters, mapMutations, mapActions} from 'vuex'
	import hm from '@/assets/js/hm.js'

	export default {
		data() {
			return {
				echarts:false,
				height:'calc(100% - 200px)',
				card:'',  //获取顶部card信息
				orderOption:'',  //  获取订单信息
				articleOption:'',  //获取文章信息
			}
		},
		computed: {
		    ...mapState([
		      'pageInfo'  //页面初始化数据
		    ]),  
		},
		methods: {
			//初始化顶部卡片的数据
			setCardInfo() {
				this.$store.dispatch('getCardInfo','1')
				this.card = this.pageInfo.card;
				this.orderOption = this.pageInfo.order;  //获取订单信息
				this.articleOption = this.pageInfo.article; //获取文章信息
			},
			//订单charts图
			drawColumnChart() {
				var option =  hm.drawline(this.orderOption);
				var orderColumn = echarts.init(document.getElementById('orderColumn'));
               	orderColumn.setOption(option);
               	hm.chartResize(orderColumn);  //根据屏幕变大变小
            },
            //文章charts图
            drawColumnChart1() {
            	var option = hm.drawCol(this.articleOption);
              	var articleColumn = echarts.init(document.getElementById('articleColumn'));
                articleColumn.setOption(option);
                hm.chartResize(articleColumn);  //根据屏幕变大变小
            },
            
            //搜索时间范围
            search() {
            	if(this.pageInfo.time[0] == "" || this.pageInfo.time[1] == "") {
            		this.$Message.warning('请选择时间');
            		return false;
            	}else {
            		this.$store.dispatch('getChart')
            	}
            }
		},
		mounted() {
			this.setCardInfo();
			this.drawColumnChart();
			this.drawColumnChart1();
		}
	}
</script>

