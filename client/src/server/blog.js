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
        const res =  await axios.get('/api/b',{
            params:{
                id,
            }
        })
        return res;
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
        const res = await axios.get('/api/tag',{
            params:{
                id,
            }
        })
        return res;
    },
    async setOne(blog){
        await axios.post('/api/b',{
            data:blog,
        })
    },
}