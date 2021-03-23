import TimelineItem from './src/timelineItem';

TimelineItem.install = (Vue)=>{
    Vue.component(TimelineItem.name, TimelineItem);
};

export default TimelineItem;