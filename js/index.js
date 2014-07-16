$(document).ready(function(){
	$('#pie').highcharts({
						chart: {
								plotBackgroundColor: null,
								plotBorderWidth: null,
								plotShadow: false
						},
						title: {
								text: 'test-pie'
						},
						tooltip: {
							pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
						},
						plotOptions: {
								pie: {
										allowPointSelect: true,
										cursor: 'pointer',
										dataLabels: {
												enabled: true,
												color: '#000000',
												connectorColor: '#000000',
												format: '<b>{point.name}</b>: {point.percentage:.1f} % /{point.y}'
										},
										events:{
											click:function(e){
												console.log(e.point);
											}
										}
								}
						},
						series: [{
								type: 'pie',
								name: 'data1',
								data: [
										{
											type:'type',
												name: 'data1',
												y: 10000,
												color:'#dc1616',
												sliced: true,
												selected: true
										},
										{
											type:'type',
												name: 'data2',
												y: 20000,
												color:'#1aa424',
												sliced: true,
												selected: true
										},
								]
						}]
				});
		$('#pie2').highcharts({
						title: {
					text: 'Monthly Average Temperature',
					x: -20 //center
			},
			subtitle: {
					text: 'Source: WorldClimate.com',
					x: -20
			},
			xAxis: {
					categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
			},
			yAxis: {
					title: {
							text: 'Temperature (°C)'
					},
					plotLines: [{
							value: 0,
							width: 1,
							color: '#808080'
					}]
			},
			tooltip: {
					valueSuffix: '°C'
			},
			legend: {
					layout: 'vertical',
					align: 'right',
					verticalAlign: 'middle',
					borderWidth: 0
			},
			series: [{
					name: 'Tokyo',
					data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
			}, {
					name: 'New York',
					data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
			}, {
					name: 'Berlin',
					data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
			}, {
					name: 'London',
					data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
			}]
	});

	$('.capture').click(function(){
		$('#myCanvas01').show();
		$('#myCanvas02').show();
		var svgHtml = document.getElementById('highcharts-0').innerHTML;
		var svgHtml2 = document.getElementById('highcharts-2').innerHTML;
		canvg('myCanvas01',svgHtml.trim());
		canvg('myCanvas02',svgHtml2.trim());
		// var imgSrc = document.getElementById('myCanvas01').toDataURL("image/png");
		// document.getElementById('myImg').src=imgSrc;
		var target = $(this).attr('cmd');
		var st = $(document).scrollTop();
		$('#'+target).html2canvas({},function(imgData,w,h){
			if(target != 'all'){
				$('#'+target).find('.captureResult img').attr('src',imgData).ready(function(){

					$(document).scrollTop(st);
				}).removeClass('hidden');
			}else{
				$('#myCanvas01').hide();
				$('#myCanvas02').hide();
				window.open(imgData);
			}
		});
		return false;
	});
});
