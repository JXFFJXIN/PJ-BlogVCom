export default {
    name: 'j-main',
    props:{
        tag: {
            type: String,
            default: 'div',
        },
    },
    render(h){
        const {tag, $slots:slots} = this;
        return h(
            tag,
            {
                class:'j-main',
            },
            slots.default
        )
    }
}