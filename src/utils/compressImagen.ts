import imageCompression from 'browser-image-compression';

export const compressImagen = async ( imageFile: File, maxWidthOrHeight?:number ) => {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: maxWidthOrHeight ?? 1000,
    useWebWorker: true
  };

  try {
    const compressedFile = await imageCompression(imageFile, options);
    console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB

    return new File([compressedFile], imageFile.name, { type: imageFile.type });
  } catch (error) {
    console.log(error);

    return imageFile;
  }
}

export const compressImagenSameSize = async ( imageFile: File ) => {
  const options = {
    maxSizeMB: 2,
    maxWidthOrHeight: 1920,
    useWebWorker: true
  };

  try {
    const compressedFile = await imageCompression(imageFile, options);
    console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB

    return new File([compressedFile], imageFile.name, { type: imageFile.type });
  } catch (error) {
    console.log(error);

    return imageFile;
  }
}

export const compressImagenPodcastCuadrado = async ( imageFile: File ) => {
  const options = {
    maxSizeMB: 4,
    maxWidthOrHeight: 1920,
    useWebWorker: true
  };

  try {
    const compressedFile = await imageCompression(imageFile, options);
    //console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB

    return new File([compressedFile], imageFile.name, { type: imageFile.type });
  } catch (error) {
    console.log(error);

    return imageFile;
  }
}
