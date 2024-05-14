import { useState } from 'react';
import axios from 'axios';
import { UploadProfilePictureProps } from '@/app/lib/types';
import { useFormStatus } from 'react-dom';
import { Button } from '@/app/ui/button';
import { ArrowRightCircle } from '@/app/ui/icons';

const UploadProfilePictureForm: React.FC<UploadProfilePictureProps> = ({ onSuccess, onError }) => {
    const [file, setFile] = useState<File | null>(null);
    const [pictureStatus, setPictureStatus] = useState<string>("Delete picture");

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFile = e.target.files?.[0];
        if (uploadedFile) {
            setFile(uploadedFile);
        }
    };

    const handleRemoveImage = () => {
        setFile(null);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!file) return;

        try {
            const formData = new FormData();
            formData.append('avatarFile', file);

            await axios.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            });
            onSuccess();
        } catch (error) {
            onError('Failed to upload profile picture');
        }
    };

    const handleDeletePicture = async () => {
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/avatar`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            });
            setPictureStatus("Picture deleted");
        } catch (error) {
            console.error('Failed to delete profile picture:', error);
            throw error; // Propagate the error to be caught by the onError function
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mt-4 flex flex-col justify-start items-start min-h-48 bg-white">
                <div className="w-full md:w-1/2 relative grid grid-cols-1 md:grid-cols-3 border border-gray-300 bg-gray-100 rounded-lg">
                    <div className="rounded-l-lg p-4 bg-gray-200 flex flex-col justify-center items-center border-0 border-r border-gray-300">
                        <label htmlFor="avatarFile" className="cursor-pointer inline-flex items-center justify-center px-4 py-2 bg-gray-900 text-gray-50 border border-transparent
  rounded-md font-semibold text-xs uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none 
  focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150">
                            Select image

                            <input
                                id="avatarFile"
                                className="hidden"
                                type="file"
                                onChange={handleFileChange}
                            />
                        </label>
                        <button
                            className="inline-flex items-center shadow-md my-2 px-2 py-2 bg-gray-900 text-gray-50 border border-transparent
        rounded-md font-semibold text-xs uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none 
       focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150"
                            onClick={handleRemoveImage}
                        >
                            Remove image
                        </button>
                    </div>
                    <div
                        className="relative order-first md:order-last h-28 md:h-auto flex justify-center items-center border border-dashed border-gray-400 col-span-2 m-2 rounded-lg bg-no-repeat bg-center bg-origin-padding bg-cover"
                        style={{
                            backgroundImage: file ? `url(${URL.createObjectURL(file)})` : '',
                        }}
                    >
                        {file ? null : (
                            <span className="text-gray-400 opacity-75">
                                <svg
                                    className="w-14 h-14"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="0.7"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                                    />
                                </svg>
                            </span>
                        )}
                    </div>
                </div>
                <div className="flex flex-col w-full">
                    <UploadProfilePictureButton />
                    <DeleteProfilePictureButton onDeletePicture={handleDeletePicture} pictureStatus={pictureStatus} />
                </div>
            </div>
        </form>
    );
};

export default UploadProfilePictureForm;

function UploadProfilePictureButton() {
    const { pending } = useFormStatus();

    return (
        <Button className="flex justify-center mt-4 w-full md:w-1/2" aria-disabled={pending}>
            Upload picture <ArrowRightCircle className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
    )
}

interface DeleteProfilePictureButtonProps {
    onDeletePicture: () => void;
    pictureStatus: string;
}

function DeleteProfilePictureButton({ onDeletePicture, pictureStatus }: DeleteProfilePictureButtonProps) {
    const { pending } = useFormStatus();

    return (
        <Button className="flex justify-center mt-4 w-full md:w-1/2 bg-red-600"
            aria-disabled={pending}
            onClick={onDeletePicture}>
            {pictureStatus}<ArrowRightCircle className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
    )
}