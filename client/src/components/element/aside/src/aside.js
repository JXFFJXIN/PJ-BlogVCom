export default {
    name: 'j-aside',
    props:{
        tag:{
            type:String,
            default:'div',
        },
        width:{
            type:String,
            default:300,
        },
    },
    computed:{
        _style(){
            return{
                width:`${this.width}px`,
            }
        }
    },
    render(h){
        const {tag, _style, $slots:slots} = this;
        return h(
            tag,
            {
                class:'j-aside',
                style:_style,
            },
            slots.default
        )
    }
}