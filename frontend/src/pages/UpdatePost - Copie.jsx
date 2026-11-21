import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from '../firebase.js';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UpdatePost = () => {

  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);

  const { currentUser } = useSelector((state) => state.user); 
  const navigate = useNavigate();
  const { postId } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/backend/post/getposts?postId=${postId}`);
        const data = await res.json();
        if (!res.ok) {
          setPublishError(data.message);
          return;
        }
        setFormData(data.posts[0]);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchPost();
  }, [postId]);

  const handleImageUpload = async () => {
    if (!file) {
      setImageUploadError('Please select an image to upload');
      return;
    }
    setImageUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + '-' + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setImageUploadProgress(progress.toFixed(0));
    }, (error) => {
      setImageUploadError('Image upload failed');
      setImageUploadProgress(null);
    }, () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setFormData({...formData, image: downloadURL});
        setImageUploadProgress(null);
        setImageUploadError(null);
      });
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/backend/post/updatepost/${formData._id}/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }
      navigate(`/post/${data.slug}`);
    } catch (error) {
      setPublishError('Something went wrong');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 min-h-screen">
      <h1 className="text-4xl font-semibold text-center mb-6">Update Your Post</h1>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="flex gap-4 sm:flex-row sm:gap-6">
          <TextInput
            type="text"
            placeholder="Post Title"
            required
            id="title"
            className="flex-1 bg-gray-100 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            value={formData.title}
          />
          <Select
            onChange={(e) => setFormData({...formData, category: e.target.value})}
            value={formData.category}
            className="flex-1 bg-gray-100 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
          >
            <option value="uncategorized">Select a Category</option>
            <option value="Blog">Blog</option>
            <option value="Event">Event</option>
          </Select>          
        </div>

        <div className="flex gap-6 items-center justify-between p-4 border-2 border-dashed border-teal-500 rounded-md">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="bg-gray-100 rounded-md shadow-sm"
          />

          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            onClick={handleImageUpload}
            className="text-white bg-teal-600 hover:bg-teal-700"
          >
            {imageUploadProgress ? (
              <div className="w-16 h-16">
                <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress}%`} />
              </div>
            ) : (
              "Upload Image"
            )}
          </Button>
        </div>

        {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}

        {formData.image && (
          <img 
            src={formData.image}
            alt="upload"
            className="w-full h-72 object-cover rounded-md shadow-lg my-4"
          />
        )}

        {formData.category === 'Event' && (
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="eventDeadline" className="text-sm font-medium text-gray-700">Event Deadline</label>
              <TextInput
                type="date"
                id="eventDeadline"
                value={formData.eventDeadline ? formData.eventDeadline.split('T')[0] : ''}
                onChange={(e) => setFormData({...formData, eventDeadline: e.target.value})}
                className="bg-gray-100 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="maxMembers" className="text-sm font-medium text-gray-700">Max Members</label>
              <TextInput
                type="number"
                id="maxMembers"
                min="1"
                value={formData.maxMembers || ''}
                onChange={(e) => setFormData({...formData, maxMembers: e.target.value})}
                className="bg-gray-100 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}

        <ReactQuill 
          theme="snow"
          className="h-72 mb-6 rounded-md shadow-sm"
          required
          onChange={(value) => setFormData({...formData, content: value})}
          value={formData.content}
        />

        <Button
          type="submit"
          gradientDuoTone="purpleToPink"
          className="w-full py-3 text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg shadow-lg"
        >
          Update Post
        </Button>

        {publishError && <Alert color="failure" className="mt-4">{publishError}</Alert>}
      </form>
    </div>
  );
};

export default UpdatePost;
