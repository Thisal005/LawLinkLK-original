import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';

const ProfileSettings = ({ profilePicture, displayName, practiceAreas, onSave }) => {
  const [tempProfilePicture, setTempProfilePicture] = useState(profilePicture);
  const [tempDisplayName, setTempDisplayName] = useState(displayName);
  const [tempPracticeAreas, setTempPracticeAreas] = useState(practiceAreas);
  const [qualificationPhotos, setQualificationPhotos] = useState([]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setTempProfilePicture(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setTempProfilePicture("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
  };

  const handleQualificationPhotoUpload = (event) => {
    const files = event.target.files;
    if (files) {
      const newPhotos = Array.from(files).map(file => URL.createObjectURL(file));
      setQualificationPhotos([...qualificationPhotos, ...newPhotos]);
    }
  };

  const handleRemoveQualificationPhoto = (index) => {
    const updatedPhotos = qualificationPhotos.filter((_, i) => i !== index);
    setQualificationPhotos(updatedPhotos);
  };

  const handleSaveChanges = () => {
    onSave({
      profilePicture: tempProfilePicture,
      displayName: tempDisplayName,
      practiceAreas: tempPracticeAreas,
    });
  };

  return (
    <div className="p-7">
      <div className="space-y-8">
        <div>
          <h1 className="text-xl font-semibold text-gray-600">Account Settings</h1>
          <hr /><br />
          <div className="flex items-center gap-6">
            <img 
              src={tempProfilePicture}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover ring-4 ring-gray-100"
            />
            <div className="space-y-2">
              <input
                type="file"
                id="profile-picture-upload"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              <label
                htmlFor="profile-picture-upload"
                className="px-2 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2 cursor-pointer"
              >
                <Upload className="w-4 h-4" />
                Upload new photo
              </label>
              <button
                onClick={handleRemovePhoto}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors block text-sm"
              >
                Remove photo
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Display Name</label>
            <input 
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="How clients will see you"
              value={tempDisplayName}
              onChange={(e) => setTempDisplayName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input 
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Your legal name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input 
              type="email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number</label>
            <input 
              type="tel"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="+94 XX XXX XXXX"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Languages Known</label>
            <input 
              type="tel"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Languages you can communicate in"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Practice Courts</label>
            <input 
              type="tel"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Enter the courts you practice in"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Qualifications</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleQualificationPhotoUpload}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
            <div className="mt-4 grid grid-cols-3 gap-4">
              {qualificationPhotos.map((photo, index) => (
                <div key={index} className="relative">
                  <img
                    src={photo}
                    alt={`Qualification ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => handleRemoveQualificationPhoto(index)}
                    className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
            <input 
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="e.g., Criminal Law, Corporate Law"
              value={tempPracticeAreas}
              onChange={(e) => setTempPracticeAreas(e.target.value)}
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Professional Biography</label>
            <textarea 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors h-32"
              placeholder="Tell clients about your experience and expertise..."
            ></textarea>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            onClick={handleSaveChanges}
            className="px-2 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;