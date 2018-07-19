<template>
    <div>{{numberFormatted}}</div>
</template>
<script>
import { formatNumber } from '@js/utils';
import { setInterval, clearInterval } from 'timers';

export default {
    name: 'vCountUp',
    props: {
        number: Number, //数值
        during: { //动画持续时长，ms
            type: Number,
            default: 1000
        },
        formatter: { //格式化函数
            type: Function,
            default(v) {
                return formatNumber(v);
            }
        }
    },
    computed: {
        numberFormatted() {
            return this.formatter(this.instantNumber);
        }
    },
    data() {
        return {
            instantNumber: 0 //动画变换时的瞬时值
        }
    },
    watch: {
        number() {
            this.run();
        }
    },
    methods: {
        run() { //启动动画
            if(this._intervalId){
                clearInterval(this._intervalId);
                this._intervalId = null;
            }
            if (this.number === 0 || this.during === 0) {
                this.instantNumber = this.number;
            }
            let eachTime = 60, //每帧时长
                times = Math.floor(this.during / eachTime), //帧数
                adder = this.number / times; //每帧的递增值
            this.instantNumber = 0;
            this._intervalId = setInterval(() => {
                this.instantNumber += adder;
                times--;
                if (times == 0) {
                    this.instantNumber = this.number;
                    clearInterval(this._intervalId);
                    this._intervalId = null;
                    this.$emit('end', this.numberFormatted);
                }
            }, eachTime);
        }
    },
    mounted() {
        this.run();
    }
}
</script>
<style lang="scss" rel="stylesheet/scss">

</style>
