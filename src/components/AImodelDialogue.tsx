'use client';
import { useState } from 'react';
import { Button } from './ui/button';

import ApiKeyFields from './ApiKeyFields';

export default function AImodelDialogue({fetchApiKeys}:{fetchApiKeys:()=>Promise<void>}) {
    const [open, setOpen] = useState(false);




    const handleOpenAPI = () => {
        setOpen(true)
    }


    return (
        <>
            <Button
                onClick={handleOpenAPI}
                className="bg-violet-600 hover:bg-violet-700 text-white shadow-md"
                variant="default"
            >
                Add Open AI API Key
            </Button>

            {open && <ApiKeyFields open={open} setOpen={setOpen} fetchNewKeys={fetchApiKeys}/>}
        </>
    );
}
