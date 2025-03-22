import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase.js';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);

  const navigate = useNavigate();

  const handleImageUpload = async () => {
    try {
      if (!file) {
        setImageUploadError('Please select an image to upload');
        return;
      }

      setImageUploadError(null);

      const storage = getStorage(app);
      const fileName = new Date().getTime() + '-' + file.name;

      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError('Image upload failed');
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError('Image upload failed');
      setImageUploadProgress(null);
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/backend/post/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      setPublishError('Something went wrong');
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto min-h-screen flex justify-center items-center">
      <div className="w-full p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-center text-3xl font-semibold text-gray-800 mb-6">Create a Post</h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TextInput
              type="text"
              placeholder="Title"
              required
              id="title"
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            <Select
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
            >
              <option value="uncategorized">Select a category</option>
              <option value="Blog">BLOG</option>
              <option value="Event">EVENT</option>
              
            </Select>
          </div>

          <div className="flex items-center gap-4 border-4 border-teal-500 border-dotted p-4 rounded-lg">
            <FileInput
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <Button
              type="button"
              gradientDuoTone="purpleToBlue"
              size="sm"
              outline
              onClick={() => handleImageUpload()}
            >
              {imageUploadProgress ? (
                <div className="w-16 h-16">
                  <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress || 0}%`} />
                </div>
              ) : (
                'Upload Image'
              )}
            </Button>
            
          </div>

          {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}

          {formData.image && (
            <img src={formData.image} alt="upload" className="w-full h-72 object-cover rounded-lg" />
          )}

          <ReactQuill
            theme="snow"
            className="h-72 mb-6"
            required
            onChange={(value) => {
              setFormData({ ...formData, content: value });
            }}
          />

          <Button type="submit" gradientDuoTone="purpleToPink" className="w-full py-3 text-lg">
            Publish
          </Button>

          {publishError && (
            <Alert className="mt-4" color="failure">
              {publishError}
            </Alert>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
