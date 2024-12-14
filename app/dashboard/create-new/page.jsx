'use client'
import React, { useState } from 'react'
import SelectTopic from './_components/SelectTopic'
import SelectStyle from './_components/SelectStyle'
import SelectDuration from './_components/SelectDuration';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import CustomLoading from './_components/CustomLoading';
import { v4 as uuidv4 } from 'uuid';


const FILEURL='https://firebasestorage.googleapis.com/v0/b/ai-video-generator-d0362.firebasestorage.app/o/ai-video-file%2F17ed90e9-0945-4fc8-b508-108bec91bf02.mp3?alt=media&token=670b2052-91d0-4a18-bba2-b3133c9ad64a'

export default function CreateNew() {

  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [videoScript, setVideoScript] = useState();
  const [audioFileUrl, setAudioFileUrl]=useState();
  const [captions, setCaptions] = useState()

  const onHandleInputChange = (fieldName, fieldValue) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  const onCreateClickHandler = () => {
    // getVideoScript();
    // GenerateAudioFile(scriptData);
    GenerateAudioCaption(FILEURL);
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

  const GenerateAudioCaption=async(fileUrl)=>{
    setLoading(true);

    await axios.post('/api/generate-caption',{
      audioFileUrl:fileUrl
    }).then(resp=>{
      console.log(resp.data.result);
      setCaptions(resp?.data.result);
    })
    setLoading(false);
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
