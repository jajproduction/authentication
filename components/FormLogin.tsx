'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FormEvent, useState } from 'react'
import { toast } from 'sonner'
import axios from 'axios'

export function FormLogin({ className, ...props }: React.ComponentProps<'form'>) {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleLoginForm = async (e: FormEvent) => {
    e.preventDefault()
    try {
      if (!email || !password) {
        toast.warning('Please fill in both email and password')
        return
      }

      const response = await axios.post('/api/auth/login', { email, password })
      toast.success('Login successful! Please wait.')

      // Jaj's middleware logic
      const { id, type, firstname, lastname } = response.data
      document.cookie = `type=${type}; path=/; secure; samesite=lax`
      localStorage.setItem('userID', id)
      localStorage.setItem('firstname', firstname)
      localStorage.setItem('lastname', lastname)

      if (type === 'SUPERADMIN') {
        window.location.href = '/dashboard/sadmin'
      } else if (type === 'ADMIN') {
        window.location.href = '/dashboard/admin'
      } else {
        window.location.href = '/dashboard'
      }
    } catch (error) {
      toast.error('Invalid credentials! Please try again.')
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleLoginForm} className={cn('flex flex-col gap-6', className)} {...props}>
      <div className='flex flex-col items-center gap-2 text-center'>
        <h1 className='text-2xl font-bold'>Welcome back!</h1>
        <p className='text-muted-foreground text-sm text-balance'>
          Enter your email below to login to your account
        </p>
      </div>
      <div className='grid gap-4'>
        <div className='grid gap-2'>
          <Label htmlFor='email'>Email</Label>
          <Input
            id='email'
            type='email'
            placeholder='jaj@bugzb4di.com'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className='grid gap-2'>
          <Label htmlFor='password'>Password</Label>
          <Input
            id='password'
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className='space-y-2'>
          <Button type='submit' className='w-full'>
            Login
          </Button>
          <Button
            type='button'
            variant='outline'
            onClick={() => {
              window.location.href = '/auth/register'
            }}
            className='w-full'
          >
            Create an account
          </Button>
        </div>
      </div>
    </form>
  )
}
