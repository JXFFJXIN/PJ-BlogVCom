import Row from './row';
import Col from './col';
import Footer from './footer';
import Header from './header';
import Main from './main';
import Aside from './aside';
import Container from './container';
import Button from './button';
import ButtonGroup from './buttonGroup';
import Input from './input';
import LabelWrap from './label-wrap';
import Backtop from './backtop';
import Icon from './icon';
import Divider from './divider';
import Card from './card';
import PageHeader from './pageHeader';
import Breadcrumb from './breadcrumb';
import BreadcrumbItem from './breadcrumbItem';
import Tag from './tag';
import Timeline from './timeline';
import TimelineItem from './timelineItem';
import Carousel from './carousel';
import CarouselItem from './carouselItem';
import Radio from './radio';
import RadioGroup from './radioGroup';
import RadioButton from './radioButton';
import Checkbox from './checkbox';
import CheckboxButton from './checkboxButton';
import CheckboxGroup from './checkboxGroup';

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
    Input,
    Carousel,
    CarouselItem,
    LabelWrap,
    Backtop,
    Icon,
    Divider,
    Card,
    PageHeader,
    Breadcrumb,
    BreadcrumbItem,
    Tag,
    Timeline,
    TimelineItem,
    Radio,
    RadioGroup,
    RadioButton,
    Checkbox,
    CheckboxButton,
    CheckboxGroup,
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
    Input,
    Carousel,
    CarouselItem,
    LabelWrap,
    Backtop,
    Icon,
    Divider,
    Card,
    PageHeader,
    Breadcrumb,
    BreadcrumbItem,
    Tag,
    Timeline,
    TimelineItem,
    Radio,
    RadioGroup,
    RadioButton,
    Checkbox,
    CheckboxButton,
    CheckboxGroup,
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
    Input,
    Carousel,
    CarouselItem,
    LabelWrap,
    Backtop,
    Icon,
    Divider,
    Card,
    PageHeader,
    Breadcrumb,
    BreadcrumbItem,
    Tag,
    Timeline,
    TimelineItem,
    Radio,
    RadioGroup,
    RadioButton,
    Checkbox,
    CheckboxButton,
    CheckboxGroup,
}
