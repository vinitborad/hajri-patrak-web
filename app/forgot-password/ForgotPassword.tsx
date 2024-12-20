'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import axios from 'axios'

export default function ForgotPassword() {
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const searchParams = useSearchParams()
  const _id = searchParams.get('_id')
  const secret = searchParams.get('secret')
  const role = searchParams.get('role')

  useEffect(() => {
    if (!_id || !secret || !role) {
      setMessage({ type: 'error', text: 'Invalid reset link. Please request a new password reset.' })
    }
  }, [_id, secret, role])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage(null)

    if (password !== repeatPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match.' })
      setIsLoading(false)
      return
    }

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/forgot-password/${role}/verify`, {
        _id,
        secret,
        password,
        confirmPassword: repeatPassword
      });
      if (response.data.success === true) {
        setMessage({ type: 'success', text: response.data.message || 'Password changed successfully.' });
      } else {
        setMessage({ type: 'error', text: response.data.message || 'An error occurred. Please try again.' });
      }
    } catch (error: any) {
      setMessage({ type: 'error', text: error?.response?.data?.message || 'An error occurred. Please try again.' })
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Enter new password</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1"
            />
          </div>
          <div>
            <label htmlFor="repeatPassword" className="block text-sm font-medium text-gray-700">
              Repeat Password
            </label>
            <Input
              type="password"
              id="repeatPassword"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              required
              className="mt-1"
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Changing Password...' : 'Change Password'}
          </Button>
        </form>
        {message && (
          <Alert className={`mt-4 ${message.type === 'success' ? 'bg-green-100' : 'bg-red-100'}`}>
            <AlertTitle>{message.type === 'success' ? 'Success' : 'Error'}</AlertTitle>
            <AlertDescription>{message.text}</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  )
}