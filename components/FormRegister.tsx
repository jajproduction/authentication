'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FormEvent, useState } from 'react'
import { toast } from 'sonner'
import axios from 'axios'

export function FormRegister({ className, ...props }: React.ComponentProps<'form'>) {
  const [firstname, setFirstname] = useState<string>('')
  const [lastname, setLastname] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleRegisterForm = async (e: FormEvent) => {
    e.preventDefault()
    try {
      if (!email || !password) {
        toast.warning('Complete your information')
        return
      }

      await axios.post('/api/auth/register', { firstname, lastname, email, password })
      toast.success('Account created successfully!')
    } catch (error) {
      toast.error('Failed to create an account')
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleRegisterForm} className={cn('flex flex-col gap-6', className)} {...props}>
      <div>
        <h1 className='text-2xl font-bold'>Create your account</h1>
        <p className='text-muted-foreground text-sm text-balance'>
          Be sure to allow your administrator to validate your account.
        </p>
      </div>
      <div className='grid gap-4'>
        <div className='grid gap-2'>
          <Label htmlFor='firstname'>First Name</Label>
          <Input
            id='firstname'
            type='text'
            placeholder='Enter your first name'
            value={firstname}
            onChange={e => setFirstname(e.target.value)}
          />
        </div>
        <div className='grid gap-2'>
          <Label htmlFor='lastname'>Last Name</Label>
          <Input
            id='lastname'
            type='text'
            placeholder='Enter your last name'
            value={lastname}
            onChange={e => setLastname(e.target.value)}
          />
        </div>
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
            Create an account
          </Button>
          <Button
            type='button'
            variant='outline'
            onClick={() => {
              window.location.href = '/'
            }}
            className='w-full'
          >
            Already have an account?
          </Button>
        </div>
      </div>
    </form>
  )
}
