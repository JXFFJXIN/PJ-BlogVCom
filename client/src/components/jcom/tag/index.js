import Tag from './src/tag';

Tag.install = (Vue)=>{
    Vue.component(Tag.name, Tag);
};

export default Tag;