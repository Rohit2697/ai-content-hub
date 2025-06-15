'use client';
import { useState } from 'react';
import { Button } from './ui/button';

import ApiKeyFields from './ApiKeyFields';

export default function AImodelDialogue({ fetchApiKeys }: { fetchApiKeys: () => Promise<void> }) {
    const [open, setOpen] = useState(false);




    const handleOpenAPI = () => {
        setOpen(true)
    }


    return (
        <>
            <Button
                onClick={handleOpenAPI}
                className="w-full sm:w-auto bg-violet-600 hover:bg-violet-700 text-white shadow-md px-4 py-2 rounded transition duration-200 text-sm sm:text-base"
                variant="default"
            >
                Add OpenAI API Key
            </Button>


            {open && <ApiKeyFields open={open} setOpen={setOpen} fetchNewKeys={fetchApiKeys} />}
        </>
    );
}
