'use client'
import React, { useState } from 'react'
import SelectTopic from './_components/SelectTopic'
import SelectStyle from './_components/SelectStyle'
import SelectDuration from './_components/SelectDuration';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import CustomLoading from './_components/CustomLoading';
import { v4 as uuidv4 } from 'uuid';

export default function CreateNew() {

  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [videoScript, setVideoScript] = useState();
  const [audioFileUrl, setAudioFileUrl]=useState();

  const onHandleInputChange = (fieldName, fieldValue) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  const onCreateClickHandler = () => {
    getVideoScript();
  };


  //Get Video Script 
  const getVideoScript = async()=>{
    setLoading(true)
    const prompt = 'write a script to generate '+formData.duration+' video on topic: '+formData.topic+' along with Ai image prompt in '+formData.imageStyle+' format for each scene and give me result in JSON format with imagePrompt and ContentText as field, No Plain text '

    console.log(prompt)
    const result = await axios.post('/api/get-video-script',{
      prompt: prompt 
    }).then(resp=>{
       console.log(resp.data.result)
      setVideoScript(resp.data.result);
      GenerateAudioFile(resp.data.result);
    });
    setLoading(false);
  }

  const GenerateAudioFile=async(videoScriptData)=>{
    setLoading(true)
    let script='';
    const id=uuidv4();
    videoScriptData.forEach(item=>{
      script=script+item.contentText+' ';
    })

    console.log(script);

    await axios.post('/api/generate-audio',{
      text:script,
      id:id
    }).then(resp=>{
      setAudioFileUrl(resp.data.result);
    })
    setLoading(false)
  }

  return (
    <div className='md:px-20'>
       <h2 className='font-bold text-4xl text-primary text-center'>Create New </h2>
        
       <div className='mt-10 shadow-md p-10'>
        {/* Select Topic */}
        <SelectTopic onUserSelect={onHandleInputChange}/>

        {/* Select Style */}
        <SelectStyle onUserSelect={onHandleInputChange}/>

        {/* Duration */}
        <SelectDuration onUserSelect={onHandleInputChange} />

        {/* Create Button*/}
        <Button className="mt-10 w-full" onClick={onCreateClickHandler} >Create Short Video</Button>
       </div>

       <CustomLoading loading={loading}/>
    </div>
  )
}
