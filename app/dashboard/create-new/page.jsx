'use client'
import React, { useState } from 'react'
import SelectStyle from './_components/SelectStyle'
import SelectDuration from './_components/SelectDuration';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import CustomLoading from './_components/CustomLoading';
import { v4 as uuidv4 } from 'uuid';
import ProductContentManager from './_components/ProductContentManager'

export default function CreateNew() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [videoScript, setVideoScript] = useState();
  const [audioFileUrl, setAudioFileUrl] = useState();
  const [captions, setCaptions] = useState()

  const onHandleInputChange = (fieldName, fieldValue) => {  
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  const onCreateClickHandler = () => {
     getVideoScript();
  };

  const getVideoScript = async () => {
    setLoading(true)
    const prompt = `write a script to generate ${formData.duration} video on topic: ${formData.topic} along with Ai image prompt in ${formData.imageStyle} format for each scene and give me result in JSON format with imagePrompt and ContentText as field, No Plain text`

    console.log(prompt)
    try {
      const resp = await axios.post('/api/get-video-script', { prompt: prompt });
      console.log(resp.data.result)
      setVideoScript(resp.data.result);
      await GenerateAudioFile(resp.data.result);
    } catch (error) {
      console.error("Error getting video script:", error);
    } finally {
      setLoading(false);
    }
  }

  const GenerateAudioFile = async (videoScriptData) => {
    setLoading(true)
    let script = videoScriptData.map(item => item.contentText).join(' ');
    const id = uuidv4();

    console.log(script);

    try {
      const resp = await axios.post('/api/generate-audio', { text: script, id: id });
      console.log(resp.data)
      setAudioFileUrl(resp.data.result);
    } catch (error) {
      console.error("Error generating audio file:", error);
    } finally {
      setLoading(false)
    }
  }

  const GenerateAudioCaption = async (fileUrl) => {
    setLoading(true);

    try {
      const resp = await axios.post('/api/generate-caption', { audioFileUrl: fileUrl });
      console.log(resp.data.result);
      setCaptions(resp?.data.result);
    } catch (error) {
      console.error("Error generating audio caption:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='md:px-20'>
       <h2 className='font-bold text-4xl text-primary text-center'>Create New </h2>
        
       <div className='mt-10 shadow-md p-10'>
        <ProductContentManager 
          onProductScraped={(name) => onHandleInputChange('topic', name)}
          onTopicSelected={(topic) => onHandleInputChange('topic', topic)}
        />

        {/* Select Style */}
        <SelectStyle onUserSelect={onHandleInputChange}/>

        {/* Duration */}
        <SelectDuration onUserSelect={onHandleInputChange} />

        {/* Create Button*/}
        <Button className="mt-10 w-full" onClick={onCreateClickHandler}>Create Short Video</Button>
       </div>

       <CustomLoading loading={loading}/>
    </div>
  )
}

