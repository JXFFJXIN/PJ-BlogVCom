<script>
export default {
    name:'j-tag',
    props:{
        text:{
            type: String,
        },
        closable:{
            type: Boolean,
        },
        type:{
            type:String,
        },
        hit:{
            type:Boolean,
        },
        disableTransitions:{
            type: Boolean,
        },
        color:{
            type: String,
        },
        size:{
            type: String,
        },
        effect:{
            type: String,
            default: 'dark',
            validator: (val)=>['dark','light','plain'].includes(val),
        }
    },
    methods: {
        handleClose(e){
            e.stopPropagation();
            this.$emit('close',e);
        },
        handleClick(e){
            this.$emit('click',e);
        }
    },
    computed:{
        tagSize(){
            return this.size ;
        },
        _class(){
            const {type, tagSize,hit,effect} = this;
            return [
                `j-tag`,
                type ? `j-tag--${type}`:'',
                tagSize ? `j-tag--${tagSize}`:'',
                effect ? `j-tag--${effect}`:'',
                hit && 'is-hit',
            ]
        }
    },
    render(){
        const {_class, color, $slots:slots,closable,handleClick,handleClose} = this;
        const tagEl = (
        <span
          class={ _class }
          style={{ backgroundColor: color }}
          on-click={ handleClick }>
          { slots.default }
          {
            closable && <i class="j-tag__close j-icon-close" on-click={ handleClose }></i>
          }
        </span>
        );
        return this.disableTransitions ? tagEl : (<transition name="j-zoom-in-center">{ tagEl }</transition>)
    }
}
</script>

<style>

</style>