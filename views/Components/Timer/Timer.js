import React, { Component,Fragment } from 'react';
import {View, Text } from 'react-native';
import { Core, Fonts, Utils} from '../../../Helper';
import styles from './styles';

const secInDay = 86400;
const timeS = 365.25 * secInDay;
class TimerCountDown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            days: 0,
            hours: 0,
            min: 0,
            sec: 0,
        }
    }

    async componentDidMount() {
      const {scheduleDate} = this.props;
      this.startTimer(Utils.returnMiliSecond(Utils.getFormatedDateUTC(scheduleDate,"YYYY-MM-DD HH:mm:ss")))
    }

    componentWillUnmount() {
        this.stop(true);
        this.setState = () => {
            return;
        };
    }

    render() {
        const {scheduleDate,fontSize,lineHeight,isTimerText,colorTimer} = this.props;
        const {days,hours,min,sec} = this.state;
        let cTime = hours + ':' + min + ':' + sec;
        return(
            <View style ={styles.container}>
              {
                  (days >= 1)?
                  <Text style={styles.textDay(fontSize,lineHeight)}>{Utils.getFormatedDateUTC(scheduleDate,"DD MMM")}</Text>
                  :
                  <Fragment>
                    {
                        ((cTime !== '0:0:0')) ?
                        <Text style={styles.textTime(lineHeight, fontSize, colorTimer)}>{(isTimerText || '')}<Text style={styles.textTimer(colorTimer)}>{hours} : {min} : {sec}</Text></Text>
                        :
                        <Text style={styles.textDay(fontSize,lineHeight)}>{(isTimerText || '')}<Text style={styles.textDate}>{Utils.getFormatedDateUTC(scheduleDate,"DD MMM, HH:mm A")}</Text></Text>
                    }
                </Fragment>
              }
            </View>
        )
    }
    calculateCountdown=(endDate)=>{
        let diff = (endDate - new Date().getTime()) / 1000;
        // clear countdown when date is reached
        if (diff <= 0) return false;
        const timeLeft = {
            years: 0,
            days: 0,
            hours: 0,
            min: 0,
            sec: 0,
            millisec: 0,
        };

        // calculate time difference between now and expected date
        if (diff >= timeS) { // 365.25 * 24 * 60 * 60
            timeLeft.years = Math.floor(diff / timeS);
            diff -= timeLeft.years * timeS;
        }
        if (diff >= secInDay) { // 24 * 60 * 60
            timeLeft.days = Math.floor(diff / secInDay);
            diff -= timeLeft.days * secInDay;
        }
        if (diff >= 3600) { // 60 * 60
            timeLeft.hours = Math.floor(diff / 3600);
            diff -= timeLeft.hours * 3600;
        }
        if (diff >= 60) {
            timeLeft.min = Math.floor(diff / 60);
            diff -= timeLeft.min * 60;
        }
        timeLeft.sec = diff;
        return timeLeft;
    }

    setTimerValue=(timeLeft)=> {
        this.setState({
            days: this.addLeadingZeros(timeLeft.days),
            hours: this.addLeadingZeros(timeLeft.hours),
            min: this.addLeadingZeros(timeLeft.min),
            sec: this.addLeadingZeros(parseInt(timeLeft.sec)),
        })
    }

    startTimer=(scheduleDate)=> {
        const date = this.calculateCountdown(scheduleDate);
        date ? this.setTimerValue(date) : this.stop();

        this.interval = setInterval(() => {
            const date = this.calculateCountdown(scheduleDate);
            date ? this.setTimerValue(date) : this.stop();
        }, 1000);
    }

    stop=(isWillUnmount)=> {
        const {timerCallback} = this.props;
        if (timerCallback && !isWillUnmount) {
            timerCallback()
        }
        this.setState({
            days: 0,
            hours: 0,
            min: 0,
            sec: 0
        })
        clearInterval(this.interval);
    }

    addLeadingZeros=(value)=>{
        value = String(value);
        while (value.length < 2) {
            value = '0' + value;
        }
        return value;
    }
}

export default TimerCountDown;
