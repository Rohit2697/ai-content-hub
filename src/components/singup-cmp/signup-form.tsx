'use client';

import React, { useState } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Spinner } from '../ui/spinner';
import { cn } from '@/lib/utils';
import { useUserStore } from '@/hooks/useUserStore';

export default function SignupForm() {
    const router = useRouter()
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { setUser } = useUserStore()
    const isFormValid = !passwordError && name && email && password && confirmPassword;
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData()
        formData.append('name', name)
        formData.append('email', email)
        formData.append('password', password)

        try {
            const res = await fetch('/api/signup', {
                method: 'POST',

                body: formData
            })

            if (!res.ok) {
                const data = await res.json()
                setLoading(false)
                setError(data.message || 'Signup failed')

                return;
            }
            const data = await res.json()

            const updateUser = {
                email: data.email,
                user_id: data.userId,
                name: data.name
            }
            setUser(updateUser)
            setLoading(false)
            if (typeof window !== "undefined") {
                window.location.reload()
                return;
            }
            router.push('/')
        } catch {
            setLoading(false)
            setError('Something went wrong');

        }

    }
    return (
        <div className="flex items-center justify-center ">
            {loading && <div className="absolute inset-0 z-10 flex items-center justify-center  bg-opacity-60 rounded-xl">
                <Spinner size="large" className="text-violet-600" />
            </div>}
            <Card className={cn(
                "shadow-lg border w-[400px] border-gray-200 rounded-xl bg-white transition-opacity duration-300",
                loading ? "opacity-50 pointer-events-none" : "opacity-100"
            )}>
                <CardHeader className="text-center space-y-1">
                    <CardTitle className="text-2xl font-bold text-violet-700">
                        AI-Powered Knowledge Hub
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-500">
                        Create your account
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <Label htmlFor="name" className="text-sm font-medium text-gray-700">Name</Label>
                            <Input
                                id="name"
                                value={name}
                                className="rounded-lg border-gray-300 focus:ring-2 focus:ring-violet-500 focus:outline-none"
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                className="rounded-lg border-gray-300 focus:ring-2 focus:ring-violet-500 focus:outline-none"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                className="rounded-lg border-gray-300 focus:ring-2 focus:ring-violet-500 focus:outline-none"
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    if (confirmPassword && e.target.value !== confirmPassword) {
                                        setPasswordError('Passwords do not match');
                                    } else {
                                        setPasswordError('');
                                    }
                                }}
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">Confirm Password</Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                className={`${passwordError
                                    ? 'className="rounded-lg  focus:ring-2  focus:outline-none" border-red-500 focus:ring-red-500'
                                    : 'className="rounded-lg border-gray-300 focus:ring-2 focus:ring-violet-500 focus:outline-none"'
                                    }`}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setConfirmPassword(value);
                                    if (password !== value) {
                                        setPasswordError('Passwords do not match');
                                    } else {
                                        setPasswordError('');
                                    }
                                }}
                                required
                            />
                            {passwordError && (
                                <p className="text-sm text-red-500 mt-1">{passwordError}</p>
                            )}
                        </div>
                        {error && <p className="text-red-600 mb-4 text-sm  text-center">{error}</p>}
                        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center w-full">
                            <Button
                                type="submit"
                                disabled={!isFormValid}
                                className={`w-full sm:w-1/2 transition font-semibold ${isFormValid
                                    ? 'bg-violet-600 hover:bg-violet-700 text-white'
                                    : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                                    }`}
                            >
                                Sign Up
                            </Button>
                            <Link href="/login" className="w-full sm:w-1/2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="w-full text-violet-600 border-violet-600 hover:bg-violet-50 font-semibold"
                                >
                                    Login
                                </Button>
                            </Link>
                        </div>


                    </form>
                </CardContent>

                <CardFooter className="justify-center text-center text-sm text-gray-500">
                    By Rohit Dey
                </CardFooter>
            </Card>
        </div>
    );
}
