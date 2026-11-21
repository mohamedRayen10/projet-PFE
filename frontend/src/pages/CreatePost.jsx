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
  const [formData, setFormData] = useState({ category: 'uncategorized' });
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
        () => {
          setImageUploadError('Image upload failed');
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData(prev => ({ ...prev, image: downloadURL }));
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }
      setPublishError(null);
      navigate(`/post/${data.slug}`);
    } catch (error) {
      setPublishError('Something went wrong');
    }
  };

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 md:px-10 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-10 space-y-10">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white">Create a New Post</h1>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-300 mt-2">Craft and share your story or announce an event.</p>
        </div>

        <form className="space-y-8" onSubmit={handleSubmit}>
          {/* Title and Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-white mb-1">Post Title</label>
              <TextInput
                id="title"
                placeholder="E.g. My Journey in Tech"
                required
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="rounded-xl border-gray-300 dark:border-gray-700"
              />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-white mb-1">Category</label>
              <Select
                id="category"
                required
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="rounded-xl border-gray-300 dark:border-gray-700"
              >
                <option value="uncategorized">Select a Category</option>
                <option value="Blog">Blog</option>
                <option value="Event">Event</option>
              </Select>
            </div>
          </div>

          {/* Event Fields */}
          {formData.category === 'Event' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="maxMembers" className="block text-sm font-medium text-gray-700 dark:text-white mb-1">Max Participants</label>
                <TextInput
                  id="maxMembers"
                  type="number"
                  min="1"
                  required
                  onChange={(e) =>
                    setFormData(prev => ({ ...prev, maxMembers: Number(e.target.value) }))
                  }
                  className="rounded-xl border-gray-300 dark:border-gray-700"
                />
              </div>
              <div>
                <label htmlFor="eventDeadline" className="block text-sm font-medium text-gray-700 dark:text-white mb-1">Event Deadline</label>
                <TextInput
                  id="eventDeadline"
                  type="date"
                  required
                  onChange={(e) =>
                    setFormData(prev => ({ ...prev, eventDeadline: e.target.value }))
                  }
                  className="rounded-xl border-gray-300 dark:border-gray-700"
                />
              </div>
            </div>
          )}

          {/* Image Upload */}
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-white mb-2">Post Image</label>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl">
              <FileInput
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
                className="flex-grow"
              />
              <Button type="button" onClick={handleImageUpload} size="sm" gradientDuoTone="redToPink">
                {imageUploadProgress ? (
                  <div className="w-14 h-14">
                    <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress}%`} />
                  </div>
                ) : (
                  'Upload Image'
                )}
              </Button>
            </div>
            {imageUploadError && <Alert color="failure" className="mt-2">{imageUploadError}</Alert>}
            {formData.image && (
              <img
                src={formData.image}
                alt="Uploaded preview"
                className="mt-4 rounded-xl object-cover w-full h-64 shadow-md"
              />
            )}
          </div>

          {/* Post Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">Post Content</label>
            <ReactQuill
              theme="snow"
              onChange={(value) => setFormData(prev => ({ ...prev, content: value }))}
              className="h-72 border-2 border-gray-300 dark:border-gray-600 rounded-xl"
            />
          </div>

          {/* Submit Button */}
          <Button type="submit" gradientDuoTone="redToOrange" className="w-full py-3 text-lg font-semibold rounded-xl">
            Publish Post
          </Button>

          {/* Error Alert */}
          {publishError && (
            <Alert color="failure" className="mt-4">
              {publishError}
            </Alert>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
