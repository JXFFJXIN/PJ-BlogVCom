import axios from 'axios';

export default {
    async getAll({
        page,
        pageSize
    }) {
        const {data:{data}} = await axios.get('/api/b', {
            params: {
                page,
                pageSize,
            }
        })
        return data;
    },
    async getById({id}){
        const {data:{data}} =  await axios.get(`/api/b/${id}`)
        return data;
    },
    async getHot({page,pageSize}){
        const {data:{data}} =  await axios.get('/api/b/new',{
            params:{
                page,
                pageSize,
            }
        });
        return data;
    },
    async getByTag({id}){
        const {data:{data:{blogs}}} = await axios.get(`/api/tag/${id}`)
        return blogs;
    },
    getCookie(name){
        const arr = document.cookie.split(';');
        const res = [];
        arr.map(it=>{
            const item = it.split('=');
            if(item[0] === name){
                res.push(item);
            }
        })
        return res[0][1];
    },
    async setOne(blog){
        const res = await axios({
            method:'post',
            url:'/api/b',
            data:blog,
            headers:{
                'x-csrf-token':this.getCookie("csrfToken")
            }
        })
        return res;
    },
}