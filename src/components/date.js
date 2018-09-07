import React, { Component } from 'react'
import Block from './block';
import {
	Container,
	Row,
	Col,
} from 'reactstrap';
import {connect} from 'react-redux';
import Data from '../datas/datas';

type State = {
	startWidth: number,
	stopWidth: number,
	fullWidth: number,
	blockWidth: number,
	blockNumberWidth: number,
	display: ?Array<Object>,
	offsetHeight: number,
};

class DateComponent extends Component<Props, State> {
		state: State = {
			startWidth: [],
			stopWidth: [],
			fullWidth: 0,
			monthWidth: 0,
			display: [],
			offsetHeight: 0,
			entrieDate: [],
			selectedMonth: 0,
			dayWidth: 7,
			LastDayMonth: [],
			currentYear: 0
		};

		componentWillMount() {
			const currentMonth = new Date().getMonth()
			const currentYear = new Date().getFullYear();
			this.setState({
				selectedMonth: currentMonth,
				currentYear: currentYear
			});
		}

		componentWillReceiveProps(nextProps) {
			console.log('nextProps receive : ', nextProps);

			this.setState({entrieDate:nextProps.monthsArray.tab, display: []}, () => this.getLastMonthDay())
			if(nextProps.selectedMonth !== this.state.selectedMonth) {
				this.setState({selectedMonth: nextProps.selectedMont})
			}
		}

		getLastMonthDay = () => {
			let LastDayMonth = [];
			this.state.entrieDate.map(obj => {
				LastDayMonth.push(this.getLastDay(this.state.currentYear, obj.id))
			})
			this.setState({LastDayMonth: LastDayMonth}, () => {
				this.Calc();
			})
		}

		getLastDay = (year, month) => {
			return new Date(year, month + 1, 0).getDate()
		};

		Calc = () => {
			let startWidth = 0;
			let stopWidth = 0;
			for(let i = 0; i < Data.length; i++) {
				if(Data[i].dateStart.month < this.state.entrieDate[0].id) {
						console.log('1');
					startWidth = 0;
					if(Data[i].dateStop.month > this.state.entrieDate[2].id) {
							console.log('1.1');
						stopWidth = this.state.fullWidth;
					} else if (this.state.entrieDate[2].id === Data[i].dateStop.month) {
						const pix = (2 * this.state.monthWidth) + (Data[i].dateStop.day * this.state.dayWidth);
						stopWidth = pix;
					} else {
					 	console.log('1.2');
						const diff = this.state.entrieDate[2].id - Data[i].dateStop.month;
						console.log('diff : ', diff);
						const pix = (diff * this.state.monthWidth) + (Data[i].dateStop.day * this.state.dayWidth);
						stopWidth = pix;
					}
				} else if (Data[i].dateStop.month === this.state.entrieDate[0].id) {
					const days = this.state.dayWidth * this.state.entrieDate[0].id;
					startWidth = days
					if(Data[i].dateStop.month > this.state.entrieDate[2].id) {
							console.log('2.1');
						stopWidth = this.state.fullWidth;
					} else if (this.state.entrieDate[2].id === Data[i].dateStop.month) {
						const pix = (2 * this.state.monthWidth) + (Data[i].dateStop.day * this.state.dayWidth);
						stopWidth = pix;
					} else {
						console.log('2.2');
						const diff = this.state.entrieDate[2].id - Data[i].dateStart.month;
						const pix = (diff * this.state.monthWidth) + (Data[i].dateStop.day * this.state.dayWidth);
						stopWidth = pix;
					}
				} else {
					console.log('2');
					const diffStart = (Data[i].dateStart.month - this.state.entrieDate[0].id) * this.state.monthWidth;
					console.log("diffStart : ", diffStart);
					const days = this.state.dayWidth * Data[i].dateStart.day + diffStart;
					startWidth = days
					if(Data[i].dateStop.month > this.state.entrieDate[2].id) {
							console.log('2.1');
						stopWidth = this.state.fullWidth;
					} else if (this.state.entrieDate[2].id === Data[i].dateStop.month) {
						const pix = (2 * this.state.monthWidth) + (Data[i].dateStop.day * this.state.dayWidth);
						stopWidth = pix;
					} else {
						console.log('2.2');
						const diff = this.state.entrieDate[2].id - Data[i].dateStart.month;
						const pix = (diff * this.state.monthWidth) + (Data[i].dateStop.day * this.state.dayWidth);
						stopWidth = pix;
					}
				}
				console.log('startWidth : ', startWidth);

				console.log('stopWidth : ', stopWidth);
				const offset = stopWidth - startWidth;
				console.log('offset : ', offset);
				const percent = (offset*100)/this.state.fullWidth;
				let full = this.state.display;
				full.push({offset: startWidth, width: percent, id:Data[i].id})
				this.setState({display: full})
			}
		}


		getOffset = (width, height) => {
			this.getOffsetWidth(width);
			this.getOffsetHeight(height);
		};

		getOffsetWidth = (offset) => {
			const month = Math.round(offset / 3);
			this.setState({
				fullWidth: offset,
				monthWidth: month,
			})
		};

		getOffsetHeight = (offset) => {
			this.setState({offsetHeight: offset})
		}

