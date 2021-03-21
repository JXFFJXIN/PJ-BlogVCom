/* 
span 栅格占据的列数 number [0,24] 24
offset 栅格左侧的间隔格数 number [] 0
push 栅格向右移动格数 number [] 0
piull 栅格向左移动格数 number [] 0
xs <768px 响应式栅格数或者栅格属性对象 number/object
sm	≥768px 响应式栅格数或者栅格属性对象	number/object 
md	≥992px 响应式栅格数或者栅格属性对象	number/object 
lg	≥1200px 响应式栅格数或者栅格属性对象	number/object 
xl	≥1920px 响应式栅格数或者栅格属性对象	number/object 
tag	自定义元素标签	string	[]	div
*/

export default {
    name:'j-col',
    props: {
        tag: {
            type: String,
            default: 'div',
        },
        span: {
            type: Number,
            default: 24,
            validator:(val)=>val>=0&&val<=24,
        },
        offset: {
            type: Number,
            default: 0,
        },
        push: {
            type: Number,
            default: 0,
        },
        pull: {
            type: Number,
            default: 0,
        },
        xs: [Number,Object],
        sm: [Number,Object],
        md: [Number,Object],
        lg: [Number,Object],
        xl: [Number,Object],
    },
    computed: {
        gutter(){
            let {$parent:parent} = this;
            while(parent && parent.$options._componentTag !== 'j-row') {
                parent = parent.$parent;
            }
            return parent ? parent.gutter : 0;
        },
        _style() {
            const { gutter } = this;
            return {
                paddingRight:`${gutter/2}px`,
                paddingLeft:`${gutter/2}px`
            }
        },
        _class(){
            const res = ['j-col'];
            ['span','offset','push','pull'].map(item=>{
                if(this[item]!==0){
                    res.push(
                        item === 'span'?`j-col-${this[item]}`:`j-col-${item}-${this[item]}`
                    );
                }
            });
            ['xs','sm','md','lg','xl'].map(item=>{
                if(typeof this[item] === 'number'){
                    res.push(`j-col-${item}-${this[item]}`)
                }else if(typeof this[item] === 'object'){
                    const props = this[item];
                    Object.keys(props).map(prop=>{
                        res.push(
                            prop === 'span'
                            ?`j-col-${item}-${props[prop]}`
                            :`j-col-${item}-${prop}-${props[prop]}`
                        )
                    })
                }
            });
            return res;
        }
    },
    render(h){
        const {tag, _style, _class, $slots:slots} = this;
        return h(
            tag,
            {
                class:_class,
                style:_style,
            },
            slots.default,
        )
    }
}