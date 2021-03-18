/**
 * gutter 栅格间隔 number [] 0
 * type 布局模式 string [] flex 
 * justify flex布局下的水平排列方式 string [start,end,center,space-around/space-between] start
 * align flex布局下的垂直排列方式 string [top,middle,bottom] top
 * tag 自定义元素标签 string []div
 */
 export default {
    name: 'j-row',
    props: {
        gutter: {
            type:Number,
            default: 0,
            validator: (val)=>val>=0,
        },
        type: {
            type:String,
            default: 'flex',
            validator: (val)=>['inline','inline-block','block','none','flex'].includes(val),
        },
        justify: {
            type: String,
            default: 'start',
            validator:(val)=>['start','end','center','space-around','space-between'].includes(val),
        },
        align: {
            type: String,
            default: 'top',
            validator:(val)=>['top','middle','bottom'].includes(val),
        },
        tag: {
            type: String,
            default: 'div',
        },
    },
    computed: {
        _style() {
            const { gutter } = this;
            return {
                marginRight:`${-gutter/2}px`,
                marginLeft:`${-gutter/2}px`,
            }
        },
        _class() {
            const { justify, align, type } = this;
            return [
                'j-row',
                `j-row--${type}`,
                justify !== 'start' && `is-justify-${justify}`,
                align !== 'top' && `is-align-${align}`,
            ]
        }
    },
    render(h){
        const {tag, _style, _class, $slots} = this;
        return h(
            tag,
            {
                style: _style,
                class: _class,
            },
            $slots.default
        )
    }
}