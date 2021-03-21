import Form from './src/form';

Form.install = (Vue)=>{
    Vue.Component(Form.name,Form);
};

export default Form;
