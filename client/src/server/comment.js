import axios from 'axios';

export default {
    async getAll({
        page,
        pageSize
    }) {
        const {data:{data}} = await axios.get('/api/cmt/new', {
            params: {
                page,
                pageSize,
            }
        })
        return data;
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
    async setOne(comment) {
        const {data:{data:res}} = await axios({
            method:'post',
            url:'/api/cmt',
            data:comment,
            headers:{
                'x-csrf-token':this.getCookie("csrfToken")
            }
        })
        return res;
    },
}