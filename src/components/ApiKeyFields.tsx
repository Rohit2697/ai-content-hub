import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useRouter } from 'next/navigation';

const ApiKeyFields = ({ open, setOpen, fetchNewKeys }: { open: boolean, setOpen: Dispatch<SetStateAction<boolean>>, fetchNewKeys: () => Promise<void> }) => {
    const [apiKey, setApiKey] = useState('');
    const [models, setModels] = useState<string[]>([]);
    const [selectedModel, setSelectedModel] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null)
    const [isSaveingDV, setIssaveingDB] = useState(false)
    const router = useRouter();
    interface Model {

        id: string;
        object: string;
        created: number,
        owned_by: string

    }
    const saveToDB = async () => {
        try {
            setIssaveingDB(true)
            const res = await fetch('/api/user/edit', {
                method: "POST",
                body: JSON.stringify({
                    open_ai_token: apiKey,
                    model: selectedModel
                })
            })
            if (res.status == 401) {
                router.push('/login')
                return
            }
            if (!res.ok) {
                const data = await res.json()
                setIssaveingDB(false)
                setError(data.message || 'Failed to save')
                return
            }
            await fetchNewKeys()
            setIssaveingDB(false)
            setOpen(false)
        } catch {
            setIssaveingDB(false)
            setError('Something went wrong!')
            return
        }
    };
    useEffect(() => {
        if (open && inputRef.current) {
            inputRef.current.focus()
            setError('')
        }
    }, [open])
    const validateAndFetchModels = async () => {
        setLoading(true);
        setError('');
        setModels([]);
        try {
            const response = await fetch('https://api.openai.com/v1/models', {
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error?.message || 'Invalid API key');
            }

            const data = await response.json();

            const modelIds = data.data.map((model: Model) => model.id);

            setModels(modelIds);
        } catch (err) {
            if (err instanceof Error)
                setError(err.message || 'Failed to fetch models');
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="bg-white w-full max-w-md p-4 sm:p-6 rounded-lg shadow-lg relative space-y-4 animate-fade-in">

                <Button
                    onClick={() => setOpen(false)}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-lg"
                    aria-label="Close configuration modal"
                >
                    ✕
                </Button>

                <h2 className="text-base sm:text-lg font-bold text-violet-700 text-center sm:text-left">
                    Configure OpenAI
                </h2>

                <Input
                    type="password"
                    placeholder="Enter OpenAI API Key"
                    value={apiKey}
                    ref={inputRef}
                    onChange={(e) => setApiKey(e.target.value.trim())}
                    className="w-full rounded border-gray-300 shadow-sm focus:ring-violet-500 focus:border-violet-500 text-sm"
                />

                <Button
                    onClick={validateAndFetchModels}
                    disabled={loading || !apiKey}
                    className="bg-violet-600 text-white w-full rounded py-2 disabled:opacity-50"
                >
                    {loading ? 'Validating...' : 'Validate API Key'}
                </Button>

                {error && (
                    <p className="text-red-600 text-sm bg-red-100 px-3 py-2 rounded break-words overflow-hidden">
                        {error}
                    </p>
                )}

                {models.length > 0 && (
                    <div className="space-y-3">
                        <label className="block text-sm font-medium text-violet-700">
                            Select Model
                        </label>
                        <select
                            className="w-full border px-3 py-2 text-sm border-gray-300 rounded shadow-sm focus:ring-violet-500 focus:border-violet-500"
                            value={selectedModel}
                            onChange={(e) => setSelectedModel(e.target.value)}
                        >
                            <option value="">-- Choose a model --</option>
                            {models.sort().map((id) => (
                                <option key={id} value={id}>
                                    {id}
                                </option>
                            ))}
                        </select>

                        <Button
                            onClick={saveToDB}
                            disabled={!selectedModel || isSaveingDV}
                            className="bg-green-600 text-white w-full rounded py-2 disabled:opacity-50"
                        >
                            {isSaveingDV ? 'Saving...' : 'Save Settings'}
                        </Button>
                    </div>
                )}
            </div>
        </div>

    );
}

export default ApiKeyFields;
