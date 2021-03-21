export default {
    name: 'j-button-group',
    props: {
        tag:{
            type:String,
            default: 'div',
        }
    },
    render(h){
        const {tag, $slots:slots} = this;
        return h(
            tag,
            {
                class:'j-button-group',
            },
            slots.default,
        )
    }
}