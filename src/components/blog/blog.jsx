import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import "./blog.css"

const Blog = () => {
    const authToken=useSelector(state=>state.user.authToken);
    const [blog,setBlog]=useState([]);
    const [blogSlug,setBlogSlug]=useState('weekend-reads');
    const [blogCatData,setBlogCatData]=useState([]);
    const [activeCat,setActiveCat]=useState(null);
  



    async function blogCat() {
        try {
            await  axios.get('https://api-staging-v2.sploot.space/api/v2/cms/post-categories', {
                headers: { authorization: "Bearer " + authToken }
            }).then(res=>{
                setBlog(res.data.data.data)
            })
         
           
        }
        catch (err) {
            console.log(err);
        }
        

    
    }
     
    async function blogCatgData() {
       await blogCat();
       try{
        const res = await axios.get(`https://api-staging-v2.sploot.space/api/v2/public/cms/post-categories/`+blogSlug  , {
            headers: { authorization: "Bearer " + authToken }
         });
         setBlogCatData(res.data.data.data);
         

    }catch(err){

    }
           
            
        }
        
    useEffect( ()=>{
        blogCatgData()

    },[blogSlug])

    const handleClick=async(slug,id)=>{
    setBlogSlug(slug);
setActiveCat(id);
     blogCatgData();
    }
  

  return (
    <>

    <div className="blogHead">
        {blog.map((category) => (
            <div key={category.id} className={"blogCat"+ (activeCat===category.id?"Active":"")} onClick={()=>handleClick(category.slug,category.id)}>
              <img src={category.imageUrl} className='blogImg' alt={category.name} />
              <p className="catName">{category.name}</p>
            </div>
          ))}
          
    </div>
    <div className="blogDataParent">
            {blogCatData.length===0 ? (
                <p className="blogdataerrmessage">No Posts here 😓</p>):
            (

                   blogCatData.map((data)=>(
         <div key={data.id} className="blogData">
            <img className='imgBlogData' src={data.imageUrl} onClick={()=>{
              
                window.open(data.redirectUrl, '_blank');
            }}/>
            <h4 className='titleBlog'>{data.title}</h4>
            <p className='descriptionBlog'>{data.description}</p>


         </div>
            ))
            )
}


    </div>
    </> 
  )
}

export default Blog