<script>
export default {
    name:'j-label-wrap',
    inject:['jForm','jFormItem'],
    props:{
        "is-auto-width": Boolean,
        "update-all": Boolean,
    },
    data(){
        return {
            computedWidth: 0
        };
    },
    render(h){
        const {$solts:{default:slots}, isAutoWidth, computedWidth, jForm:{autoLabelWidth}} = this;
        if(!slots)return null; // label-wrap下没有内容则直接返回
        if(isAutoWidth){// 自适应
            const style = {};
            if(autoLabelWidth && autoLabelWidth !== 'auto'){
                const marginLeft = parseInt(autoLabelWidth,10) - computedWidth;
                if(marginLeft){
                    style.marginLeft = `${marginLeft}px`;
                }
            }
            return h(
                "div",
                {
                    class:[`j-form-item__label-wrap`],
                    style,
                },
                slots
            )
        }else{ // 不自适应
            return slots[0];
        }
    },
    methods: {
        /**
         * 获取宽度
         */
        getLabelWidth(){
            const {$el:el,$el:{firstElementChild}} = this;
            if(el && firstElementChild){
                const computedWidth = window.getComputedStyle(firstElementChild).width;
                return Math.ceil(parseFloat(computedWidth));
            }else{
                return 0;
            }
        },
        /**
         * 更新宽度
         */
        updateLabelWidth(action = 'update'){
            const {$slots:{default:slots},isAutoWidth,$el:{firstElementChild}, getLabelWidth,jForm:{deleteLabelWidth}} = this;
            if(slots && isAutoWidth && firstElementChild){
                if(action === 'update'){
                    this.computedWidth = getLabelWidth();
                }else if(action === 'remove'){
                    deleteLabelWidth(this.computedWidth);
                }
            }
        }
    },
    /**
     * 监听computedWidth
     * 响应式更改
     */
    watch: {
        computedWidth(val,oldVal){
            const {updateAll, jForm:{updateLabelWidth:update},jFormItem:{updateComputedLabelWidth:updateComputed}} = this;
            if(updateAll){
                update(val, oldVal);
                updateComputed(val);
            }
        }
    },
    mounted(){
        this.ipdateLabelWidth('update');
    },
    updated(){
        this.updateLabelWidth('update');
    },
    beforeDestroy(){
        this.updateLabelWidth('remove');
    }
}
</script>