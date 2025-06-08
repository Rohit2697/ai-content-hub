'use client';
import AImodelDialogue from './AImodelDialogue';
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";

import { Button } from './ui/button';
import { useEffect, useState } from 'react';
import { Spinner } from './ui/spinner';
import ErrorAlert from './ErrorAlert';
import ApiKeyFields from './ApiKeyFields';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';



export default function MyAPIKeys() {
    const [fetchApiKeyError, setFetchAPIKeyError] = useState('')
    const [loading, setLoading] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const router = useRouter()
    const [deleting, setDeleting] = useState(false)
    const [apikeyObj, setAPIObj] = useState<{
        open_ai_token: string; model: string
    }>()
    const fetchApikeys = async () => {
        try {
            setLoading(true)
            setFetchAPIKeyError('')
            const res = await fetch('/api/user/apikeys')
            if (res.status == 401) {
                router.push('/login')
                return
            }
            if (!res.ok) {
                const data = await res.json()
                setLoading(false)
                setFetchAPIKeyError(data.message || "Unable to fetch API keys")
            }

            const data = await res.json()

            setAPIObj({
                open_ai_token: data.open_ai_token,
                model: data.model
            })
            setLoading(false)

        } catch {
            setLoading(false)
            setFetchAPIKeyError('Something Went Wrong!')
        }
    }
    const handleDelete = async () => {
        try {
            setDeleting(true)
            setFetchAPIKeyError('')
            const res = await fetch('/api/user/apikeys', { method: "DELETE" })
            setDeleting(false)
            if (res.status == 401) {
                router.push('/login')
                return
            }
            if (!res.ok) {
                const data = await res.json()

                setFetchAPIKeyError(data.message || "Unable to fetch API keys")
            }
            setAPIObj(undefined)

        } catch {
            setFetchAPIKeyError('Something Went Wrong!')
        }
    }
    useEffect(() => {
        fetchApikeys()
    }, [])
    if (loading) {
        return (
            <div className="absolute inset-0 z-10 flex items-center justify-center  bg-opacity-60 rounded-xl">
                <Spinner size="large" className="text-violet-600" />
            </div>
        )
    }
    return (
        <main className="max-w-3xl mx-auto ">
            {openEdit && <ApiKeyFields open={openEdit} setOpen={setOpenEdit} fetchNewKeys={fetchApikeys} />}


            {fetchApiKeyError && <ErrorAlert message={fetchApiKeyError} setError={setFetchAPIKeyError} />}
            <h1 className="text-4xl font-extrabold mb-10 text-violet-700 border-b-4 border-violet-300 pb-2">
                My API Key
            </h1>
            {!apikeyObj?.open_ai_token && <div className='my-2 flex justify-center'>
                <AImodelDialogue fetchApiKeys={fetchApikeys}/>
            </div>}
            {apikeyObj?.open_ai_token && apikeyObj.model && <div className={cn("space-y-4", deleting ? "opacity-50 pointer-events-none" : "opacity-100")}>

                <div

                    className="border border-violet-600 p-4 rounded-lg bg-white shadow-sm relative"
                >
                    {deleting &&
                        <div className='absolute inset-0 z-10 flex justify-center'>
                            <Spinner size="small" className='text-violet-600' />
                        </div>
                    }
                    <div className="absolute top-2 right-2 flex gap-2">
                        <Button
                            onClick={() => setOpenEdit(true)}
                            className="text-blue-600 hover:text-blue-800 p-1"
                            variant="ghost"
                            size="icon"
                        >
                            <CiEdit className="w-5 h-5" />
                        </Button>
                        <Button
                            onClick={handleDelete}
                            className="text-red-600 hover:text-red-800 p-1"
                            variant="ghost"
                            size="icon"
                        >
                            <RiDeleteBin6Line className="w-5 h-5" />
                        </Button>
                    </div>



                    <div className="text-md text-violet-600 font-semibold">API Key: {apikeyObj.open_ai_token.slice(0, 3) + "-************************"}</div>
                    <div className="text-md text-violet-600 font-semibold">Model: {apikeyObj.model}</div>

                </div>

            </div>}

        </main>
    );
}
