/* 

参数	    说明	        类型	可选值	                默认值
size	    尺寸	        string	medium                  / small / mini	—
type	    类型	        string	primary                 / success / warning / danger / info / text	—
plain	    是否朴素按钮	boolean	—	                    false
round	    是否圆角按钮	boolean	—	                    false
circle	    是否圆形按钮	boolean	—	                    false
loading	    是否加载中状态	boolean	—	                    false
disabled    是否禁用状态	boolean	—	                    false
icon	    图标类名	    string	—	                    —
autofocus	是否默认聚焦	boolean	—	                    false
native-type	原生 type 属性	string	button / submit / reset	button
*/

export default {
    name: 'j-button',
    props:{
        tag:{
            type: String,
            default: 'button',
            validator: (val)=>["button", "submit", "reset"].includes(val)
        },
        size:{
            type: String,
            default: 'medium',
            validator: (val)=>['medium','small','mini'].includes(val)
        },
        type:{
            type: String,
            default: 'primary',
            validator: (val)=>['primary','success','info','warning','danger','text'].includes(val),
        },
        plain: {
            type: Boolean,
            default: false,
        },
        round: {
            type: Boolean,
            default: false,
        },
        circle: {
            type: Boolean,
            default: false,
        },
        loading: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        icon: {
            type: String,
        },
        autoFocus: {
            type: Boolean,
        }
    },
    computed: {
        _class(){
            const {size, type, plain, round, circle, loading, disabled} = this;
            return [
                'j-button',
                `j-button--${size}`,
                `j-button--${type}`,
                plain?'is-plain':'',
                round?'is-round':'',
                circle?'is-circle':'',
                loading?'is-loading':'',
                disabled?'is-disabled':'',
            ]
        }
    },
    render(h){
        const {tag, _class, $slots:slots, autofocus, icon, loading} = this;
        return h(
            tag,
            {
                class:_class,
                autofocus,
            },
            [
                icon && !loading
                ?h('i',{class:icon},null):null,
                loading
                ?h('i',{class:`j-icon-loading`},null):null,
                slots.default
                ?h('span',slots.default):null,
            ]
        )
    }
}