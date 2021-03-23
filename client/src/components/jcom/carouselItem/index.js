import CarouselItem from './src/carouselItem'

CarouselItem.install = (Vue)=>{
    Vue.component(CarouselItem.name,CarouselItem);
};

export default CarouselItem;