  render() {
		console.log('display: ', this.state.display);
    return (
      <div>
				<Container fluid style={{ margin: 'auto'}}>
					<Row id={'block'}>
						<Col xs={'12'} style={{padding:0}}>
							<Row>
								<Col xs='2' style={{padding: 0, backgroundColor:'rgba(155,155,155,0.10)', height:`${this.state.offsetHeight}px`, border: '0.5px solid #DCDCDC', borderRadius:'10px 0 0 0'}}>
									<div>
										infos
									</div>
								</Col>
							<Col xs='10' style={{padding:0}}>
								<Block getOffset={this.getOffset}/>
									{
										this.state.display.map((block,i) => {
											return (
												<div key={i} style={{background: (block.types === 'missions')?"#ffb74d":"#26a69a", borderRadius:'10px', margin: `15px 0 15px ${block.offset}px`,  width: `${block.width}%`, height: '50px', }}/>
											)
										})
									}
							</Col>
						</Row>
						</Col>
					</Row>
				</Container>
      </div>
    )
  }
}

function mapStateToProps(state) {
	return {
			entrieDate: state.entrieDate,
			monthsArray: state.monthsArray,
			selectedMonth: state.selectedMonth,
	};
};

export default connect(mapStateToProps)(DateComponent);
/*
<Row id={'block'}>
	<Col xs={'12'} style={{padding:0}}>
		<Row>
		<Col xs='2' style={{padding: 0, backgroundColor:'rgba(155,155,155,0.10)', height:`${this.state.offsetHeight}px`, border: '0.5px solid #DCDCDC', borderRadius:'10px 0 0 0'}}>
			<div>
				infos
			</div>
		</Col>
		<Col xs='10' style={{padding:0}}>
			<Block getOffset={this.getOffset}/>
			{
				this.state.display.map((block,i) => {
					return (
						<div key={i} style={{background: (block.types === 'missions')?"#ffb74d":"#26a69a", borderRadius:'10px', margin: `15px 0 15px ${block.offset}px`,  width: `${block.width}px`, height: '50px', }}/>
					)
				})
			}
		</Col>
	</Row>
	</Col>
</Row>

*/







/*
// componentWillReceiveProps(nextProps) {
// 	if(nextProps.selectedMonth !== this.state.selectedMonth) {
// 		this.setState({display: []}, () => {
// 			if(nextProps.entrieDate) {
// 				console.log('nextProps.entrieDate 1: ', nextProps.entrieDate);
//
// 				nextProps.entrieDate.map(x => this.getCount(x))
// 			};
// 		});
// 	} else {
// 		this.setState({selectedMonth: nextProps.selectedMonth}, () => {
// 			if(nextProps.entrieDate) {
// 				console.log('nextProps.entrieDate 2: ', nextProps.entrieDate);
// 				nextProps.entrieDate.map(x => this.getCount(x))
// 			};
// 		});
// 	}
// };
//
// getCount(entrieDate) {
// 	if(entrieDate) {
// 		let currentMonth = new Date().getMonth();
// 		currentMonth = this.getIndexFirstMonth(currentMonth);
// 		let firstDay = entrieDate.dateStart.getDate();
// 		let lastDay = entrieDate.dateStop.getDate();
// 		let monthStart = entrieDate.dateStart.getMonth() - currentMonth;
// 		let monthStop = entrieDate.dateStop.getMonth();
// 		monthStop = this.getIndex(monthStop);
// 		let yearStart = entrieDate.dateStart.getFullYear();
// 		let yearStop = entrieDate.dateStop.getFullYear();
// 		let lastDayOnCurrentMonth = this.getLastDay(yearStart, monthStart)
// 		let lastDayOnCurrentMonth2 = this.getLastDay(yearStop, monthStop)
// 		this.setState({startWidth:(this.state.blockWidth * monthStart)}, () => {this.countStart(firstDay, lastDayOnCurrentMonth)})
// 		this.setState({stopWidth:(this.state.blockWidth * monthStop)}, () => {this.countStop(lastDay, lastDayOnCurrentMonth2, entrieDate.types)})
// 	};
// };
//
// getIndex = (num) => {
// 	const index = this.props.monthsArray.months.find((x, i) => i === num);
// 	const id = this.props.monthsArray.tab.indexOf(index);
// 	return id;
// };
//
// getIndexFirstMonth = () => {
// 	const index = this.props.monthsArray.tab[0];
// 	const id = this.props.monthsArray.months.indexOf(index);
// 	return id;
// };
//
// countStart = (day, lastDayOnCurrentMonth) => {
// 	this.setState({startWidth: this.state.startWidth + Math.round(this.state.blockWidth * ((day*100)/lastDayOnCurrentMonth/100))})
// };
//
// countStop = (day, lastDayOnCurrentMonth, types) => {
// 	this.setState({stopWidth: this.state.stopWidth + Math.round(this.state.blockWidth * ((day*100)/lastDayOnCurrentMonth/100))},
// 	() => {
// 		const blockWidth = this.state.stopWidth - this.state.startWidth;
// 		let newDisplay = [...this.state.display];
// 		console.log('newDisplay : ', newDisplay);
// 		console.log('blockWidth : ', blockWidth);
// 		console.log('this.state.startWidth : ', this.state.startWidth);
// 		if(blockWidth !== 0) {
// 			newDisplay.push({offset: this.state.startWidth, width: blockWidth, types: types})
// 		}
// 		this.setState({display: newDisplay})
// 	});
// };

// componentWillMount() {
// 	const date = new Date().getMonth();
// 	this.setState({selectedMonth: date});
// }

// getOffset = (width, height) => {
// 	this.getOffsetWidth(width);
// 	this.getOffsetHeight(height);
// };
//
// getOffsetWidth = (offset) => {
// 	const blockSize = Math.round(offset / 12);
// 	const NumberBlockSize = Math.round(blockSize/7);
// 	this.setState({
// 		fullWidth: offset,
// 		blockWidth: blockSize,
// 		blockNumberWidth: NumberBlockSize
// 	}, () => this.getCount())
// };

// getOffsetHeight = (offset) => {
// 	this.setState({offsetHeight: offset})
// }

*/
