export default {
    name: 'j-header',
    props:{
        tag: {
            type:String,
            default: 'div',
        },
        height: {
            type:Number,
            default: 60,
        },
    },
    computed:{
        _style(){
            return {
                height:`${this.height}px`,
            }
        }
    },
    render(h){
        const {tag, _style, $slots:slots} = this;
        return h(
            tag,
            {
                class: 'j-header',
                style:_style
            },
            slots.default
        )
    }
}