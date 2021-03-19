import Row from './row';
import Col from './col';
import Footer from './footer';
import Header from './header';
import Main from './main';
import Aside from './aside';
import Container from './container';
import Button from './button';
import ButtonGroup from './buttonGroup';

const components = [
    Row,
    Col,
    Footer,
    Header,
    Main,
    Aside,
    Container,
    Button,
    ButtonGroup,
]

const install = (Vue) => {
    components.forEach((component)=>{
        Vue.component(component.name, component);
    });
};

export default {
    install,
    Row,
    Col,
    Footer,
    Header,
    Main,
    Aside,
    Container,
    Button,
    ButtonGroup,
}

export {
    install,
    Row,
    Col,
    Footer,
    Header,
    Main,
    Aside,
    Container,
    Button,
    ButtonGroup,
}
