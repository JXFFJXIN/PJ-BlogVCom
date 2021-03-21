import LabelWrap from "./src/label-wrap";

LabelWrap.install = (Vue)=>{
    Vue.component(LabelWrap.name,LabelWrap);
};

export default LabelWrap;
