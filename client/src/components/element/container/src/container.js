/* 
direction	子元素的排列方向	string	horizontal / vertical	子元素中有 j-header 或 j-footer 时为 vertical，否则为 horizontal
*/

export default {
    name: 'j-container',
    props: {
        tag: {
            type: String,
            default :'div',
        },
        direction:{
            type: String,
            validator: (val) => ['horizontal','vertical'].includes(val),
        }
    },
    computed:{
        isVertical(){
            if(this.direction === 'vertical'){
                return true;
            }
            if(this.direction === 'horizontal'){
                return false;
            }
            return this.$slots && this.$slots.default
            ? this.$slots.default.some((vNode) => {
            const tag = vNode.componentOptions && vNode.componentOptions.tag;
            return tag === 'j-header' || tag === 'j-footer';
            }) 
            : false;
        },
    },
    render(h){
        const {tag, $slots:slots, isVertical} = this;
        return h(
            tag,
            {
                class:['j-container',isVertical?`is-vertical`:""],
            },
            slots.default
        )
    }
}