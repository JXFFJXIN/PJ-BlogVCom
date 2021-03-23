import PageHeader from "./src/pageHeader"

PageHeader.install = (Vue)=>{
    Vue.component(PageHeader.name,PageHeader);
};

export default PageHeader;
