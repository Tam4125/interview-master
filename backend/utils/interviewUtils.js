// import {storage} from '../database/firebase.js';

// // Save CV File into Firebase cloud and return the link
// export const uploadCvToFirebase = async (fileBuffer, fileName, mimetype) => {
//     const file = storage.file(fileName);
//
//     // Upload buffer
//     await file.save(fileBuffer, {
//         metadata: { contentType: mimetype },
//     });
//
//     // Make it public (optional, or use signed URL)
//     await file.makePublic();
//
//     return `https://storage.googleapis.com/${storage.name}/${fileName}`;
// };



