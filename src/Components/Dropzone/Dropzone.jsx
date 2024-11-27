import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const Dropzone = () => {
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p className="text-black text-sm sm:text-lg">
          Drag &apos;n&apos; drop some files here, or click to select files
        </p>
      )}
    </div>
  );
};

export default Dropzone;
