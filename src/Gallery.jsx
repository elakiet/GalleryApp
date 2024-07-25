 // src/Gallery.jsx
// import React, { useState, useEffect } from 'react';
// import Resizer from 'react-image-file-resizer';
// import Cropper from 'react-image-crop';
// import 'react-image-crop/dist/ReactCrop.css';
// import axios from 'axios';
// import './Gallery.css';


// const Gallery = () => {
//     const [image, setImage] = useState(null);
//     const [images, setImages] = useState([]);
//     const [crop, setCrop] = useState({ aspect: 1 });
//     const [filteredImage, setFilteredImage] = useState(null);

//     useEffect(() => {
//         const fetchImages = async () => {
//             try {
//                 const response = await axios.get('https://picsum.photos/v2/list?page=1&limit=50');
//                 setImages(response.data);
//             } catch (error) {
//                 console.error('Error fetching images:', error);
//             }
//         };

//         fetchImages();
//     }, []);

//     const handleFileChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             setImage(URL.createObjectURL(file));
//         }
//     };

//     const handleCropComplete = (crop) => {
//         // Implement crop logic
//     };

//     const handleResize = () => {
//         Resizer.imageFileResizer(
//             image,
//             300, // width
//             400, // height
//             'JPEG', // format
//             100, // quality
//             0, // rotation
//             (uri) => {
//                 setFilteredImage(uri);
//             },
//             'base64'
//         );
//     };

//     const handleFilter = () => {
//         // Simple filter implementation (e.g., grayscale)
//         const canvas = document.createElement('canvas');
//         const ctx = canvas.getContext('2d');
//         const img = new Image();
//         img.src = filteredImage;
//         img.onload = () => {
//             canvas.width = img.width;
//             canvas.height = img.height;
//             ctx.drawImage(img, 0, 0);
//             ctx.globalCompositeOperation = 'saturation';
//             ctx.fillStyle = 'hsl(0, 0%, 50%)';
//             ctx.fillRect(0, 0, canvas.width, canvas.height);
//             setFilteredImage(canvas.toDataURL());
//         };
//     };

//     return (
//         <div>
//             <h2>Upload Your Own Image</h2>
//             <input type="file" accept="image/*" onChange={handleFileChange} />
//             {image && (
//                 <div>
//                     <Cropper
//                         src={image}
//                         crop={crop}
//                         onChange={(newCrop) => setCrop(newCrop)}
//                         onComplete={handleCropComplete}
//                     />
//                     <button onClick={handleResize}>Resize Image</button>
//                     <button onClick={handleFilter}>Apply Filter</button>
//                     <img src={filteredImage} alt="Filtered" />
//                 </div>
//             )}

//             <h2>Gallery</h2>
//             <div className="gallery">
//                 {images.map((img) => (
//                     <div key={img.id} className="gallery-item">
//                         <img src={img.download_url} alt={img.author} />
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Gallery;
// src/Gallery.jsx
// src/Gallery.jsx
import React, { useState, useEffect } from 'react';
import Resizer from 'react-image-file-resizer';
import Cropper from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import axios from 'axios';
import './Gallery.css';

const Gallery = () => {
    const [image, setImage] = useState(null);
    const [images, setImages] = useState([]);
    const [crop, setCrop] = useState({ aspect: 1 });
    const [filteredImage, setFilteredImage] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get('https://picsum.photos/v2/list?page=1&limit=150');
                setImages(response.data);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchImages();
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    const handleCropComplete = (crop) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.src = image;
        img.onload = () => {
            canvas.width = crop.width;
            canvas.height = crop.height;
            ctx.drawImage(img, crop.x, crop.y, crop.width, crop.height, 0, 0, crop.width, crop.height);
            setCroppedImage(canvas.toDataURL());
        };
    };

    const handleResize = () => {
        Resizer.imageFileResizer(
            image,
            300, // width
            400, // height
            'JPEG', // format
            100, // quality
            0, // rotation
            (uri) => {
                setFilteredImage(uri);
            },
            'base64'
        );
    };

    const handleFilter = () => {
        // Simple filter implementation (e.g., grayscale)
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.src = filteredImage || croppedImage || image;
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 10, 5);
            ctx.globalCompositeOperation = 'saturation';
            ctx.fillStyle = 'hsl(0, 0%, 50%)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            setFilteredImage(canvas.toDataURL());
        };
    };

    return (
        <div>
            <h1>GALLERY</h1>
            <h2>Upload Your Own Image</h2>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {image && (
                <div>
                    <Cropper
                        src={image}
                        crop={crop}
                        onChange={(newCrop) => setCrop(newCrop)}
                        onComplete={handleCropComplete}
                    />
                    <button onClick={handleResize}>Resize Image</button>
                    <button onClick={handleFilter}>Apply Filter</button>
                    <img src={filteredImage || croppedImage || image} alt="Filtered" />
                </div>
            )}

            
            <div className="gallery">
                {images.map((img) => (
                    <div key={img.id} className="gallery-item">
                        <img src={img.download_url} alt={img.author} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Gallery;
